import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className = '', 
  hover = true 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl p-8 smooth-transition',
        hover && 'hover:scale-105 hover:shadow-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}