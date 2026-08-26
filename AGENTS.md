# Repository Guidelines

## Project Structure & Module Organization

This Next.js 16 App Router portfolio uses TypeScript. Routes, layouts, metadata, error boundaries, and the contact API live in `src/app/`. The remaining source follows a feature-sliced structure: primitives in `src/shared/`, domain data in `src/entities/`, interactions in `src/features/`, and page sections in `src/widgets/`. Import source modules through the `@/*` alias. Unit and API tests are in `tests/*.test.ts`; browser tests are in `tests/e2e/`. `DESIGN.md` defines the visual direction.

## Build, Test, and Development Commands

Use Bun and keep `bun.lock` in sync.

- `bun install` installs dependencies.
- `bun run dev` starts the local site at `http://localhost:3000`.
- `bun run lint` runs ESLint with Next.js Core Web Vitals and TypeScript rules.
- `bun run test` runs the Vitest suite once; `bun run test:watch` enables watch mode.
- `bun run test:e2e` runs Playwright against desktop Chromium and Pixel 7 profiles.
- `bun run build` creates the production build; `bun run start` serves it.

## Coding Style & Naming Conventions

Keep TypeScript strict and use two-space indentation, single quotes, semicolons, and trailing commas. Name components and exported types in PascalCase, hooks with `use...`, and files/directories in kebab-case (for example, `contact-modal-context.tsx`). Add `'use client'` only where hooks, browser APIs, handlers, or Framer Motion require it. Preserve Uzbek Latin interface copy and ensure motion respects reduced-motion preferences.

## Testing Guidelines

Vitest uses the Node environment and discovers `tests/**/*.test.ts`. Name tests after the behavior or module under test and mock external services such as Telegram or Upstash. Playwright specs use `*.spec.ts`; cover visible user flows and check both configured viewports when UI behavior changes. Before submitting, run `bun run lint`, `bun run test`, and the relevant Playwright suite. Production-sensitive changes should also pass `bun run build` with a valid HTTPS `NEXT_PUBLIC_SITE_URL`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `fix api route form` and `add theme mode light | dark | default`. Keep each commit focused. Pull requests should explain the change and validation performed, link any issue, and include before/after screenshots for visual work. Call out new environment variables or deployment steps explicitly.

## Security & Configuration

Never commit secrets. Configure `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` through local or deployment environment settings. Treat contact-form validation, origin checks, and rate limiting as security-sensitive code.
