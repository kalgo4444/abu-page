'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

const STACK_LAYERS = [
  { id: '01', title: 'UI & INTERACTION', tech: 'React • React Native (Expo) • Tailwind CSS', color: '#1151ff' },
  { id: '02', title: 'CORE ARCHITECTURE', tech: 'Next.js App Router • TypeScript', color: '#111111' },
  { id: '03', title: 'DATA & AI AGENTS', tech: 'REST APIs • MCP • Upstash Redis', color: '#007d48' },
];

export const FrontendStackCard: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <Card className="p-4 sm:p-6 rounded-none bg-[#f5f5f5] border-[#cacacb]">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
        <div>
          <Badge variant="blue" icon={<Sparkles className="w-3.5 h-3.5" />} className="mb-2 text-[10px] font-bold uppercase">
            SOFTWARE ENGINEERING
          </Badge>
          <h3 className="mb-2 font-display-campaign text-xl font-extrabold uppercase text-[#111111] sm:text-2xl">
            MODERN WEB & MOBILE UI
          </h3>
          <p className="mb-3 text-xs leading-relaxed text-[#39393b]">
            I build fast, responsive web and mobile apps with React, Next.js, React Native (Expo), TypeScript, and Tailwind CSS.
          </p>
          <ul className="space-y-1.5">
            {[
              'Next.js App Router and Server Components',
              'Mobile apps with React Native (Expo)',
              'Solid code with TypeScript',
              'Responsive UX and clean design system',
              'REST API and backend integration',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#007d48]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="scene-3d flex flex-col justify-center">
          <motion.div
            whileHover={reducedMotion ? undefined : { rotateX: 8, rotateY: -12, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            className="group relative border border-[#cacacb] bg-white p-4 font-mono text-[10px] text-[#111111] shadow-sm overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hologram-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div
              className="mb-3 flex items-center justify-between border-b border-[#cacacb] pb-2 text-[#707072]"
              style={{ transform: 'translateZ(18px)' }}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#1151ff]" />
                <span className="font-bold text-[#111111]">{'//'} 3D Arxitektura Qatlamlari</span>
              </div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#707072]">
                ISOMETRIC
              </span>
            </div>

            <div className="space-y-2 py-1" style={{ transformStyle: 'preserve-3d' }}>
              {STACK_LAYERS.map((layer, idx) => (
                <motion.div
                  key={layer.id}
                  whileHover={reducedMotion ? undefined : { x: 4, z: 22 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 flex items-center justify-between transition-colors group-hover:border-[#111111]/30"
                  style={{
                    transform: reducedMotion ? undefined : `translateZ(${(3 - idx) * 10}px)`,
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold" style={{ color: layer.color }}>
                        {layer.id}
                      </span>
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-[#111111]">
                        {layer.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#4b4b4d]">{layer.tech}</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                </motion.div>
              ))}
            </div>

            <div
              className="mt-3 border-t border-[#cacacb] pt-2 flex items-center justify-between text-[9px] text-[#707072]"
              style={{ transform: 'translateZ(14px)' }}
            >
              <span>{'//'} MODULAR ARXITEKTURA</span>
              <span className="font-bold text-[#007d48]">ACTIVE STACK</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};
