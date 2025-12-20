'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            About Learn-Up
          </h1>
          <p className="text-xl text-body max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize education and empower learners worldwide with high-quality,
            accessible courses taught by industry experts.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-heading mb-6">Our Mission</h2>
          <p className="text-body text-lg leading-relaxed mb-6">
            At Learn-Up, we believe that quality education should be accessible to everyone, regardless of their
            background, location, or financial situation. Our platform connects passionate instructors with eager
            learners, creating a vibrant community of knowledge sharing and skill development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-semibold text-heading mb-2">Quality Education</h3>
              <p className="text-body text-sm">Expert-led courses with practical, real-world applications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-heading mb-2">Global Access</h3>
              <p className="text-body text-sm">Learn from anywhere, at your own pace</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-heading mb-2">Innovation</h3>
              <p className="text-body text-sm">Cutting-edge content and teaching methodologies</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-heading mb-6">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-body leading-relaxed mb-4">
                Learn-Up was founded in 2024 by a team of educators and technologists who saw a gap in the
                online learning landscape. Traditional education was often expensive, inflexible, and disconnected
                from industry needs.
              </p>
              <p className="text-body leading-relaxed mb-4">
                We set out to build a platform that would bridge this gap by connecting world-class instructors
                with motivated learners. Today, we're proud to host thousands of courses across dozens of
                categories, serving learners in over 150 countries.
              </p>
              <p className="text-body leading-relaxed">
                Our commitment to excellence drives everything we do, from course quality to platform
                reliability. We're not just another learning platform – we're your partner in lifelong learning.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-heading mb-2">Growing Fast</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-body text-sm">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-body text-sm">Expert Instructors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-body text-sm">Quality Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-body text-sm">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-card rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-heading mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">🎯</div>
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Excellence</h3>
                <p className="text-body">We strive for the highest quality in everything we do, from course content to user experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">🤝</div>
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Community</h3>
                <p className="text-body">We foster a supportive learning community where everyone can thrive and grow together.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">🔓</div>
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Accessibility</h3>
                <p className="text-body">Quality education should be accessible to all, regardless of background or circumstances.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">🚀</div>
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2">Innovation</h3>
                <p className="text-body">We embrace new technologies and teaching methods to enhance the learning experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading mb-6">Meet Our Team</h2>
          <p className="text-body text-lg mb-8">
            Our diverse team brings together expertise in education, technology, and business to create the best learning platform possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">JD</span>
              </div>
              <h3 className="text-lg font-semibold text-heading mb-1">John Doe</h3>
              <p className="text-primary text-sm mb-3">CEO & Co-Founder</p>
              <p className="text-body text-sm">Former educator with 10+ years experience in EdTech</p>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">JS</span>
              </div>
              <h3 className="text-lg font-semibold text-heading mb-1">Jane Smith</h3>
              <p className="text-primary text-sm mb-3">CTO & Co-Founder</p>
              <p className="text-body text-sm">Full-stack developer passionate about scalable solutions</p>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-highlight rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">MJ</span>
              </div>
              <h3 className="text-lg font-semibold text-heading mb-1">Mike Johnson</h3>
              <p className="text-primary text-sm mb-3">Head of Education</p>
              <p className="text-body text-sm">Curriculum designer ensuring course quality and relevance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
