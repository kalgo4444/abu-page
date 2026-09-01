'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { ContactModalContext } from '@/features/contact-modal/model/contact-modal-context';
import { ThemeProvider } from '@/features/theme/model/theme-context';
import { InteractiveBackground } from '@/shared/ui/interactive-background';
import { Navbar } from '@/widgets/navbar/ui/navbar';

const ContactModal = dynamic(() =>
  import('@/features/contact-modal/ui/contact-modal').then((module) => module.ContactModal)
);

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell = ({ children }: SiteShellProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasOpenedContact, setHasOpenedContact] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  const openContactModal = useCallback(() => {
    setHasOpenedContact(true);
    setIsContactOpen(true);
  }, []);

  const closeContactModal = useCallback(() => setIsContactOpen(false), []);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;

    const frame = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <ThemeProvider>
      <ContactModalContext.Provider value={{ openContactModal }}>
        <div inert={isContactOpen} aria-hidden={isContactOpen}>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
          >
            Asosiy mazmunga o‘tish
          </a>
          <Navbar />
          <main
            ref={mainRef}
            id="main-content"
            tabIndex={-1}
            className="relative min-h-screen overflow-x-hidden bg-[var(--canvas)] text-[var(--ink)]"
          >
            {children}
          </main>
          <InteractiveBackground />
        </div>
        {hasOpenedContact && (
          <ContactModal isOpen={isContactOpen} onClose={closeContactModal} />
        )}
      </ContactModalContext.Provider>
    </ThemeProvider>
  );
};
