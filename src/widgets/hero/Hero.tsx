import { profile } from '@/entities/profile/model';
import { ButtonLink } from '@/shared/ui/ButtonLink';

export function Hero() {
	return (
		<section className='py-10 sm:py-12 lg:py-8'>
			{/* Status meta */}
			<div className='flex items-center gap-2 text-xs sm:text-sm text-mute'>
				<span className='font-semibold text-ink'>[+]</span>
				<span>
					{profile.role} · {profile.location} · Age {profile.age}
				</span>
			</div>

			{/* Display headline */}
			<h1 className='mt-3 text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.3] sm:leading-[1.4] lg:leading-[1.5] text-ink tracking-tight'>
				{profile.name}
			</h1>

			{/* Paragraph body */}
			<p className='mt-3 max-w-2xl text-base text-body leading-[1.5]'>
				{profile.tagline}
			</p>

			{/* Action buttons */}
			<div className='mt-6 flex flex-wrap items-center gap-3'>
				<ButtonLink href={profile.links.email} variant='primary'>
					[+] Get in touch
				</ButtonLink>
				<ButtonLink href='/skills' variant='secondary'>
					[x] View Skills
				</ButtonLink>
				<ButtonLink href='/about' variant='secondary'>
					[-] Read Bio
				</ButtonLink>
			</div>

			{/* Hero TUI Mockup (DESIGN.md hero centerpiece) */}
			<div className='mt-10 overflow-hidden border border-hairline-strong/30 bg-surface-dark text-canvas'>
				{/* Mockup top chrome */}
				<div className='flex items-center justify-between border-b border-surface-dark-elevated px-4 py-2 text-xs text-ash'>
					<div className='flex items-center gap-2'>
						<span className='inline-block h-2 w-2 rounded-full bg-success' />
						<span className='font-mono'>abu@engineer:~ (tui)</span>
					</div>
					<span className='hidden sm:inline font-mono'>mode: profile</span>
				</div>

				{/* Mockup contents */}
				<div className='p-5 sm:p-8'>
					{/* Centered ASCII wordmark */}
					<div className='overflow-x-auto pb-4 text-center'>
						<pre className='inline-block text-left font-mono text-[9px] sm:text-xs leading-tight text-canvas select-none'>
							{`  ___  ___  _   _ 
 / _ \\| _ )| | | |
|  _  | _ \\| |_| |
|_| |_|___/ \\___/ `}
						</pre>
					</div>

					{/* tui-prompt-row */}
					<div className='mt-4 rounded-[4px] bg-surface-dark-elevated px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-mono flex flex-wrap items-center justify-between gap-2 border border-hairline/20'>
						<div className='flex flex-wrap items-center gap-2'>
							<span className='text-success font-bold'>|</span>
							<span className='text-accent font-semibold'>dev</span>
							<span className='text-canvas'>{profile.name}</span>
							<span className='text-ash'>[{profile.role}]</span>
						</div>
						<span className='text-xs text-ash'>[status: available]</span>
					</div>

					{/* Prompt output subline */}
					<p className='mt-3 text-xs sm:text-sm text-ash font-mono'>
						&gt; {profile.tagline}
					</p>

					{/* Bottom keybinding hints in ash */}
					<div className='mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-surface-dark-elevated pt-3 text-[11px] sm:text-xs text-ash font-mono'>
						<div className='flex flex-wrap items-center gap-3'>
							<span>[tab] stack</span>
							<span>[s] skills</span>
							<span>[c] contact</span>
						</div>
						<span>[loc] {profile.location}</span>
					</div>
				</div>
			</div>
		</section>
	);
}
