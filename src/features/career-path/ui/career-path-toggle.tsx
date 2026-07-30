'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Code2, Smartphone, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

export const CareerPathToggle: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'ios'>('frontend');
  const reducedMotion = useReducedMotion();

  return (
    <Card className="p-4 sm:p-6 rounded-none bg-[#f5f5f5] border-[#cacacb]">
      {/* Nike Filter-Chip / Tab Switcher */}
      <div className="mx-auto mb-5 flex w-full max-w-sm flex-col items-stretch justify-center gap-2 rounded-[24px] border border-[#cacacb] bg-white p-1.5 sm:flex-row sm:rounded-full">
        <button
          type="button"
          onClick={() => setActiveTab('frontend')}
          aria-pressed={activeTab === 'frontend'}
          className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer sm:flex-1 sm:text-[11px] sm:tracking-wider ${
            activeTab === 'frontend'
              ? 'bg-[#111111] text-white'
              : 'bg-transparent text-[#707072] hover:text-[#111111]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Front-end Stack
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ios')}
          aria-pressed={activeTab === 'ios'}
          className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer sm:flex-1 sm:text-[11px] sm:tracking-wider ${
            activeTab === 'ios'
              ? 'bg-[#111111] text-white'
              : 'bg-transparent text-[#707072] hover:text-[#111111]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          iOS Swift (Maqsad)
        </button>
      </div>

      {/* Content Display */}
      <AnimatePresence mode="wait">
        {activeTab === 'frontend' ? (
          <motion.div
            key="frontend"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center"
          >
            <div>
              <Badge variant="blue" icon={<Sparkles className="w-3.5 h-3.5" />} className="mb-2 uppercase font-bold text-[10px]">
                FRONT-END MUHANDISLIGI
              </Badge>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-[#111111] font-display-campaign mb-2">
                ZAMONAVIY VEB INTERFEYSLAR
              </h3>
              <p className="text-[#39393b] text-xs leading-relaxed mb-3">
                React, Next.js (App Router), TypeScript hamda Tailwind CSS yordamida yuqori performansli, adaptiv va animatsiyalarga boy zamonaviy web dasturlar yarataman.
              </p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "Next.js App Router & Server Components",
                  "TypeScript bilan xavfsiz kod arxitekturasi",
                  "Responsive UX & Nike Minimalist Design System",
                  "REST API va backend servislar bilan integratsiya"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007d48] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('ios')}
                icon={<ArrowRight className="w-4 h-4" />}
                className="uppercase text-xs font-bold"
              >
                iOS Swift Yo‘nalishiga O‘tish
              </Button>
            </div>

            <div className="bg-white rounded-none p-4 border border-[#cacacb] font-mono text-[10px] text-[#111111]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#cacacb] text-[#707072]">
                <span className="font-bold text-[#111111]">{'//'} FrontendStack.tsx</span>
                <span className="text-[10px] uppercase font-sans font-bold">REACT / NEXT</span>
              </div>
              <pre className="text-[#39393b] leading-relaxed overflow-x-auto">
{`export const DeveloperStack = () => {
  const stack = ["React", "Next.js", "TypeScript"];

  return (
    <WebPortfolio
      engineer="Abdulaziz"
      status="Front-end Developer"
      stack={stack}
    />
  );
};`}
              </pre>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ios"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center"
          >
            <div>
              <Badge variant="orange" icon={<Smartphone className="w-3.5 h-3.5" />} className="mb-2 uppercase font-bold text-[10px]">
                IOS & SWIFT KELAJAGI
              </Badge>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-[#111111] font-display-campaign mb-2">
                APPLE EKOTIZIMI UCHUN NATIV ILOVALAR
              </h3>
              <p className="text-[#39393b] text-xs leading-relaxed mb-3">
                Mening asosiy strategik maqsadim — professional <strong>iOS Engineer</strong> bo‘lish. Swift, SwiftUI va Apple iOS arxitekturalarini o‘rganib kelmoqdaman.
              </p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "Swift tilini chuqur o'rganish (Concurrency & Async/Await)",
                  "SwiftUI declarative UI va Apple dizayn printsiplari",
                  "iOS App Architecture (MVVM, Clean Architecture)",
                  "Xcode tools, Profiling & App Store deployment"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d30005] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('frontend')}
                icon={<Code2 className="w-4 h-4" />}
                className="uppercase text-xs font-bold"
              >
                Front-end Stackni Ko‘rish
              </Button>
            </div>

            <div className="bg-white rounded-none p-4 border border-[#cacacb] font-mono text-[10px] text-[#111111]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#cacacb] text-[#707072]">
                <span className="font-bold text-[#d30005]">{'//'} iOSDeveloper.swift</span>
                <span className="text-[10px] uppercase font-sans font-bold">SWIFTUI</span>
              </div>
              <pre className="text-[#39393b] leading-relaxed overflow-x-auto">
{`import SwiftUI

struct iOSDeveloperGoal: View {
    let name = "Abdulaziz"
    @State private var level = "Learning Swift"

    var body: some View {
        Text("Future Senior iOS Engineer")
    }
}`}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
