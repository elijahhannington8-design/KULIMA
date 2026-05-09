import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

import type { ApiResponse, ApiError } from '@/types/api'

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status: 200 }
  )
}

/**
 * Create an error API response
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  code: string = 'INTERNAL_ERROR',
  details?: unknown
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        ...(details && { details }),
      },
    },
    { status: statusCode }
  )
}

/**
 * Create a validation error response from Zod errors
 */
export function validationErrorResponse(error: ZodError): NextResponse<ApiError> {
  const formattedErrors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: formattedErrors,
      },
    },
    { status: 400 }
  )
}

/**
 * Create an unauthorized error response
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: 'UNAUTHORIZED',
      },
    },
    { status: 401 }
  )
}

/**
 * Create a forbidden error response
 */
export function forbiddenResponse(message: string = 'Forbidden'): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: 'FORBIDDEN',
      },
    },
    { status: 403 }
  )
}

/**
 * Create a not found error response
 */
export function notFoundResponse(
  message: string = 'Resource not found'
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: 'NOT_FOUND',
      },
    },
    { status: 404 }
  )
}
