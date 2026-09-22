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
import { TechGyroscope } from '@/shared/ui/tech-gyroscope';
import { FrontendStackCard } from '@/widgets/about/ui/frontend-stack-card';
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
              ABOUT ME
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9]">
              STUDY AND CODING JOURNEY
            </h1>
          </div>
          <p className="max-w-md text-xs font-medium leading-relaxed text-white/60 lg:max-w-xs">
            As a student at a private university in Uzbekistan, I mix theory with real web projects and daily practice.
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
                  University
                </span>
                <span className="text-sm font-semibold text-white text-right max-w-[65%]">
                  {PROFILE_DATA.education.university}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-3 border-b border-white/15">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 pt-0.5">
                  Major
                </span>
                <span className="text-sm font-semibold text-white text-right">
                  {PROFILE_DATA.education.direction}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 border-b border-white/15">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                  Level
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
            className="scene-3d flex justify-center py-2 lg:py-6"
            onMouseMove={handleSceneMouseMove}
            onMouseLeave={handleSceneMouseLeave}
          >
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-sm"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-white/25 shadow-2xl"
                style={{ transform: 'rotate(-5deg) translateZ(-50px)' }}
              />

              <motion.div
                whileHover={reducedMotion ? undefined : { scale: 1.035, z: 28 }}
                whileTap={reducedMotion ? undefined : { scale: 0.985, z: 12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="tactile-panel relative bg-white text-[#111111] aspect-[8/5] p-5 sm:p-6 flex flex-col justify-between border-2 border-white shadow-2xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Physical Lanyard Clip at top */}
                <div
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#111111] border border-white/40 flex items-center justify-center z-30"
                  style={{ transform: 'translateZ(34px)' }}
                >
                  <div className="w-6 h-1 bg-white/70 rounded-full" />
                </div>

                {/* Dynamic holographic sheen overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hologram-sheen opacity-40 group-hover:opacity-75 transition-opacity duration-300"
                  style={{ transform: 'translateZ(1px)' }}
                />

                <span aria-hidden="true" className="detail-cross detail-cross--top" />
                <span aria-hidden="true" className="detail-cross detail-cross--bottom" />

                <div
                  className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]"
                  style={{ transform: 'translateZ(26px)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center font-extrabold text-sm tracking-tighter shadow-sm"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      A
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#707072]">
                      Student ID Card
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#707072]">2026</span>
                </div>

                <div className="space-y-1 py-2" style={{ transform: 'translateZ(34px)' }}>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#707072]">
                    {'//'} Software Engineering
                  </span>
                  <span className="block font-display-campaign text-3xl sm:text-4xl uppercase tracking-tight leading-none text-[#111111]">
                    ABDULAZIZ
                  </span>
                  <span className="block text-xs font-semibold text-[#4b4b4d]">
                    IT Faculty — 3rd-year student
                  </span>
                </div>

                <div
                  className="flex items-end justify-between pt-3 border-t border-[#e5e5e5]"
                  style={{ transform: 'translateZ(20px)' }}
                >
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
                    Tashkent, UZB
                  </span>
                </div>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute -top-5 -right-2 hidden pointer-events-none sm:-right-4 lg:block"
                style={{ transform: 'translateZ(60px)' }}
              >
                <span className="float-y inline-block bg-[#111111] text-white border-2 border-white px-3 py-1.5 font-display-campaign text-xs tracking-tight whitespace-nowrap shadow-lg">
                  SOFTWARE ENGINEER
                </span>
              </div>

              <div
                aria-hidden="true"
                className="absolute -bottom-10 -left-8 hidden pointer-events-none lg:block"
                style={{ transform: 'translateZ(74px)' }}
              >
                <TechGyroscope className="h-20 w-20 opacity-80" inverted />
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
