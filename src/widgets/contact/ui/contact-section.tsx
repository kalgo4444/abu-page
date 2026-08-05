'use client';

import React from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { FullscreenSection } from '@/shared/ui/fullscreen-section';
import { PROFILE_DATA } from '@/entities/profile/model/profile-data';
import { useContactModal } from '@/features/contact-modal/model/contact-modal-context';

export const ContactSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { openContactModal } = useContactModal();
  const hasSocialLinks = Boolean(
    PROFILE_DATA.contacts.github ||
    PROFILE_DATA.contacts.telegram ||
    PROFILE_DATA.contacts.linkedin
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const planeX = useSpring(useTransform(mouseX, (v) => v * 46), springConfig);
  const planeY = useSpring(useTransform(mouseY, (v) => v * 34), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <FullscreenSection
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#111111] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden items-center justify-center pointer-events-none md:flex"
      >
        <div className="ring-orbit absolute w-[540px] h-[540px] lg:w-[680px] lg:h-[680px] rounded-full border border-white/10" />
        <div
          className="ring-orbit absolute w-[700px] h-[700px] lg:w-[880px] lg:h-[880px] rounded-full border border-dashed border-white/5"
          style={{ animationDirection: 'reverse', animationDuration: '36s' }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[5%] top-[13%] hidden md:block pointer-events-none z-10"
      >
        <motion.div style={{ x: planeX, y: planeY }}>
          <div className="float-y">
            <div
              className="preserve-3d relative w-36 h-36 lg:w-48 lg:h-48"
              style={{ transform: 'rotateX(18deg) rotateZ(-10deg)' }}
            >
              <div
                className="absolute inset-0 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 50%, 0 50%)' }}
              />
              <div
                className="absolute inset-0 bg-[#cacacb]"
                style={{
                  clipPath: 'polygon(0 50%, 100% 50%, 0 100%)',
                  transform: 'rotateX(-45deg)',
                  transformOrigin: '50% 50%',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <Container className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-5 py-24 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="space-y-5 flex flex-col items-center"
        >
          <Badge variant="purple" className="bg-transparent text-white border-white/40 uppercase tracking-wider text-[11px]">
            HAMKORLIK VA ALOQA
          </Badge>

          <h1 className="font-display-campaign uppercase tracking-tight leading-[0.9]">
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">
              BIRGALIKDA
            </span>
            <span
              className="block text-5xl sm:text-7xl lg:text-8xl"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' }}
            >
              YARATAYLIK.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/65 max-w-xl leading-relaxed font-normal">
            Front-end veb-saytlar, Next.js loyihalari yoki sun’iy intellekt vositalari bilan ishlash bo‘yicha bog‘lanishingiz mumkin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={openContactModal}
            icon={<Send className="w-4 h-4" />}
            className="bg-white text-[#111111] hover:bg-[#e5e5e5] uppercase font-bold tracking-wider text-xs"
          >
            Xabar Qoldirish
          </Button>

          {PROFILE_DATA.contacts.email && (
            <Button
              href={`mailto:${PROFILE_DATA.contacts.email}`}
              variant="outline"
              size="lg"
              icon={<Mail className="w-4 h-4" />}
              className="bg-transparent border-white/40 text-white hover:border-white uppercase font-bold tracking-wider text-xs"
            >
              Email Yuborish
            </Button>
          )}
        </motion.div>

        {hasSocialLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-2 text-xs font-bold uppercase tracking-wider text-white"
          >
            {PROFILE_DATA.contacts.github && (
              <a
                href={PROFILE_DATA.contacts.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}

            {PROFILE_DATA.contacts.telegram && (
              <a
                href={PROFILE_DATA.contacts.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span>Telegram</span>
              </a>
            )}

            {PROFILE_DATA.contacts.linkedin && (
              <a
                href={PROFILE_DATA.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
          </motion.div>
        )}
      </Container>

      <div className="relative z-10 mt-auto border-t border-white/15">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-center text-[10px] font-medium uppercase tracking-wider text-white/50 sm:flex-row sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
            <span className="text-white font-bold">O‘ZBEKISTON</span>
            <span>&copy; {new Date().getFullYear()} ABDULAZIZ. BARCHA HUQUQLAR HIMOYALANGAN.</span>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/about" className="hover:text-white transition-colors">Men Haqimda</Link>
            <Link href="/skills" className="hover:text-white transition-colors">Ko‘nikmalar</Link>
            <Link href="/goals" className="hover:text-white transition-colors">Maqsadlar</Link>
          </div>

          <span className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007d48]" />
            Toshkent, UZB — Hamkorlikka ochiq
          </span>
        </Container>
      </div>
    </FullscreenSection>
  );
};
