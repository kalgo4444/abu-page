'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { ContactModalContext } from '@/features/contact-modal/model/contact-modal-context';
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

  const openContactModal = useCallback(() => {
    setHasOpenedContact(true);
    setIsContactOpen(true);
  }, []);

  const closeContactModal = useCallback(() => setIsContactOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      <div inert={isContactOpen} aria-hidden={isContactOpen}>
        <Navbar />
        <main className="relative min-h-screen overflow-x-hidden bg-white text-[#111111]">
          {children}
        </main>
      </div>
      {hasOpenedContact && (
        <ContactModal isOpen={isContactOpen} onClose={closeContactModal} />
      )}
    </ContactModalContext.Provider>
  );
};
