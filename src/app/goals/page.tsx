import type { Metadata } from 'next';
import { GoalsSection } from '@/widgets/goals/ui/goals-section';
import { createPageMetadata } from '@/shared/config/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Kasbiy maqsadlar',
  description:
    'Front-end yo‘nalishida rivojlanish, foydali IT mahsulotlar yaratish va xalqaro jamoalarda tajriba oshirish maqsadlari.',
  path: '/goals',
});

export default function GoalsPage() {
  return <GoalsSection />;
}
