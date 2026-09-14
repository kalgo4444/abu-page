import type { Metadata } from 'next';
import { InterestsSection } from '@/widgets/interests/ui/interests-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Interests',
  description:
    'Interests in web apps, AI agents, Linux servers, and a healthy life.',
  path: '/interests',
});

export default function InterestsPage() {
  return <InterestsSection />;
}
