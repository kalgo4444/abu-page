'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/shared/ui/container';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { SkillFilter } from '@/features/skill-filter/ui/skill-filter';
import { PROFILE_DATA, SkillStatus } from '@/entities/profile/model/profile-data';

const STATUS_DOT: Record<SkillStatus, string> = {
  know: 'bg-[#007d48]',
  use: 'bg-[#111111]',
  learning: 'bg-[#707072]',
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  know: 'BILAMAN',
  use: 'ISHLATAMAN',
  learning: "O'RGANMOQDAMAN",
};

const PANEL_ACCENTS = [
  {
    edge: 'border-[#1151ff]',
    wash: 'group-hover:bg-[#1151ff]',
    text: 'text-[#1151ff]',
    surface: 'bg-[#edf1ff]',
  },
  {
    edge: 'border-[#ed1aa0]',
    wash: 'group-hover:bg-[#ed1aa0]',
    text: 'text-[#b30b70]',
    surface: 'bg-[#fff0f9]',
  },
  {
    edge: 'border-[#0a7281]',
    wash: 'group-hover:bg-[#0a7281]',
    text: 'text-[#0a7281]',
    surface: 'bg-[#e8f6f7]',
  },
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const reducedMotion = useReducedMotion();

  const categories = ['Barchasi', 'Front-End', 'AI & Tools'];

  const filteredSkills = PROFILE_DATA.skills.filter((group) => {
    if (activeCategory === 'Barchasi') return true;
    if (activeCategory === 'Front-End') return group.title.includes('Front-End');
    if (activeCategory === 'AI & Tools') return group.title.includes('AI');
    return true;
  });

  const flatSkills = filteredSkills.flatMap((group) => group.items);
  const statusCounts = (Object.keys(STATUS_LABEL) as SkillStatus[]).map((status) => ({
    status,
    count: flatSkills.filter((skill) => skill.status === status).length,
  }));

  return (
    <FullscreenSection id="skills" className="bg-white text-[#111111]">
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
              TEXNOLOGIYALAR
            </Badge>
            <h1 className="font-display-campaign text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9] text-[#111111]">
              KO‘NIKMALAR EKOTIZIMI
            </h1>
          </div>
          <p className="hidden lg:block max-w-xs text-xs text-[#707072] leading-relaxed font-medium">
            HTML/CSS va React’dan boshlab Next.js, TypeScript hamda AI vositalarigacha (OpenCode, Codex, MCP) amaliy bilimlar.
          </p>
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

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4" style={{ perspective: 1200 }}>
          {filteredSkills.map((group, groupIndex) => {
            const accent = PANEL_ACCENTS[groupIndex % PANEL_ACCENTS.length];
            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reducedMotion ? undefined : { y: -7, rotateX: 3, rotateY: groupIndex % 2 === 0 ? -3 : 3 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : groupIndex * 0.06 }}
                className="group relative isolate min-h-[244px] overflow-hidden border border-[#111111] bg-white p-4 sm:p-5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-x-3 bottom-[-7px] h-2 border-x border-b ${accent.edge} ${accent.surface} -z-10 transition-transform duration-300 group-hover:translate-y-[7px]`} />
                <div className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 ${accent.wash} transition-transform duration-300 group-hover:scale-x-100`} />
                <div className="flex items-start justify-between gap-4 border-b border-[#e5e5e5] pb-3">
                  <div>
                    <span className={`font-brand text-[10px] font-bold uppercase tracking-[0.18em] ${accent.text}`}>
                      0{groupIndex + 1} / {group.items.length} TA
                    </span>
                    <h3 className="font-brand mt-1 text-lg font-bold tracking-[-0.05em] text-[#111111]">
                      {group.title}
                    </h3>
                  </div>
                  <span className={`mt-0.5 h-3 w-3 shrink-0 border ${accent.edge} ${accent.surface} transition-transform duration-300 group-hover:rotate-45`} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#707072]">{group.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-1.5 border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#39393b] transition-colors duration-200 group-hover:bg-white"
                    >
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[skill.status]}`} />
                      {skill.name}
                      <span className="sr-only">— {STATUS_LABEL[skill.status]}</span>
                    </li>
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
            {flatSkills.length} TA VOSITA
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
