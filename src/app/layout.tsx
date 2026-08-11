import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import { SITE_URL } from '@/shared/config/site';
import { SiteShell } from '@/widgets/site-shell/ui/site-shell';
import './globals.css';

const bebasNeue = Bebas_Neue({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: '400',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: 'Abdulaziz - Frontend dasturchi',
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
    title: 'Abdulaziz - Frontend dasturchi',
    description:
      'React va Next.js asosida zamonaviy veb-ilovalar yaratuvchi front-end dasturchi.',
    url: '/',
    siteName: 'Abdulaziz Portfolio',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulaziz - Frontend dasturchi',
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
    <html
      lang="uz"
      className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
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
