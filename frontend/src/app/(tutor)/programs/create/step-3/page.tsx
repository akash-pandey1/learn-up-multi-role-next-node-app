'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCourseStep3Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState({
    price: 99,
    currency: 'USD',
    discountPrice: '',
    enableDiscount: false
  });

  const handlePricingChange = (field: string, value: string | number | boolean) => {
    setPricing({
      ...pricing,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push('/tutor/programs/create/review');
  };

  const suggestedPrices = [
    { amount: 29, label: 'Introductory' },
    { amount: 49, label: 'Basic Course' },
    { amount: 99, label: 'Standard' },
    { amount: 149, label: 'Advanced' },
    { amount: 199, label: 'Premium' }
  ];

  const earnings = {
    revenue: pricing.price * 0.7, // 70% platform fee
    platformFee: pricing.price * 0.3,
    potentialEarnings: pricing.price * 0.7 * 100 // assuming 100 students
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted">Step 3 of 4</span>
          <span className="text-sm text-muted">75% complete</span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-heading mb-4">Pricing & Monetization</h1>
        <p className="text-body">Set your course price and understand your potential earnings</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Pricing Section */}
        <div className="bg-card rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-heading mb-6">Course Pricing</h2>

          {/* Suggested Prices */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-heading mb-3">
              Suggested Price Points
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {suggestedPrices.map(({ amount, label }) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handlePricingChange('price', amount)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    pricing.price === amount
                      ? 'bg-primary text-white border-primary'
                      : 'bg-card text-heading border-secondary hover:border-primary'
                  }`}
                >
                  <div className="font-bold">${amount}</div>
                  <div className="text-xs opacity-80">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Price */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-heading mb-2">
              Custom Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={pricing.price}
              onChange={(e) => handlePricingChange('price', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              min="1"
              max="1000"
              required
            />
            <p className="text-muted text-sm mt-1">Set a price between $1 and $1000</p>
          </div>

          {/* Discount */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableDiscount"
                checked={pricing.enableDiscount}
                onChange={(e) => handlePricingChange('enableDiscount', !pricing.enableDiscount)}
                className="rounded border-secondary text-primary focus:ring-primary"
              />
              <label htmlFor="enableDiscount" className="ml-3 text-heading font-medium">
                Enable promotional pricing
              </label>
            </div>

            {pricing.enableDiscount && (
              <div>
                <label htmlFor="discountPrice" className="block text-sm font-medium text-heading mb-2">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  id="discountPrice"
                  value={pricing.discountPrice}
                  onChange={(e) => handlePricingChange('discountPrice', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                  min="1"
                  max={pricing.price - 1}
                  placeholder={`Max $${pricing.price - 1}`}
                />
                <p className="text-muted text-sm mt-1">Offer a limited-time discount to attract students</p>
              </div>
            )}
          </div>
        </div>

        {/* Earnings Calculator */}
        <div className="bg-card rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-heading mb-6">Earnings Calculator</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">${earnings.revenue.toFixed(2)}</div>
              <div className="text-body text-sm">Your Earnings per Sale</div>
              <div className="text-muted text-xs">70% of course price</div>
            </div>

            <div className="text-center p-4 bg-secondary/10 rounded-lg">
              <div className="text-2xl font-bold text-secondary">${earnings.platformFee.toFixed(2)}</div>
              <div className="text-body text-sm">Platform Fee</div>
              <div className="text-muted text-xs">30% of course price</div>
            </div>

            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">${earnings.potentialEarnings.toFixed(0)}</div>
              <div className="text-body text-sm">Potential with 100 Students</div>
              <div className="text-muted text-xs">Estimated earnings</div>
            </div>
          </div>

          <div className="bg-softPurple p-4 rounded-lg">
            <h3 className="text-heading font-semibold mb-2">💰 Earning Tips</h3>
            <ul className="text-body text-sm space-y-1">
              <li>• Higher-quality courses can command premium prices</li>
              <li>• Special promotions can boost initial enrollment</li>
              <li>• Student referrals increase long-term earnings</li>
              <li>• Regular course updates maintain value</li>
            </ul>
          </div>
        </div>

        {/* Payout Information */}
        <div className="bg-card rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-heading mb-6">Payout Information</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-info text-xl">💳</div>
              <div>
                <h3 className="text-heading font-semibold">Monthly Payouts</h3>
                <p className="text-body text-sm">Earnings are paid monthly on the 15th of each month</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-success text-xl">✅</div>
              <div>
                <h3 className="text-heading font-semibold">Minimum Threshold</h3>
                <p className="text-body text-sm">$50 minimum before payout processing begins</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-primary text-xl">🏦</div>
              <div>
                <h3 className="text-heading font-semibold">Payment Methods</h3>
                <p className="text-body text-sm">PayPal, Bank Transfer, and Stripe available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Review & Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
