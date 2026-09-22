# Abdulaziz Portfolio

Personal portfolio of Abdulaziz, Software Engineer — built with Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion.

Pages: Home, About, Skills, Goals, Interests, Contact — plus a contact modal that sends messages via Telegram.

## Getting started

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

The site runs at `http://localhost:3000`.

## Scripts

| Command              | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `bun run dev`        | Start the dev server                                      |
| `bun run build`      | Production build (needs HTTPS `NEXT_PUBLIC_SITE_URL`)     |
| `bun run start`      | Serve the production build                                |
| `bun run lint`       | ESLint (Next.js Core Web Vitals + TypeScript)             |
| `bun run test`       | Vitest suite once (`bun run test <file>` for a single file) |
| `bun run test:e2e`   | Playwright on Desktop Chrome + Pixel 7                    |

## Environment variables

Copy `.env.example` to `.env` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=https://example.uz
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
CONTEXT7_API_KEY=...
```

- `NEXT_PUBLIC_SITE_URL` — production domain for canonical URLs, sitemap, and metadata. Must be HTTPS in production or the build fails.
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — where contact-form messages are delivered via the Telegram Bot API.

## Contact form

`POST /api/contact` validates name/message length, accepts an email or `@Telegram` username as contact, checks the request origin, and enforces rate limiting before forwarding to Telegram.

## Project structure

- `src/app/` — routes, layouts, metadata, sitemap/robots, contact API
- `src/widgets/` — page sections (`hero`, `about`, `skills`, `goals`, `interests`, `contact`, `navbar`)
- `src/features/` — theme toggle (light / dark / system), contact modal, skill filter
- `src/entities/` — domain data
- `src/shared/` — UI primitives, site config, contact validation/rate-limit helpers
- `tests/` — Vitest suite (`contact.test.ts`) and Playwright specs (`e2e/`)
