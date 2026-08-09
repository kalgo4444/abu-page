'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Code2, Rocket, Globe2, Compass, Flag } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Container } from '@/shared/ui/container';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { PROFILE_DATA } from '@/entities/profile/model/profile-data';

const STEP_HEIGHTS = ['lg:h-36', 'lg:h-44', 'lg:h-52', 'lg:h-60'];

export const GoalsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PROFILE_DATA.goals[0]?.id ?? '');
  const reducedMotion = useReducedMotion();

  const activeIndex = Math.max(
    PROFILE_DATA.goals.findIndex((goal) => goal.id === activeId),
    0
  );
  const activeGoal = PROFILE_DATA.goals[activeIndex];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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

  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      case 'Globe2':
        return <Globe2 className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      default:
        return <Flag className={className} />;
    }
  };

  return (
    <FullscreenSection id="goals" className="theme-page bg-[#f5f5f5] text-[#111111]">
      <Container className="flex-1 flex flex-col justify-center py-24 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="space-y-3">
              <Badge variant="purple" className="uppercase tracking-wider text-[11px]">
                STRATEGIYA VA KELAJAK
              </Badge>
              <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9]">
                MAQSADLARIM ZINAPOYASI
              </h1>
              <p className="text-xs sm:text-sm text-[#707072] leading-relaxed font-medium max-w-md">
                Front-end yo‘nalishida chuqur mutaxassis bo‘lish, shaxsiy IT mahsulotlar yaratish va global kompaniyalar bilan hamkorlik qilish rejasi. Qadamni tanlang:
              </p>
            </div>

            <div className="border border-[#cacacb] bg-white p-5 sm:p-6 min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGoal.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#e5e5e5]">
                    <Badge variant="blue" size="sm" className="font-bold uppercase text-[10px]">
                      {activeGoal.timeframe}
                    </Badge>
                    <span className="text-[11px] font-mono font-bold text-[#707072] tracking-widest">
                      0{activeIndex + 1} / 0{PROFILE_DATA.goals.length}
                    </span>
                  </div>
                  <h3 className="font-display-campaign text-2xl sm:text-3xl uppercase tracking-tight text-[#111111] leading-none">
                    {activeGoal.title}
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#707072]">
                    {'//'} {activeGoal.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#39393b] leading-relaxed">
                    {activeGoal.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
            className="lg:col-span-7 scene-3d pt-8"
            onMouseMove={handleSceneMouseMove}
            onMouseLeave={handleSceneMouseLeave}
          >
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -top-7 right-1 pointer-events-none"
                style={{ transform: 'translateZ(50px)' }}
              >
                <span className="float-y inline-block bg-[#111111] text-white px-3 py-1.5 font-display-campaign text-xs tracking-tight whitespace-nowrap">
                  KELAJAK REJASI
                </span>
              </div>

              <div className="grid grid-cols-2 lg:flex lg:items-end gap-3 sm:gap-4">
                {PROFILE_DATA.goals.map((goal, idx) => {
                  const isActive = goal.id === activeId;
                  return (
                    <motion.button
                      key={goal.id}
                      type="button"
                      onClick={() => setActiveId(goal.id)}
                      aria-pressed={isActive}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.4,
                        delay: reducedMotion ? 0 : idx * 0.08,
                      }}
                      className={twMerge(
                        clsx(
                          'flex-1 h-28 border p-3 sm:p-4 flex flex-col justify-between text-left transition-colors cursor-pointer',
                          STEP_HEIGHTS[idx],
                          isActive
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-[#111111] border-[#cacacb] hover:border-[#111111]'
                        )
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={twMerge(
                            clsx(
                              'font-display-campaign text-3xl lg:text-5xl leading-none tracking-tight',
                              isActive ? 'text-white' : 'text-[#111111]'
                            )
                          )}
                        >
                          0{idx + 1}
                        </span>
                        {getIcon(
                          goal.icon,
                          twMerge(
                            clsx('w-4 h-4 shrink-0', isActive ? 'text-white/70' : 'text-[#707072]')
                          )
                        )}
                      </div>
                      <span
                        className={twMerge(
                          clsx(
                            'text-[10px] lg:text-[11px] font-bold uppercase tracking-wider leading-tight',
                            isActive ? 'text-white/85' : 'text-[#4b4b4d]'
                          )
                        )}
                      >
                        {goal.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </FullscreenSection>
  );
};
