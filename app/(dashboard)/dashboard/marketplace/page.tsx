'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock marketplace listings
const mockListings = [
  {
    id: 1,
    farmer: 'Peter Kamau',
    location: 'Kiambu',
    crop: 'Maize',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 50,
    image: '🌽',
    quality: 'Grade A',
    harvestDate: '2024-01-15',
  },
  {
    id: 2,
    farmer: 'Mary Wanjiku',
    location: 'Nakuru',
    crop: 'Beans',
    quantity: 200,
    unit: 'kg',
    pricePerUnit: 120,
    image: '🫘',
    quality: 'Premium',
    harvestDate: '2024-01-10',
  },
  {
    id: 3,
    farmer: 'John Ochieng',
    location: 'Kisumu',
    crop: 'Tomatoes',
    quantity: 300,
    unit: 'kg',
    pricePerUnit: 80,
    image: '🍅',
    quality: 'Grade A',
    harvestDate: '2024-01-18',
  },
  {
    id: 4,
    farmer: 'Grace Muthoni',
    location: 'Meru',
    crop: 'Potatoes',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 45,
    image: '🥔',
    quality: 'Grade B',
    harvestDate: '2024-01-12',
  },
  {
    id: 5,
    farmer: 'David Kipchoge',
    location: 'Eldoret',
    crop: 'Cabbage',
    quantity: 150,
    unit: 'kg',
    pricePerUnit: 35,
    image: '🥬',
    quality: 'Fresh',
    harvestDate: '2024-01-20',
  },
  {
    id: 6,
    farmer: 'Sarah Njeri',
    location: 'Nyeri',
    crop: 'Carrots',
    quantity: 250,
    unit: 'kg',
    pricePerUnit: 60,
    image: '🥕',
    quality: 'Premium',
    harvestDate: '2024-01-16',
  },
];

const cropCategories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Legumes'];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Marketplace
        </h2>
        <p className="text-neutral-600">
          Browse fresh produce from farmers across the region
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search by crop, farmer, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {cropCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          Showing {filteredListings.length} listings
        </p>
        <select className="px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]">
          <option>Sort by: Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Quantity: High to Low</option>
        </select>
      </div>

      {/* Listings Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} padding="none" className="overflow-hidden hover:shadow-soft-lg transition-shadow">
            {/* Image/Icon */}
            <div className="h-48 bg-gradient-to-br from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-accent))]/10 flex items-center justify-center">
              <span className="text-8xl">{listing.image}</span>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {listing.crop}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {listing.farmer} • {listing.location}
                  </p>
                </div>
                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-[rgb(var(--color-success))]/10 text-[rgb(var(--color-success))]">
                  {listing.quality}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Quantity:</span>
                  <span className="font-medium text-neutral-900">
                    {listing.quantity} {listing.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Price:</span>
                  <span className="font-semibold text-[rgb(var(--color-primary))]">
                    KES {listing.pricePerUnit}/{listing.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Harvest:</span>
                  <span className="text-neutral-900">
                    {new Date(listing.harvestDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="p-3 rounded-xl bg-neutral-50 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total Price:</span>
                  <span className="text-xl font-bold text-neutral-900">
                    KES {(listing.quantity * listing.pricePerUnit).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedListing(listing)}
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    // TODO: Implement make offer functionality
                    console.log('Make offer for:', listing.id);
                  }}
                >
                  Make Offer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            No listings found
          </h3>
          <p className="text-neutral-600">
            Try adjusting your search or filters
          </p>
        </Card>
      )}

      {/* Detail Modal (Simple version) */}
      {selectedListing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50"
          onClick={() => setSelectedListing(null)}
        >
          <Card
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-semibold text-neutral-900">
                {selectedListing.crop}
              </h3>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-accent))]/10 rounded-xl flex items-center justify-center">
                <span className="text-9xl">{selectedListing.image}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Farmer</p>
                  <p className="font-medium text-neutral-900">{selectedListing.farmer}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Location</p>
                  <p className="font-medium text-neutral-900">{selectedListing.location}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Quality</p>
                  <p className="font-medium text-neutral-900">{selectedListing.quality}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Harvest Date</p>
                  <p className="font-medium text-neutral-900">
                    {new Date(selectedListing.harvestDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <Button variant="primary" fullWidth size="lg">
                  Make an Offer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
