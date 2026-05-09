import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kulima Platform',
  description: 'Enterprise agriculture platform for East Africa',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 antialiased">{children}</body>
    </html>
  )
}
