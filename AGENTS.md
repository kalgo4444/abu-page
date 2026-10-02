# AGENTS.md — abu-page

Personal portfolio site. Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Package manager is **bun** (`packageManager: bun@1.4.2`).

## Commands

- `bun dev` — dev server
- `bun run build` — production build (also validates; no separate typecheck/test scripts exist)
- `bun run lint` — `biome check` (lint + format check)
- `bun run format` — `biome format --write` (only formatter, not full `check --write`)
- No test runner, no CI workflows, no `.env` files. Do not add test infra unprompted.

## Structure (Feature-Sliced Design)

- `src/app/` — routes + `layout.tsx` (font, header shell) + `globals.css`. Routes: `/`, `/about`, `/skills`, `/social`, `/contact`.
- `src/widgets/` — page sections: `header/`, `hero/`, `stack-list/`, `skills-grid/`, `social-list/`, `footer/`.
- `src/entities/` — content source of truth: `profile/model.ts` (name, links, socials), `skill/model.ts` (`skillGroups`, `capabilities`).
- `src/shared/ui/` — primitives: `Container`, `SectionHeading`, `ButtonLink`, `Badge`.
- `src/features/` — exists but empty; put interactive cross-widget logic there, not in `widgets/`.
- Path alias: `@/*` → `./src/*` (`tsconfig.json`).
- `next.config.ts`: `reactCompiler: true` — no manual `useMemo`/`useCallback` for perf.

## Content rules

- Never hardcode bio/stack/social data in components. Import from `@/entities/profile/model` or `@/entities/skill/model`. `docs/index.md` mirrors the same content for reference only.
- Profile links (`github`, `linkedin`, `telegram`, `email`) live in `profile.links`; `profile.socials` derives from them — update `links` only.

## Design system (binding — see DESIGN.md)

DESIGN.md is loaded via `opencode.json` instructions; follow it literally. Summary of non-obvious constraints:

- Mono-only type: Berkeley Mono → `IBM Plex Mono` (loaded in `layout.tsx` as `--font-mono`) → system mono stack. Never add sans/display/italic.
- Colors are Tailwind v4 `@theme` tokens in `globals.css` (`bg-canvas`, `text-ink`, `border-hairline`, `bg-surface-card`, etc.). Use tokens, never raw hex.
- Radius: `rounded-[4px]` on interactive elements only; `0px` on containers. No shadows/gradients.
- Iconography is ASCII text markers (`[+]`, `[x]`, `[·]`, `[menu]`/`[close]`) — never SVG icon libs.
- Keep `bg-canvas #fdfcfc` as the only page background; one dark surface (`bg-surface-dark`) per page max, if at all.

## Conventions

- Biome: 2-space indent, organize imports on (`biome.json`). Next + React lint domains enabled — fix `biome check` findings rather than disabling rules.
- Styling: Tailwind utilities inline; responsive pattern is `px-4 sm:px-6 lg:px-8`, `py-8 sm:py-12`, `hidden md:flex` + `[menu]` drawer (see `Header.tsx`).
- `Header` is client (`usePathname` active state); keep page/section components as server components unless interactivity requires otherwise.
