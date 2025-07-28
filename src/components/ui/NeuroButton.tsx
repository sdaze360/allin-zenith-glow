import React from 'react';
import { cn } from '@/lib/utils';

interface NeuroButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function NeuroButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
}: NeuroButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg',
  };

  const variantClasses = {
    primary: 'text-primary hover:text-primary-foreground',
    secondary: 'text-secondary hover:text-secondary-foreground',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'neuro-button font-light tracking-wide relative overflow-hidden group',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
    </button>
  );
}