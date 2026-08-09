import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { SITE_URL } from '@/shared/config/site';
import { SiteShell } from '@/widgets/site-shell/ui/site-shell';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: 'Abdulaziz — Front-end dasturchi',
    template: '%s | Abdulaziz',
  },
  description:
    'Abdulazizning React, Next.js va TypeScript asosidagi front-end ishlari haqida portfolio.',
  keywords: [
    'Abdulaziz',
    'Portfolio',
    'Front-end Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Uzbekistan',
    'FSD Architecture',
  ],
  authors: [{ name: 'Abdulaziz' }],
  creator: 'Abdulaziz',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Abdulaziz — Front-end dasturchi',
    description:
      'React va Next.js asosida zamonaviy veb-ilovalar yaratuvchi front-end dasturchi.',
    url: '/',
    siteName: 'Abdulaziz portfolio',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulaziz — Front-end dasturchi',
    description:
      'React va Next.js asosida zamonaviy veb-ilovalar yaratuvchi front-end dasturchi.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('theme');if(theme!=='light'&&theme!=='dark'){theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=theme}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-[#111111] selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
