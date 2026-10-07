import { capabilities } from '../model/skills';

export function CapabilityList() {
	return (
		<div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4'>
			{capabilities.map(c => (
				<div
					key={c}
					className='flex items-center gap-2 rounded-[4px] border border-hairline bg-surface-card px-4 py-3 text-base text-ink font-medium transition-colors hover:bg-surface-soft'
				>
					<span className='text-mute font-normal'>[x]</span>
					<span>{c}</span>
				</div>
			))}
		</div>
	);
}
