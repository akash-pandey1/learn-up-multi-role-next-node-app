'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { userAPI } from '@/lib/api';
import { saveToken, isAuthenticated } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      // router.push('/');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { email, password } = formData;
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const response = await userAPI.login({ email, password });
      saveToken(response.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
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
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl shadow-xl p-8" style={{ backgroundColor: '#FFFFFF' }}>
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
                value={formData.email}
                onChange={handleChange}
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#5D4037' }}>
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: '#CDB4DB' }}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-colors"
                style={{ 
                  borderColor: '#CDB4DB', 
                  backgroundColor: '#FFFFFF',
                  color: '#5D4037',
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFB6C1'}
                onBlur={(e) => e.target.style.borderColor = '#CDB4DB'}
                placeholder="Enter your password"
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#5D4037', opacity: 0.7 }}>
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium transition-colors hover:opacity-80"
                style={{ color: '#CDB4DB' }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-sm" style={{ color: '#5D4037', opacity: 0.6 }}>
          By continuing, you agree to Learn-Up's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

