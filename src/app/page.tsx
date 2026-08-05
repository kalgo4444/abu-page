import { HeroSection } from '@/widgets/hero/ui/hero-section';
import { PROFILE_DATA } from '@/entities/profile/model/profile-data';
import { SITE_URL } from '@/shared/config/site';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE_DATA.name,
    url: SITE_URL.href,
    jobTitle: PROFILE_DATA.title,
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <HeroSection />
    </>
  );
}
