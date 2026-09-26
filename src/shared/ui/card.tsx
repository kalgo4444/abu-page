'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={twMerge(
        clsx(
          'bg-white rounded-none border border-[#e5e5e5] p-6 relative overflow-hidden transition-colors hover:border-[#111111]',
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
