'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
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
          <h1 className="text-4xl font-bold mb-2 text-heading">
            Learn-Up
          </h1>
          <p className="text-body opacity-80">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl shadow-xl p-8 bg-card">
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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-heading">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-secondary transition-colors hover:opacity-80"
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
                className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              fullWidth
              size="md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-body opacity-80">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-secondary transition-colors hover:opacity-80"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-sm text-muted">
          By continuing, you agree to Learn-Up's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

