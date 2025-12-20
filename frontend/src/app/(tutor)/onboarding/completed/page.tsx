'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingCompletedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/tutor/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-app flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="text-4xl">✅</div>
            </div>
            {/* Animated checkmark rings */}
            <div className="absolute inset-0 rounded-full border-4 border-success animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-success animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <h1 className="text-4xl font-bold text-heading mb-4">
            Welcome to the Instructor Community! 🎉
          </h1>
          <p className="text-xl text-body leading-relaxed mb-6">
            Your application has been submitted successfully. Our team will review your information
            and you'll be notified once your account is approved.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-heading mb-2">Application Submitted</h3>
            <p className="text-body text-sm">Your profile and documents are being reviewed</p>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-3">⏳</div>
            <h3 className="text-lg font-semibold text-heading mb-2">Review in Progress</h3>
            <p className="text-body text-sm">Typically takes 1-3 business days</p>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-6">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-heading mb-2">Ready to Teach</h3>
            <p className="text-body text-sm">Start creating courses once approved</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-heading mb-6">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="text-primary font-bold text-lg">1.</div>
              <div>
                <h3 className="text-heading font-semibold">Document Review</h3>
                <p className="text-body text-sm">Our verification team will review your submitted documents for authenticity</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-primary font-bold text-lg">2.</div>
              <div>
                <h3 className="text-heading font-semibold">Profile Approval</h3>
                <p className="text-body text-sm">Once verified, your instructor profile will be activated</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-primary font-bold text-lg">3.</div>
              <div>
                <h3 className="text-heading font-semibold">Start Teaching</h3>
                <p className="text-body text-sm">Create your first course and begin sharing your knowledge</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-primary font-bold text-lg">4.</div>
              <div>
                <h3 className="text-heading font-semibold">Get Paid</h3>
                <p className="text-body text-sm">Earn money from every student enrollment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Early */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">While you wait...</h2>
          <p className="text-lg mb-6 opacity-90">
            You can start preparing your first course content. Here are some tips to get you started:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📝 Plan Your Course</h3>
              <p className="text-sm opacity-90">Outline learning objectives and create a syllabus</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🎥 Prepare Content</h3>
              <p className="text-sm opacity-90">Record high-quality videos and create engaging materials</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💡 Research Topics</h3>
              <p className="text-sm opacity-90">Identify what students want to learn in your field</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📊 Set Pricing</h3>
              <p className="text-sm opacity-90">Research similar courses and set competitive prices</p>
            </div>
          </div>
        </div>

        {/* Redirect Notice */}
        <div className="bg-card rounded-lg shadow-sm p-6">
          <p className="text-body">
            Redirecting to dashboard in <span className="font-bold text-primary">{countdown}</span> seconds...
          </p>
          <button
            onClick={() => router.push('/tutor/dashboard')}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
}
