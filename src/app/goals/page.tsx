import type { Metadata } from 'next';
import { GoalsSection } from '@/widgets/goals/ui/goals-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Career goals',
  description:
    'Goals: grow in Software Engineering, build useful IT products, and gain global team experience.',
  path: '/goals',
});

export default function GoalsPage() {
  return <GoalsSection />;
}
