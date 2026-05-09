import React from 'react'
import Link from 'next/link'

interface FarmerLayoutProps {
  children: React.ReactNode
}

/**
 * FarmerLayout - Layout for farmer-specific pages
 * Includes farmer navigation and role-specific UI elements
 */
export function FarmerLayout({ children }: FarmerLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Farmer Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/farmer"
                className="text-xl font-bold text-primary-600"
              >
                Kulima Farmer
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/farmer/farms"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                My Farms
              </Link>
              <Link
                href="/farmer/listings"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Listings
              </Link>
              <Link
                href="/farmer/offers"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Offers
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
