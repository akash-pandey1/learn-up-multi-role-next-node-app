'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCourseReviewPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  // Mock course data - in real app this would come from previous steps
  const courseData = {
    title: 'Complete Web Development Bootcamp',
    category: 'Web Development',
    level: 'Beginner',
    language: 'English',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and gain the skills needed for a career in web development.',
    price: 99,
    sections: [
      {
        title: 'Introduction to Web Development',
        lectures: [
          { title: 'Welcome to the Course', type: 'video', duration: 15 },
          { title: 'What is Web Development?', type: 'video', duration: 20 },
          { title: 'Setting Up Your Environment', type: 'resource' }
        ]
      },
      {
        title: 'HTML Fundamentals',
        lectures: [
          { title: 'HTML Structure', type: 'video', duration: 25 },
          { title: 'HTML Elements & Tags', type: 'video', duration: 30 },
          { title: 'HTML Quiz', type: 'quiz' }
        ]
      }
    ]
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsPublishing(false);
    router.push('/tutor/programs?published=true');
  };

  const handleSaveDraft = async () => {
    setIsDraft(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsDraft(false);
    router.push('/tutor/programs?draft=true');
  };

  const totalLectures = courseData.sections.reduce((sum, section) => sum + section.lectures.length, 0);
  const totalDuration = courseData.sections.reduce((sum, section) =>
    sum + section.lectures.reduce((sectionSum, lecture) => sectionSum + (lecture.duration || 0), 0), 0
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted">Step 4 of 4</span>
          <span className="text-sm text-muted">100% complete</span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-heading mb-4">Review Your Course</h1>
        <p className="text-body">Double-check everything before publishing</p>
      </div>

      {/* Course Preview */}
      <div className="bg-card rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-heading mb-6">Course Preview</h2>

        {/* Basic Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-heading mb-4">{courseData.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-softPurple p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-heading">{courseData.category}</div>
              <div className="text-sm text-muted">Category</div>
            </div>
            <div className="bg-softPurple p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-heading">{courseData.level}</div>
              <div className="text-sm text-muted">Level</div>
            </div>
            <div className="bg-softPurple p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-heading">{courseData.language}</div>
              <div className="text-sm text-muted">Language</div>
            </div>
            <div className="bg-softPurple p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-heading">${courseData.price}</div>
              <div className="text-sm text-muted">Price</div>
            </div>
          </div>
          <p className="text-body leading-relaxed">{courseData.description}</p>
        </div>

        {/* Curriculum Overview */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-heading mb-4">Curriculum Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-card border border-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-heading">{courseData.sections.length}</div>
              <div className="text-body text-sm">Sections</div>
            </div>
            <div className="bg-card border border-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-heading">{totalLectures}</div>
              <div className="text-body text-sm">Lectures</div>
            </div>
            <div className="bg-card border border-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-heading">{totalDuration}</div>
              <div className="text-body text-sm">Minutes</div>
            </div>
          </div>

          {/* Sections Preview */}
          <div className="space-y-4">
            {courseData.sections.map((section, index) => (
              <div key={index} className="border border-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold text-heading mb-2">Section {index + 1}: {section.title}</h4>
                <div className="space-y-1">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{lecture.type === 'video' ? '🎥' : lecture.type === 'quiz' ? '📝' : '📄'}</span>
                        <span className="text-body">{lecture.title}</span>
                      </span>
                      {lecture.duration && (
                        <span className="text-muted">{lecture.duration} min</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publishing Checklist */}
        <div className="bg-softPurple p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-heading mb-4">Pre-Publishing Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { item: 'Course title is clear and engaging', checked: true },
              { item: 'Description explains what students will learn', checked: true },
              { item: 'Curriculum is well-organized', checked: true },
              { item: 'Price reflects course value', checked: true },
              { item: 'All lectures have content prepared', checked: false },
              { item: 'Course thumbnail/image added', checked: false },
              { item: 'Prerequisites clearly stated', checked: false },
              { item: 'Learning objectives defined', checked: false }
            ].map((check, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  check.checked ? 'bg-success text-white' : 'bg-secondary/20 text-muted'
                }`}>
                  {check.checked ? '✓' : '○'}
                </div>
                <span className={`text-sm ${check.checked ? 'text-body' : 'text-muted line-through'}`}>
                  {check.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
        >
          ← Back to Edit
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleSaveDraft}
            disabled={isDraft}
            className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium disabled:opacity-50"
          >
            {isDraft ? 'Saving...' : 'Save as Draft'}
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish Course'}
          </button>
        </div>
      </div>

      {/* Publishing Tips */}
      <div className="bg-card rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-heading mb-3">🚀 Publishing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-heading mb-2">Before Publishing:</h4>
            <ul className="text-body text-sm space-y-1">
              <li>• Preview your course as a student</li>
              <li>• Test all videos and resources</li>
              <li>• Write compelling course description</li>
              <li>• Set up course promotions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-heading mb-2">After Publishing:</h4>
            <ul className="text-body text-sm space-y-1">
              <li>• Share on social media</li>
              <li>• Engage with early students</li>
              <li>• Monitor reviews and feedback</li>
              <li>• Plan course updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
