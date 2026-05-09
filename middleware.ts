import { type NextRequest } from 'next/server'

import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  // Protected route groups
  const path = request.nextUrl.pathname

  // Farmer routes - require FARMER role
  if (path.startsWith('/farmer')) {
    if (!user) {
      return Response.redirect(new URL('/login', request.url))
    }
    const role = user.user_metadata?.role
    if (role !== 'FARMER') {
      return Response.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Buyer routes - require BUYER role
  if (path.startsWith('/buyer')) {
    if (!user) {
      return Response.redirect(new URL('/login', request.url))
    }
    const role = user.user_metadata?.role
    if (role !== 'BUYER') {
      return Response.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Admin routes - require ADMIN role
  if (path.startsWith('/admin')) {
    if (!user) {
      return Response.redirect(new URL('/login', request.url))
    }
    const role = user.user_metadata?.role
    if (role !== 'ADMIN') {
      return Response.redirect(new URL('/unauthorized', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
