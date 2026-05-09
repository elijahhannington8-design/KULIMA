import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] focus:ring-[rgb(var(--color-primary))] shadow-sm',
    secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:ring-neutral-300',
    outline: 'border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/5 focus:ring-[rgb(var(--color-primary))]',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
