import { SectionHeading } from '@/shared/ui/SectionHeading';
import { SocialList } from '@/widgets/social-list/SocialList';

export default function SocialPage() {
	return (
		<section className='py-10 sm:py-14 lg:py-8 lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center'>
			<SectionHeading
				title='Social & Profiles'
				description='External links, profiles, and contact methods.'
				marker='[+]'
			/>
			<div className='mt-6'>
				<SocialList />
			</div>
		</section>
	);
}
