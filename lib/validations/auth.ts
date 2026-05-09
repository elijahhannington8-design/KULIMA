import { z } from 'zod'

// Register schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['FARMER', 'BUYER', 'ADMIN']),
  phoneNumber: z
    .string()
    .regex(/^\+254\d{9}$/, 'Phone number must be in E.164 format (+254XXXXXXXXX)')
    .optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Update profile schema
export const updateProfileSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+254\d{9}$/, 'Phone number must be in E.164 format (+254XXXXXXXXX)')
    .optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
