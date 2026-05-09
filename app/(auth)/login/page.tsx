'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Supabase authentication
    console.log('Login attempt:', { email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[rgb(var(--color-bg-secondary))] to-white">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-primary))] mb-2">
            KULIMA
          </h1>
          <p className="text-neutral-600">
            Connecting Farmers to Markets
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-soft-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-neutral-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))] border-neutral-300 rounded"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-neutral-700"
                >
                  Remember me
                </label>
              </div>

              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login (Optional - for future) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="btn btn-secondary text-sm"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.128 20 14.991 20 10c0-5.523-4.477-10-10-10z" />
              </svg>
              Facebook
            </button>
            <button
              type="button"
              className="btn btn-secondary text-sm"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.5 7.5h-2c-.276 0-.5.224-.5.5v1.5h2.5l-.5 2.5H12V17H9.5v-5.5H8V9h1.5V7.5c0-1.381 1.119-2.5 2.5-2.5h2v2.5z" />
              </svg>
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-neutral-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-neutral-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
