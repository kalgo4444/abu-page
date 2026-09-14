import type { Metadata } from 'next';
import { ContactSection } from '@/widgets/contact/ui/contact-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Abdulaziz about web, mobile (React Native / Expo), Next.js, or AI tool projects and offers.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactSection />;
}
