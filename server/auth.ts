import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { ForbiddenError, UnauthorizedError } from '@/lib/errors'
import type { Role } from '@/types'

/**
 * Get the current session from Supabase Auth
 */
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Get the current user from Supabase Auth
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Require authentication - throws UnauthorizedError if not authenticated
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new UnauthorizedError('You must be logged in to access this resource')
  }
  return user
}

/**
 * Require specific role - throws ForbiddenError if user doesn't have required role
 */
export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth()

  // Get user role from user metadata or database
  const userRole = user.user_metadata?.role as Role | undefined

  if (!userRole || !allowedRoles.includes(userRole)) {
    throw new ForbiddenError('You do not have permission to access this resource')
  }

  return { user, role: userRole }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
