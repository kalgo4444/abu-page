import React from 'react';
import { clsx } from 'clsx';

interface VectorOrbProps {
  className?: string;
  inverted?: boolean;
}

export const VectorOrb: React.FC<VectorOrbProps> = ({ className, inverted = false }) => (
  <div
    aria-hidden="true"
    className={clsx('vector-orb', inverted ? 'text-white' : 'text-[#111111]', className)}
  >
    <span className="vector-orb__ring vector-orb__ring--x" />
    <span className="vector-orb__ring vector-orb__ring--y" />
    <span className="vector-orb__ring vector-orb__ring--z" />
    <span className="vector-orb__axis vector-orb__axis--x" />
    <span className="vector-orb__axis vector-orb__axis--y" />
    <span className="vector-orb__core" />
    <span className="vector-orb__node vector-orb__node--one" />
    <span className="vector-orb__node vector-orb__node--two" />
    <span className="vector-orb__node vector-orb__node--three" />
  </div>
);
