'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

export const InteractiveBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const smoothX = useSpring(pointerX, { stiffness: 130, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 130, damping: 24, mass: 0.35 });
  const gridMask = useMotionTemplate`radial-gradient(360px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 72%)`;
  const glow = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, var(--ambient-glow) 0%, transparent 68%)`;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const hidePointer = () => {
      pointerX.set(-500);
      pointerY.set(-500);
    };

    window.addEventListener('pointermove', movePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', hidePointer);

    return () => {
      window.removeEventListener('pointermove', movePointer);
      document.documentElement.removeEventListener('pointerleave', hidePointer);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div className="interactive-background" aria-hidden="true">
      <div className="interactive-background__base" />
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="interactive-background__glow"
            style={{ backgroundImage: glow }}
          />
          <motion.div
            className="interactive-background__grid"
            style={{ WebkitMaskImage: gridMask, maskImage: gridMask }}
          />
          <motion.div
            className="interactive-background__cursor"
            style={{ x: smoothX, y: smoothY }}
          />
        </>
      )}
    </div>
  );
};
