import { profile } from '@/entities/profile';
import { externalLinkProps } from '@/shared/lib/external-link';
import { Container } from '@/shared/ui';

export function Footer() {
	return (
		<footer className='mt-16 sm:mt-20 border-t border-hairline bg-canvas'>
			<Container>
				{/* Social grid: hairline dividers via gap-px, 2-up mobile / 4-up desktop */}
				<div className='grid grid-cols-2 gap-px border-b border-hairline bg-hairline md:grid-cols-4'>
					{profile.socials.map(s => (
						<a
							key={s.label}
							href={s.href}
							{...externalLinkProps(s.href)}
							className='flex h-11 items-center justify-center gap-1.5 bg-canvas px-3 text-[14px] text-body transition-colors hover:bg-surface-soft hover:text-ink'
						>
							<span className='text-mute'>[↗]</span>
							<span>{s.label}</span>
						</a>
					))}
				</div>

				{/* Bottom row: copyright and location info */}
				<div className='flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left text-[14px] text-mute leading-relaxed'>
					<p>© 2026 {profile.name}</p>
					<p>
						{profile.role} · {profile.location}
					</p>
				</div>
			</Container>
		</footer>
	);
}
