'use client';

import React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { GraduationCap, Fingerprint } from 'lucide-react';
import { Container } from '@/shared/ui/container';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { FrontendStackCard } from '@/features/career-path/ui/frontend-stack-card';
import { PROFILE_DATA } from '@/entities/profile/model/profile-data';

const BARCODE_WIDTHS = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 5, 1, 2, 1, 3];

export const AboutSection: React.FC = () => {
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleSceneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSceneMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <FullscreenSection id="about" className="bg-[#111111] text-white">
      <Container className="flex-1 flex flex-col justify-center gap-5 lg:gap-6 py-24 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <Badge variant="purple" className="bg-transparent text-white border-white/40 uppercase tracking-wider text-[11px]">
              MEN HAQIMDA
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9]">
              TA’LIM VA DASTURLASH SAYOHATI
            </h1>
          </div>
          <p className="hidden lg:block max-w-xs text-xs text-white/60 leading-relaxed font-medium">
            O‘zbekistondagi xususiy universitet talabasi sifatida nazariy bilimlar bilan birga amaliy veb-loyihalar ustida doimiy izlanishdaman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
            className="space-y-5"
          >
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {PROFILE_DATA.bio}
            </p>

            <div className="border-t border-white/15">
              <div className="flex items-start justify-between gap-4 py-3 border-b border-white/15">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 pt-0.5">
                  Universitet
                </span>
                <span className="text-sm font-semibold text-white text-right max-w-[65%]">
                  {PROFILE_DATA.education.university}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-3 border-b border-white/15">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 pt-0.5">
                  Yo‘nalish
                </span>
                <span className="text-sm font-semibold text-white text-right">
                  {PROFILE_DATA.education.direction}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 border-b border-white/15">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                  Bosqich
                </span>
                <Badge variant="slate" size="sm" className="bg-white text-[#111111] border-white font-bold">
                  {PROFILE_DATA.education.year}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-white/55 leading-relaxed flex items-start gap-2.5">
              <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-white/70" />
               {PROFILE_DATA.education.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15 }}
            className="scene-3d hidden justify-center py-6 lg:flex"
            onMouseMove={handleSceneMouseMove}
            onMouseLeave={handleSceneMouseLeave}
          >
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-sm"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-white/25"
                style={{ transform: 'rotate(-5deg) translateZ(-50px)' }}
              />

              <div className="relative bg-white text-[#111111] aspect-[8/5] p-5 sm:p-6 flex flex-col justify-between border-2 border-white">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center font-extrabold text-sm tracking-tighter">
                      A
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#707072]">
                      Talaba ID Kartasi
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#707072]">2026</span>
                </div>

                <div className="space-y-1 py-2">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#707072]">
                    {'//'} Software Engineering
                  </span>
                  <span className="block font-display-campaign text-3xl sm:text-4xl uppercase tracking-tight leading-none">
                    ABDULAZIZ
                  </span>
                  <span className="block text-xs font-semibold text-[#4b4b4d]">
                    IT Fakulteti — 3-kurs talabasi
                  </span>
                </div>

                <div className="flex items-end justify-between pt-3 border-t border-[#e5e5e5]">
                  <div className="flex items-stretch gap-[3px] h-6" aria-hidden="true">
                    {BARCODE_WIDTHS.map((width, idx) => (
                      <span
                        key={idx}
                        className="block bg-[#111111] h-full"
                        style={{ width: `${width}px` }}
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                    <Fingerprint className="w-4 h-4" />
                    Toshkent, UZB
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -top-5 -right-2 sm:-right-4 pointer-events-none"
                style={{ transform: 'translateZ(60px)' }}
              >
                <span className="float-y inline-block bg-[#111111] text-white border-2 border-white px-3 py-1.5 font-display-campaign text-xs tracking-tight whitespace-nowrap">
                  FRONT-END
                </span>
              </div>

              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-2 sm:-left-4 pointer-events-none"
                style={{ transform: 'translateZ(45px)' }}
              >
                <span
                  className="float-y inline-block bg-white text-[#111111] border-2 border-[#111111] px-3 py-1.5 font-display-campaign text-xs tracking-tight whitespace-nowrap"
                  style={{ animationDelay: '1.2s' }}
                >
                  FRONT-END
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          id="career"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
        >
          <FrontendStackCard />
        </motion.div>
      </Container>
    </FullscreenSection>
  );
};
