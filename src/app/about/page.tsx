import { profile } from '@/entities/profile/model';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { SectionHeading } from '@/shared/ui/SectionHeading';

export default function AboutPage() {
	return (
		<section className='py-10 sm:py-14 lg:py-8 lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center'>
			<SectionHeading
				title='About'
				description='Profile overview & developer background.'
				marker='[+]'
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
						<span className='text-mute font-medium'>Name:</span>
						<span className='text-ink'>{profile.name}</span>

						<span className='text-mute font-medium'>Role:</span>
						<span className='text-ink'>{profile.role}</span>

						<span className='text-mute font-medium'>Age:</span>
						<span className='text-ink'>{profile.age}</span>

						<span className='text-mute font-medium'>Location:</span>
						<span className='text-ink'>{profile.location}</span>

						<span className='text-mute font-medium'>Status:</span>
						<span className='text-ink'>University student & Engineer</span>

						<span className='text-mute font-medium'>Specialization:</span>
						<span className='text-ink'>Web, Mobile, AI-powered products</span>
					</div>
				</div>

				<div className='space-y-3 text-base text-body leading-[1.5]'>
					<p>{profile.tagline}</p>
					<p>
						University student building web, mobile, and AI-powered products.
					</p>
				</div>

				<div className='flex flex-wrap items-center gap-3 pt-4 border-t border-hairline'>
					<ButtonLink href='/skills' variant='primary'>
						[+] View Skills
					</ButtonLink>
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
