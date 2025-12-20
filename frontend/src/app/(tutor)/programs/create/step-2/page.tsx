'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'resource';
  duration?: number; // in minutes
}

export default function CreateCourseStep2Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Introduction to the Course',
      lectures: [
        { id: '1-1', title: 'Welcome and Course Overview', type: 'video', duration: 15 },
        { id: '1-2', title: 'What You\'ll Learn', type: 'video', duration: 10 },
        { id: '1-3', title: 'Course Prerequisites', type: 'resource' }
      ]
    }
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}`,
      lectures: []
    };
    setSections([...sections, newSection]);
  };

  const addLecture = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newLecture: Lecture = {
          id: `${sectionId}-${section.lectures.length + 1}`,
          title: `New Lecture ${section.lectures.length + 1}`,
          type: 'video'
        };
        return {
          ...section,
          lectures: [...section.lectures, newLecture]
        };
      }
      return section;
    }));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, title } : section
    ));
  };

  const updateLecture = (sectionId: string, lectureId: string, updates: Partial<Lecture>) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: section.lectures.map(lecture =>
            lecture.id === lectureId ? { ...lecture, ...updates } : lecture
          )
        };
      }
      return section;
    }));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const deleteLecture = (sectionId: string, lectureId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
        };
      }
      return section;
    }));
  };

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'quiz': return '📝';
      case 'assignment': return '📋';
      case 'resource': return '📎';
      default: return '📄';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push('/tutor/programs/create/step-3');
  };

  const totalLectures = sections.reduce((sum, section) => sum + section.lectures.length, 0);
  const totalDuration = sections.reduce((sum, section) =>
    sum + section.lectures.reduce((sectionSum, lecture) => sectionSum + (lecture.duration || 0), 0), 0
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted">Step 2 of 4</span>
          <span className="text-sm text-muted">50% complete</span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-heading mb-4">Course Curriculum</h1>
        <p className="text-body">Organize your course content into sections and lectures</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-heading">{sections.length}</div>
          <div className="text-body text-sm">Sections</div>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 text-center">
          <div className="text-3xl mb-2">📄</div>
          <div className="text-2xl font-bold text-heading">{totalLectures}</div>
          <div className="text-body text-sm">Lectures</div>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 text-center">
          <div className="text-3xl mb-2">⏰</div>
          <div className="text-2xl font-bold text-heading">{totalDuration}</div>
          <div className="text-body text-sm">Minutes</div>
        </div>
      </div>

      {/* Curriculum Builder */}
      <div className="bg-card rounded-lg shadow-sm p-8">
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="border border-secondary/20 rounded-lg p-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-primary font-bold">Section {sectionIndex + 1}</span>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-secondary rounded-lg bg-card text-heading focus:border-primary"
                    placeholder="Section title"
                  />
                </div>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-muted hover:text-red-500 p-2"
                >
                  🗑️
                </button>
              </div>

              {/* Lectures */}
              <div className="space-y-3">
                {section.lectures.map((lecture, lectureIndex) => (
                  <div key={lecture.id} className="flex items-center space-x-4 p-3 bg-softPurple/50 rounded-lg">
                    <span className="text-2xl">{getLectureIcon(lecture.type)}</span>

                    <input
                      type="text"
                      value={lecture.title}
                      onChange={(e) => updateLecture(section.id, lecture.id, { title: e.target.value })}
                      className="flex-1 px-3 py-2 border border-secondary rounded-lg bg-card text-heading focus:border-primary text-sm"
                      placeholder="Lecture title"
                    />

                    <select
                      value={lecture.type}
                      onChange={(e) => updateLecture(section.id, lecture.id, { type: e.target.value as Lecture['type'] })}
                      className="px-3 py-2 border border-secondary rounded-lg bg-card text-heading focus:border-primary text-sm"
                    >
                      <option value="video">Video</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                      <option value="resource">Resource</option>
                    </select>

                    {lecture.type === 'video' && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={lecture.duration || ''}
                          onChange={(e) => updateLecture(section.id, lecture.id, { duration: parseInt(e.target.value) || 0 })}
                          className="w-20 px-2 py-2 border border-secondary rounded-lg bg-card text-heading focus:border-primary text-sm"
                          placeholder="min"
                          min="1"
                        />
                        <span className="text-muted text-sm">min</span>
                      </div>
                    )}

                    <button
                      onClick={() => deleteLecture(section.id, lecture.id)}
                      className="text-muted hover:text-red-500 p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Add Lecture Button */}
                <button
                  onClick={() => addLecture(section.id)}
                  className="w-full py-3 border-2 border-dashed border-secondary text-body rounded-lg hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  + Add Lecture
                </button>
              </div>
            </div>
          ))}

          {/* Add Section Button */}
          <button
            onClick={addSection}
            className="w-full py-4 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
          >
            + Add New Section
          </button>
        </div>

        {/* Tips */}
        <div className="bg-softPurple p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-heading mb-3">💡 Curriculum Tips</h3>
          <ul className="space-y-2 text-body text-sm">
            <li>• Start with foundational concepts in early sections</li>
            <li>• Mix video lectures with quizzes and assignments for engagement</li>
            <li>• Keep video lectures between 5-15 minutes for optimal attention</li>
            <li>• Include practical exercises and real-world examples</li>
            <li>• End sections with assessments to reinforce learning</li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || sections.length === 0 || totalLectures === 0}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Continue to Pricing'}
        </button>
      </div>
    </div>
  );
}
