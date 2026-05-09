import { type InputHTMLAttributes, forwardRef } from 'react'

type InputVariant = 'default' | 'error' | 'success'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
  label?: string
  error?: string
  helperText?: string
}

const variantStyles: Record<InputVariant, string> = {
  default:
    'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
  error: 'border-error-500 focus:border-error-500 focus:ring-error-500',
  success:
    'border-success-500 focus:border-success-500 focus:ring-success-500',
}

/**
 * Input - Reusable input component with validation states
 * Supports labels, error messages, and helper text
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      label,
      error,
      helperText,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const finalVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            block w-full rounded-lg border px-4 py-2 text-neutral-900
            placeholder-neutral-400 shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500
            ${variantStyles[finalVariant]}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
