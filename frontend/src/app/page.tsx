'use client';

import Button from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title and Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">One Place to Discover, Book & Track </span>
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">
                  Kids Activities
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover amazing activities for your kids, book instantly, and track their progress all in one convenient platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/discover'}
              >
                Explore Activities
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

          {/* Right Side - Image Carousel */}
          <div className="relative">
            <Carousel
              images={[
                '/images/home/carosel/dance.jpg',
                '/images/home/carosel/paint.jpg',
                '/images/home/carosel/arts.jpg',
                '/images/home/carosel/salsa.jpg'
              ]}
              interval={2000}
              className="w-full max-w-md"
            />

            {/* Floating text overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🎨</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Creative Activities</p>
                  <p className="text-gray-600 text-sm">For every child</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Outstanding Interactive Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Outstanding <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">Interactive Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make learning fun and engaging for kids everywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Personalized Learning',
                description: 'AI-powered recommendations tailored to your child\'s interests and learning pace.'
              },
              {
                icon: '🎮',
                title: 'Gamified Experience',
                description: 'Turn learning into play with interactive games, challenges, and rewards system.'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Real-time insights into your child\'s development and learning milestones.'
              },
              {
                icon: '👥',
                title: 'Social Learning',
                description: 'Connect with other families and share experiences in our community.'
              },
              {
                icon: '📱',
                title: 'Mobile Learning',
                description: 'Learn anytime, anywhere with our mobile-first responsive design.'
              },
              {
                icon: '🏆',
                title: 'Achievement System',
                description: 'Celebrate learning successes with badges, certificates, and rewards.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">Activities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of kids in these highly-rated and loved activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'STEM Science Lab',
                image: '🔬',
                rating: 4.9,
                students: '2.1k',
                price: '$29',
                category: 'Science'
              },
              {
                title: 'Art & Creativity',
                image: '🎨',
                rating: 4.8,
                students: '1.8k',
                price: '$25',
                category: 'Arts'
              },
              {
                title: 'Music & Rhythm',
                image: '🎵',
                rating: 4.9,
                students: '1.5k',
                price: '$35',
                category: 'Music'
              },
              {
                title: 'Sports & Fitness',
                image: '⚽',
                rating: 4.7,
                students: '2.3k',
                price: '$40',
                category: 'Sports'
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {course.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.students} enrolled</span>
                    <span className="font-bold text-purple-600">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/discover'}
            >
              View All Activities
            </Button>
          </div>
        </div>
      </section>

      {/* What Parents Say About Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What <span className="bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">Parents Say</span> About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from real parents about how our platform has transformed their children's learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'California, USA',
                avatar: 'SJ',
                rating: 5,
                testimonial: '"My daughter was struggling with math, but the interactive activities made learning fun. She\'s now excited about numbers and even helps me with calculations!"',
                childAge: '8 years old'
              },
              {
                name: 'Michael Chen',
                location: 'Texas, USA',
                avatar: 'MC',
                rating: 5,
                testimonial: '"The personalized learning approach is incredible. My son gets activities tailored to his interests, and we can track his progress in real-time. Highly recommended!"',
                childAge: '10 years old'
              },
              {
                name: 'Emma Rodriguez',
                location: 'Florida, USA',
                avatar: 'ER',
                rating: 5,
                testimonial: '"As a working parent, I love how easy it is to find quality activities. The booking system is seamless, and the progress reports keep me informed."',
                childAge: '6 years old'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>

                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-600 font-medium">Parent of a {testimonial.childAge}</span>
                  <span className="text-gray-500">Verified Review</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Thousands of Happy Families</h3>
              <p className="text-gray-600 mb-6">
                Start your child's learning journey today with our comprehensive platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/signup'}
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
