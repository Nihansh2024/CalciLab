import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, getPayment, getSubscription, getTierFromPlanId, isYearlyPlan } from '@/lib/razorpay';
import { db } from '@/lib/db';

// Webhook handler for Razorpay events
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature') as string;
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(
    body,
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET || ''
  );

  if (!isValid) {
    console.error('Webhook signature verification failed');
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const event = JSON.parse(body);
  const eventType = event.event;

  // Handle different event types
  try {
    switch (eventType) {
      case 'subscription.activated': {
        const subscription = event.payload.subscription.entity;
        await handleSubscriptionActivated(subscription);
        break;
      }

      case 'subscription.charged': {
        const subscription = event.payload.subscription.entity;
        const payment = event.payload.payment?.entity;
        await handleSubscriptionCharged(subscription, payment);
        break;
      }

      case 'subscription.cancelled': {
        const subscription = event.payload.subscription.entity;
        await handleSubscriptionCancelled(subscription);
        break;
      }

      case 'subscription.paused': {
        const subscription = event.payload.subscription.entity;
        await handleSubscriptionPaused(subscription);
        break;
      }

      case 'subscription.resumed': {
        const subscription = event.payload.subscription.entity;
        await handleSubscriptionResumed(subscription);
        break;
      }

      case 'payment.captured': {
        const payment = event.payload.payment.entity;
        await handlePaymentCaptured(payment);
        break;
      }

      case 'payment.failed': {
        const payment = event.payload.payment.entity;
        await handlePaymentFailed(payment);
        break;
      }

      case 'order.paid': {
        const order = event.payload.order.entity;
        const payment = event.payload.payment?.entity;
        await handleOrderPaid(order, payment);
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionActivated(subscription: any) {
  const customerId = subscription.customer_id;
  const planId = subscription.plan_id;
  const notes = subscription.notes || {};

  // Find user by Razorpay customer ID
  const user = await db.user.findFirst({
    where: { razorpayCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  const tier = notes.tier || getTierFromPlanId(planId);

  // Update user subscription
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: tier?.toUpperCase() as 'PRO' | 'BUSINESS',
      subscriptionStatus: 'ACTIVE',
      razorpaySubscriptionId: subscription.id,
      razorpayPlanId: planId,
      subscriptionStart: new Date(subscription.start_at * 1000),
      subscriptionEnd: subscription.end_at ? new Date(subscription.end_at * 1000) : null,
    },
  });
}

async function handleSubscriptionCharged(subscription: any, payment: any) {
  const customerId = subscription.customer_id;

  const user = await db.user.findFirst({
    where: { razorpayCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Create payment record
  if (payment) {
    await db.payment.create({
      data: {
        userId: user.id,
        amount: payment.amount / 100, // Convert from paise
        currency: payment.currency || 'INR',
        status: 'completed',
        razorpayPaymentId: payment.id,
        description: 'Subscription renewal',
      },
    });
  }

  // Update subscription status
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'ACTIVE',
      subscriptionEnd: subscription.end_at ? new Date(subscription.end_at * 1000) : null,
    },
  });
}

async function handleSubscriptionCancelled(subscription: any) {
  const customerId = subscription.customer_id;

  const user = await db.user.findFirst({
    where: { razorpayCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Downgrade to free tier
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionTier: 'FREE',
      subscriptionStatus: 'CANCELLED',
      razorpaySubscriptionId: null,
      razorpayPlanId: null,
    },
  });
}

async function handleSubscriptionPaused(subscription: any) {
  const customerId = subscription.customer_id;

  const user = await db.user.findFirst({
    where: { razorpayCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'PAST_DUE',
    },
  });
}

async function handleSubscriptionResumed(subscription: any) {
  const customerId = subscription.customer_id;

  const user = await db.user.findFirst({
    where: { razorpayCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'ACTIVE',
    },
  });
}

async function handlePaymentCaptured(payment: any) {
  const orderId = payment.order_id;
  const notes = payment.notes || {};

  if (!notes.userId) {
    console.log('No user ID in payment notes');
    return;
  }

  const user = await db.user.findUnique({
    where: { id: notes.userId },
  });

  if (!user) {
    console.error(`User not found: ${notes.userId}`);
    return;
  }

  // Create payment record
  await db.payment.create({
    data: {
      userId: user.id,
      amount: payment.amount / 100,
      currency: payment.currency || 'INR',
      status: 'completed',
      razorpayPaymentId: payment.id,
      description: notes.tier ? `${notes.tier} subscription` : 'One-time payment',
    },
  });

  // Update subscription if this was for a tier upgrade
  if (notes.tier) {
    await db.user.update({
      where: { id: user.id },
      data: {
        subscriptionTier: notes.tier.toUpperCase() as 'PRO' | 'BUSINESS',
        subscriptionStatus: 'ACTIVE',
        subscriptionStart: new Date(),
        subscriptionEnd: notes.isYearly === 'true' 
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }
}

async function handlePaymentFailed(payment: any) {
  const notes = payment.notes || {};

  if (!notes.userId) {
    console.log('No user ID in payment notes');
    return;
  }

  const user = await db.user.findUnique({
    where: { id: notes.userId },
  });

  if (!user) {
    console.error(`User not found: ${notes.userId}`);
    return;
  }

  // Create failed payment record
  await db.payment.create({
    data: {
      userId: user.id,
      amount: payment.amount / 100,
      currency: payment.currency || 'INR',
      status: 'failed',
      razorpayPaymentId: payment.id,
      description: 'Failed payment',
    },
  });
}

async function handleOrderPaid(order: any, payment: any) {
  const notes = order.notes || {};

  if (!notes.userId) {
    console.log('No user ID in order notes');
    return;
  }

  const user = await db.user.findUnique({
    where: { id: notes.userId },
  });

  if (!user) {
    console.error(`User not found: ${notes.userId}`);
    return;
  }

  // Create payment record
  if (payment) {
    await db.payment.create({
      data: {
        userId: user.id,
        amount: payment.amount / 100,
        currency: payment.currency || 'INR',
        status: 'completed',
        razorpayPaymentId: payment.id,
        description: `${notes.tier || 'Subscription'} (${notes.isYearly === 'true' ? 'yearly' : 'monthly'})`,
      },
    });
  }

  // Update user subscription
  if (notes.tier) {
    await db.user.update({
      where: { id: user.id },
      data: {
        subscriptionTier: notes.tier.toUpperCase() as 'PRO' | 'BUSINESS',
        subscriptionStatus: 'ACTIVE',
        subscriptionStart: new Date(),
        subscriptionEnd: notes.isYearly === 'true'
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }
}
