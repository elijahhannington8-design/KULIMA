import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border bg-white text-neutral-900 
            placeholder:text-neutral-400 
            focus:outline-none focus:ring-2 focus:border-transparent 
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]' 
              : 'border-neutral-300 focus:ring-[rgb(var(--color-primary))]'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[rgb(var(--color-error))]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
