# Repository Guidelines

## Structure

- Next.js 16 App Router + React 19, TypeScript strict. `@/*` maps to `src/*` (see `tsconfig.json`; same alias in `vitest.config.mts`).
- `src/app/` holds routes, layouts, metadata, error boundaries, and `api/contact/route.ts`. Page sections live in `src/widgets/*/ui/*-section.tsx`; routes are `/`, `/about`, `/skills`, `/goals`, `/interests`, `/contact`.
- `src/entities/` is domain data, `src/features/` is client interactions, `src/shared/` is primitives plus `shared/config/site.ts` and `shared/lib/contact*.ts`.

## Commands

Use Bun and keep `bun.lock` in sync. No CI workflows exist, so verify locally.

- `bun install`, `bun run dev` (site at `http://localhost:3000`), `bun run lint`, `bun run build`, `bun run start`.
- `bun run test` runs Vitest once (node env, `tests/**/*.test.ts`); single file: `bun run test tests/contact.test.ts`.
- `bun run test:e2e` runs Playwright (`tests/e2e/`, projects `chromium` = Desktop Chrome and `mobile` = Pixel 7); it auto-starts `bun run dev` and reuses a running server locally. Single project: `bun run test:e2e --project=chromium`.
- Before submitting: `bun run lint` + `bun run test`; UI changes also need the relevant e2e project (desktop nav test is chromium-only, overflow test is mobile-only); production-sensitive changes also need `bun run build` with an HTTPS `NEXT_PUBLIC_SITE_URL`.

## Gotchas

- `NEXT_PUBLIC_SITE_URL` must be HTTPS in production or the build throws (`src/shared/config/site.ts`; falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`).
- Contact API (`src/app/api/contact/route.ts`, `runtime = 'nodejs'`) is security-sensitive: request `Origin` must equal `SITE_URL.origin` (403); JSON-only (415); 8 KB body cap (413); honeypot `website` field returns fake success; rate limit is 5 per 10 min via Upstash — missing Upstash env returns 503 in production but falls back to in-memory locally. Tests mock `@/shared/lib/contact-rate-limit` and stub global `fetch` (see `tests/contact.test.ts`).
- Field rules (`src/shared/lib/contact.ts`): name and message required (max 100 / 2000 chars); contact optional, email or `@Telegram` username (`@[A-Za-z]` + 4–31 word chars); Telegram send has an 8 s timeout.
- `next.config.ts` adds HSTS and CSP headers only in production — do not expect them in dev.
- Add `'use client'` only where hooks, browser APIs, handlers, or Framer Motion require it; motion must respect reduced motion (e2e asserts `.route-stage` / `.cube-3d` get `animation-name: none`).
- No Prettier or EditorConfig; match existing style: two-space indent, single quotes, semicolons, trailing commas; kebab-case files, PascalCase components/types, `use...` hooks. Interface copy is English with some Uzbek Latin strings — preserve them.
- Never commit secrets. Server env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (note: `.env.example` currently omits the Upstash vars — set them in deploy env anyway).
- Commits are short and imperative (e.g. `fix api route form`, `add theme mode light | dark | default`). PRs explain the change plus validation performed, with before/after screenshots for visual work.
