# Abdulaziz Portfolio

## Commands

- Use Bun only: `bun install`, `bun run dev`, `bun run lint`, `bun run build`, and `bun run start`.
- Run `bun run lint` before `bun run build`; no test runner or focused-test command is configured.
- Next.js is pinned to 16.2.11: `next lint` is unavailable, and `next/image` uses `preload`, not `priority`. Consult `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

## Architecture

- `src/app/` is the App Router. `/`, `/about`, `/skills`, `/interests`, `/goals`, and `/contact` each render one fullscreen widget; route metadata uses `createPageMetadata()` from `src/shared/config/site.ts`.
- `SiteShell` owns the shared navbar and lazy-loaded contact modal. Trigger it with `useContactModal()` from `@/features/contact-modal/model/contact-modal-context`, not page-local state.
- Keep portfolio copy and collections in `src/entities/profile/model/profile-data.ts`; render that data from widgets.
- Use `FullscreenSection` for page widgets. It intentionally uses `min-h-svh` on mobile and `lg:h-svh` on desktop to prevent clipped mobile content.
- Import source files via `@/*`. Compose classes inline with `twMerge(clsx(...))`; do not add a shared `cn()` helper.
- `POST /api/contact` runs in the Node runtime and sends Telegram messages. It requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`; production canonical URLs, sitemap, and robots use `NEXT_PUBLIC_SITE_URL` (or Vercel's production URL fallback).

## UI

- Tailwind v4 is PostCSS-only (`@import "tailwindcss"` in `src/app/globals.css`); do not add a Tailwind config. Reuse its literal palette and `font-display-campaign` utility.
- `DESIGN.md` is the visual source of truth: use flat cards, pill CTAs, and the near-monochrome palette; do not add decorative shadows.
- User-facing copy and metadata are Uzbek (Latin); the document language is `uz`.
- Components with hooks, handlers, or Framer Motion need `'use client'`. Motion and custom 3D effects must respect reduced motion.
- Do not add code comments unless requested.
