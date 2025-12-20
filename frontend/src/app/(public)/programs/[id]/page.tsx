'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    rating: number;
    students: number;
    courses: number;
  };
  price: number;
  originalPrice?: number;
  level: string;
  category: string;
  language: string;
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  lastUpdated: string;
  thumbnail: string;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: {
    title: string;
    lectures: {
      title: string;
      type: 'video' | 'quiz' | 'assignment' | 'resource';
      duration?: number;
    }[];
  }[];
  reviews: {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }[];
}

// Mock course data - in real app this would come from API
const mockCourse: Course = {
  id: '1',
  title: 'Complete Web Development Bootcamp',
  description: 'Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and gain the skills employers are looking for. This comprehensive course takes you from beginner to professional developer.',
  instructor: {
    name: 'Sarah Johnson',
    bio: 'Senior Software Engineer at Google with 8+ years of experience. Passionate about teaching and mentoring aspiring developers.',
    avatar: 'SJ',
    rating: 4.9,
    students: 15420,
    courses: 12
  },
  price: 89,
  originalPrice: 199,
  level: 'Beginner to Advanced',
  category: 'Web Development',
  language: 'English',
  duration: '42 hours',
  students: 1247,
  rating: 4.8,
  reviews: 892,
  lastUpdated: 'December 2024',
  thumbnail: '/course1.jpg',
  whatYouLearn: [
    'Build responsive websites with HTML5, CSS3, and JavaScript',
    'Create dynamic web applications with React and Redux',
    'Develop server-side applications with Node.js and Express',
    'Work with databases using MongoDB and Mongoose',
    'Deploy applications to cloud platforms like Heroku and AWS',
    'Implement authentication and security best practices',
    'Use Git for version control and collaboration',
    'Build real-world projects for your portfolio'
  ],
  requirements: [
    'Basic computer skills and internet access',
    'No prior programming experience required',
    'Mac, Windows, or Linux computer',
    'Text editor (we recommend VS Code)'
  ],
  curriculum: [
    {
      title: 'Introduction to Web Development',
      lectures: [
        { title: 'Course Overview and Expectations', type: 'video', duration: 15 },
        { title: 'Setting Up Your Development Environment', type: 'video', duration: 20 },
        { title: 'Introduction to HTML', type: 'video', duration: 25 },
        { title: 'HTML Structure and Semantics', type: 'video', duration: 30 },
        { title: 'HTML Quiz', type: 'quiz' }
      ]
    },
    {
      title: 'CSS Fundamentals',
      lectures: [
        { title: 'Introduction to CSS', type: 'video', duration: 20 },
        { title: 'CSS Selectors and Properties', type: 'video', duration: 35 },
        { title: 'Box Model and Layout', type: 'video', duration: 40 },
        { title: 'Responsive Design with Media Queries', type: 'video', duration: 30 },
        { title: 'CSS Flexbox', type: 'video', duration: 45 },
        { title: 'CSS Grid', type: 'video', duration: 50 }
      ]
    },
    {
      title: 'JavaScript Basics',
      lectures: [
        { title: 'JavaScript Introduction', type: 'video', duration: 25 },
        { title: 'Variables, Data Types, and Operators', type: 'video', duration: 35 },
        { title: 'Functions and Scope', type: 'video', duration: 40 },
        { title: 'Arrays and Objects', type: 'video', duration: 45 },
        { title: 'DOM Manipulation', type: 'video', duration: 50 },
        { title: 'Event Handling', type: 'video', duration: 30 }
      ]
    }
  ],
  reviews: [
    {
      id: '1',
      user: 'Alex Chen',
      avatar: 'AC',
      rating: 5,
      date: '2 weeks ago',
      comment: 'This course completely transformed my career! The instructor explains complex concepts in a way that\'s easy to understand. The projects are practical and helped me build a strong portfolio.',
      helpful: 24
    },
    {
      id: '2',
      user: 'Maria Garcia',
      avatar: 'MG',
      rating: 5,
      date: '1 month ago',
      comment: 'Amazing course! I went from knowing nothing about web development to landing a junior developer job. The curriculum is well-structured and the support from the instructor is outstanding.',
      helpful: 18
    },
    {
      id: '3',
      user: 'David Wilson',
      avatar: 'DW',
      rating: 4,
      date: '2 months ago',
      comment: 'Very comprehensive course covering all the essential topics. Some sections could be updated with newer frameworks, but overall excellent value for money.',
      helpful: 12
    }
  ]
};

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // In real app, fetch course data based on params.id
    setCourse(mockCourse);
  }, [params.id]);

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const handleEnroll = () => {
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    setIsEnrolled(true);
    // In real app, make enrollment API call
    alert('Successfully enrolled in the course!');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Loading course details...</p>
        </div>
      </div>
    );
  }

  const totalLectures = course.curriculum.reduce((sum, section) => sum + section.lectures.length, 0);
  const totalDuration = course.curriculum.reduce((sum, section) =>
    sum + section.lectures.reduce((sectionSum, lecture) => sectionSum + (lecture.duration || 0), 0), 0
  );

  return (
    <div className="min-h-screen bg-app">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted">/</span>
            <Link href="/discover" className="text-muted hover:text-primary transition-colors">
              Courses
            </Link>
            <span className="text-muted">/</span>
            <span className="text-heading font-medium truncate">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Image */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg h-64 flex items-center justify-center">
                <div className="text-6xl opacity-50">📚</div>
              </div>
            </div>

            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-heading mb-2">{course.title}</h1>
                  <p className="text-body text-lg leading-relaxed">{course.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-heading">{course.rating}</span>
                  <span className="text-muted">({course.reviews} reviews)</span>
                </div>
                <div className="text-muted">•</div>
                <span className="text-body">{course.students.toLocaleString()} students</span>
                <div className="text-muted">•</div>
                <span className="text-body">Created by {course.instructor.name}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {course.language}
                </span>
              </div>

              {/* Pricing and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-heading">
                    ${course.price}
                    {course.originalPrice && (
                      <span className="text-lg text-muted line-through ml-2">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <span className="bg-success text-white px-2 py-1 rounded text-sm font-medium">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>

                <Button
                  onClick={handleEnroll}
                  disabled={isEnrolled}
                  size="md"
                >
                  {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Stats */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-body">Duration</span>
                  <span className="font-medium text-heading">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Lectures</span>
                  <span className="font-medium text-heading">{totalLectures}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Language</span>
                  <span className="font-medium text-heading">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Last Updated</span>
                  <span className="font-medium text-heading">{course.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Instructor</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {course.instructor.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-heading">{course.instructor.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span>⭐ {course.instructor.rating}</span>
                    <span>•</span>
                    <span>{course.instructor.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
              <p className="text-body text-sm mb-4">{course.instructor.bio}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  View Profile
                </button>
                <button className="flex-1 border border-secondary text-body px-3 py-2 rounded-lg hover:bg-softPurple transition-colors text-sm font-medium">
                  Message
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Share This Course</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  📘 Facebook
                </button>
                <button className="flex-1 bg-sky-500 text-white px-3 py-2 rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                  🐦 Twitter
                </button>
                <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  📧 Email
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-secondary/20">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'curriculum', name: 'Curriculum' },
                    { id: 'reviews', name: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted hover:text-body hover:border-secondary/50'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What You'll Learn */}
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-heading mb-4">What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-success mt-1">✓</div>
                        <span className="text-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-heading mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="text-primary mt-1">•</div>
                        <span className="text-body">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="bg-card rounded-lg shadow-sm">
                <div className="p-6 border-b border-secondary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-heading">Course Curriculum</h3>
                    <span className="text-muted text-sm">{totalLectures} lectures • {totalDuration} minutes</span>
                  </div>
                </div>

                <div className="divide-y divide-secondary/10">
                  {course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="p-6">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full flex items-center justify-between text-left hover:bg-softPurple/30 p-3 rounded-lg transition-colors"
                      >
                        <div>
                          <h4 className="font-semibold text-heading">Section {sectionIndex + 1}: {section.title}</h4>
                          <p className="text-muted text-sm">{section.lectures.length} lectures</p>
                        </div>
                        <div className="text-muted">
                          {expandedSections.has(sectionIndex) ? '−' : '+'}
                        </div>
                      </button>

                      {expandedSections.has(sectionIndex) && (
                        <div className="mt-4 space-y-2">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className="flex items-center justify-between p-3 bg-softPurple/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {lecture.type === 'video' ? '🎥' :
                                   lecture.type === 'quiz' ? '📝' :
                                   lecture.type === 'assignment' ? '📋' : '📎'}
                                </span>
                                <span className="text-body">{lecture.title}</span>
                              </div>
                              {lecture.duration && (
                                <span className="text-muted text-sm">{lecture.duration} min</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading">Student Reviews</h3>
                      <p className="text-muted">{course.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-heading">{course.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <div className="text-muted text-sm">Course Rating</div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-body w-8">{rating} stars</span>
                        <div className="flex-1 bg-secondary/20 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted w-8">{Math.floor(Math.random() * 200)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {course.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="bg-card rounded-lg shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-heading">{review.user}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <span className="text-muted text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-body mb-4">{review.comment}</p>
                      <div className="flex items-center gap-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-muted hover:text-body text-sm">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="text-center">
                    <button className="text-primary hover:text-primary/80 font-medium">
                      Load More Reviews →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-heading mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: '2',
                title: 'Advanced React Patterns',
                instructor: 'Sarah Johnson',
                price: 79,
                rating: 4.9,
                students: 856,
                level: 'Advanced',
                category: 'Web Development'
              },
              {
                id: '3',
                title: 'Python for Data Science',
                instructor: 'Dr. Michael Chen',
                price: 89,
                rating: 4.7,
                students: 654,
                level: 'Intermediate',
                category: 'Data Science'
              },
              {
                id: '4',
                title: 'UI/UX Design Fundamentals',
                instructor: 'Emma Davis',
                price: 69,
                rating: 4.6,
                students: 432,
                level: 'Beginner',
                category: 'Design'
              }
            ].map((relatedCourse) => (
              <Link key={relatedCourse.id} href={`/programs/${relatedCourse.id}`} className="group">
                <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  {/* Course Image */}
                  <div className="h-40 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors">
                    <div className="text-5xl opacity-50">📚</div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-heading mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-body text-sm mb-2">by {relatedCourse.instructor}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">{relatedCourse.rating}</span>
                        <span className="text-muted text-sm">({relatedCourse.students})</span>
                      </div>
                      <span className="text-secondary font-bold">${relatedCourse.price}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-softPurple text-heading text-xs rounded-full">
                        {relatedCourse.level}
                      </span>
                      <span className="px-2 py-1 bg-softPeach text-heading text-xs rounded-full">
                        {relatedCourse.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
