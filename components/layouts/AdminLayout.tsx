import React from 'react'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

/**
 * AdminLayout - Layout for admin-specific pages
 * Includes admin navigation and role-specific UI elements
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-xl font-bold text-primary-600"
              >
                Kulima Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/users"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Users
              </Link>
              <Link
                href="/admin/listings"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Listings
              </Link>
              <Link
                href="/admin/market-prices"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Market Prices
              </Link>
              <Link
                href="/admin/reports"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
