'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  const closeModal = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setSubmitted(false);
    setError('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'
        )
      ).filter((element) => element.tabIndex !== -1);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [closeModal, isOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const contact = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !message || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          message,
          website: formData.website,
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? 'Xabarni yuborib bo‘lmadi.');
        return;
      }

      setSubmitted(true);

      if (!reducedMotion) {
        void import('canvas-confetti').then(({ default: confetti }) => {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        });
      }

      closeTimerRef.current = setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '', website: '' });
        onClose();
      }, 2500);
    } catch {
      setError('Xabarni yuborib bo‘lmadi. Internet aloqasini tekshiring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.95, y: reducedMotion ? 0 : 10 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="relative z-10 w-full max-w-lg overflow-hidden border border-[#111111] bg-white p-6 focus:outline-none sm:p-10"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Oynani yopish"
              className="absolute right-5 top-5 rounded-full p-2 text-[#111111] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#007d48] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 id="contact-modal-title" className="text-2xl font-bold uppercase text-[#111111] font-display-campaign mb-2">
                  RAHMAT! XABARINGIZ YUBORILDI
                </h3>
                <p id="contact-modal-description" aria-live="polite" className="text-[#707072] text-sm font-medium">
                  Tez orada siz bilan bog‘lanaman. Hamkorlik taklifi uchun rahmat!
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <Badge variant="blue" icon={<Sparkles className="w-3.5 h-3.5" />} className="mb-2 font-bold uppercase text-[10px]">
                    XABAR YUBORISH
                  </Badge>
                  <h3 id="contact-modal-title" className="text-3xl font-extrabold uppercase text-[#111111] font-display-campaign">
                    ABDULAZIZ BILAN BOG‘LANING
                  </h3>
                  <p id="contact-modal-description" className="text-[#707072] text-xs sm:text-sm font-medium mt-1">
                    Yangi loyihalar, takliflar yoki g‘oyalarni muhokama qilish uchun xabar qoldiring.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-[#111111] mb-1.5">Ismingiz *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ismingizni kiriting"
                      className="w-full bg-[#f5f5f5] border border-[#cacacb] rounded-full px-4 py-2.5 text-xs font-medium text-[#111111] placeholder-[#707072] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-address" className="block text-xs font-bold uppercase text-[#111111] mb-1.5">Email / Telegram</label>
                    <input
                      id="contact-address"
                      name="contact"
                      type="text"
                      autoComplete="email"
                      maxLength={200}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email yoki @username"
                      className="w-full bg-[#f5f5f5] border border-[#cacacb] rounded-full px-4 py-2.5 text-xs font-medium text-[#111111] placeholder-[#707072] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase text-[#111111] mb-1.5">Xabar yoki Taklif *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={2000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Loyiha g‘oyasi yoki hamkorlik haqida yozing..."
                      className="w-full bg-[#f5f5f5] border border-[#cacacb] rounded-2xl px-4 py-3 text-xs font-medium text-[#111111] placeholder-[#707072] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all resize-none"
                    />
                  </div>

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="contact-website">Veb-sayt</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-[#d30005]">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="w-full mt-2 uppercase font-bold tracking-wider text-xs"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Yuborilmoqda...' : 'Xabarni Yuborish'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
