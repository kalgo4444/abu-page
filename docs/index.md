# Abu Page — Abdulaziz Portfolio

Personal site of Abdulaziz, Software Engineer from Tashkent, Uzbekistan. It presents who he is, what he does, what he is learning, and where he is headed.

## Who is Abdulaziz

- Software Engineer, 3rd-year Software Engineering (SW) student at a private university in Uzbekistan, IT Faculty.
- Builds fast, clean, and user-friendly web and mobile apps.
- Learns by doing: university classes plus self-study, real projects, and modern AI tools.
- Open to projects and teamwork. Based in Tashkent, UZB.
- Bio: "I'm Abdulaziz, a Software Engineer. I build fast, simple, and user-friendly web and mobile apps."

## What this site covers

- **Home** (`/`) — Introduction: name, role, short pitch, links to About and Contact.
- **About** (`/about`) — Study and coding journey: university, major, level, plus a student profile card.
- **Skills** (`/skills`) — What he works with, grouped into Software Engineering and AI Tools & Dev Ecosystem, marked as what he knows vs. actively uses.
- **Goals** (`/goals`) — Roadmap: professional growth, own products, global work, freedom and travel.
- **Interests** (`/interests`) — What inspires him outside of tasks: apps, AI, servers, healthy life.
- **Contact** (`/contact`) — "Let's build together." For websites, mobile apps, Next.js projects, or AI dev tooling inquiries.

Single source of truth for page copy is `src/entities/profile/model/profile-data.ts` (`PROFILE_DATA`: bio, education, `skills`, `goals`, `interests`, `contacts`).

## Skills in focus

Software Engineering:

- React.js, Next.js (App Router), React Native (Expo), TypeScript as daily tools.
- JavaScript (ES6+), HTML5 / CSS3, Tailwind CSS, REST API integration as foundations.

AI & dev workflow:

- AI agents and LLM integration, OpenCode / Codex / MCP workflow.
- Linux / VPS server management, Git & GitHub workflow.
- Local AI models via Ollama / LM Studio.

Skill status values are `know | use | learning` (`SkillStatus` in `profile-data.ts`).

## Goals roadmap

1. **Professional Software Engineer** — Main Goal. Strong React / Next.js / React Native / TypeScript dev with great UX.
2. **My Own IT Products** — Growth. Build and launch apps that solve real user problems.
3. **Global Companies** — Career. Grow with a strong team at global scale.
4. **Freedom & Travel** — Life. Travel more, learn more, share knowledge.

## Interests

- **Web & Mobile Apps** — Fast, clean apps with React Native / Expo.
- **AI Agents & MCP** — Working faster with AI dev tools.
- **VPS & Linux** — Servers and local AI model environments.
- **Sport & Healthy Life** — Regular workouts and a fresh mind.

## Contact

Visitors can send a message with name, contact (email or Telegram username), and message. Social links for GitHub, Telegram, LinkedIn, and email are shown when available.

Contact API is `POST src/app/api/contact/route.ts` (`runtime = 'nodejs'`), delivered via Telegram Bot API (`https://api.telegram.org/bot<token>/sendMessage`, 8 s timeout):

- `Origin` must equal `SITE_URL.origin`, else 403.
- JSON-only (`Content-Type: application/json`), else 415. Body cap 8 KB, else 413.
- Honeypot `website` field: non-empty returns fake `{ success: true }`.
- Validation (`src/shared/lib/contact.ts`): name required max 100, message required max 2000, contact optional max 200 and must be email (`user@host.tld`) or Telegram username (`@` + letter + 4–31 word chars).
- Rate limit 5 requests / 10 min via Upstash Redis (`src/shared/lib/contact-rate-limit.ts`); 429 with `Retry-After` / `X-RateLimit-*`. Missing Upstash env returns 503 in production, in-memory fallback locally.
- Missing `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` returns 503; Telegram non-OK / network error returns 502.

---

## Stack

- **Framework:** Next.js 16 App Router + React 19 (`next@16.3.5`, `react@19.3.0`). TypeScript strict (`tsconfig.json`, `@/*` → `src/*`).
- **Styling:** Tailwind CSS v4 (`tailwindcss@4`, `@tailwindcss/postcss`, `@import "tailwindcss"` in `src/app/globals.css`) + `clsx` + `tailwind-merge`.
- **Fonts (next/font):** Bebas Neue (`--font-display`), Inter (`--font-sans`), JetBrains Mono (`--font-mono`), all `latin` + `latin-ext`, `display: swap` (`src/app/layout.tsx`).
- **Motion / icons / effects:** `framer-motion@12`, `lucide-react@1.46`, `canvas-confetti@1.9`.
- **Contact backend:** `@upstash/redis` + `@upstash/ratelimit` (rate limit), native `fetch` to Telegram Bot API.
- **Runtime / package manager:** Bun (`bun.lock` kept in sync). No CI; verify locally.
- **Testing:** Vitest (`vitest.config.mts`, node env, `tests/**/*.test.ts`) + Playwright (`playwright.config.ts`, `chromium` = Desktop Chrome, `mobile` = Pixel 7, auto-starts `bun run dev`).
- **Lint:** ESLint + `eslint-config-next` (`bun run lint`).

## Tools & commands

```sh
bun install
bun run dev    # http://localhost:3000
bun run lint
bun run test             # vitest run once
bun run test tests/contact.test.ts   # single file
bun run test:e2e         # Playwright, both projects
bun run test:e2e --project=chromium
bun run build  # needs HTTPS NEXT_PUBLIC_SITE_URL in production
bun run start
```

- **Dev workflow:** OpenCode / Codex / MCP agent workflow, local models via Ollama / LM Studio, Linux / VPS server management, Git & GitHub.
- **Env (server secrets never committed):** `NEXT_PUBLIC_SITE_URL` (required HTTPS in production, falls back to `VERCEL_PROJECT_PRODUCTION_URL` then `http://localhost:3000` — see `src/shared/config/site.ts`), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Note: `.env.example` currently lists only `NEXT_PUBLIC_SITE_URL`, Telegram vars, and `CONTEXT7_API_KEY` — set Upstash vars in deploy env anyway.

## Project structure

- `src/app/` — routes, `layout.tsx`, `template.tsx`, metadata, `error.tsx` / `global-error.tsx` / `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `api/contact/route.ts`. Routes: `/`, `/about`, `/skills`, `/goals`, `/interests`, `/contact`.
- `src/widgets/*/ui/*-section.tsx` — page sections (`hero`, `about`, `skills`, `goals`, `interests`, `contact`, `navbar`, `site-shell`).
- `src/entities/` — domain data (`profile/model/profile-data.ts`).
- `src/features/` — client interactions (`theme`, `contact-modal`, `skill-filter`).
- `src/shared/` — primitives (`shared/ui/*`: `button`, `badge`, `card`, `container`, `fullscreen-section`, `interactive-background`, `live-wallpaper`, `tech-gyroscope`) plus `shared/config/site.ts` and `shared/lib/contact*.ts`.
- Global shell: `SiteShell` (`ThemeProvider` + `Navbar` + `main#main-content` + `InteractiveBackground` + lazy `ContactModal`).

## Design rules

### Typography

- Display: `.font-display-campaign` — Bebas Neue / Impact fallback, `uppercase`, `line-height: 0.9`, `letter-spacing: 0`. Used for campaign headlines.
- Brand body: `.font-brand` — Inter system stack. Mono: `.font-mono` — JetBrains Mono.
- Copy is English with some Uzbek Latin strings — preserve them verbatim.

### Theme & color tokens

- Light / dark via `html[data-theme]` + CSS vars in `src/app/globals.css`: `--canvas`, `--surface`, `--surface-muted`, `--ink`, `--text-subtle`, `--text-muted`, `--border`, `--border-soft`, `--inverse-surface`, `--ambient-*`. Light canvas `#ffffff` / ink `#111111`; dark canvas `#111111` / ink `#ffffff`.
- No-flash init: inline `<script>` in `layout.tsx` `<head>` reads `localStorage.theme`, falls back to `prefers-color-scheme`. `ThemeProvider` syncs `documentElement.dataset.theme` + `localStorage`.
- Dark mode remaps intentional inverse sections via `.theme-page` / `.theme-chrome` overrides (e.g. `bg-white` → `var(--surface)`, `bg-[#111111]` → `var(--inverse-surface)`).
- `::selection` is inverse (`#111` bg / white text); custom 8 px scrollbar (`--border` thumb, `--canvas` track).

### Motion & decoration

- Route enter: `.route-stage` — 480 ms `cubic-bezier(0.22,1,0.36,1)`, `translateY(26px) + rotateX(3.5deg) + scale(0.985)` → settled.
- Continuous CSS 3D: `.cube-3d` spin 16 s, `.vector-orb` 14 s, `.tech-gyro` 18 s, `.float-y` 6 s, `.ring-orbit` 24 s, goals/contact `.live-wallpaper` aurora orbs (18 s / 22 s) + grid + vignette, global `.interactive-background` pointer texture (dot base + 56 px grid + cursor ring).
- Elevation helpers: `.hologram-sheen` / `.hologram-sheen-dark`, `.extrusion-edge` shadows (stronger in dark).

### Accessibility (enforced by e2e)

- `prefers-reduced-motion: reduce` disables all decorative animations (including `.route-stage` / `.cube-3d`); `prefers-reduced-transparency: reduce` removes `backdrop-blur`. Decorative animations also off below `1024 px`.
- Skip link (`Skip to main content`), `main#main-content` re-focused on `pathname` change, modal background `inert` + `aria-hidden`. `'use client'` only where hooks / browser APIs / handlers / Framer Motion require it.

### Code style

- Two-space indent, single quotes, semicolons, trailing commas. kebab-case files, PascalCase components/types, `use...` hooks.
- SEO: `metadataBase: SITE_URL`, per-page `createPageMetadata()` canonical + Open Graph + Twitter (`src/shared/config/site.ts`), plus `sitemap.ts` / `robots.ts` / `opengraph-image.tsx`.
- Security headers (`next.config.ts`): always `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; HSTS + CSP only in production.
- Commits short + imperative (e.g. `fix api route form`); PRs state change + validation, with before/after screenshots for visual work. Before submitting: `bun run lint` + `bun run test`; UI changes also need the relevant e2e project; production-sensitive changes also need `bun run build` with HTTPS `NEXT_PUBLIC_SITE_URL`.
