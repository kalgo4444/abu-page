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
    default: 'Abdulaziz — Front-end dasturchi va iOS yo‘nalishi',
    template: '%s | Abdulaziz',
  },
  description:
    'Abdulazizning React, Next.js va TypeScript asosidagi front-end ishlari, Swift hamda SwiftUI yo‘nalishidagi rivojlanishi haqida portfolio.',
  keywords: [
    'Abdulaziz',
    'Portfolio',
    'Front-end Developer',
    'iOS Developer',
    'Swift',
    'SwiftUI',
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
    title: 'Abdulaziz — Front-end dasturchi va iOS yo‘nalishi',
    description:
      'React va Next.js asosida zamonaviy veb-ilovalar yaratuvchi front-end dasturchi, Swift va SwiftUI o‘rganuvchisi.',
    url: '/',
    siteName: 'Abdulaziz portfolio',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulaziz — Front-end dasturchi va iOS yo‘nalishi',
    description:
      'React va Next.js asosida zamonaviy veb-ilovalar yaratuvchi front-end dasturchi, Swift va SwiftUI o‘rganuvchisi.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={jetbrainsMono.variable}>
      <body className="antialiased bg-white text-[#111111] min-h-screen selection:bg-[#111111] selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
