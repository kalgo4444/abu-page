---
name: web-to-md
description: "Analyze a public website URL and create a reusable, implementation-ready DESIGN.md containing its visual system, design tokens, component rules, responsive behavior, accessibility guidance, and AI build prompt. Use when a user provides a website, landing page, product page, or competitor URL and asks to extract, document, recreate, or adapt its design language for AI coding agents without copying proprietary identity or content."
---

# Web to DESIGN.md

Turn a public website into a portable design-system document. Extract the site's recurring design logic, not its logo, copy, private assets, or exact identity.

## Inputs and output

Accept one primary public URL. Treat additional URLs from the same domain as supporting pages.

- Honor an explicit output path.
- For an existing app or repository, write `DESIGN.md` at its root unless the user specifies otherwise.
- Otherwise write `DESIGN-<site-slug>.md` in the current working directory.
- Use the user's language for explanations when practical. Keep token and component identifiers in English kebab-case.
- Produce one self-contained Markdown file, not only a chat summary.

## Workflow

### 1. Establish scope

Identify the site, page type, output location, and whether the user wants a whole-site system or one page. If the request is clear, proceed without asking. Analyze the homepage plus at most two representative public subpages when the homepage alone does not expose enough reusable components.

### 2. Inspect the rendered site

Use an interactive browser or equivalent rendered-page tool first. Read [references/inspection-checklist.md](references/inspection-checklist.md) before inspection.

Inspect at least:

- a desktop viewport around 1440 px wide;
- a mobile viewport around 390 px wide;
- navigation, hero, at least one content section, conversion area, and footer;
- visible hover, focus, pressed, expanded, menu, carousel, or modal states when safely accessible;
- public CSS, computed styles, CSS custom properties, and loaded font declarations when available.

Use screenshots for visual evidence and DOM/computed styles for exact values. Do not infer the design from page text or metadata alone.

### 3. Separate evidence from inference

Maintain a temporary evidence ledger while researching:

| Decision | Value | Evidence | Confidence |
|---|---|---|---|
| Primary CTA | `#...` | computed style | verified |
| Section gap | `80px` | measured desktop layout | observed |
| Mobile breakpoint | `768px` | stylesheet media query | verified |
| Motion duration | `~200ms` | visual estimate | approximate |

Use these confidence levels:

- **verified**: found in public CSS, computed styles, font metadata, or media queries;
- **observed**: measured consistently in rendered screenshots or layout;
- **approximate**: implementation-friendly synthesis when the exact value is unavailable.

Never present an approximate value as exact. Prefer a coherent approximate scale over false precision.

### 4. Synthesize a design system

Choose one clear visual thesis such as editorial, product-first, cinematic, data-dense, playful, or utilitarian. Separate persistent system rules from page-specific content.

Build valid YAML front matter using the current DESIGN.md token model:

- `version`, `name`, and `description`;
- `colors`, `typography`, `rounded`, `spacing`, and `components`;
- token references in `{path.to.token}` form;
- component states as separate entries such as `button-primary`, `button-primary-hover`, and `button-primary-focused`.

Quote all YAML strings. Use a block scalar (`description: |`) for long descriptions so punctuation such as colons cannot break YAML. Define every referenced token. Use only CSS-compatible color and dimension values.

For unobservable interaction states, recommend accessible defaults and label them as recommendations in the prose. Do not invent proprietary font files, private assets, or unpublished source code.

### 5. Write the artifact

Read [references/design-md-template.md](references/design-md-template.md) completely and use its structure. Replace every placeholder. Keep the standard sections in this order:

1. Overview
2. Colors
3. Typography
4. Layout
5. Elevation & Depth
6. Shapes
7. Components
8. Do's and Don'ts

Place extended sections—Responsive Behavior, Accessibility, Motion & Interaction, and AI Coding Agent Prompt—after the standard sequence.

Make the result inspired and reusable:

- replace company-specific copy with generic product language;
- describe the media role without redistributing source imagery;
- exclude logos, trademark shapes, mascots, and distinctive illustrations from reusable assets;
- explain which visual decisions are essential and which are optional;
- include desktop and mobile behavior explicitly.

### 6. Validate

Run the bundled structural validator:

```bash
python3 scripts/validate_design_md.py /absolute/path/to/DESIGN.md
```

Resolve `scripts/` relative to this skill directory. Fix every reported error. When Node.js and network access are available, also run the official linter:

```bash
npx @google/design.md lint /absolute/path/to/DESIGN.md
```

Before delivery, confirm:

- YAML parses and the description is safely quoted or block-formatted;
- all token references resolve;
- all required headings exist in the correct order;
- no placeholder text remains;
- exact claims are backed by public evidence;
- responsive, focus, contrast, touch-target, and reduced-motion rules are present;
- the document avoids copying brand identity, copy, or protected assets.

### 7. Deliver

Return a link to the created file and summarize the visual thesis, inspected pages, and any important uncertainty. Do not bury the artifact in the chat response.

## Failure handling

- If the page is blocked, try public HTML/CSS, another public page on the same domain, and rendered screenshots.
- If authentication is required, do not bypass it. Ask for screenshots or a public URL.
- If the site cannot be rendered but enough public evidence exists, create a clearly labelled partial draft and list gaps.
- If evidence is too weak to produce a trustworthy system, stop and explain what input is missing instead of fabricating tokens.
- If a site has both light and dark modes, document them as distinct semantic surface roles rather than mixing their tokens.
