'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock data - will be replaced with API calls later
const mockStats = {
  totalFarms: 3,
  activeListings: 12,
  pendingOffers: 5,
  totalRevenue: 45000,
};

const mockRecentListings = [
  { id: 1, crop: 'Maize', quantity: '500 kg', price: 'KES 50/kg', status: 'active' },
  { id: 2, crop: 'Beans', quantity: '200 kg', price: 'KES 120/kg', status: 'active' },
  { id: 3, crop: 'Tomatoes', quantity: '300 kg', price: 'KES 80/kg', status: 'sold' },
];

const mockRecentOffers = [
  { id: 1, buyer: 'ABC Traders', crop: 'Maize', amount: 'KES 24,000', status: 'pending' },
  { id: 2, buyer: 'Fresh Market Ltd', crop: 'Beans', amount: 'KES 22,000', status: 'pending' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card-premium">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-1">
              Welcome back, John! 👋
            </h2>
            <p className="text-neutral-600">
              Here's what's happening with your farm today
            </p>
          </div>
          <Link href="/dashboard/listings/new" className="mt-4 sm:mt-0">
            <Button variant="primary">
              + New Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Farms</p>
              <p className="text-3xl font-bold text-neutral-900">{mockStats.totalFarms}</p>
            </div>
            <div className="w-12 h-12 bg-[rgb(var(--color-primary))]/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-[rgb(var(--color-success))]">↑ 12%</span>
            <span className="text-neutral-500 ml-2">from last month</span>
          </div>
        </Card>

        {/* Stat Card 2 */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Active Listings</p>
              <p className="text-3xl font-bold text-neutral-900">{mockStats.activeListings}</p>
            </div>
            <div className="w-12 h-12 bg-[rgb(var(--color-accent))]/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-[rgb(var(--color-success))]">↑ 8%</span>
            <span className="text-neutral-500 ml-2">from last week</span>
          </div>
        </Card>

        {/* Stat Card 3 */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Pending Offers</p>
              <p className="text-3xl font-bold text-neutral-900">{mockStats.pendingOffers}</p>
            </div>
            <div className="w-12 h-12 bg-[rgb(var(--color-info))]/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-neutral-500">Requires action</span>
          </div>
        </Card>

        {/* Stat Card 4 */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-neutral-900">
                KES {mockStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-[rgb(var(--color-success))]/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-[rgb(var(--color-success))]">↑ 23%</span>
            <span className="text-neutral-500 ml-2">from last month</span>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Recent Listings
            </h3>
            <Link href="/dashboard/listings" className="text-sm text-[rgb(var(--color-primary))] hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {mockRecentListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{listing.crop}</p>
                  <p className="text-sm text-neutral-600">
                    {listing.quantity} • {listing.price}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'active'
                      ? 'bg-[rgb(var(--color-success))]/10 text-[rgb(var(--color-success))]'
                      : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Offers */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Recent Offers
            </h3>
            <Link href="/dashboard/offers" className="text-sm text-[rgb(var(--color-primary))] hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {mockRecentOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-neutral-900">{offer.buyer}</p>
                    <p className="text-sm text-neutral-600">{offer.crop}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--color-warning))]/10 text-[rgb(var(--color-warning))]">
                    {offer.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-neutral-900">{offer.amount}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                    <Button variant="primary" size="sm">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/dashboard/listings/new"
            className="p-4 rounded-xl border-2 border-neutral-200 hover:border-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 transition-all text-center"
          >
            <div className="text-3xl mb-2">📝</div>
            <p className="text-sm font-medium text-neutral-900">New Listing</p>
          </Link>
          <Link
            href="/dashboard/farms/new"
            className="p-4 rounded-xl border-2 border-neutral-200 hover:border-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 transition-all text-center"
          >
            <div className="text-3xl mb-2">🌾</div>
            <p className="text-sm font-medium text-neutral-900">Add Farm</p>
          </Link>
          <Link
            href="/dashboard/marketplace"
            className="p-4 rounded-xl border-2 border-neutral-200 hover:border-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 transition-all text-center"
          >
            <div className="text-3xl mb-2">🏪</div>
            <p className="text-sm font-medium text-neutral-900">Browse Market</p>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="p-4 rounded-xl border-2 border-neutral-200 hover:border-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 transition-all text-center"
          >
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm font-medium text-neutral-900">View Analytics</p>
          </Link>
        </div>
      </Card>
    </div>
  );
}
