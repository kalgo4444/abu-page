import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '@/entities/profile';
import { Container } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-mono',
	display: 'swap',
});

export const metadata: Metadata = {
	title: `${profile.name} — ${profile.role}`,
	description: profile.tagline,
};

export const viewport: Viewport = {
	themeColor: '#fdfcfc',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={ibmPlexMono.variable}>
			<body className='bg-canvas text-ink antialiased font-mono min-h-screen flex flex-col'>
				<Header />
				<main id='main' className='flex-1'>
					{/* Page shell: shared vertical rhythm, content centered under the 3.5rem header on desktop */}
					<Container className='py-10 sm:py-14 lg:py-8 lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center'>
						{children}
					</Container>
				</main>
				<Footer />
			</body>
		</html>
	);
}
