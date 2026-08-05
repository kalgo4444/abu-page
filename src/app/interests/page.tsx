import type { Metadata } from 'next';
import { InterestsSection } from '@/widgets/interests/ui/interests-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Qiziqishlar',
  description:
    'Veb-ilovalar, AI agentlar, Linux serverlar hamda sog‘lom turmush tarziga oid qiziqishlar.',
  path: '/interests',
});

export default function InterestsPage() {
  return <InterestsSection />;
}
