'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Implement forgot password API call
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-heading">
            Learn-Up
          </h1>
          <p className="text-body opacity-80">
            Reset your password
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="rounded-2xl shadow-xl p-8 bg-card">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 bg-success">
                <svg
                  className="h-6 w-6 text-heading"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-heading">
                Check your email
              </h2>
              <p className="mb-6 text-body opacity-80">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Button
                fullWidth
                size="md"
                onClick={() => window.location.href = '/login'}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
            <p className="text-sm mb-6 text-body opacity-80">
              Enter your email address and we'll send you a link to reset your password.
            </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg border bg-softPeach border-secondary">
                  <p className="text-sm text-heading">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-heading">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  fullWidth
                  size="md"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              {/* Back to login link */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-secondary transition-colors hover:opacity-80"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

