import type { ReactNode } from 'react';

export function Badge({
	children,
	variant = 'dark',
	className = '',
}: {
	children: ReactNode;
	variant?: 'dark' | 'outline' | 'card';
	className?: string;
}) {
	const base =
		'inline-flex items-center rounded-[4px] px-2.5 py-0.5 text-[14px] font-medium leading-normal tracking-tight';

	const styles =
		variant === 'dark'
			? 'bg-surface-dark text-canvas'
			: variant === 'card'
				? 'bg-surface-card text-ink border border-hairline'
				: 'border border-hairline bg-transparent text-ink';

	return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}
