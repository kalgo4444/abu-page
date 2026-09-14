'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

export type LiveWallpaperTone = 'light' | 'dark';

interface LiveWallpaperProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  tone?: LiveWallpaperTone;
}

interface BlobSpec {
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  driftX: number;
  driftY: number;
  speed: number;
  phase: number;
  mouseDepth: number;
  scrollDepth: number;
}

interface ParticleSpec {
  x: number;
  y: number;
  size: number;
  speed: number;
  twinkleSpeed: number;
  phase: number;
}

const BLOBS: BlobSpec[] = [
  {
    baseX: 0.22, baseY: 0.28, radius: 0.42,
    color: '17, 81, 255', driftX: 0.06, driftY: 0.05,
    speed: 0.00016, phase: 0.4, mouseDepth: 46, scrollDepth: 0.1,
  },
  {
    baseX: 0.8, baseY: 0.24, radius: 0.38,
    color: '190, 175, 253', driftX: 0.07, driftY: 0.06,
    speed: 0.00012, phase: 2.1, mouseDepth: -62, scrollDepth: 0.16,
  },
  {
    baseX: 0.68, baseY: 0.82, radius: 0.44,
    color: '10, 114, 129', driftX: 0.05, driftY: 0.07,
    speed: 0.0001, phase: 4.2, mouseDepth: 38, scrollDepth: 0.22,
  },
  {
    baseX: 0.16, baseY: 0.78, radius: 0.34,
    color: '237, 26, 160', driftX: 0.08, driftY: 0.05,
    speed: 0.00014, phase: 5.5, mouseDepth: -48, scrollDepth: 0.13,
  },
];

const TONE_PALETTE: Record<LiveWallpaperTone, { peak: number; mid: number; particle: string; particleAlpha: number }> = {
  light: { peak: 0.16, mid: 0.07, particle: '#111111', particleAlpha: 0.16 },
  dark: { peak: 0.32, mid: 0.13, particle: '#ffffff', particleAlpha: 0.24 },
};

const createParticles = (count: number): ParticleSpec[] =>
  Array.from({ length: count }, (_, i) => ({
    x: ((i * 0.61803398875) % 1 + 1) % 1,
    y: ((i * 0.38196601125) % 1 + 1) % 1,
    size: 0.8 + ((i * 7) % 3) * 0.5,
    speed: 0.00002 + ((i * 13) % 5) * 0.000008,
    twinkleSpeed: 0.001 + ((i * 11) % 4) * 0.0006,
    phase: i * 1.7,
  }));

export const LiveWallpaper: React.FC<LiveWallpaperProps> = ({ scrollContainerRef, tone = 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const palette = TONE_PALETTE[tone];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollPx = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothScroll = useSpring(scrollPx, { stiffness: 70, damping: 24, mass: 0.7 });

  const layerNearX = useTransform(smoothX, (v) => v * 56);
  const layerNearY = useTransform([smoothY, smoothScroll], ([my, sp]) => (my as number) * 44 + (sp as number) * -0.08);
  const layerFarX = useTransform(smoothX, (v) => v * -34);
  const layerFarY = useTransform([smoothY, smoothScroll], ([my, sp]) => (my as number) * -28 + (sp as number) * -0.14);
  const gridY = useTransform(smoothScroll, [0, 900], [0, -110]);
  const gridX = useTransform(smoothX, (v) => v * 22);
  const glowOpacity = useTransform(smoothScroll, [0, 700], [1, 0.45]);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const container = scrollContainerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5);
        mouseY.set((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5);
      } else {
        mouseX.set(event.clientX / window.innerWidth - 0.5);
        mouseY.set(event.clientY / window.innerHeight - 0.5);
      }
    };
    const resetPointer = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetPointer);
    return () => {
      window.removeEventListener('pointermove', handlePointer);
      document.documentElement.removeEventListener('pointerleave', resetPointer);
    };
  }, [mouseX, mouseY, reducedMotion, scrollContainerRef]);

  useEffect(() => {
    const readScroll = () => {
      const containerTop = scrollContainerRef.current?.scrollTop ?? 0;
      scrollPx.set(containerTop + window.scrollY);
    };
    readScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('scroll', readScroll, { passive: true });
    return () => {
      container?.removeEventListener('scroll', readScroll);
      window.removeEventListener('scroll', readScroll);
    };
  }, [scrollContainerRef, scrollPx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = createParticles(window.innerWidth < 640 ? 36 : 64);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reducedMotion && !raf) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!document.hidden && visible && !reducedMotion && !raf) {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const draw = (now: number) => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      const mx = mouseX.get();
      const my = mouseY.get();
      const scrolled = scrollPx.get();
      const maxDim = Math.max(width, height);

      for (const blob of BLOBS) {
        const t = now * blob.speed + blob.phase;
        const cx = width * (blob.baseX + Math.sin(t * 1.3) * blob.driftX) + mx * blob.mouseDepth;
        const cy = height * (blob.baseY + Math.cos(t) * blob.driftY) + my * blob.mouseDepth - scrolled * blob.scrollDepth;
        const radius = maxDim * blob.radius;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${blob.color}, ${palette.peak})`);
        gradient.addColorStop(0.55, `rgba(${blob.color}, ${palette.mid})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      }

      ctx.fillStyle = palette.particle;
      for (const particle of particles) {
        const rise = (now * particle.speed + particle.y) % 1;
        const px = particle.x * width + Math.sin(now * 0.0006 + particle.phase) * 14 + mx * 30;
        const py = (1 - rise) * height - scrolled * 0.05;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * particle.twinkleSpeed + particle.phase));
        ctx.globalAlpha = palette.particleAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (reducedMotion) {
      draw(1200);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mouseX, mouseY, palette, reducedMotion, scrollPx]);

  return (
    <div className={`live-wallpaper live-wallpaper--${tone}`} aria-hidden="true">
      <canvas ref={canvasRef} className="live-wallpaper__canvas" />
      {!reducedMotion && (
        <>
          <motion.div
            className="live-wallpaper__orb live-wallpaper__orb--near"
            style={{ x: layerNearX, y: layerNearY, opacity: glowOpacity }}
          />
          <motion.div
            className="live-wallpaper__orb live-wallpaper__orb--far"
            style={{ x: layerFarX, y: layerFarY, opacity: glowOpacity }}
          />
          <motion.div
            className="live-wallpaper__grid"
            style={{ x: gridX, y: gridY }}
          />
        </>
      )}
      <div className="live-wallpaper__vignette" />
    </div>
  );
};
