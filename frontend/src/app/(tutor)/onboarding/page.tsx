'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function OnboardingStartPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      router.push('/tutor/onboarding/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-app flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-4xl font-bold text-heading mb-4">
            Welcome to Learn-Up Instructor Program!
          </h1>
          <p className="text-xl text-body leading-relaxed">
            Join thousands of instructors who are sharing their knowledge and making an impact.
            Let's get you set up to start teaching.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-heading mb-6">What you'll get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-primary text-2xl">💰</div>
              <div className="text-left">
                <h3 className="text-heading font-semibold">Earn Money</h3>
                <p className="text-body text-sm">Get paid for every student who enrolls in your courses</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-secondary text-2xl">🌍</div>
              <div className="text-left">
                <h3 className="text-heading font-semibold">Global Reach</h3>
                <p className="text-body text-sm">Reach students from around the world</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-accent text-2xl">📊</div>
              <div className="text-left">
                <h3 className="text-heading font-semibold">Analytics</h3>
                <p className="text-body text-sm">Track your course performance and student progress</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-highlight text-2xl">🏆</div>
              <div className="text-left">
                <h3 className="text-heading font-semibold">Recognition</h3>
                <p className="text-body text-sm">Build your reputation as an expert in your field</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="bg-card rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-heading mb-6">Onboarding Process</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <span className="text-body text-sm">Profile Setup</span>
            </div>
            <div className="w-8 h-px bg-secondary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <span className="text-body text-sm">Verification</span>
            </div>
            <div className="w-8 h-px bg-secondary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <span className="text-body text-sm">Complete</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          isLoading={isStarting}
          size="lg"
        >
          {isStarting ? 'Starting...' : 'Start Instructor Onboarding'}
        </Button>

        <p className="text-muted text-sm mt-4">
          Takes about 10 minutes to complete
        </p>
      </div>
    </div>
  );
}
