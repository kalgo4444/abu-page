import React from 'react';
import { clsx } from 'clsx';

interface TechGyroscopeProps {
  className?: string;
  inverted?: boolean;
  activeAxis?: 'x' | 'y' | 'z' | 'all';
}

export const TechGyroscope: React.FC<TechGyroscopeProps> = ({
  className,
  inverted = false,
  activeAxis = 'all',
}) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'tech-gyro relative aspect-square select-none pointer-events-none',
        inverted ? 'text-white' : 'text-[#111111]',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Outer Gyro Ring - Yaw (Z rotation) */}
      <div
        className={clsx(
          'tech-gyro__ring tech-gyro__ring--outer absolute inset-[5%] rounded-full border border-current transition-opacity duration-300',
          activeAxis === 'z' || activeAxis === 'all' ? 'opacity-70' : 'opacity-25'
        )}
        style={{
          borderStyle: 'dashed',
          transform: 'rotateX(72deg) rotateY(15deg)',
        }}
      />

      {/* Primary Pitch Ring (X-Axis) */}
      <div
        className={clsx(
          'tech-gyro__ring tech-gyro__ring--pitch absolute inset-[14%] rounded-full border border-current transition-opacity duration-300',
          activeAxis === 'x' || activeAxis === 'all' ? 'opacity-85' : 'opacity-30'
        )}
        style={{
          transform: 'rotateX(60deg) rotateZ(30deg)',
        }}
      />

      {/* Secondary Roll Ring (Y-Axis) */}
      <div
        className={clsx(
          'tech-gyro__ring tech-gyro__ring--roll absolute inset-[22%] rounded-full border border-current transition-opacity duration-300',
          activeAxis === 'y' || activeAxis === 'all' ? 'opacity-85' : 'opacity-30'
        )}
        style={{
          transform: 'rotateY(65deg) rotateZ(-35deg)',
        }}
      />

      {/* Crosshair Horizontal Axis */}
      <div
        className="absolute left-[8%] top-1/2 w-[84%] -translate-y-1/2 border-t border-current opacity-35"
        style={{ transform: 'rotateZ(25deg) translateZ(4px)' }}
      />

      {/* Crosshair Vertical Axis */}
      <div
        className="absolute top-[8%] left-1/2 h-[84%] -translate-x-1/2 border-l border-current opacity-35"
        style={{ transform: 'rotateZ(25deg) translateZ(-4px)' }}
      />

      {/* Central 3D Octahedral / Diamond Core */}
      <div
        className="tech-gyro__core absolute inset-[38%] border border-current bg-current/15"
        style={{
          transform: 'rotateX(45deg) rotateY(45deg) translateZ(12px)',
        }}
      />

      {/* Orbiting Coordinate Nodes */}
      <span
        className="absolute top-[12%] right-[22%] h-2 w-2 rounded-full border border-current bg-current"
        style={{ transform: 'translateZ(20px)' }}
      />
      <span
        className="absolute bottom-[16%] left-[18%] h-1.5 w-1.5 rounded-full border border-current bg-transparent"
        style={{ transform: 'translateZ(-14px)' }}
      />
      <span
        className="absolute top-[52%] left-[8%] h-1 w-1 bg-current"
        style={{ transform: 'translateZ(10px)' }}
      />
    </div>
  );
};
