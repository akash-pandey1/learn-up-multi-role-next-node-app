'use client';

import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title and Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Welcome to </span>
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">
                  Learn-Up
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Your journey to learning starts here. Explore our courses and enhance your skills with expert instructors.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/discover'}
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/signup'}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Side - Kids Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-[#7C3AED]/20 via-[#EC4899]/20 to-[#F97316]/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍👩‍👧‍👦</div>
                  <p className="text-gray-700 font-medium text-lg">Happy Learners</p>
                  <p className="text-gray-500 text-sm">Join thousands of students worldwide</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#7C3AED] rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#EC4899] rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-[#F97316] rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
