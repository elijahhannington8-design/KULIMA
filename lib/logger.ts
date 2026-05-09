/**
 * Structured logging utility for production-grade logging
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export type LogContext = {
  userId?: string
  requestId?: string
  path?: string
  method?: string
  duration?: number
  [key: string]: unknown
}

/**
 * Log a message with structured context
 */
export function log(level: LogLevel, message: string, context?: LogContext): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    ...context,
    environment: process.env.NODE_ENV,
  }

  if (process.env.NODE_ENV === 'production') {
    // JSON format for log aggregation services (Datadog, LogRocket, Sentry)
    console.log(JSON.stringify(logEntry))
  } else {
    // Human-readable format for development
    const contextStr = context ? ` ${JSON.stringify(context)}` : ''
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`)
  }
}

/**
 * Log info message
 */
export function logInfo(message: string, context?: LogContext): void {
  log('info', message, context)
}

/**
 * Log warning message
 */
export function logWarn(message: string, context?: LogContext): void {
  log('warn', message, context)
}

/**
 * Log error message
 */
export function logError(message: string, context?: LogContext): void {
  log('error', message, context)
}

/**
 * Log debug message
 */
export function logDebug(message: string, context?: LogContext): void {
  if (process.env.NODE_ENV === 'development') {
    log('debug', message, context)
  }
}

/**
 * Log API request
 */
export function logRequest(
  method: string,
  path: string,
  context?: Omit<LogContext, 'method' | 'path'>
): void {
  logInfo('API Request', { method, path, ...context })
}

/**
 * Log API response
 */
export function logResponse(
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  context?: Omit<LogContext, 'method' | 'path' | 'duration'>
): void {
  logInfo('API Response', { method, path, statusCode, duration, ...context })
}
