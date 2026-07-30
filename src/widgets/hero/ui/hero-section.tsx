'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowRight, Code2, Smartphone, ShieldCheck, Cpu } from 'lucide-react';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { useContactModal } from '@/features/contact-modal/model/contact-modal-context';

/* --- 3D Cube config (112px box => faces pushed out by 56px) --- */
const CUBE_HALF = 56;
const CUBE_FACES = [
  { label: 'REACT', transform: `rotateY(0deg) translateZ(${CUBE_HALF}px)`, dark: false },
  { label: 'NEXT.JS', transform: `rotateY(90deg) translateZ(${CUBE_HALF}px)`, dark: true },
  { label: 'SWIFT', transform: `rotateY(180deg) translateZ(${CUBE_HALF}px)`, dark: false },
  { label: 'iOS', transform: `rotateY(-90deg) translateZ(${CUBE_HALF}px)`, dark: true },
  { label: 'A', transform: `rotateX(90deg) translateZ(${CUBE_HALF}px)`, dark: true },
  { label: 'TS', transform: `rotateX(-90deg) translateZ(${CUBE_HALF}px)`, dark: false },
];

const MARQUEE_ITEMS = [
  'REACT',
  'NEXT.JS',
  'TYPESCRIPT',
  'SWIFT',
  'SWIFTUI',
  'TAILWIND CSS',
  'AI AGENTS',
  'MCP',
];

const TechCube: React.FC = () => (
  <div className="preserve-3d" style={{ transform: 'translateZ(60px)' }}>
    <div className="cube-3d relative w-28 h-28">
      {CUBE_FACES.map((face) => (
        <div
          key={face.label}
          className={`cube-face border-2 border-[#111111] font-display-campaign text-xl tracking-tight ${
            face.dark ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'
          }`}
          style={{ transform: face.transform }}
        >
          {face.label}
        </div>
      ))}
    </div>
  </div>
);

interface FloatingChipProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth: number;
  className: string;
  delay?: number;
  children: React.ReactNode;
}

/* Decorative chip with mouse parallax (depth) + infinite float loop */
const FloatingChip: React.FC<FloatingChipProps> = ({
  mouseX,
  mouseY,
  depth,
  className,
  delay = 0,
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const x = useTransform(mouseX, (v) => v * depth);
  const y = useTransform(mouseY, (v) => v * depth);

  return (
    <motion.div style={reducedMotion ? undefined : { x, y }} className={`absolute z-30 pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: reducedMotion ? 0 : 0.55 + delay, duration: reducedMotion ? 0 : undefined }}
      >
        <div className="float-y" style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { openContactModal } = useContactModal();

  /* Scroll-linked parallax (hero scrolls out of view) */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* Scroll-driven kinetic strip (full page scroll) */
  const { scrollYProgress: pageScroll } = useScroll();
  const marqueeX = useTransform(pageScroll, [0, 1], ['1%', '-22%']);

  /* Mouse tilt for the 3D scene */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <FullscreenSection
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white text-[#111111]"
    >
      <Container className="flex-1 flex flex-col justify-center w-full pt-24 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Towering Editorial Campaign Headline & Actions */}
          <motion.div style={reducedMotion ? undefined : { y: headlineY }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              className="space-y-5"
            >
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="blue" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  IT FAKULTETI — 3-KURS TALABASI
                </Badge>
                <Badge variant="purple" icon={<Code2 className="w-3.5 h-3.5" />}>
                  FRONT-END DEVELOPER
                </Badge>
                <Badge variant="orange" icon={<Smartphone className="w-3.5 h-3.5" />}>
                  SWIFT & IOS LEARNER
                </Badge>
              </div>

              {/* Nike Signature Towering Campaign Headline (96px Bebas Neue style) */}
              <div className="space-y-1">
                <h1 className="font-display-campaign font-black leading-[0.9] tracking-tight">
                  <span className="block text-5xl text-[#111111] sm:text-6xl lg:text-7xl xl:text-8xl">
                    ABDULAZIZ
                  </span>
                  <span className="mt-1 block text-2xl font-extrabold text-[#707072] sm:text-3xl lg:text-4xl">
                    FRONT-END & SWIFT iOS ENGINEER
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#39393b] max-w-xl font-normal leading-relaxed">
                O‘zbekistonda yuqori unumdorlikga ega zamonaviy web-ilovalar yaratuvchi <strong className="text-[#111111] font-semibold">Front-end dasturchiman</strong>. Hozirda professional <strong className="text-[#111111] font-semibold">iOS Engineer</strong> darajasiga erishish uchun Swift hamda SwiftUI texnologiyalarini faol o‘rganmoqdaman.
              </p>

              {/* Metrics Bar - Catalog Style */}
              <div className="grid grid-cols-1 gap-3 border-y border-[#e5e5e5] py-3 sm:grid-cols-3 sm:gap-4">
                <div>
                  <span className="block break-words font-display-campaign text-base font-extrabold leading-none text-[#111111] sm:text-lg lg:text-2xl">REACT / NEXT.JS</span>
                  <span className="text-xs text-[#707072] uppercase font-medium">Asosiy Web Stack</span>
                </div>
                <div>
                  <span className="block break-words font-display-campaign text-base font-extrabold leading-none text-[#111111] sm:text-lg lg:text-2xl">SWIFT / SWIFTUI</span>
                  <span className="text-xs text-[#707072] uppercase font-medium">Mobil Maqsad</span>
                </div>
                <div>
                  <span className="block break-words font-display-campaign text-base font-extrabold leading-none text-[#111111] sm:text-lg lg:text-2xl">AI & MCP</span>
                  <span className="text-xs text-[#707072] uppercase font-medium">Agent Vositalari</span>
                </div>
              </div>

              {/* Nike Dual Pill CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={openContactModal}
                  className="uppercase font-bold tracking-wider text-xs"
                >
                  Hamkorlik Taklifi
                </Button>

                <Button
                  href="/about"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4 text-[#111111]" />}
                  className="uppercase font-bold tracking-wider text-xs"
                >
                  Men Haqimda
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Scene — Cube, Floating Chips & Catalog Card */}
          <motion.div
            style={reducedMotion ? undefined : { y: sceneY, rotate: sceneRotate, opacity: sceneOpacity }}
            className="hidden lg:col-span-5 lg:flex lg:justify-center"
          >
            <div className="scene-3d w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.2 }}
                style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* Spinning 3D Tech Cube */}
                <motion.div
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 0, rotate: reducedMotion ? 0 : -16 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16, delay: reducedMotion ? 0 : 0.45, duration: reducedMotion ? 0 : undefined }}
                  className="absolute -top-16 -left-2 sm:-left-8 z-30 preserve-3d pointer-events-none"
                >
                  <TechCube />
                </motion.div>

                {/* Floating Parallax Chips */}
                <FloatingChip
                  mouseX={mouseX}
                  mouseY={mouseY}
                  depth={50}
                  delay={0.2}
                  className="-top-10 -right-1 sm:-right-6"
                >
                  <div className="flex items-center gap-2 bg-[#111111] text-white border-2 border-[#111111] px-3 py-1.5 font-display-campaign text-sm tracking-tight whitespace-nowrap">
                    <Cpu className="w-4 h-4" />
                    AI AGENTS
                  </div>
                </FloatingChip>

                <FloatingChip
                  mouseX={mouseX}
                  mouseY={mouseY}
                  depth={-35}
                  delay={0.9}
                  className="-bottom-7 -left-2 sm:-left-6"
                >
                  <div className="flex items-center gap-2 bg-white text-[#111111] border-2 border-[#111111] px-3 py-1.5 font-display-campaign text-sm tracking-tight whitespace-nowrap">
                    <Smartphone className="w-4 h-4" />
                    SWIFT & SWIFTUI
                  </div>
                </FloatingChip>

                {/* Nike Flat Catalog Card (1:1 Aspect Ratio on Soft Cloud Surface) */}
                <div className="w-full bg-[#f5f5f5] border border-[#e5e5e5] p-8 relative flex flex-col justify-between aspect-square">
                  {/* Promo Tag */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#cacacb]">
                    <span className="inline-block bg-white text-[#111111] px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border border-[#cacacb]">
                      MUTAXASSISLIK KARTASI
                    </span>
                    <span className="text-xs font-mono text-[#707072]">2026 EDITION</span>
                  </div>

                  {/* Center Content Lockup */}
                  <div className="my-auto space-y-4 py-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#707072] uppercase tracking-wider">{'//'} Hozirgi Bosqich</span>
                       <p className="text-xl font-bold text-[#111111]">Front-end Dasturchi</p>
                      <p className="text-xs text-[#4b4b4d]">React • Next.js • TypeScript • Tailwind CSS</p>
                    </div>

                    <div className="h-[1px] bg-[#cacacb] w-full" />

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#d30005] uppercase tracking-wider">{'//'} Mobil Yo‘nalish</span>
                       <p className="text-xl font-bold text-[#111111]">Swift & SwiftUI Learner</p>
                      <p className="text-xs text-[#4b4b4d]">iOS Native Apps • Xcode Architecture</p>
                    </div>

                    <div className="h-[1px] bg-[#cacacb] w-full" />

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#007d48] uppercase tracking-wider">{'//'} Zamonaviy Agentlar</span>
                      <p className="text-xs text-[#111111] font-semibold">OpenCode • Codex • MCP • Linux VPS</p>
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="pt-4 border-t border-[#cacacb] flex items-center justify-between text-xs text-[#111111] font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#007d48]" />
                      Loyihalar va Hamkorlik uchun ochiq
                    </span>
                    <span className="text-[#707072]">Toshkent, UZB</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll-driven Kinetic Strip */}
      <div
        aria-hidden="true"
        className="relative mt-auto overflow-hidden bg-[#111111] text-white border-y-2 border-[#111111] py-3"
      >
        <motion.div
          style={reducedMotion ? undefined : { x: marqueeX }}
          className="flex w-max items-center gap-6 sm:gap-10 whitespace-nowrap font-display-campaign text-xl sm:text-2xl lg:text-3xl tracking-tight"
        >
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-6 sm:gap-10">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="flex items-center gap-6 sm:gap-10">
                  {item}
                  <span className="text-[#707072]">•</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </FullscreenSection>
  );
};
