'use client';

import { useEffect } from 'react';

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="uz">
      <body className="m-0 flex min-h-svh items-center justify-center bg-[#111111] px-6 text-center font-mono text-white">
        <div className="max-w-md space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">Tizim xatoligi</p>
          <h1 className="text-4xl font-black uppercase sm:text-5xl">SAHIFA OCHILMADI</h1>
          <p className="text-sm leading-relaxed text-white/70">Iltimos, sahifani qayta yuklab ko‘ring.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#111111]"
          >
            Qayta Urinish
          </button>
        </div>
      </body>
    </html>
  );
}
