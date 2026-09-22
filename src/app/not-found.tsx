import Link from 'next/link';
import { ErrorCard } from '@/shared/ui/error-card';

export default function NotFound() {
  return (
    <ErrorCard
      eyebrow="404"
      title="PAGE NOT FOUND"
      description="The page you look for does not exist or its link has changed."
      action={
        <Link
          href="/"
          className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#39393b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      }
    />
  );
}
