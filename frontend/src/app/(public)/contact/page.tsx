'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-heading mb-4">Contact Us</h1>
          <p className="text-xl text-body max-w-2xl mx-auto">
            Have questions or need help? We'd love to hear from you. Get in touch and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-heading mb-6">Send us a message</h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg">
                <div className="flex items-center">
                  <div className="text-success mr-3">✅</div>
                  <p className="text-success font-medium">Message sent successfully! We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-heading mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-heading mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-heading mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                fullWidth
                size="md"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-card rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-heading mb-6">Get in touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary text-2xl">📧</div>
                  <div>
                    <h3 className="text-lg font-semibold text-heading mb-1">Email</h3>
                    <p className="text-body">support@learn-up.com</p>
                    <p className="text-muted text-sm">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-primary text-2xl">💬</div>
                  <div>
                    <h3 className="text-lg font-semibold text-heading mb-1">Live Chat</h3>
                    <p className="text-body">Available 9 AM - 6 PM EST</p>
                    <p className="text-muted text-sm">Quick responses for urgent issues</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-primary text-2xl">📱</div>
                  <div>
                    <h3 className="text-lg font-semibold text-heading mb-1">Social Media</h3>
                    <p className="text-body">Follow us for updates and tips</p>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="text-muted hover:text-primary transition-colors">📘</a>
                      <a href="#" className="text-muted hover:text-primary transition-colors">🐦</a>
                      <a href="#" className="text-muted hover:text-primary transition-colors">💼</a>
                      <a href="#" className="text-muted hover:text-primary transition-colors">📷</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-card rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-bold text-heading mb-4">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <details className="group">
                  <summary className="cursor-pointer text-heading font-medium flex items-center justify-between">
                    How do I reset my password?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-body mt-2 pl-4 border-l-2 border-secondary">
                    Click "Forgot Password" on the login page and follow the instructions sent to your email.
                  </p>
                </details>

                <details className="group">
                  <summary className="cursor-pointer text-heading font-medium flex items-center justify-between">
                    Can I get a refund for courses?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-body mt-2 pl-4 border-l-2 border-secondary">
                    We offer a 30-day money-back guarantee for all courses. Contact support for assistance.
                  </p>
                </details>

                <details className="group">
                  <summary className="cursor-pointer text-heading font-medium flex items-center justify-between">
                    How do I access my purchased courses?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-body mt-2 pl-4 border-l-2 border-secondary">
                    After purchase, courses appear in your dashboard under "My Courses" section.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
