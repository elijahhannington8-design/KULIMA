import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

import { AppError, ConflictError, NotFoundError, ValidationError } from './errors'

/**
 * Translate Prisma errors to user-friendly messages
 */
export function translatePrismaError(error: unknown): AppError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        const target = error.meta?.target as string[] | undefined
        const field = target?.[0] || 'field'
        return new ConflictError(`A record with this ${field} already exists`)

      case 'P2025':
        // Record not found
        return new NotFoundError('Record not found')

      case 'P2003':
        // Foreign key constraint violation
        return new ValidationError('Invalid reference to related record')

      case 'P2014':
        // Required relation violation
        return new ValidationError('Required relation is missing')

      default:
        return new AppError('Database error', 'DATABASE_ERROR', 500, {
          code: error.code,
        })
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError('Invalid data provided to database')
  }

  // Unknown Prisma error
  return new AppError('Database error', 'DATABASE_ERROR', 500)
}

/**
 * Format Zod validation errors
 */
export function formatZodError(error: ZodError): ValidationError {
  const formattedErrors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return new ValidationError('Validation failed', formattedErrors)
}

/**
 * Sanitize error for client response
 * Removes sensitive information like stack traces in production
 */
export function sanitizeError(error: unknown): {
  message: string
  code: string
  statusCode: number
  details?: unknown
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...(error.details && { details: error.details }),
    }
  }

  if (error instanceof ZodError) {
    const validationError = formatZodError(error)
    return {
      message: validationError.message,
      code: validationError.code,
      statusCode: validationError.statusCode,
      details: validationError.details,
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = translatePrismaError(error)
    return {
      message: prismaError.message,
      code: prismaError.code,
      statusCode: prismaError.statusCode,
      details: prismaError.details,
    }
  }

  // Unknown error - don't expose details in production
  if (process.env.NODE_ENV === 'production') {
    return {
      message: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
    }
  }

  // In development, show more details
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
    details: error instanceof Error ? error.stack : undefined,
  }
}
