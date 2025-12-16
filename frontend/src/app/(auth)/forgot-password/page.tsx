'use client';

import { useState } from 'react';
import Link from 'next/link';

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
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#5D4037' }}>
            Learn-Up
          </h1>
          <p style={{ color: '#5D4037', opacity: 0.7 }}>
            Reset your password
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="rounded-2xl shadow-xl p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4" style={{ backgroundColor: '#A8E6CF' }}>
                <svg
                  className="h-6 w-6"
                  style={{ color: '#5D4037' }}
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
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#5D4037' }}>
                Check your email
              </h2>
              <p className="mb-6" style={{ color: '#5D4037', opacity: 0.7 }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link
                href="/login"
                className="inline-block w-full py-3 px-4 font-medium rounded-lg transition-colors text-center"
                style={{ 
                  backgroundColor: '#FFB6C1',
                  color: '#5D4037',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD6A5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFB6C1'}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm mb-6" style={{ color: '#5D4037', opacity: 0.7 }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: '#FFB6C1', borderColor: '#FFB6C1' }}>
                  <p className="text-sm" style={{ color: '#5D4037' }}>{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#5D4037' }}>
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
                    className="w-full px-4 py-3 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: '#CDB4DB', 
                      backgroundColor: '#FFFFFF',
                      color: '#5D4037',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FFB6C1'}
                    onBlur={(e) => e.target.style.borderColor = '#CDB4DB'}
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#FFB6C1',
                    color: '#5D4037',
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#FFD6A5')}
                  onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#FFB6C1')}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#5D4037' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              {/* Back to login link */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: '#CDB4DB' }}
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

