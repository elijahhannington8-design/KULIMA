'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

type UserRole = 'FARMER' | 'BUYER' | null;

export default function SignUpPage() {
  const [role, setRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!role) {
      alert('Please select your role');
      return;
    }
    
    setIsLoading(true);
    
    // TODO: Implement Supabase authentication
    console.log('Sign up attempt:', { email, password, role, phoneNumber });
    
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
            Join the Agricultural Revolution
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="shadow-soft-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Create Account
            </h2>
            <p className="text-neutral-600 text-sm">
              Get started with KULIMA today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('FARMER')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'FARMER'
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🌾</div>
                    <div className="font-medium text-sm">Farmer</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('BUYER')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'BUYER'
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  disabled={isLoading}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏪</div>
                    <div className="font-medium text-sm">Buyer</div>
                  </div>
                </button>
              </div>
            </div>

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
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 700 000 000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

            {/* Confirm Password Input */}
            <div>
              <label 
                htmlFor="confirm-password" 
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))] border-neutral-300 rounded"
              />
              <label 
                htmlFor="terms" 
                className="ml-2 block text-sm text-neutral-700"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-[rgb(var(--color-primary))] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[rgb(var(--color-primary))] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading || !role}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
