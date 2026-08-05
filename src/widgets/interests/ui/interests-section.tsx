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

export const InterestsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const total = PROFILE_DATA.interests.length;
  const categoryLabels = {
    tech: 'Texnologiya',
    ai: 'Sun’iy intellekt',
    lifestyle: 'Hayot tarzi',
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

  const cardContent = (item: (typeof PROFILE_DATA.interests)[number]) => (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0 opacity-90" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-4">
        <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">{getIcon(item.icon)}</div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#cacacb]">
          {categoryLabels[item.category]}
        </span>
      </div>

      <div className="relative z-10 space-y-4">
        <div>
          <h3 className="text-3xl font-extrabold uppercase font-display-campaign text-white leading-none tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs text-[#cacacb] mt-2 font-medium leading-relaxed">
            {item.description}
          </p>
        </div>

      </div>
    </>
  );

  return (
    <FullscreenSection id="interests" className="bg-white text-[#111111]">
      <Container className="flex-1 flex flex-col justify-center gap-4 lg:gap-6 py-24 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <Badge variant="orange" className="uppercase tracking-wider text-[11px]">
              QIZIQISHLAR VA SHAVQ
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9] text-[#111111]">
              ILHOM MANBAYIM
            </h1>
          </div>
          <p className="hidden lg:block max-w-xs text-xs text-[#707072] leading-relaxed font-medium">
            Faqat kod yozish emas, balki texnologiya, AI agentlar, Linux serverlar hamda sog‘lom turmush tarzini muvozanatda tutish.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
          className="hidden lg:block relative h-[440px] xl:h-[470px] scene-3d"
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
                  x: `${offset * 64}%`,
                  rotateY: offset === 0 ? 0 : offset > 0 ? -50 : 50,
                  z: absOffset === 0 ? 0 : absOffset === 1 ? -180 : -340,
                  opacity: absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.45,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.55,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                style={{ zIndex: 10 - absOffset }}
                className="absolute left-1/2 top-1/2 -mt-[215px] -ml-[150px] w-[300px] h-[430px] bg-[#111111] text-white p-7 flex flex-col justify-between overflow-hidden text-left"
              >
                <button
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`${item.title} kartasini tanlash`}
                  aria-pressed={idx === activeIndex}
                  tabIndex={idx === activeIndex ? 0 : -1}
                  className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                />
                {cardContent(item)}
              </motion.article>
            );
          })}
        </motion.div>

        <div className="hidden lg:flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Oldingi karta"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-[#cacacb] bg-white text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-bold text-[#707072] tracking-widest">
            0{activeIndex + 1} / 0{total}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Keyingi karta"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-[#cacacb] bg-white text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="lg:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2">
          <div className="flex gap-4 w-max">
            {PROFILE_DATA.interests.map((item) => (
              <article
                key={item.id}
                className="snap-center relative bg-[#111111] text-white p-7 flex flex-col justify-between w-[270px] aspect-[4/5] overflow-hidden shrink-0"
              >
                {cardContent(item)}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </FullscreenSection>
  );
};
