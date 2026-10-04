import { capabilities } from '@/entities/skill/model';

function Marker() {
	return <span className='text-mute font-normal'>[x]</span>;
}

export function CapabilityList({
	layout = 'wrap',
}: {
	layout?: 'wrap' | 'grid';
}) {
	if (layout === 'grid') {
		return (
			<div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4'>
				{capabilities.map(c => (
					<div
						key={c}
						className='flex items-center gap-2 rounded-[4px] border border-hairline bg-surface-card px-4 py-3 text-base text-ink font-medium transition-colors hover:bg-surface-soft'
					>
						<Marker />
						<span>{c}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className='flex flex-wrap gap-2.5'>
			{capabilities.map(c => (
				<span
					key={c}
					className='inline-flex items-center gap-1.5 rounded-[4px] border border-hairline bg-surface-card px-3.5 py-1.5 text-base text-ink font-medium'
				>
					<Marker />
					<span>{c}</span>
				</span>
			))}
		</div>
	);
}
