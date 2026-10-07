// Everything the landing page says about you lives here.
// Source: docs/index.md. Edit this file to change the page's content.

export interface Link {
	label: string;
	text: string;
	href: string;
}

export interface Project {
	name: string;
	description: string;
	href?: string;
}

export const profile = {
	name: 'Abdulaziz Abdugafurov',
	firstName: 'Abdulaziz',
	role: 'Software engineer',
	age: 19,
	location: 'Tashkent, Uzbekistan',
	headline:
		'Full-stack engineer building web, mobile, and AI-powered products.',
	summary:
		'Full-stack engineer and university student building web, mobile, and AI-powered products.',

	stack: [
		{ label: 'Languages', items: ['JavaScript', 'TypeScript'] },
		{ label: 'Front end', items: ['React', 'Next.js'] },
		{ label: 'Mobile', items: ['React Native'] },
		{ label: 'Back end', items: ['NestJS', 'REST APIs'] },
		{ label: 'Databases', items: ['PostgreSQL'] },
	],

	skills: [
		{
			name: 'Front-end UI',
			detail: 'Interfaces in React and Next.js, written in TypeScript.',
		},
		{ name: 'REST API', detail: 'Endpoints designed and served with NestJS.' },
		{ name: 'Back-end projects', detail: 'Services backed by PostgreSQL.' },
		{
			name: 'AI',
			detail: 'AI-powered features built into web and mobile products.',
		},
	],

	// Shown on the Contact page and in the terminal's `contact` command.
	links: [
		{
			label: 'GitHub',
			text: 'github.com/kalgo4444',
			href: 'https://github.com/kalgo4444',
		},
		{
			label: 'LinkedIn',
			text: 'linkedin.com/in/abdulaziz-abdugafurov',
			href: 'https://www.linkedin.com/in/abdulaziz-abdugafurov',
		},
		{
			label: 'Telegram',
			text: 't.me/abdulaziz_abdugafurov',
			href: 'https://t.me/abdulaziz_abdugafurov',
		},
		{
			label: 'Email',
			text: 'abuxyziabd@gmail.com',
			href: 'mailto:abuxyziabd@gmail.com',
		},
	] as Link[],

	// Add projects here and a Projects page appears in the nav.
	projects: [] as Project[],
};
