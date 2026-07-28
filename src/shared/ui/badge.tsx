import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'orange' | 'cyan' | 'emerald' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className,
  icon,
}) => {
  const variantStyles = {
    blue: 'bg-[#f5f5f5] text-[#111111] border-[#cacacb]',
    purple: 'bg-[#111111] text-white border-[#111111]',
    orange: 'bg-white text-[#d30005] border-[#d30005]',
    cyan: 'bg-[#f5f5f5] text-[#111111] border-[#e5e5e5]',
    emerald: 'bg-white text-[#007d48] border-[#007d48]',
    slate: 'bg-white text-[#707072] border-[#cacacb]',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase',
    md: 'px-3.5 py-1 text-xs font-medium tracking-normal',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 rounded-full border transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
