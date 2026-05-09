import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md' 
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-soft border border-neutral-200/50 
        ${paddingStyles[padding]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
