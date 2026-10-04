import { SkillsGrid } from '@/widgets/skills-grid/SkillsGrid';

export default function SkillsPage() {
	return (
		<div className='py-10 sm:py-14 lg:py-8 lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center'>
			<SkillsGrid />
		</div>
	);
}
