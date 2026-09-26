# AGENTS.md — abu-page (Abdulaziz Portfolio)

Next.js 16 App Router + React 19 + TypeScript strict + Tailwind v4. Package manager is **Bun only** (`bun.lock`); never use npm/yarn.

## Commands

```sh
bun install
bun run dev    # http://localhost:3000
bun run lint   # eslint (next core-web-vitals + TS)
bun run test   # vitest run once
bun run test tests/contact.test.ts   # single file
bun run test:e2e                       # Playwright, both projects
bun run test:e2e --project=chromium
bun run build  # requires HTTPS NEXT_PUBLIC_SITE_URL (see Env)
bun run start
```

No CI; verify locally. For UI changes run `lint` + `test` + relevant e2e project; for prod-sensitive changes also `build` with HTTPS URL. Verified: `test` (6 passed) and `lint` (clean).

## Env & build gotchas

- Copy `.env.example` → `.env`. Never commit secrets.
- `src/shared/config/site.ts`: `NEXT_PUBLIC_SITE_URL` ?? `https://$VERCEL_PROJECT_PRODUCTION_URL` ?? `http://localhost:3000`. Production build **throws** if unset or non-HTTPS.
- `.env.example` is incomplete: production also needs `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for rate limiting (missing → contact API 503 in prod, in-memory fallback locally).
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` missing → contact API 503; Telegram failure/timeout (8 s) → 502.

## Architecture (FSD-lite, `@/*` → `src/*`)

- `src/app/` — routes (`/`, `/about`, `/skills`, `/goals`, `/interests`, `/contact`), `layout.tsx`, `template.tsx`, `error.tsx`/`global-error.tsx`/`not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `api/contact/route.ts` (`runtime = 'nodejs'`).
- `src/widgets/*/ui/*-section.tsx` — page sections (`hero`, `about`, `skills`, `goals`, `interests`, `contact`, `navbar`, `site-shell`). Shell: `SiteShell` = `ThemeProvider` + `Navbar` + `main#main-content` + `InteractiveBackground` + lazy `ContactModal`.
- `src/entities/profile/model/profile-data.ts` — single source of truth for page copy (`PROFILE_DATA`); skill status is `know | use | learning`.
- `src/features/` — `theme`, `contact-modal`, `skill-filter` (client interactions only).
- `src/shared/` — `ui/*` primitives (`button`, `badge`, `card`, `container`, `fullscreen-section`, `interactive-background`, `live-wallpaper`, `tech-gyroscope`), `config/site.ts`, `lib/contact*.ts`.
- Extended content/design reference: `docs/index.md`.

## Contact API contract (`POST /api/contact`)

Order matters: origin check → rate limit → content-type → body size → parse → honeypot → validation → Telegram. Status codes: 403 bad `Origin` (must equal `SITE_URL.origin`), 429 with `Retry-After` + `X-RateLimit-*`, 415 non-JSON, 413 body > 8 KB (`MAX_BODY_SIZE = 8192`), 400 bad JSON / missing name+message / over length (name 100, contact 200, message 2000) / bad contact, 503 missing Telegram env or missing Upstash in prod, 502 Telegram error.
- `contact` is optional; when present must be email or Telegram `@` + letter + 4–31 word chars (`src/shared/lib/contact.ts`). `readText()` trims.
- Honeypot `website`: non-empty returns fake `{ success: true }`, do not "fix".
- Rate limit 5 req / 10 min per IP (`x-vercel-forwarded-for` → `x-real-ip` → `anonymous`), Upstash sliding window (`src/shared/lib/contact-rate-limit.ts`).
- Tests mock `@/shared/lib/contact-rate-limit`; set `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` + stub `fetch` in `beforeEach` (see `tests/contact.test.ts`).

## Testing

- Vitest: `environment: 'node'`, `include: ['tests/**/*.test.ts']`, `@` alias configured in `vitest.config.mts`.
- Playwright (`playwright.config.ts`): `testDir ./tests/e2e`, `baseURL http://localhost:3000`, auto-starts `bun run dev` (`reuseExistingServer: !CI`). Projects: `chromium` (Desktop Chrome), `mobile` (Pixel 7).
- E2E enforces: modal opens via `Contact` button (`role=dialog`), desktop nav marks `aria-current="page"` + refocuses `#main-content`, mobile hides desktop nav + zero horizontal overflow, `prefers-reduced-motion: reduce` sets `.route-stage`/`.cube-3d` animation to `none`. Keep these selectors/behaviors stable.

## Theme, styling, a11y

- Theme via `html[data-theme]` + CSS vars in `src/app/globals.css` (`--canvas`, `--surface`, `--ink`, etc.). No-flash inline `<script>` in `layout.tsx` reads `localStorage.theme` → `prefers-color-scheme`. `ThemeProvider` syncs `dataset.theme` + `localStorage`.
- Dark mode remaps intentional inverse sections through `.theme-page` / `.theme-chrome` overrides — do not hardcode light hexes or remove those wrappers.
- Decorative animation is off under `prefers-reduced-motion: reduce`, `prefers-reduced-transparency: reduce` (kills `backdrop-blur`), and below `1024px`. Preserve those media queries.
- A11y: skip link, `main#main-content` refocus on route change, modal background `inert` + `aria-hidden`. `'use client'` only where hooks/browser APIs/handlers/Framer Motion require it.
- Copy is English with some Uzbek Latin strings — preserve verbatim.
- SEO: per-page `createPageMetadata()` (canonical + OG + Twitter) with `metadataBase: SITE_URL`; `sitemap.ts` / `robots.ts` (`/api/` disallowed) derive from `SITE_URL`.
- Security headers in `next.config.ts`: always `nosniff`, `DENY`, `Referrer-Policy`, `Permissions-Policy`; HSTS + CSP production-only.

## Style

Two-space indent, single quotes, semicolons, trailing commas. kebab-case files, PascalCase components/types, `use…` hooks. Fonts via `next/font` (Bebas Neue `--font-display`, Inter `--font-sans`, JetBrains Mono `--font-mono`); display headlines use `.font-display-campaign` (uppercase, `line-height: 0.9`). Commits short + imperative.
