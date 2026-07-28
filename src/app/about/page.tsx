import type { Metadata } from 'next';
import { AboutSection } from '@/widgets/about/ui/about-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Men haqimda',
  description:
    'Abdulazizning ta’limi, Software Engineering yo‘nalishi, front-end tajribasi va professional iOS dasturchi bo‘lish rejasi.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutSection />;
}
