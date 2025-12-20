'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    expertise: [] as string[],
    experience: '',
    languages: [] as string[],
    socialLinks: {
      linkedin: '',
      website: '',
      youtube: ''
    }
  });

  const expertiseOptions = [
    'Web Development', 'Data Science', 'Mobile Development', 'Design', 'Marketing',
    'Business', 'Photography', 'Music', 'Writing', 'Language Learning'
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Portuguese'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData as any)[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleExpertiseToggle = (expertise: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.includes(expertise)
        ? formData.expertise.filter(e => e !== expertise)
        : [...formData.expertise, expertise]
    });
  };

  const handleLanguageToggle = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(language)
        ? formData.languages.filter(l => l !== language)
        : [...formData.languages, language]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    router.push('/tutor/onboarding/verification');
  };

  return (
    <div className="min-h-screen bg-app py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted">Step 1 of 3</span>
            <span className="text-sm text-muted">33% complete</span>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-4">Tell us about yourself</h1>
          <p className="text-body">Help students understand your background and expertise</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-8 space-y-8">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-heading mb-2">
              Display Name *
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              placeholder="How you'd like to be known"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-heading mb-2">
              Professional Bio *
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary resize-vertical"
              placeholder="Share your professional background, achievements, and teaching philosophy..."
              required
            />
            <p className="text-muted text-sm mt-1">Tell students why they should learn from you</p>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-heading mb-3">
              Areas of Expertise *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {expertiseOptions.map((expertise) => (
                <button
                  key={expertise}
                  type="button"
                  onClick={() => handleExpertiseToggle(expertise)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    formData.expertise.includes(expertise)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-card text-body border-secondary hover:border-primary'
                  }`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-heading mb-2">
              Years of Teaching Experience
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
            >
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-heading mb-3">
              Languages you can teach in
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {languageOptions.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleLanguageToggle(language)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    formData.languages.includes(language)
                      ? 'bg-secondary text-white border-secondary'
                      : 'bg-card text-body border-secondary hover:border-secondary'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-medium text-heading mb-3">
              Social Links (Optional)
            </label>
            <div className="space-y-3">
              <input
                type="url"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                placeholder="LinkedIn profile URL"
              />
              <input
                type="url"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                placeholder="Personal website or portfolio"
              />
              <input
                type="url"
                name="socialLinks.youtube"
                value={formData.socialLinks.youtube}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                placeholder="YouTube channel URL"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.displayName || !formData.bio || formData.expertise.length === 0}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Continue to Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
