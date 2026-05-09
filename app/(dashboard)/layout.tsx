'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock user data - will be replaced with actual auth later
  const mockUser = {
    name: 'John Farmer',
    role: 'FARMER',
    avatar: '👨‍🌾',
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Farms', href: '/dashboard/farms', icon: '🌾' },
    { name: 'Listings', href: '/dashboard/listings', icon: '📝' },
    { name: 'Offers', href: '/dashboard/offers', icon: '💰' },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: '🏪' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-2xl font-bold text-[rgb(var(--color-primary))]">
            KULIMA
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-neutral-900/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-neutral-200 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-200">
          <Link href="/dashboard" className="text-2xl font-bold text-[rgb(var(--color-primary))]">
            KULIMA
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-xl">
              {mockUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-neutral-500 capitalize">
                {mockUser.role.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive(item.href)
                  ? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]'
                  : 'text-neutral-700 hover:bg-neutral-100'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-neutral-200 space-y-2">
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </Link>
          <button
            onClick={() => {
              // TODO: Implement logout with Supabase
              console.log('Logout clicked');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar (Desktop) */}
        <header className="hidden lg:block sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">
                  {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--color-error))] rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 lg:pt-0">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
