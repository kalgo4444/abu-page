const links = {
	github: 'https://github.com/kalgo4444',
	linkedin: 'https://www.linkedin.com/in/abdulaziz-abdugafurov',
	telegram: 'https://t.me/abdulaziz_abdugafurov',
	email: 'mailto:abuxyziabd@gmail.com',
} as const;

export const profile = {
	name: 'Abdulaziz Abdugafurov',
	role: 'Software Engineer',
	age: 19,
	location: 'Tashkent, Uzbekistan',
	tagline:
		'Full-stack engineer and university student building web, mobile, and AI-powered products.',
	links,
	socials: [
		{ label: 'GitHub', href: links.github },
		{ label: 'LinkedIn', href: links.linkedin },
		{ label: 'Telegram', href: links.telegram },
		{ label: 'Email', href: links.email },
	] as { label: string; href: string }[],
} as const;
