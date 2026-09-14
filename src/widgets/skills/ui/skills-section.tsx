'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/shared/ui/container';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { TechGyroscope } from '@/shared/ui/tech-gyroscope';
import { SkillFilter } from '@/features/skill-filter/ui/skill-filter';
import { PROFILE_DATA, SkillStatus } from '@/entities/profile/model/profile-data';

const STATUS_DOT: Record<SkillStatus, string> = {
  know: 'bg-[#007d48]',
  use: 'bg-[#111111]',
  learning: 'bg-[#707072]',
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  know: 'I KNOW',
  use: 'I USE',
  learning: 'LEARNING',
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const reducedMotion = useReducedMotion();

  const categories = ['All', 'Software', 'AI & Tools'];

  const filteredSkills = PROFILE_DATA.skills.filter((group) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Software') return group.title.includes('Software');
    if (activeCategory === 'AI & Tools') return group.title.includes('AI');
    return true;
  });

  const flatSkills = filteredSkills.flatMap((group) => group.items);
  const statusCounts = (Object.keys(STATUS_LABEL) as SkillStatus[]).map((status) => ({
    status,
    count: flatSkills.filter((skill) => skill.status === status).length,
  }));

  return (
    <FullscreenSection id="skills" className="theme-page bg-white text-[#111111]">
      <Container className="flex-1 flex flex-col justify-center gap-4 lg:gap-5 py-24 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <Badge variant="cyan" className="uppercase tracking-wider text-[11px]">
              TECH STACK
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9] text-[#111111]">
              SKILLS ECOSYSTEM
            </h1>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative border border-[#cacacb] bg-[#f5f5f5] p-2 flex items-center gap-3">
              <TechGyroscope className="h-10 w-10 text-[#111111]" />
              <div className="pr-1">
                <span className="font-mono text-[9px] font-bold text-[#1151ff] block tracking-wider">
                  3D RADAR
                </span>
                <span className="text-[10px] font-bold text-[#111111] uppercase tracking-tight">
                  {activeCategory}
                </span>
              </div>
            </div>
            <p className="max-w-xs text-xs text-[#707072] leading-relaxed font-medium">
              Hands-on skills from HTML/CSS and React to Next.js, React Native (Expo), TypeScript, and AI tools (OpenCode, Codex, MCP).
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.08 }}
        >
          <SkillFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2 lg:gap-4" style={{ perspective: 1200 }}>
          {filteredSkills.map((group, groupIndex) => {
            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : { y: -8, rotateX: 3, rotateY: groupIndex % 2 === 0 ? -3 : 3, scale: 1.018, z: 24 }
                }
                whileTap={reducedMotion ? undefined : { scale: 0.985, z: 8 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : groupIndex * 0.06 }}
                className={`tactile-panel extrusion-edge group relative isolate min-h-[244px] overflow-hidden border border-[#111111] bg-white p-4 sm:p-5 ${
                  filteredSkills.length === 1 ? 'md:col-span-2 md:w-full md:max-w-2xl md:justify-self-center' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Subtle hologram glare on card hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hologram-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: 'translateZ(1px)' }}
                />

                <span aria-hidden="true" className="detail-cross detail-cross--top" />
                <span aria-hidden="true" className="detail-cross detail-cross--bottom" />
                <div className="absolute inset-x-3 bottom-[-7px] -z-10 h-2 border-x border-b border-[#cacacb] bg-[#f5f5f5] transition-transform duration-300 group-hover:translate-y-[7px]" />
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#1151ff] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4 border-b border-[#e5e5e5] pb-3" style={{ transform: 'translateZ(20px)' }}>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1151ff]">
                      0{groupIndex + 1} / {group.items.length} ITEMS
                    </span>
                    <h3 className="font-brand mt-1 text-lg font-bold tracking-[-0.05em] text-[#111111]">
                      {group.title}
                    </h3>
                  </div>
                  <span className="mt-0.5 h-3 w-3 shrink-0 border border-[#111111] bg-[#f5f5f5] group-hover:bg-[#1151ff] transition-colors" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#707072]" style={{ transform: 'translateZ(12px)' }}>
                  {group.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" style={{ transform: 'translateZ(24px)' }}>
                  {group.items.map((skill) => (
                    <motion.li
                      key={skill.name}
                      whileHover={reducedMotion ? undefined : { scale: 1.06, z: 8 }}
                      className="flex items-center gap-1.5 border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#39393b] transition-colors duration-200 group-hover:bg-white shadow-xs"
                    >
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[skill.status]}`} />
                      {skill.name}
                      <span className="sr-only">— {STATUS_LABEL[skill.status]}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.15 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 border-t border-[#e5e5e5] lg:pt-3"
        >
          <span className="text-[11px] font-mono font-bold uppercase text-[#111111]">
            {flatSkills.length} TOOLS
          </span>
          {statusCounts.map(({ status, count }) => (
            <span
              key={status}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707072]"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
              {STATUS_LABEL[status]} — {count}
            </span>
          ))}
        </motion.div>
      </Container>
    </FullscreenSection>
  );
};
