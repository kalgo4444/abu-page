import type { Metadata } from 'next';
import { ContactSection } from '@/widgets/contact/ui/contact-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Bog‘lanish',
  description:
    'Front-end, Next.js yoki AI vositalariga oid loyiha, hamkorlik va takliflar bo‘yicha Abdulaziz bilan bog‘laning.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactSection />;
}
