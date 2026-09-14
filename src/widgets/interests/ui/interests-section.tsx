'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Bot,
  Server,
  Activity,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/shared/ui/container';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { PROFILE_DATA } from '@/entities/profile/model/profile-data';

const Interest3DMotif: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'Globe':
      return (
        <div className="relative w-14 h-14 preserve-3d" aria-hidden="true">
          <span className="vector-orb__ring vector-orb__ring--x !inset-0 !border-white/30" />
          <span className="vector-orb__ring vector-orb__ring--y !inset-0 !border-white/40" />
          <span className="absolute inset-3 rounded-full border border-white/20" />
        </div>
      );
    case 'Bot':
      return (
        <div className="relative w-14 h-14 preserve-3d flex items-center justify-center" aria-hidden="true">
          <div
            className="w-7 h-7 border border-white/40 rotate-45 flex items-center justify-center"
            style={{ transform: 'rotateX(30deg) rotateY(30deg)' }}
          >
            <span className="w-1.5 h-1.5 bg-[#1151ff] rounded-full animate-pulse" />
          </div>
          <span className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full opacity-60" />
          <span className="absolute bottom-2 right-1 w-1 h-1 bg-white rounded-full opacity-60" />
        </div>
      );
    case 'Server':
      return (
        <div className="relative w-14 h-14 preserve-3d flex flex-col justify-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 border border-white/30 bg-white/5 flex items-center justify-between px-1.5"
              style={{ transform: `translateZ(${i * 6}px)` }}
            >
              <span className="w-1 h-1 bg-[#007d48] rounded-full" />
              <div className="flex gap-0.5">
                <span className="w-2 h-[1px] bg-white/40" />
                <span className="w-1.5 h-[1px] bg-white/40" />
              </div>
            </div>
          ))}
        </div>
      );
    case 'Activity':
      return (
        <div className="relative w-14 h-14 preserve-3d flex items-center justify-center" aria-hidden="true">
          <div
            className="w-8 h-8 border border-white/35 rotate-45 flex items-center justify-center"
            style={{ transform: 'rotateZ(45deg)' }}
          >
            <div className="w-4 h-4 border border-[#1151ff]/60" />
          </div>
          <span className="absolute inset-1 rounded-full border border-dashed border-white/20" />
        </div>
      );
    default:
      return (
        <div className="relative w-14 h-14 preserve-3d flex items-center justify-center" aria-hidden="true">
          <div className="w-7 h-7 border border-white/30 rotate-12" />
        </div>
      );
  }
};

export const InterestsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const total = PROFILE_DATA.interests.length;
  const categoryLabels = {
    tech: 'Tech',
    ai: 'AI',
    lifestyle: 'Lifestyle',
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-white" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-white" />;
      case 'Server':
        return <Server className="w-6 h-6 text-white" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-white" />;
      default:
        return <Flame className="w-6 h-6 text-white" />;
    }
  };

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  const cardContent = (item: (typeof PROFILE_DATA.interests)[number], index: number) => (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-8 font-display-campaign text-[9rem] leading-none text-white/[0.04] select-none"
        style={{ transform: 'translateZ(-30px)' }}
      >
        0{index + 1}
      </span>
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-white/10" />

      {/* Subtle specular sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hologram-sheen-dark opacity-30 group-hover:opacity-70 transition-opacity duration-300"
        style={{ transform: 'translateZ(1px)' }}
      />

      <div
        className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="rounded-full border border-white/20 bg-white/10 p-3 shadow-md">{getIcon(item.icon)}</div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#cacacb]">
          {categoryLabels[item.category]}
        </span>
      </div>

      {/* Center 3D Geometric Motif */}
      <div
        aria-hidden="true"
        className="relative z-10 my-auto flex justify-center py-2 pointer-events-none"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Interest3DMotif iconName={item.icon} />
      </div>

      <div className="relative z-10 space-y-3" style={{ transform: 'translateZ(26px)' }}>
        <div>
          <h3 className="text-3xl font-extrabold uppercase font-display-campaign text-white leading-none tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs text-[#cacacb] mt-2 font-medium leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/10">
          <span>FIELD // 0{index + 1}</span>
          <span className="text-white/60">DISCOVER &rarr;</span>
        </div>
      </div>
    </>
  );

  return (
    <FullscreenSection id="interests" className="theme-page bg-white text-[#111111]">
      <Container className="flex-1 flex flex-col justify-center gap-4 lg:gap-5 py-24 lg:py-12 xl:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <Badge variant="orange" className="uppercase tracking-wider text-[11px]">
              INTERESTS & PASSION
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9] text-[#111111]">
              WHAT INSPIRES ME
            </h1>
          </div>
          <p className="hidden lg:block max-w-xs text-xs text-[#707072] leading-relaxed font-medium">
            Not just code — a balance of tech, AI agents, Linux servers, and a healthy life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
          className="hidden lg:block relative h-[min(52svh,560px)] min-h-[400px] scene-3d"
        >
          {PROFILE_DATA.interests.map((item, idx) => {
            let offset = (idx - activeIndex + total) % total;
            if (offset > total / 2) offset -= total;
            const absOffset = Math.abs(offset);
            return (
              <motion.article
                key={item.id}
                initial={false}
                animate={{
                  x: `${offset * 88}%`,
                  rotateY: offset === 0 ? 0 : offset > 0 ? -50 : 50,
                  z: absOffset === 0 ? 0 : absOffset === 1 ? -180 : -340,
                  opacity: absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.45,
                }}
                whileHover={reducedMotion ? undefined : { scale: idx === activeIndex ? 1.04 : 1.02 }}
                whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.55,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                style={{ zIndex: 10 - absOffset, transformStyle: 'preserve-3d' }}
                className="tactile-panel extrusion-edge absolute left-1/2 top-1/2 h-[min(50svh,540px)] min-h-[390px] w-[clamp(300px,25vw,420px)] -translate-x-1/2 -translate-y-1/2 bg-[#111111] text-white p-7 xl:p-8 flex flex-col justify-between overflow-hidden text-left shadow-2xl"
              >
                <span aria-hidden="true" className="detail-cross detail-cross--top detail-cross--inverse" />
                <span aria-hidden="true" className="detail-cross detail-cross--bottom detail-cross--inverse" />
                <button
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Select ${item.title} card`}
                  aria-pressed={idx === activeIndex}
                  tabIndex={idx === activeIndex ? 0 : -1}
                  className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                />
                {cardContent(item, idx)}
              </motion.article>
            );
          })}
        </motion.div>

        <div className="hidden lg:flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous card"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-[#cacacb] bg-white text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span aria-live="polite" className="text-xs font-mono font-bold text-[#707072] tracking-widest">
            0{activeIndex + 1} / 0{total}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next card"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-[#cacacb] bg-white text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2">
          <div className="flex gap-4 w-max">
            {PROFILE_DATA.interests.map((item, index) => (
              <article
                key={item.id}
                className="snap-center relative bg-[#111111] text-white p-7 flex flex-col justify-between w-[270px] aspect-[4/5] overflow-hidden shrink-0 shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {cardContent(item, index)}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </FullscreenSection>
  );
};
