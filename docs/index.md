# Abdulaziz Abdugafurov

**Software Engineer** · 19 · Tashkent, Uzbekistan

Full-stack engineer and university student building web, mobile, and AI-powered products.

## Stack

- **Languages:** JavaScript, TypeScript
- **Front end:** React, Next.js
- **Mobile:** React Native
- **Back end:** NestJS, REST APIs
- **Databases:** PostgreSQL

## Skills

Front-end UI · REST API · Back-end projects · AI

---

# About this project

`abu-page` is my personal site: a small static site with five pages (Home, About, Skills, Stack, Contact) and a Projects page that turns on once there is a project to list. It is built with Astro and ships almost no JavaScript. The only client code is the page transitions and the light/dark theme toggle.

The profile above is the content of the site. It is transcribed into `src/data/profile.ts`, and every page is a thin template over that one file.

## How it is made

1. **Write the content here first.** Name, role, location, stack, and skills go in the profile section of this file.
2. **Transcribe it into `src/data/profile.ts`.** That file is the single data source. Links (GitHub, LinkedIn, Telegram, Email) and projects live there too.
3. **Pages read from the profile.** Each file in `src/pages/` wraps `src/layouts/Layout.astro` and prints fields from `profile`. Only the connecting prose is written in the page itself.
4. **Shared pieces are components.** `Nav.astro` (desktop bar and mobile dock), `ThemeToggle.astro`, and `PixelWord.astro` (the pixel wordmark in the nav).
5. **Styles come from tokens.** `DESIGN.md` is the visual spec, and its tokens are CSS custom properties at the top of `src/styles/global.css`.
6. **Test, then build.** Unit tests render components to HTML; e2e tests drive a real browser. `bun run build` writes the static site to `dist/`.

To run it:

```sh
bun install
bun run dev        # http://localhost:4321
bun run build      # static build to dist/
bun run test       # unit tests
bun run test:e2e   # browser tests, needs a running server
```

Changing the profile means updating three places: this file, `src/data/profile.ts`, and the expected values hardcoded in `tests/e2e/test_site.py`.

## Stack and tools used in this project

This is separate from the stack in my profile. The site itself is not React or Next.js.

- **Framework:** Astro last version, static output, no UI framework, no content collections
- **Language:** TypeScript, in `.astro` components
- **Styling:** plain CSS with custom properties, one global stylesheet plus scoped `<style>` per page
- **Font:** JetBrains Mono, loaded through Astro's fonts API (Fontsource)
- **Navigation:** Astro `<ClientRouter />` view transitions
- **Package manager:** Bun (`bun.lock`), Node 22.12 or newer
- **Unit tests:** Vitest 5 with Astro's container API
- **E2E tests:** Playwright for Python (1.63), Chromium, run as a plain script from `.venv/`
- **Formatting:** `.prettierrc` rules (tabs, single quotes, semicolons), applied by the editor
- **Version control:** Git, code on GitHub

There is no lint or typecheck script, no database, and no backend.

## Design and UI rules

The look is a monospace, manpage-style system modelled on OpenCode's site. `DESIGN.md` has the full spec. The rules I follow:

- **One typeface.** JetBrains Mono everywhere, for headings, body, and buttons.
- **ASCII markers, not icons.** Lists use `[+]` and `[-]` instead of bullets or icon fonts.
- **Flat surfaces.** 1px hairline rules, 4px radius on interactive elements, no cards, no shadows.
- **Tokens only.** Colors and spacing come from the variables in `:root` (`--canvas`, `--ink`, `--body`, `--mute`, `--hairline`, `--space-xs` to `--space-section`). No literal hex values in pages.
- **Light by default.** Dark mode is opt-in through the toggle and remembered in `localStorage`. The OS preference is not used. Every color token needs a value in both themes.
- **One list pattern.** `.row` is a three-column grid: marker, bold label, detail. Skills, Contact, and Projects all use it.
- **Short motion.** Transitions run 0.15s to 0.3s and are switched off under `prefers-reduced-motion`.
- **Narrow column.** Content sits in a 960px column with a 24px gutter.
- **Responsive breakpoints:** 1024px, 850px, 768px, 640px. At 768px and below the desktop links hide and a bottom dock takes over navigation.

Two deliberate exceptions: the mobile dock uses SVG icons, a rounded pill, and a drop shadow, and the Stack page draws a bordered table with chips.

## AI tools

The site is built with AI coding agents, with me directing and reviewing the work.

- **Claude Code** is the main tool. It writes and edits the code, runs the tests, and keeps the docs current.
- **`AGENTS.md`** is the instruction file for agents: commands, architecture, and conventions. `CLAUDE.md` is a symlink to it, so any agent that reads either name gets the same guidance.
- **`DESIGN.md`** doubles as the design brief for the agent, so generated UI follows the same tokens and rules.
