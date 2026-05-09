import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--color-bg-secondary))] to-white">
      {/* Navigation */}
      <nav className="container-app py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-[rgb(var(--color-primary))]">
              KULIMA
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-app space-section">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 text-balance">
            Connecting Farmers Directly to Markets
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto text-balance">
            KULIMA empowers African farmers to sell their produce directly to buyers, 
            eliminating middlemen and maximizing profits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start Selling Today
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Find Fresh Produce
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-app space-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose KULIMA?
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Built for African farmers and buyers, designed for simplicity and impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌾</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Direct Market Access
            </h3>
            <p className="text-neutral-600">
              Connect directly with buyers and eliminate middlemen to maximize your profits
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Mobile-First Design
            </h3>
            <p className="text-neutral-600">
              Optimized for low-end devices and slow internet connections
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Fair Pricing
            </h3>
            <p className="text-neutral-600">
              Real-time market prices and transparent negotiations for fair deals
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Track Your Farm
            </h3>
            <p className="text-neutral-600">
              Manage crop cycles, harvests, and sales all in one place
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔔</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              SMS Notifications
            </h3>
            <p className="text-neutral-600">
              Get instant alerts for offers and market updates via SMS
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card-premium text-center">
            <div className="w-16 h-16 bg-[rgb(var(--color-primary))]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Secure Transactions
            </h3>
            <p className="text-neutral-600">
              Safe and reliable platform for all your agricultural transactions
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container-app space-section bg-white/50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary))] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Create Your Account
            </h3>
            <p className="text-neutral-600 text-sm">
              Sign up as a farmer or buyer in less than 2 minutes
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary))] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              List or Browse Produce
            </h3>
            <p className="text-neutral-600 text-sm">
              Farmers list their crops, buyers browse available produce
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary))] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Connect & Trade
            </h3>
            <p className="text-neutral-600 text-sm">
              Make offers, negotiate, and complete transactions securely
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-app space-section">
        <div className="card-premium text-center max-w-3xl mx-auto shadow-soft-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Join thousands of farmers and buyers already using KULIMA to grow their business
          </p>
          <Link href="/signup">
            <Button variant="primary" size="lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-app py-12 border-t border-neutral-200">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-[rgb(var(--color-primary))] text-2xl mb-4">
              KULIMA
            </h3>
            <p className="text-neutral-600 text-sm">
              Empowering African agriculture through technology
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/features" className="hover:text-neutral-900">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-neutral-900">Pricing</Link></li>
              <li><Link href="/marketplace" className="hover:text-neutral-900">Marketplace</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/about" className="hover:text-neutral-900">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-neutral-900">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/terms" className="hover:text-neutral-900">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-neutral-900">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-600">
          <p>&copy; {new Date().getFullYear()} KULIMA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
