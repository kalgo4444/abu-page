'use client';

import { useEffect } from 'react';
import { ErrorCard } from '@/shared/ui/error-card';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorCard
      eyebrow="Error"
      title="SOMETHING WENT WRONG"
      description="Try to reload the page. If it still fails, come back later."
      action={
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#39393b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        >
          Try Again
        </button>
      }
    />
  );
}
