/** Anchor props for a link: web URLs open in a new tab, `mailto:` and internal hrefs don't. */
export function externalLinkProps(href: string) {
	return href.startsWith('http')
		? ({ target: '_blank', rel: 'noreferrer' } as const)
		: {};
}
