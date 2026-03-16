import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay with keys
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Razorpay plan IDs (create these in Razorpay Dashboard)
export const RAZORPAY_PLANS = {
  pro: {
    monthlyPlanId: process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID,
    yearlyPlanId: process.env.RAZORPAY_PRO_YEARLY_PLAN_ID,
  },
  business: {
    monthlyPlanId: process.env.RAZORPAY_BUSINESS_MONTHLY_PLAN_ID,
    yearlyPlanId: process.env.RAZORPAY_BUSINESS_YEARLY_PLAN_ID,
  },
};

// Create or retrieve Razorpay customer
export async function getOrCreateCustomer(
  email: string,
  name?: string,
  contact?: string,
  existingCustomerId?: string | null
): Promise<string> {
  // If customer already exists, return their ID
  if (existingCustomerId) {
    return existingCustomerId;
  }

  // Create new customer
  const customer = await razorpay.customers.create({
    email,
    name: name || undefined,
    contact: contact || undefined,
    notes: {
      source: 'calcilab',
    },
  });

  return customer.id;
}

// Create subscription
export async function createSubscription(params: {
  customerId: string;
  planId: string;
  totalCount?: number; // Number of billing cycles (for yearly: 1, for monthly: 12)
  notes?: Record<string, string>;
}): Promise<Razorpay.Subscription> {
  const subscription = await razorpay.subscriptions.create({
    customer_id: params.customerId,
    plan_id: params.planId,
    total_count: params.totalCount || 12, // Default to 12 months
    notes: params.notes || {},
  });

  return subscription;
}

// Create one-time payment order
export async function createOrder(params: {
  amount: number; // Amount in smallest currency unit (paise for INR)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<Razorpay.Order> {
  const order = await razorpay.orders.create({
    amount: params.amount,
    currency: params.currency,
    receipt: params.receipt,
    notes: params.notes || {},
  });

  return order;
}

// Get subscription details
export async function getSubscription(subscriptionId: string): Promise<Razorpay.Subscription> {
  return await razorpay.subscriptions.fetch(subscriptionId);
}

// Cancel subscription
export async function cancelSubscription(
  subscriptionId: string,
  cancelAtCycleEnd: boolean = true
): Promise<Razorpay.Subscription> {
  return await razorpay.subscriptions.cancel(subscriptionId, cancelAtCycleEnd);
}

// Fetch payment details
export async function getPayment(paymentId: string): Promise<Razorpay.Payment> {
  return await razorpay.payments.fetch(paymentId);
}

// Capture payment
export async function capturePayment(
  paymentId: string,
  amount: number,
  currency: string = 'INR'
): Promise<Razorpay.Payment> {
  return await razorpay.payments.capture(paymentId, amount, currency);
}

// Verify webhook signature
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return expectedSignature === signature;
}

// Helper to map Razorpay plan to tier
export function getTierFromPlanId(planId: string): string | null {
  if (
    planId === process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID ||
    planId === process.env.RAZORPAY_PRO_YEARLY_PLAN_ID
  ) {
    return 'pro';
  }
  if (
    planId === process.env.RAZORPAY_BUSINESS_MONTHLY_PLAN_ID ||
    planId === process.env.RAZORPAY_BUSINESS_YEARLY_PLAN_ID
  ) {
    return 'business';
  }
  return null;
}

// Helper to check if yearly plan
export function isYearlyPlan(planId: string): boolean {
  return (
    planId === process.env.RAZORPAY_PRO_YEARLY_PLAN_ID ||
    planId === process.env.RAZORPAY_BUSINESS_YEARLY_PLAN_ID
  );
}

// Convert INR to USD (approximate) - for display purposes
export function convertINRtoUSD(amountINR: number): number {
  const rate = 83; // Approximate exchange rate
  return Math.round((amountINR / rate) * 100) / 100;
}

// Convert USD to INR (approximate)
export function convertUSDtoINR(amountUSD: number): number {
  const rate = 83; // Approximate exchange rate
  return Math.round(amountUSD * rate);
}
