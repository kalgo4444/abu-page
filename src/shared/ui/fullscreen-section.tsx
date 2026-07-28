import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FullscreenSectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const FullscreenSection = React.forwardRef<HTMLElement, FullscreenSectionProps>(
  ({ id, children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={twMerge(
          clsx('relative min-h-svh lg:h-svh overflow-x-clip lg:overflow-y-auto flex flex-col', className)
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

FullscreenSection.displayName = 'FullscreenSection';
