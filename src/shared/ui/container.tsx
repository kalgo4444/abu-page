import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge(clsx('max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12', className))}>
      {children}
    </div>
  );
};
