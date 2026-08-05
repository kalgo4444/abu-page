import type { Metadata } from 'next';
import { SkillsSection } from '@/widgets/skills/ui/skills-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'React, Next.js va TypeScript ko‘nikmalari',
  description:
    'React, Next.js, TypeScript, Tailwind CSS, AI agentlar va ishlab chiqish vositalari bo‘yicha amaliy ko‘nikmalar.',
  path: '/skills',
});

export default function SkillsPage() {
  return <SkillsSection />;
}
