import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import Nav from '../../src/components/Nav.astro';
import PixelWord from '../../src/components/PixelWord.astro';
import PulseBeams from '../../src/components/PulseBeams.astro';
import ThemeToggle from '../../src/components/ThemeToggle.astro';
import { profile } from '../../src/data/profile';

let container: AstroContainer;
beforeAll(async () => {
	container = await AstroContainer.create();
});

const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0;

describe('PixelWord', () => {
	it('sizes the viewBox to the glyphs plus one column between them', async () => {
		const html = await container.renderToString(PixelWord, { props: { text: 'ABU' } });
		expect(html).toContain('viewBox="0 0 14 5"');
	});

	it('merges each horizontal run of cells into one rect', async () => {
		// I is ###, .#., .#., .#., ### — one run per row.
		const html = await container.renderToString(PixelWord, { props: { text: 'I' } });
		expect(html).toContain('viewBox="0 0 3 5"');
		expect(count(html, /<rect/g)).toBe(5);
		expect(html).toMatch(/<rect[^>]*x="0"[^>]*y="0"[^>]*width="3"/);
		expect(html).toMatch(/<rect[^>]*x="1"[^>]*y="1"[^>]*width="1"/);
	});

	it('offsets later glyphs past the earlier ones', async () => {
		// Second I starts at column 4 (3 wide + 1 gap).
		const html = await container.renderToString(PixelWord, { props: { text: 'II' } });
		expect(html).toContain('viewBox="0 0 7 5"');
		expect(html).toMatch(/<rect[^>]*x="4"[^>]*y="0"[^>]*width="3"/);
	});

	it('accepts lowercase text', async () => {
		const upper = await container.renderToString(PixelWord, { props: { text: 'ABU' } });
		const lower = await container.renderToString(PixelWord, { props: { text: 'abu' } });
		expect(count(lower, /<rect/g)).toBe(count(upper, /<rect/g));
	});

	it('labels the image with the text unless a label is given', async () => {
		const plain = await container.renderToString(PixelWord, { props: { text: 'ABU' } });
		expect(plain).toContain('aria-label="ABU"');
		const labelled = await container.renderToString(PixelWord, {
			props: { text: 'ABU', label: 'Abu' },
		});
		expect(labelled).toContain('aria-label="Abu"');
	});

	it('has a glyph for every letter of the first name', async () => {
		const html = await container.renderToString(PixelWord, { props: { text: profile.firstName } });
		expect(html).toContain('<svg');
	});

	it('throws on a character with no glyph', async () => {
		await expect(container.renderToString(PixelWord, { props: { text: 'AX' } })).rejects.toThrow(
			'no glyph for "X"',
		);
	});
});

describe('ThemeToggle', () => {
	it('renders a theme toggle button with accessible label', async () => {
		const html = await container.renderToString(ThemeToggle);
		expect(html).toContain('class="theme-toggle"');
		expect(html).toContain('aria-label="Switch to dark mode"');
	});

	it('renders ASCII brackets and slider track', async () => {
		const html = await container.renderToString(ThemeToggle);
		expect(html).toContain('[');
		expect(html).toContain(']');
		expect(html).toContain('class="track"');
		expect(html).toContain('class="thumb"');
	});

	it('defaults to light mode label', async () => {
		const html = await container.renderToString(ThemeToggle);
		expect(html).toContain('label-light');
		expect(html).toContain('light');
	});
});

describe('Nav', () => {
	const render = (path: string) =>
		container.renderToString(Nav, { request: new Request(`http://localhost${path}`) });
	const currentLinks = (html: string) =>
		[...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*aria-current="page"/g)].map(match => match[1]);

	it('links to every page, in the bar and in the drawer', async () => {
		const html = await render('/');
		for (const href of ['/about', '/skills', '/stack']) {
			expect(count(html, new RegExp(`href="${href}"`, 'g'))).toBe(2);
		}
		expect(count(html, /href="\/contact"/g)).toBe(1);
	});

	it('includes the theme toggle in the header', async () => {
		const html = await render('/');
		expect(html).toContain('class="theme-toggle"');
	});

	it('marks no link as current on the home page', async () => {
		expect(currentLinks(await render('/'))).toEqual([]);
	});

	it('marks the current page in both the bar and the drawer', async () => {
		expect(currentLinks(await render('/skills'))).toEqual(['/skills', '/skills']);
	});

	it('ignores a trailing slash when matching the current page', async () => {
		expect(currentLinks(await render('/stack/'))).toEqual(['/stack', '/stack']);
	});

	it('marks the contact button as current on the contact page', async () => {
		expect(currentLinks(await render('/contact'))).toEqual(['/contact']);
	});

	it('shows the Projects link only when there are projects', async () => {
		const html = await render('/');
		expect(html.includes('href="/projects"')).toBe(profile.projects.length > 0);
	});
});

describe('PulseBeams', () => {
	it('renders a canvas and background container with persist attribute', async () => {
		const html = await container.renderToString(PulseBeams);
		expect(html).toContain('id="pulse-beams-bg"');
		expect(html).toContain('id="pulse-beams-canvas"');
		expect(html).toContain('aria-hidden="true"');
		expect(html).toContain('data-astro-transition-persist="pulse-beams"');
	});
});

