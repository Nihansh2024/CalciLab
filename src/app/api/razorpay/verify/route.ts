import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { getPayment } from '@/lib/razorpay';

// Verify payment and update user subscription
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_subscription_id,
      razorpay_signature,
      tier,
      isYearly 
    } = body;

    // Verify the payment
    // In production, you should verify the signature on the server side
    // For now, we'll fetch the payment details from Razorpay
    const payment = await getPayment(razorpay_payment_id);

    if (payment.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Get user
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create payment record
    await db.payment.create({
      data: {
        userId: user.id,
        amount: payment.amount / 100,
        currency: payment.currency || 'INR',
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        description: `${tier} subscription (${isYearly ? 'yearly' : 'monthly'})`,
      },
    });

    // Update user subscription
    await db.user.update({
      where: { id: user.id },
      data: {
        subscriptionTier: tier.toUpperCase() as 'PRO' | 'BUSINESS',
        subscriptionStatus: 'ACTIVE',
        razorpaySubscriptionId: razorpay_subscription_id || null,
        subscriptionStart: new Date(),
        subscriptionEnd: isYearly
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Payment verified and subscription activated' 
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
