export type SkillGroup = {
	title: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{ title: 'Languages', items: ['JavaScript', 'TypeScript'] },
	{ title: 'Front end', items: ['React', 'Next.js'] },
	{ title: 'Mobile', items: ['React Native'] },
	{ title: 'Back end', items: ['NestJS', 'REST APIs'] },
	{ title: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
];

export const capabilities: string[] = [
	'Front-end UI',
	'REST API',
	'Back-end projects',
	'AI',
];
