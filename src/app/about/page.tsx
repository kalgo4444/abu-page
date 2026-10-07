import { Fragment } from 'react';
import { profile } from '@/entities/profile';
import { ButtonLink, SectionHeading } from '@/shared/ui';

const spec = [
	['Name', profile.name],
	['Role', profile.role],
	['Age', profile.age],
	['Location', profile.location],
	['Status', profile.status],
	['Specialization', profile.specialization],
] as const;

export default function AboutPage() {
	return (
		<section>
			<SectionHeading
				title='About'
				description='Profile overview & developer background.'
			/>

			<div className='space-y-6'>
				<div>
					<h1 className='text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.3] text-ink tracking-tight'>
						{profile.name}
					</h1>
					<p className='mt-2 text-base text-mute'>
						{profile.role} · Age {profile.age} · {profile.location}
					</p>
				</div>

				{/* Monospace Spec Block (manpage / README aesthetic) */}
				<div className='border border-hairline bg-surface-soft p-4 sm:p-6 text-sm font-mono leading-relaxed text-ink'>
					<div className='border-b border-hairline pb-2 mb-3 text-xs text-mute font-bold'>
						[DEVELOPER SPECIFICATION]
					</div>
					<div className='grid grid-cols-1 gap-2 sm:grid-cols-[130px_1fr]'>
						{spec.map(([label, value]) => (
							<Fragment key={label}>
								<span className='text-mute font-medium'>{label}:</span>
								<span className='text-ink'>{value}</span>
							</Fragment>
						))}
					</div>
				</div>

				<div className='space-y-3 text-base text-body leading-[1.5]'>
					<p>{profile.tagline}</p>
					<p>{profile.summary}</p>
				</div>

				<div className='flex flex-wrap items-center gap-3 pt-4 border-t border-hairline'>
					<ButtonLink href='/skills'>[+] View Skills</ButtonLink>
					<ButtonLink href='/social' variant='secondary'>
						[↗] Social Profiles
					</ButtonLink>
					<ButtonLink href={profile.links.email} variant='secondary'>
						[+] Contact via Email
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
