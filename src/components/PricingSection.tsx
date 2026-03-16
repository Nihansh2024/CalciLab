'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Building2, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SUBSCRIPTION_TIERS, getSavings, TierId } from '@/lib/subscription';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PricingSectionProps {
  currentTier?: TierId;
  isAuthenticated?: boolean;
}

export default function PricingSection({ currentTier = 'free', isAuthenticated = false }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { toast } = useToast();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleSelectPlan = async (tier: TierId) => {
    if (tier === 'free') {
      toast({
        title: 'You are on the Free plan',
        description: 'Upgrade to unlock more features!',
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to subscribe to a plan.',
        variant: 'destructive',
      });
      return;
    }

    if (currentTier === tier) {
      toast({
        title: 'Already subscribed',
        description: `You are already on the ${tier} plan.`,
      });
      return;
    }

    if (!razorpayLoaded) {
      toast({
        title: 'Loading payment system',
        description: 'Please wait while we load the payment system.',
      });
      return;
    }

    setLoadingTier(tier);

    try {
      const tierData = SUBSCRIPTION_TIERS.find(t => t.id === tier);
      const amount = isYearly ? tierData?.yearlyPrice : tierData?.price;

      // Create order/subscription from backend
      const response = await fetch('/api/razorpay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, isYearly, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Open Razorpay checkout
      const options: any = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'CalciLab',
        description: `${tierData?.name} Plan (${isYearly ? 'Yearly' : 'Monthly'})`,
        image: '/logo.svg',
        prefill: data.prefill,
        notes: data.notes,
        theme: {
          color: '#7c3aed',
        },
        handler: async (response: any) => {
          // Verify payment on server
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id || data.orderId,
                razorpay_subscription_id: response.razorpay_subscription_id || data.subscriptionId,
                razorpay_signature: response.razorpay_signature,
                tier,
                isYearly,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast({
                title: 'Payment successful!',
                description: 'Your subscription has been activated.',
              });
              // Refresh the page to update subscription status
              window.location.reload();
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast({
              title: 'Verification failed',
              description: 'Please contact support if payment was deducted.',
              variant: 'destructive',
            });
          }
        },
        modal: {
          ondismiss: () => {
            setLoadingTier(null);
          },
        },
      };

      if (data.orderId) {
        options.order_id = data.orderId;
      }

      if (data.subscriptionId) {
        options.subscription_id = data.subscriptionId;
      }

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        toast({
          title: 'Payment failed',
          description: response.error.description || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
        setLoadingTier(null);
      });

      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout failed',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setLoadingTier(null);
    }
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      case 'Crown':
        return <Crown className="h-6 w-6" />;
      case 'Building2':
        return <Building2 className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Choose Your <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Start free and upgrade as you grow. All plans include access to our comprehensive calculator library.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
          />
          <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Yearly
          </Label>
          {isYearly && (
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 ml-2">
              Save up to 17%
            </Badge>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUBSCRIPTION_TIERS.map((tier, index) => {
            const price = isYearly ? tier.yearlyPrice : tier.price;
            const priceUSD = isYearly ? tier.yearlyPriceUSD : tier.priceUSD;
            const savings = tier.price > 0 ? getSavings(tier.yearlyPrice, tier.price) : 0;
            const isCurrentPlan = currentTier === tier.id;
            const isLoading = loadingTier === tier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-1 shadow-lg">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full relative overflow-hidden ${
                    tier.highlighted
                      ? 'border-2 border-violet-500/50 shadow-xl shadow-violet-500/10'
                      : 'border'
                  } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
                >
                  {tier.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5" />
                  )}
                  <CardHeader className="relative pb-2">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                    >
                      {getIcon(tier.icon)}
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {price > 0 && (
                        <p className="text-sm text-muted-foreground">
                          ≈ ${priceUSD.toFixed(2)} USD
                        </p>
                      )}
                    </div>

                    {isYearly && savings > 0 && tier.price > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Save {savings}% with yearly billing
                      </p>
                    )}

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleSelectPlan(tier.id)}
                      disabled={isLoading || isCurrentPlan}
                      className={`w-full ${
                        tier.highlighted
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white'
                          : ''
                      }`}
                      variant={tier.highlighted ? 'default' : 'outline'}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrentPlan ? (
                        'Current Plan'
                      ) : tier.price === 0 ? (
                        'Get Started'
                      ) : (
                        'Subscribe'
                      )}
                    </Button>

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Features
                      </p>
                      <ul className="space-y-2">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Limitations */}
                    {tier.limitations.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          Limitations
                        </p>
                        <ul className="space-y-2">
                          {tier.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <X className="h-4 w-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Secure payments via Razorpay</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Instant access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <span>UPI, Cards, Netbanking</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">Can I cancel my subscription anytime?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Yes! You can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">What payment methods do you accept?</p>
              <p className="text-sm text-muted-foreground mt-1">
                We accept all major credit/debit cards, UPI, net banking, wallets, and other payment methods through Razorpay. All payments are secure and encrypted.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">Can I upgrade or downgrade my plan?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Yes, you can change your plan at any time. When upgrading, you&apos;ll be charged the prorated difference. When downgrading, the credit will be applied to future billing.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">Is there a refund policy?</p>
              <p className="text-sm text-muted-foreground mt-1">
                We offer a 7-day money-back guarantee for all paid plans. If you&apos;re not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
