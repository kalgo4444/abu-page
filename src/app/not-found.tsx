import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-white px-6 text-center text-[#111111]">
      <div className="max-w-md space-y-5">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#707072]">404</p>
        <h1 className="font-display-campaign text-5xl font-black uppercase leading-none sm:text-6xl">PAGE NOT FOUND</h1>
        <p className="text-sm leading-relaxed text-[#4b4b4d]">The page you look for does not exist or its link has changed.</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#39393b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
