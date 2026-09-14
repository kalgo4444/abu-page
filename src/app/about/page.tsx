import type { Metadata } from 'next';
import { AboutSection } from '@/widgets/about/ui/about-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'About Me',
  description:
    'About Abdulaziz — study, Software Engineering major, and software experience.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutSection />;
}
