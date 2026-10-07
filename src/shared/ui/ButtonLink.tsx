import Link from 'next/link';
import type { ReactNode } from 'react';
import { externalLinkProps } from '../lib/external-link';

const base =
	'inline-flex items-center justify-center rounded-[4px] px-5 py-1.5 text-base font-medium leading-[2.0] transition-colors duration-150 text-center select-none';

const variants = {
	primary:
		'bg-ink text-canvas hover:bg-charcoal active:bg-ink-deep border border-transparent',
	secondary:
		'bg-canvas text-ink border border-hairline-strong hover:bg-surface-soft active:bg-surface-card',
} as const;

export function ButtonLink({
	href,
	children,
	variant = 'primary',
}: {
	href: string;
	children: ReactNode;
	variant?: keyof typeof variants;
}) {
	const className = `${base} ${variants[variant]}`;

	if (href.startsWith('/')) {
		return (
			<Link href={href} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<a href={href} className={className} {...externalLinkProps(href)}>
			{children}
		</a>
	);
}
