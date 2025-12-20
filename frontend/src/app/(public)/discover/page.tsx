'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students: number;
  image: string;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch.',
    instructor: 'John Doe',
    price: 99,
    duration: '40 hours',
    level: 'Beginner',
    category: 'Web Development',
    rating: 4.8,
    students: 1234,
    image: '/course1.jpg'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and machine learning.',
    instructor: 'Jane Smith',
    price: 79,
    duration: '35 hours',
    level: 'Intermediate',
    category: 'Data Science',
    rating: 4.9,
    students: 2156,
    image: '/course2.jpg'
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design.',
    instructor: 'Mike Johnson',
    price: 89,
    duration: '28 hours',
    level: 'Beginner',
    category: 'Design',
    rating: 4.7,
    students: 987,
    image: '/course3.jpg'
  },
  {
    id: '4',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps with React Native.',
    instructor: 'Sarah Wilson',
    price: 119,
    duration: '45 hours',
    level: 'Advanced',
    category: 'Mobile Development',
    rating: 4.6,
    students: 876,
    image: '/course4.jpg'
  },
  {
    id: '5',
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to SEO, social media marketing, and online advertising.',
    instructor: 'David Brown',
    price: 69,
    duration: '32 hours',
    level: 'Intermediate',
    category: 'Marketing',
    rating: 4.5,
    students: 1543,
    image: '/course5.jpg'
  },
  {
    id: '6',
    title: 'DevOps Engineering',
    description: 'Learn CI/CD, Docker, Kubernetes, and cloud deployment.',
    instructor: 'Alex Chen',
    price: 129,
    duration: '50 hours',
    level: 'Advanced',
    category: 'DevOps',
    rating: 4.8,
    students: 654,
    image: '/course6.jpg'
  }
];

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Mobile Development', 'Marketing', 'DevOps'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      default: // popular
        return b.students - a.students;
    }
  });

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-heading mb-4">Discover Courses</h1>
          <p className="text-body text-lg">Find the perfect course to advance your career</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-body font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <span className="text-muted text-sm">{sortedCourses.length} courses found</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map(course => (
            <Link key={course.id} href={`/programs/${course.id}`} className="group">
              <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                {/* Course Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <div className="text-6xl opacity-50">📚</div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-heading line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <span className="text-primary font-bold">${course.price}</span>
                  </div>

                  <p className="text-body text-sm mb-4 line-clamp-3">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted mb-4">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-softPurple text-heading text-xs rounded-full">{course.level}</span>
                      <span className="px-2 py-1 bg-softPeach text-heading text-xs rounded-full">{course.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-muted text-sm">({course.students})</span>
                    </div>
                  </div>

                  <div className="w-full bg-primary text-white py-2 px-4 rounded-lg group-hover:bg-primary/90 transition-colors font-medium text-center">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-heading mb-2">No courses found</h3>
            <p className="text-body">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
