'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from '@/features/theme/ui/theme-toggle';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SKILLS', href: '/skills' },
  { label: 'INTERESTS', href: '/interests' },
  { label: 'GOALS', href: '/goals' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      className="fixed top-3 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 bg-transparent"
    >
      <div ref={navRef} className="mx-auto max-w-4xl pointer-events-auto relative">
        {/* Floating Capsule Bar */}
        <div
          className={twMerge(
            clsx(
              'flex h-13 sm:h-14 items-center justify-between gap-3 px-3 sm:px-4 rounded-full transition-all duration-300',
              'backdrop-blur-xl border',
              scrolled
                ? 'bg-[var(--canvas)]/85 border-[var(--border)] shadow-md shadow-black/5'
                : 'bg-[var(--canvas)]/75 border-[var(--border-soft)] shadow-xs'
            )
          )}
        >
          {/* Brand Logo & Live Status */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--ink)] text-[var(--canvas)] font-bold text-sm tracking-tight transition-transform duration-200 group-hover:scale-105 shadow-xs">
              <span className="font-brand font-black">A</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007d48]" />
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-brand text-[13px] sm:text-[14px] font-extrabold tracking-tight text-[var(--ink)] transition-colors duration-200 group-hover:text-[#1151ff]">
                ABDULAZIZ
              </span>
              <span className="font-mono text-[8px] font-medium tracking-[0.16em] uppercase text-[var(--text-muted)] mt-0.5">
                SW ENGINEER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 bg-[var(--surface-muted)]/80 p-1 rounded-full border border-[var(--border-soft)]/60"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={twMerge(
                    clsx(
                      'relative px-4 py-1.5 text-[11px] font-semibold tracking-wider font-brand rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]',
                      isActive
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
                    )
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-[var(--surface)] border border-[var(--border-soft)] shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <ThemeToggle />

            <Link
              href="/contact"
              className="font-brand hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full bg-[var(--ink)] text-[var(--canvas)] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 shadow-xs"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] cursor-pointer"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative" aria-hidden="true">
                <span
                  className={twMerge(
                    clsx(
                      'w-4 h-[1.5px] bg-current rounded-full transition-all duration-200',
                      mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                    )
                  )}
                />
                <span
                  className={twMerge(
                    clsx(
                      'w-4 h-[1.5px] bg-current rounded-full transition-all duration-200',
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                    )
                  )}
                />
                <span
                  className={twMerge(
                    clsx(
                      'w-4 h-[1.5px] bg-current rounded-full transition-all duration-200',
                      mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                    )
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="lg:hidden absolute top-[calc(100%+8px)] inset-x-0 rounded-3xl border border-[var(--border)] bg-[var(--canvas)]/95 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
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
                          'flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors',
                          isActive
                            ? 'bg-[var(--surface-muted)] text-[var(--ink)] font-bold'
                            : 'text-[var(--text-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-muted)]/50'
                        )
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1151ff]" />
                      ) : (
                        <span className="text-[var(--text-muted)] text-sm">&rarr;</span>
                      )}
                    </Link>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-[var(--border-soft)]">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--ink)] px-6 text-xs font-bold uppercase tracking-wider text-[var(--canvas)] transition-transform active:scale-[0.98]"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
