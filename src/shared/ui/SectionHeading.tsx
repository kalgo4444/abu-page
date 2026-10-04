export function SectionHeading({
	title,
	description,
	marker = '[+]',
}: {
	title: string;
	description?: string;
	marker?: string;
}) {
	const displayTitle = title.startsWith('[') ? title : `${marker} ${title}`;

	return (
		<div className='mb-6 border-b border-hairline pb-2'>
			<h2 className='text-base font-bold text-ink tracking-tight'>
				{displayTitle}
			</h2>
			{description ? (
				<p className='mt-1 text-sm text-mute'>{description}</p>
			) : null}
		</div>
	);
}
