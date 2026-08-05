import type { Metadata } from 'next';
import { AboutSection } from '@/widgets/about/ui/about-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Men haqimda',
  description:
    'Abdulazizning ta’limi, Software Engineering yo‘nalishi va front-end tajribasi haqida.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutSection />;
}
