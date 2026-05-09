import { type HTMLAttributes, type ReactNode } from 'react'

type CardVariant = 'default' | 'bordered' | 'elevated'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: ReactNode
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border border-neutral-200',
  bordered: 'bg-white border-2 border-neutral-300',
  elevated: 'bg-white shadow-lg border border-neutral-100',
}

/**
 * Card - Container component for content grouping
 * Supports different visual variants and composable sections
 */
export function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-lg overflow-hidden
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader - Header section of a card
 * Typically contains title and actions
 */
export function CardHeader({
  className = '',
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`border-b border-neutral-200 px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardBody - Main content section of a card
 */
export function CardBody({
  className = '',
  children,
  ...props
}: CardBodyProps) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * CardFooter - Footer section of a card
 * Typically contains actions or metadata
 */
export function CardFooter({
  className = '',
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={`border-t border-neutral-200 px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
