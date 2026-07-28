'use client';

import { createContext, useContext } from 'react';

interface ContactModalContextValue {
  openContactModal: () => void;
}

export const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export const useContactModal = () => {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }

  return context;
};
