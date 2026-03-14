// Subscription tier configuration
export type TierId = 'free' | 'pro' | 'business';

export interface SubscriptionTier {
  id: TierId;
  name: string;
  description: string;
  price: number; // Price in INR
  priceUSD: number; // Price in USD for display
  yearlyPrice: number;
  yearlyPriceUSD: number;
  razorpayPlanId?: string;
  razorpayYearlyPlanId?: string;
  features: string[];
  limitations: string[];
  highlighted?: boolean;
  badge?: string;
  icon?: string;
  color?: string;
}

export interface UsageLimits {
  dailyCalculations: number;
  savedCalculations: number;
  exportFormats: string[];
  prioritySupport: boolean;
  advancedFeatures: boolean;
  apiAccess: boolean;
  teamMembers: number;
  customBranding: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with basic calculations',
    price: 0,
    priceUSD: 0,
    yearlyPrice: 0,
    yearlyPriceUSD: 0,
    features: [
      '50 calculations per day',
      'Basic calculators access',
      'Standard calculation history',
      'Email support',
      'Basic export (PDF)',
      'Mobile-friendly interface',
    ],
    limitations: [
      'Limited daily calculations',
      'No advanced calculators',
      'No API access',
      'No team features',
    ],
    color: 'from-slate-500 to-slate-600',
    icon: 'Zap',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Unlock powerful features for professionals',
    price: 799, // ₹799/month (~$9.99)
    priceUSD: 9.99,
    yearlyPrice: 7999, // ₹7,999/year (~$99.99)
    yearlyPriceUSD: 99.99,
    razorpayPlanId: process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID,
    razorpayYearlyPlanId: process.env.RAZORPAY_PRO_YEARLY_PLAN_ID,
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Unlimited calculations',
      'All calculators access',
      'Advanced analysis features',
      'Priority email support',
      'All export formats (PDF, Excel, CSV)',
      'Calculation templates',
      'Custom formulas',
      'Data visualization',
      'Historical data analysis',
    ],
    limitations: [
      'Single user only',
      'No team collaboration',
    ],
    color: 'from-violet-500 to-purple-600',
    icon: 'Crown',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Enterprise features for teams and organizations',
    price: 2499, // ₹2,499/month (~$29.99)
    priceUSD: 29.99,
    yearlyPrice: 24999, // ₹24,999/year (~$299.99)
    yearlyPriceUSD: 299.99,
    razorpayPlanId: process.env.RAZORPAY_BUSINESS_MONTHLY_PLAN_ID,
    razorpayYearlyPlanId: process.env.RAZORPAY_BUSINESS_YEARLY_PLAN_ID,
    features: [
      'Everything in Pro',
      'Team collaboration (up to 10 members)',
      'Admin dashboard',
      'API access (10,000 calls/month)',
      'Priority phone & email support',
      'Custom branding',
      'White-label reports',
      'SSO authentication',
      'Audit logs',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    limitations: [],
    color: 'from-amber-500 to-orange-600',
    icon: 'Building2',
  },
];

export const USAGE_LIMITS: Record<TierId, UsageLimits> = {
  free: {
    dailyCalculations: 50,
    savedCalculations: 10,
    exportFormats: ['pdf'],
    prioritySupport: false,
    advancedFeatures: false,
    apiAccess: false,
    teamMembers: 1,
    customBranding: false,
  },
  pro: {
    dailyCalculations: Infinity,
    savedCalculations: 500,
    exportFormats: ['pdf', 'excel', 'csv', 'json'],
    prioritySupport: true,
    advancedFeatures: true,
    apiAccess: false,
    teamMembers: 1,
    customBranding: false,
  },
  business: {
    dailyCalculations: Infinity,
    savedCalculations: Infinity,
    exportFormats: ['pdf', 'excel', 'csv', 'json', 'xml'],
    prioritySupport: true,
    advancedFeatures: true,
    apiAccess: true,
    teamMembers: 10,
    customBranding: true,
  },
};

// Helper functions
export function getTierById(id: TierId): SubscriptionTier | undefined {
  return SUBSCRIPTION_TIERS.find(tier => tier.id === id);
}

export function getTierByName(name: string): SubscriptionTier | undefined {
  return SUBSCRIPTION_TIERS.find(tier => tier.name.toLowerCase() === name.toLowerCase());
}

export function getUsageLimits(tier: TierId): UsageLimits {
  return USAGE_LIMITS[tier] || USAGE_LIMITS.free;
}

export function formatPrice(price: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (price === 0) return 'Free';
  if (currency === 'INR') {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  return `$${price.toFixed(2)}`;
}

export function getSavings(yearlyPrice: number, monthlyPrice: number): number {
  return Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100);
}
