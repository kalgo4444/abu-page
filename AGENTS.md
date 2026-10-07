# AGENTS.md — abu-page

Personal portfolio site. Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Package manager is **bun** (`packageManager: bun@1.4.2`).

## Commands

- `bun dev` — dev server
- `bun run build` — production build (also validates; no separate typecheck/test scripts exist)
- `bun run lint` — `biome check` (lint + format check)
- `bun run format` — `biome format --write` (only formatter, not full `check --write`)
- No JS test runner, no CI workflows, no `.env` files. Do not add test infra unprompted.
- E2E (Playwright, Python) lives in `e2e/test_app.py`; run it with the server helper:
  `python .agents/skills/webapp-testing/scripts/with_server.py --server "bun dev --port 3000" --port 3000 -- python e2e/test_app.py`. It hardcodes a copy of the profile/skill content on purpose — update it when `entities/` content changes.

## Structure (Feature-Sliced Design)

Layers import downward only: `app` → `widgets` → `features` → `entities` → `shared`. Every slice is `<slice>/{ui,model,lib}/…` plus an `index.ts` public API; import a slice through its index (`@/widgets/hero`, `@/entities/profile`), never its internals. Inside a slice use relative imports.

- `src/app/` — routes + `layout.tsx` (font, header, page shell: padding + desktop vertical centering) + `globals.css`. Routes: `/`, `/about`, `/skills`, `/social`, `/contact` (redirects to `/social`). Pages only compose; they add no shell classes of their own.
- `src/widgets/` — page sections: `header/`, `hero/`, `skills-grid/`, `social-list/`, `footer/`.
- `src/entities/` — content source of truth: `profile/model/profile.ts` (name, bio fields, links, socials), `skill/model/skills.ts` (`skillGroups`, `capabilities`). Entity-bound UI lives beside it: `skill/ui/` (`CapabilityList`, `StackRows`).
- `src/shared/ui/` — primitives with no content knowledge: `Container`, `SectionHeading`, `ButtonLink`. `src/shared/lib/` — helpers (`externalLinkProps`). `shared` never imports from `entities`.
- `src/features/` — not created yet; add it for interactive cross-widget logic instead of putting that in `widgets/`.
- Path alias: `@/*` → `./src/*` (`tsconfig.json`).
- `next.config.ts`: `reactCompiler: true` — no manual `useMemo`/`useCallback` for perf.

## Content rules

- Never hardcode bio/stack/social data in components. Import from `@/entities/profile` or `@/entities/skill`. `docs/index.md` mirrors the same content for reference only.
- Profile links (`github`, `linkedin`, `telegram`, `email`) live in `profile.links`; `profile.socials` derives from them — update `links` only.

## Design system (binding — see DESIGN.md)

DESIGN.md is loaded via `opencode.json` instructions; follow it literally. Summary of non-obvious constraints:

- Mono-only type: Berkeley Mono → `IBM Plex Mono` (loaded in `layout.tsx` as `--font-mono`) → system mono stack. Never add sans/display/italic.
- Colors are Tailwind v4 `@theme` tokens in `globals.css` (`bg-canvas`, `text-ink`, `border-hairline`, `bg-surface-card`, etc.). Use tokens, never raw hex.
- Radius: `rounded-[4px]` on interactive elements only; `0px` on containers. No shadows/gradients.
- Iconography is ASCII text markers (`[+]`, `[x]`, `[·]`, `[menu]`/`[close]`) — never SVG icon libs.
- Keep `bg-canvas #fdfcfc` as the only page background; one dark surface (`bg-surface-dark`) per page max, if at all.

## Conventions

- Formatting is in conflict: `.prettierrc` (tabs, single quotes, `arrowParens: avoid`) was used for the last reformat, but `biome.json` enforces 2-space indent, so `bun run lint` currently fails (~34 errors, mostly format). Don't mass-reformat; match the style of the file you edit and resolve the conflict only if asked.
- Biome: organize imports on (`biome.json`). Next + React lint domains enabled — fix `biome check` findings rather than disabling rules.
- Styling: Tailwind utilities inline; responsive pattern is `px-4 sm:px-6 lg:px-8`, `py-8 sm:py-12`, `hidden md:flex` + `[menu]` drawer (see `Header.tsx`).
- `Header` is client (`usePathname` active state); keep page/section components as server components unless interactivity requires otherwise.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
