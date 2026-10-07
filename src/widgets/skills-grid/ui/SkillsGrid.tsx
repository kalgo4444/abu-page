import { CapabilityList, StackRows } from '@/entities/skill';
import { SectionHeading } from '@/shared/ui';

export function SkillsGrid() {
	return (
		<section className='space-y-12 sm:space-y-16'>
			<div>
				<SectionHeading
					title='Capabilities'
					description='High-level engineering domains and proficiencies.'
					marker='[x]'
				/>
				<CapabilityList />
			</div>

			<div>
				<SectionHeading
					title='Stack Breakdown'
					description='Detailed stack mapping across layers.'
				/>
				<StackRows />
			</div>
		</section>
	);
}
