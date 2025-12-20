'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'review';
  students: number;
  rating: number;
  revenue: number;
  lastUpdated: string;
  thumbnail: string;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    status: 'published',
    students: 1247,
    rating: 4.8,
    revenue: 37410,
    lastUpdated: '2024-01-15',
    thumbnail: '/course1.jpg'
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    status: 'published',
    students: 856,
    rating: 4.9,
    revenue: 25680,
    lastUpdated: '2024-01-10',
    thumbnail: '/course2.jpg'
  },
  {
    id: '3',
    title: 'Python for Data Science',
    status: 'review',
    students: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: '2024-01-20',
    thumbnail: '/course3.jpg'
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    status: 'draft',
    students: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: '2024-01-18',
    thumbnail: '/course4.jpg'
  }
];

export default function ProgramsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course => {
    const matchesFilter = filter === 'all' || course.status === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success text-white';
      case 'review': return 'bg-accent text-white';
      case 'draft': return 'bg-muted text-heading';
      default: return 'bg-muted text-heading';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Published';
      case 'review': return 'In Review';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading mb-2">My Programs</h1>
          <p className="text-body">Manage your courses and track performance</p>
        </div>
        <Link
          href="/tutor/programs/create/step-1"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center space-x-2"
        >
          <span>+</span>
          <span>Create New Course</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-heading">{mockCourses.length}</p>
            </div>
            <div className="text-2xl">📚</div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Published</p>
              <p className="text-2xl font-bold text-heading">
                {mockCourses.filter(c => c.status === 'published').length}
              </p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Total Students</p>
              <p className="text-2xl font-bold text-heading">
                {mockCourses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-heading">
                ${mockCourses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'published', label: 'Published' },
              { key: 'review', label: 'In Review' },
              { key: 'draft', label: 'Drafts' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === key
                    ? 'bg-primary text-white'
                    : 'bg-softPurple text-heading hover:bg-softPurple/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-card border border-secondary/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-4xl opacity-50">📚</div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-heading line-clamp-2">{course.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {getStatusText(course.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Students:</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Rating:</span>
                      <span className="font-medium">⭐ {course.rating}</span>
                    </div>
                  )}
                  {course.revenue > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Revenue:</span>
                      <span className="font-medium">${course.revenue.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Updated:</span>
                    <span className="font-medium">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/tutor/programs/${course.id}/edit`}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium text-sm"
                  >
                    Edit
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-heading mb-2">
              {searchTerm ? 'No courses found' : 'No courses yet'}
            </h3>
            <p className="text-body mb-6">
              {searchTerm
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first course to get started'
              }
            </p>
            {!searchTerm && (
              <Link
                href="/tutor/programs/create/step-1"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <span>+</span>
                <span>Create Your First Course</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
