import React from 'react'
import Link from 'next/link'

interface BuyerLayoutProps {
  children: React.ReactNode
}

/**
 * BuyerLayout - Layout for buyer-specific pages
 * Includes buyer navigation and role-specific UI elements
 */
export function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Buyer Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/buyer"
                className="text-xl font-bold text-primary-600"
              >
                Kulima Buyer
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/buyer/marketplace"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Marketplace
              </Link>
              <Link
                href="/buyer/offers"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                My Offers
              </Link>
              <Link
                href="/buyer/purchases"
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Purchases
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
