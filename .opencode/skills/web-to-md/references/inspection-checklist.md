# Website inspection checklist

Use this checklist to gather evidence before writing DESIGN.md. Skip an item only when it is genuinely absent or inaccessible.

## Contents

- Page sample
- Viewports
- Capture matrix
- Evidence priority
- Final synthesis test

## 1. Page sample

- Record the canonical URL and analysis date.
- Inspect the homepage or supplied page first.
- Add at most two representative subpages when needed: product/detail, pricing, docs, checkout, sign-up, or editorial.
- Avoid authenticated, private, account-specific, or user-generated surfaces unless the user explicitly provides authorized access.

## 2. Viewports

Inspect rendered behavior at approximately:

| Mode | Suggested viewport | Purpose |
|---|---:|---|
| Wide desktop | 1440 × 900 | Container, grid, hero, full navigation |
| Tablet | 768 × 1024 | Column collapse and navigation transition |
| Mobile | 390 × 844 | Stacking, touch targets, crop, menu |

Use actual media-query thresholds from public CSS when available. Do not call a suggested viewport an exact breakpoint.

## 3. Capture matrix

### Atmosphere

- visual thesis and emotional tone;
- dominant light/dark surface;
- density and whitespace;
- editorial photography, illustration, product UI, video, data, or texture role;
- recurring page rhythm.

### Color

- primary and secondary actions;
- canvas, section, card, overlay, and footer surfaces;
- heading, body, muted, disabled, and inverse text;
- borders and dividers;
- focus, success, warning, and error roles;
- gradients, scrims, opacity, and blend modes.

### Typography

- loaded font-family declarations and fallback stacks;
- display, heading, body, label, caption, and button roles;
- desktop/mobile sizes, weights, line heights, tracking, and casing;
- maximum paragraph width and line length;
- font substitutions when the original is proprietary.

### Layout

- content max width and page gutters;
- column count and common splits;
- section, card, and inline spacing;
- alignment and intentional asymmetry;
- sticky, fixed, full-bleed, and overflow behavior;
- desktop-to-mobile order changes.

### Shapes and depth

- radius scale and signature geometry;
- border widths and colors;
- shadow tiers;
- blur, backdrop, glass, scrim, gradient, and tonal depth;
- media aspect ratios and cropping rules;
- icon stroke, size, and container shape.

### Components

- top navigation and mobile navigation;
- primary, secondary, ghost, text, and icon buttons;
- cards, lists, tables, tabs, chips, and badges;
- fields, labels, validation, and form grouping;
- modal, drawer, dropdown, tooltip, toast, carousel, and accordion;
- footer and conversion band;
- recurring signature component.

### States and motion

- hover, active/pressed, selected, disabled, and focus-visible;
- menu, modal, accordion, and carousel transitions;
- scroll effects and sticky transitions;
- duration and easing only when verified;
- reduced-motion behavior or a safe recommendation.

### Accessibility

- text/background contrast;
- visible keyboard focus;
- touch targets of at least 44 × 44 px where practical;
- semantic landmarks and heading order;
- input labels and error association;
- image alternatives and decorative-image handling;
- no information conveyed by color alone.

## 4. Evidence priority

Prefer evidence in this order:

1. public CSS variables, font declarations, and media queries;
2. computed styles on rendered elements;
3. repeated measurements across screenshots/pages;
4. visual approximation;
5. accessible recommendation for an unobserved state.

Do not copy source HTML, proprietary assets, marketing copy, logos, or trademark illustrations into the output.

## 5. Final synthesis test

The research is sufficient when another engineer can answer all of these without reopening the source site:

- What is the single visual thesis?
- Which colors perform which semantic roles?
- What is the complete type hierarchy?
- What spacing, grid, radius, and elevation system should be used?
- How do navigation, buttons, cards, forms, and media behave?
- What changes on mobile?
- Which decisions are verified, observed, approximate, or recommended?
- Which mistakes would make the result feel off-system?
