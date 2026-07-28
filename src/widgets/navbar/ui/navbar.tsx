'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Container } from '@/shared/ui/container';

const NAV_LINKS = [
  { label: 'MEN HAQIMDA', href: '/about' },
  { label: 'KO‘NIKMALAR', href: '/skills' },
  { label: 'QIZIQISHLAR', href: '/interests' },
  { label: 'MAQSADLAR', href: '/goals' },
];

const HOVER_STYLES = [
  { text: 'hover:text-[#1151ff]', underline: 'group-hover:bg-[#1151ff]' },
  { text: 'hover:text-[#ed1aa0]', underline: 'group-hover:bg-[#ed1aa0]' },
  { text: 'hover:text-[#0a7281]', underline: 'group-hover:bg-[#0a7281]' },
  { text: 'hover:text-[#d30005]', underline: 'group-hover:bg-[#d30005]' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Scroll-driven behavior: hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (!mobileMenuOpen) {
      setHidden(latest > previous && latest > 150);
    }
    setScrolled(latest > 24);
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setHidden(false);
  };

  return (
    <motion.header
      initial={reducedMotion ? false : { y: '-140%', opacity: 0 }}
      animate={{
        y: hidden ? '-140%' : '0%',
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      onFocusCapture={() => setHidden(false)}
      className="fixed top-2.5 sm:top-3 inset-x-0 z-50"
    >
      <Container>
        <div
          className={`border transition-[background-color,border-color] duration-300 ${
            scrolled
              ? 'bg-white/75 backdrop-blur-xl border-[#cacacb]'
              : 'bg-white/70 backdrop-blur-xl border-[#e5e5e5]'
          }`}
        >
          <div className="flex h-[52px] items-center justify-between gap-4 px-3.5 sm:px-5">
            <Link href="/" className="group flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2" style={{ perspective: 700 }}>
              <motion.div
                whileHover={reducedMotion ? undefined : { rotateX: -22, rotateY: 30, y: -3, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                className="font-brand relative flex h-8 w-8 items-center justify-center text-base font-bold tracking-[-0.12em] text-white"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="absolute inset-0 bg-[#1151ff]" style={{ transform: 'translate3d(4px, 4px, -8px)' }} />
                <span className="absolute inset-0 border border-[#111111] bg-[#111111]" style={{ transform: 'translateZ(4px)' }} />
                <span className="relative" style={{ transform: 'translateZ(9px)' }}>A</span>
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-brand text-[17px] font-bold tracking-[-0.09em] text-[#111111] transition-colors duration-200 group-hover:text-[#1151ff]">
                  ABDULAZIZ
                </span>
                <span className="font-brand mt-1 text-[8px] font-normal tracking-[0.16em] uppercase text-[#707072]">
                  DEVELOPER
                </span>
              </div>
            </Link>

            <nav aria-label="Asosiy navigatsiya" className="hidden lg:flex flex-1 items-center justify-center gap-7">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    whileHover={reducedMotion ? undefined : { y: -2, rotateX: -10 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className={twMerge(
                      clsx(
                        'font-brand group relative text-[11px] font-normal tracking-[0.04em] transition-colors',
                        isActive ? 'text-[#111111]' : `text-[#707072] ${HOVER_STYLES[index].text}`
                      )
                    )}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className="-mx-3 block px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                    >
                      {link.label}
                      <span
                        className={twMerge(
                          clsx(
                            `absolute bottom-0 left-0 h-[2px] bg-[#111111] transition-all duration-200 ${HOVER_STYLES[index].underline}`,
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          )
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="font-brand hidden h-11 items-center justify-center rounded-full bg-[#111111] px-4 text-[10px] font-normal uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:inline-flex"
              >
                Bog‘lanish
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] lg:hidden"
                aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobil navigatsiya"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden border-t border-[#e5e5e5] px-6"
              >
                <div className="flex flex-col gap-4 py-6">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={twMerge(
                          clsx(
                            'font-brand flex items-center justify-between border-b border-[#f5f5f5] py-2 text-sm font-normal tracking-[0.04em]',
                            isActive ? 'text-[#111111]' : 'text-[#707072]'
                          )
                        )}
                      >
                        <span>{link.label}</span>
                        <span className="text-[#707072]">&rarr;</span>
                      </Link>
                    );
                  })}

                    <div className="pt-4">
                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-12 w-full items-center justify-center rounded-full bg-[#111111] px-8 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#222222]"
                      >
                        Hamkorlik Taklifi
                      </Link>
                    </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </motion.header>
  );
};
