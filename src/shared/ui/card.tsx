'use client';

import React from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={hoverEffect && !reducedMotion ? { y: -2, transition: { duration: 0.15 } } : undefined}
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
