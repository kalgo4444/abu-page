# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`CLAUDE.md` is a symlink to `AGENTS.md`; this file is the one to edit.

## Commands

Bun is the package manager (`bun.lock`). Node >= 22.12.

```sh
bun install
bun run build                 # static build to dist/
bun run preview               # serve the build

bun run test                  # unit tests (vitest), no server needed
bunx vitest run tests/unit/profile.test.ts     # one file
bunx vitest run -t 'has a GitHub link'         # one test by name

bun run test:e2e              # Playwright (Python), needs a running server
bun run test:e2e contact_lists stack_lists   # only tests whose function name contains one of the words
```

Start the dev server in background mode, and manage it with the matching subcommands:

```sh
astro dev --background        # http://localhost:4321
astro dev status | logs | stop
```

There is no lint or typecheck script. Formatting follows `.prettierrc` (tabs, single quotes, semicolons, no parens on single-arg arrows), but Prettier is not a dependency.

### E2E setup

The e2e suite is a plain Python script, not pytest. It expects a venv at `.venv/` (gitignored):

```sh
python3 -m venv .venv
.venv/bin/pip install -r tests/e2e/requirements.txt
.venv/bin/playwright install chromium
```

`BASE_URL` overrides the target (default `http://localhost:4321`) and `SHOTS_DIR` the screenshot directory (default `/tmp/abu-page-e2e`). A test fails on any console error, page error, or failed request, not only on its own assertions. Tests register with `@test()` or `@test("mobile")`, which picks the 1280x800 or 375x740 viewport.

## Architecture

A static Astro 7 personal site with no UI framework, no content collections, and no hand-written client JS. The only script shipped is Astro's `<ClientRouter />` in `Layout.astro`, which turns page loads into view transitions. Astro docs: https://docs.astro.build

**One data source.** `src/data/profile.ts` holds every fact the site prints. Pages are thin templates over it, so content changes go there, not into page markup. `docs/index.md` is the human-written source that `profile.ts` was transcribed from.

Pages look some entries up by label, so these are load-bearing:

- `stack` group labelled `Databases`: used by `about.astro`
- `links` entry labelled `GitHub`: used by the hero button in `index.astro`
- each link's `text` must equal its `href` minus the scheme and `www.` (asserted in `tests/unit/profile.test.ts`)

**Projects is conditional.** While `profile.projects` is empty, `Nav.astro` omits the Projects link and `projects.astro` redirects to `/`. Adding one entry turns both on.

**Duplicated expectations.** `tests/e2e/test_site.py` hardcodes the name, page titles, headings, link hrefs, and skill and stack lists (`PAGES`, `LINKS`, and inline lists). Changing `profile.ts` or a page title means updating that file as well.

**Layout and nav.** Every page wraps `src/layouts/Layout.astro` (takes `title` and `description`), which renders `Nav` and a `<main>` slot. `Nav.astro` renders two navs from two separate link lists:

- `header.nav` with `nav.links` (desktop bar) and the Contact button
- `nav.mobile-dock`, a fixed bottom pill shown at 768px and below, which adds a Home tab and has no Contact entry

So each of `/about`, `/skills`, `/stack` appears twice in the markup and `/contact` once, and the unit tests count on that. A new page has to be added to both `desktopLinks` and `mobileLinks` (plus an icon branch for the dock). `global.css` reserves `padding-bottom: 84px` on `body` at the same breakpoint so the dock never covers content.

`aria-current` matching strips a trailing slash because built pages have one and dev pages do not. The dock's active tab is styled off `aria-current='page'`, not a class.

**View transitions.** Because of `<ClientRouter />`, navigation swaps the document in place: `<main>` fades (`transition:animate`), while the header and dock keep their `transition:name` and persist. Anything that relies on a full page load (a script that runs once, state reset on navigation) needs the `astro:page-load` event instead.

**PixelWord.** The nav wordmark is an SVG built from 5-row ASCII bitmaps in the `GLYPHS` map in `src/components/PixelWord.astro`. Only A, B, D, I, L, U, Z exist, and an unknown character throws at render. A unit test requires a glyph for every letter of `profile.firstName`.

**Unit tests** render components to HTML strings with `experimental_AstroContainer` and assert with regexes. `vitest.config.ts` uses Astro's `getViteConfig` so `.astro` imports resolve.

## Design system

`DESIGN.md` is the visual spec (a monospace, manpage-style system modelled on OpenCode's site). Its tokens are implemented as CSS custom properties at the top of `src/styles/global.css`; use those variables rather than literal colors or spacing. `DESIGN.md` names more tokens than `:root` defines (`--surface-soft` and `--space-xs` are not there, for example), and an undefined `var()` fails silently, so check `:root` before using one. Shared classes (`.container`, `.page`, `.row`, `.btn`, `.prose`) live there too, with page-specific rules in each file's scoped `<style>`.

Conventions that come from the spec:

- One typeface everywhere: JetBrains Mono via Astro's fonts API (`astro.config.mjs`, exposed as `--font-mono`), standing in for Berkeley Mono.
- ASCII bracket markers (`[+]`, `[-]`) instead of icons or bullets.
- 4px radius on interactive elements, 1px hairline rules, no cards or shadows.
- The mobile dock is the one deliberate exception to the two rules above: inline SVG icons, a fully rounded pill, and a drop shadow.
- Motion is short (0.15s to 0.3s) and `global.css` cancels all animation and transitions under `prefers-reduced-motion: reduce`.
- Breakpoints in use: 1024px, 850px, 768px (nav collapses to the drawer), 640px.
