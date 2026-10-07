import { describe, expect, it } from 'vitest';
import { profile } from '../../src/data/profile';

describe('profile', () => {
	it('has the identity fields the pages print', () => {
		expect(profile.name.startsWith(profile.firstName)).toBe(true);
		expect(profile.role).not.toBe('');
		expect(profile.location).not.toBe('');
		expect(Number.isInteger(profile.age)).toBe(true);
		expect(profile.headline).not.toBe('');
		expect(profile.summary).not.toBe('');
	});

	it('has stack groups with unique labels and at least one item each', () => {
		const labels = profile.stack.map(group => group.label);
		expect(new Set(labels).size).toBe(labels.length);
		for (const group of profile.stack) expect(group.items.length).toBeGreaterThan(0);
	});

	// about.astro and stack.astro look this group up by label.
	it('has a Databases stack group', () => {
		expect(profile.stack.find(group => group.label === 'Databases')?.items.length).toBeGreaterThan(0);
	});

	it('has skills with a name and a detail', () => {
		expect(profile.skills.length).toBeGreaterThan(0);
		for (const skill of profile.skills) {
			expect(skill.name).not.toBe('');
			expect(skill.detail).not.toBe('');
		}
	});

	it('has links with unique labels and https or mailto hrefs', () => {
		const labels = profile.links.map(link => link.label);
		expect(new Set(labels).size).toBe(labels.length);
		for (const link of profile.links) {
			expect(['https:', 'mailto:']).toContain(new URL(link.href).protocol);
			expect(link.text).not.toBe('');
		}
	});

	// index.astro looks this link up by label for the hero button.
	it('has a GitHub link', () => {
		expect(profile.links.find(link => link.label === 'GitHub')).toBeDefined();
	});

	it('shows each link text as its href without the scheme', () => {
		for (const link of profile.links) {
			const bare = link.href.replace(/^(https:\/\/(www\.)?|mailto:)/, '');
			expect(link.text).toBe(bare);
		}
	});

	it('has projects with a name and a description', () => {
		for (const project of profile.projects) {
			expect(project.name).not.toBe('');
			expect(project.description).not.toBe('');
			if (project.href) expect(new URL(project.href).protocol).toBe('https:');
		}
	});
});
