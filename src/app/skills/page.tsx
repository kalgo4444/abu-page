import type { Metadata } from 'next';
import { SkillsSection } from '@/widgets/skills/ui/skills-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'React, Next.js, React Native and TypeScript skills',
  description:
    'Hands-on skills in React, Next.js, React Native (Expo), TypeScript, Tailwind CSS, AI agents, and dev tools.',
  path: '/skills',
});

export default function SkillsPage() {
  return <SkillsSection />;
}
