import { SectionHeading } from '@/shared/ui';
import { SocialList } from '@/widgets/social-list';

export default function SocialPage() {
	return (
		<section>
			<SectionHeading
				title='Social & Profiles'
				description='External links, profiles, and contact methods.'
			/>
			<SocialList />
		</section>
	);
}
