'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCourseStep1Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    language: 'English',
    description: ''
  });

  const categories = [
    'Web Development', 'Data Science', 'Mobile Development', 'Design', 'Marketing',
    'Business', 'Photography', 'Music', 'Writing', 'Language Learning'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push('/tutor/programs/create/step-2');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted">Step 1 of 4</span>
          <span className="text-sm text-muted">25% complete</span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-heading mb-4">Create New Course</h1>
        <p className="text-body">Let's start with the basics. You can always edit these later.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-8 space-y-6">
        {/* Course Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-heading mb-2">
            Course Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
            placeholder="e.g., Complete Web Development Bootcamp"
            required
          />
          <p className="text-muted text-sm mt-1">Make it descriptive and engaging</p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-heading mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Level and Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-heading mb-2">
              Difficulty Level *
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              required
            >
              <option value="">Select level</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-heading mb-2">
              Primary Language *
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              required
            >
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-heading mb-2">
            Course Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary resize-vertical"
            placeholder="Describe what students will learn and why they should take this course..."
            required
          />
          <p className="text-muted text-sm mt-1">Provide a compelling overview (minimum 100 characters)</p>
        </div>

        {/* Course Preview */}
        {formData.title && (
          <div className="bg-softPurple p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-heading mb-3">Preview</h3>
            <div className="space-y-2">
              <h4 className="font-semibold text-heading">{formData.title}</h4>
              <div className="flex items-center gap-4 text-sm text-body">
                <span>📚 {formData.category}</span>
                <span>🎯 {formData.level}</span>
                <span>🌍 {formData.language}</span>
              </div>
              <p className="text-body text-sm">{formData.description}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !formData.title || !formData.category || !formData.level || !formData.description}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Continue to Curriculum'}
          </button>
        </div>
      </form>
    </div>
  );
}
