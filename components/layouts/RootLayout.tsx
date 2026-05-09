import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * RootLayout - Base layout wrapper for all pages
 * Provides consistent structure and styling across the application
 */
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
