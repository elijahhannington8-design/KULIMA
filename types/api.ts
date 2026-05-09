// API response types for the Kulima platform

export type ApiResponse<T = unknown> = {
  success: true
  data: T
  message?: string
}

export type ApiError = {
  success: false
  error: {
    message: string
    code: string
    details?: unknown
  }
}

export type ApiResult<T = unknown> = ApiResponse<T> | ApiError

// Pagination types
export type PaginationParams = {
  page: number
  pageSize: number
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

// API endpoint type helper
export type ApiEndpoint<TInput, TOutput> = {
  input: TInput
  output: TOutput
}
