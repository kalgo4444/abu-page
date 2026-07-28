'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

type ButtonElementProps = BaseProps &
  { href?: never } &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof BaseProps | 'href'>;
type AnchorElementProps = BaseProps &
  { href: string } &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof BaseProps | 'href'>;
export type ButtonProps = ButtonElementProps | AnchorElementProps;

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[#111111] hover:bg-[#222222] text-white active:scale-98 active:opacity-90 shadow-none',
  secondary: 'bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#111111] active:scale-98 shadow-none',
  outline: 'bg-white border border-[#cacacb] text-[#111111] hover:border-[#111111] active:scale-98',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs h-11',
  md: 'px-6 py-2.5 text-sm h-11',
  lg: 'px-8 py-3.5 text-base h-12',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  icon,
  ...props
}: ButtonProps) => {
  const cls = twMerge(clsx(baseStyles, variants[variant], sizes[size], className));
  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    const anchorProps = props as Omit<AnchorElementProps, 'href'>;

    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} className={cls} {...anchorProps}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={cls} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = props as ButtonElementProps;

  return (
    <button type={type} className={cls} {...buttonProps}>
      {content}
    </button>
  );
};
