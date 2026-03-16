import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { 
  getOrCreateCustomer, 
  createSubscription, 
  createOrder,
  RAZORPAY_PLANS,
  convertUSDtoINR 
} from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { tier, isYearly, amount } = body;

    // Validate tier
    if (!['pro', 'business'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    // Get or create user in database
    let user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || null,
          image: session.user.image || null,
        },
      });
    }

    // Get plan ID based on tier and billing period
    const plans = RAZORPAY_PLANS[tier as 'pro' | 'business'];
    const planId = isYearly ? plans.yearlyPlanId : plans.monthlyPlanId;

    // If no plan ID configured, create a one-time order instead
    if (!planId) {
      // Create one-time payment order
      const amountInPaise = Math.round(amount * 100); // Convert to paise
      const order = await createOrder({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${user.id}_${Date.now()}`,
        notes: {
          userId: user.id,
          tier: tier,
          isYearly: String(isYearly),
        },
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        prefill: {
          name: session.user.name || '',
          email: session.user.email,
        },
        notes: {
          tier: tier,
          isYearly: String(isYearly),
        },
      });
    }

    // Get or create Razorpay customer
    const customerId = await getOrCreateCustomer(
      session.user.email,
      session.user.name || undefined,
      undefined,
      user.razorpayCustomerId
    );

    // Update user with Razorpay customer ID if new
    if (user.razorpayCustomerId !== customerId) {
      await db.user.update({
        where: { id: user.id },
        data: { razorpayCustomerId: customerId },
      });
    }

    // Create subscription
    const subscription = await createSubscription({
      customerId,
      planId,
      totalCount: isYearly ? 1 : 12,
      notes: {
        tier: tier,
        isYearly: String(isYearly),
        userId: user.id,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      prefill: {
        name: session.user.name || '',
        email: session.user.email,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
