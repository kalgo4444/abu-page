import { type SkillGroup, skillGroups } from '@/entities/skill/model';

export function StackRows({ groups = skillGroups }: { groups?: SkillGroup[] }) {
	return (
		<dl className='divide-y divide-hairline border-y border-hairline'>
			{groups.map(g => (
				<div
					key={g.title}
					className='flex flex-col gap-1 py-3.5 text-base sm:flex-row sm:items-baseline sm:gap-6'
				>
					<dt className='flex items-center gap-2 font-bold text-ink sm:w-40 sm:shrink-0'>
						<span className='text-mute font-normal'>[+]</span>
						<span>{g.title}</span>
					</dt>
					<dd className='text-body font-normal pl-6 sm:pl-0'>
						{g.items.join(' · ')}
					</dd>
				</div>
			))}
		</dl>
	);
}
