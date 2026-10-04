import { skillGroups } from '@/entities/skill/model';
import { SectionHeading } from '@/shared/ui/SectionHeading';
import { StackRows } from '@/shared/ui/StackRows';

export function StackList({ compact = false }: { compact?: boolean }) {
	return (
		<section className='py-8 sm:py-12 border-t border-hairline'>
			<SectionHeading
				title='Stack'
				description='Technologies & tools I work with daily.'
				marker='[+]'
			/>
			<StackRows groups={compact ? skillGroups.slice(0, 3) : skillGroups} />
		</section>
	);
}
