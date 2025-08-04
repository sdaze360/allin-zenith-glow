import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AppleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function AppleButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: AppleButtonProps) {
  const baseClasses = 'relative overflow-hidden font-medium rounded-full transition-all duration-300 cursor-pointer border';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 backdrop-blur-md text-foreground border-white/20 hover:bg-white/20 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-foreground border-transparent hover:bg-muted/50',
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </motion.button>
  );
}