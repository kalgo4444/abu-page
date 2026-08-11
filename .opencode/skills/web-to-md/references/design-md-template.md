# DESIGN.md output template

Replace every angle-bracket placeholder. Remove all instructional comments before delivery.

## Contents

- YAML token template
- Standard DESIGN.md sections
- Extended responsive, accessibility, motion, and agent-prompt sections
- Template rules

````markdown
---
version: "alpha"
name: "<Site> Inspired Design System"
description: |
  <One concise paragraph describing the visual thesis, dominant surface,
  typography, conversion language, layout rhythm, and media role.>

colors:
  primary: "<verified-or-approximate-css-color>"
  primary-hover: "<css-color>"
  primary-active: "<css-color>"
  on-primary: "<css-color>"
  canvas: "<css-color>"
  surface: "<css-color>"
  surface-elevated: "<css-color>"
  ink: "<css-color>"
  body: "<css-color>"
  muted: "<css-color>"
  hairline: "<css-color>"
  focus: "<css-color>"
  success: "<css-color>"
  warning: "<css-color>"
  error: "<css-color>"

typography:
  display-xl:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
    letterSpacing: <dimension>
  display-lg:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
    letterSpacing: <dimension>
  heading-md:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
    letterSpacing: <dimension>
  body-lg:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
  body-md:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
  body-sm:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
  label:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>
    letterSpacing: <dimension>
  button:
    fontFamily: "<font-stack>"
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number-or-dimension>

rounded:
  none: 0px
  xs: <dimension>
  sm: <dimension>
  md: <dimension>
  lg: <dimension>
  xl: <dimension>
  full: 9999px

spacing:
  xxs: <dimension>
  xs: <dimension>
  sm: <dimension>
  md: <dimension>
  lg: <dimension>
  xl: <dimension>
  xxl: <dimension>
  section: <dimension>

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.<token>}"
    padding: "<vertical> <horizontal>"
    minHeight: <dimension>
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.<token>}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.<token>}"
  button-primary-focused:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.<token>}"
    outlineColor: "{colors.focus}"
    outlineWidth: 2px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.<token>}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    minHeight: <dimension>
    padding: "<vertical> <horizontal>"
  content-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.<token>}"
    padding: "{spacing.<token>}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.<token>}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    minHeight: <dimension>
  text-input-focused:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.<token>}"
    borderColor: "{colors.focus}"
    borderWidth: 2px
---

## Overview

> Inspired analysis of <source URL>, reviewed on <YYYY-MM-DD>. Do not copy the source brand's logo, name, proprietary assets, copy, or distinctive identity.

<State the visual thesis first. Explain atmosphere, density, page rhythm, media role, and the three to five decisions that make the system recognizable. List the pages and viewport sizes inspected. Mark important approximations.>

## Colors

### Brand and action

- **Primary** (`{colors.primary}` — `<value>`): <semantic role and usage limit>.
- **On primary** (`{colors.on-primary}` — `<value>`): <contrast role>.

### Surfaces

- **Canvas** (`{colors.canvas}` — `<value>`): <role>.
- **Surface** (`{colors.surface}` — `<value>`): <role>.
- **Surface elevated** (`{colors.surface-elevated}` — `<value>`): <role>.
- **Hairline** (`{colors.hairline}` — `<value>`): <role>.

### Text

- **Ink** (`{colors.ink}` — `<value>`): <role>.
- **Body** (`{colors.body}` — `<value>`): <role>.
- **Muted** (`{colors.muted}` — `<value>`): <role>.

### Semantic and accessibility

<Describe focus, success, warning, and error usage. State whether values were observed or recommended. Include contrast restrictions.>

## Typography

### Font family

<Name verified public font declarations and safe substitutes. Do not imply that proprietary fonts are bundled.>

### Hierarchy

| Token | Desktop | Mobile | Weight | Line height | Tracking | Use |
|---|---:|---:|---:|---:|---:|---|
| `{typography.display-xl}` | <size> | <size> | <weight> | <value> | <value> | Hero heading |
| `{typography.display-lg}` | <size> | <size> | <weight> | <value> | <value> | Section heading |
| `{typography.heading-md}` | <size> | <size> | <weight> | <value> | <value> | Card or subsection title |
| `{typography.body-lg}` | <size> | <size> | <weight> | <value> | <value> | Lead copy |
| `{typography.body-md}` | <size> | <size> | <weight> | <value> | <value> | Default body |
| `{typography.body-sm}` | <size> | <size> | <weight> | <value> | <value> | Caption and metadata |
| `{typography.label}` | <size> | <size> | <weight> | <value> | <value> | Labels and eyebrows |

### Rules

<Explain casing, weight boundaries, line lengths, hierarchy, and fallback behavior.>

## Layout

### Spacing system

<State the base unit, token scale, common section padding, and card padding.>

### Grid and containers

<Document max width, gutters, columns, common splits, alignment, and density.>

### Page rhythm

<Explain how sections alternate and how whitespace establishes hierarchy.>

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | <surface/border/shadow> | <use> |
| Raised | <surface/border/shadow> | <use> |
| Overlay | <surface/border/shadow> | <use> |

<Describe photographic, gradient, blur, scrim, or tonal depth separately from shadows.>

## Shapes

| Token | Value | Use |
|---|---:|---|
| `{rounded.none}` | `0px` | <use> |
| `{rounded.sm}` | <value> | <use> |
| `{rounded.md}` | <value> | <use> |
| `{rounded.lg}` | <value> | <use> |
| `{rounded.full}` | `9999px` | <use> |

<Describe media aspect ratios, crop behavior, icon geometry, and any signature shape rule.>

## Components

### Navigation

<Desktop structure, mobile menu, active state, sticky behavior, and spacing.>

### Buttons and links

<Primary/secondary hierarchy and observed or recommended hover, pressed, disabled, and focus behavior.>

### Cards and media

<Card families, surface, radius, padding, media ratio, borders, elevation, and content order.>

### Inputs and forms

<Field sizing, labels, placeholder, focus, validation, helper text, and grouping. Omit only if genuinely absent.>

### Signature patterns

<Describe recurring patterns that convey the visual thesis without copying branded assets.>

## Do's and Don'ts

### Do

- <At least five concrete implementation rules.>

### Don't

- <At least five concrete anti-patterns.>

## Responsive Behavior

| Range | Navigation | Typography | Grid | Media and components |
|---|---|---|---|---|
| Mobile | <rule> | <rule> | <rule> | <rule> |
| Tablet | <rule> | <rule> | <rule> | <rule> |
| Desktop | <rule> | <rule> | <rule> | <rule> |
| Wide | <rule> | <rule> | <rule> | <rule> |

<Document art direction, order changes, overflow, touch targets, and what disappears or remains persistent.>

## Accessibility

- <Contrast and color-independence rules.>
- <Visible keyboard focus rules.>
- <Semantic landmarks, heading order, labels, and alternative text.>
- <Minimum touch targets and spacing.>
- <Reduced-motion and animation fallback.>

## Motion & Interaction

<List observed transitions and interactions with durations/easing only when verified. Label synthesized accessible defaults as recommendations.>

## AI Coding Agent Prompt

```text
Build <generic page/product> using this DESIGN.md as the visual source of truth. Preserve <visual thesis>, use only the documented tokens and component variants, implement the responsive and accessibility rules, and replace all source-brand names, copy, logos, and proprietary imagery with original generic content. Do not introduce new colors, radii, shadows, or type styles unless the design system is explicitly extended first.
```
````

## Template rules

- Delete unused optional tokens instead of leaving placeholders.
- Add site-specific reusable components only when observed more than once or essential to the site's primary interaction.
- Keep exact values in YAML; put evidence, uncertainty, and rationale in prose.
- Keep recognized standard headings in the order shown.
- Use separate component entries for interactive states.
- Never leave an unresolved `{token.reference}`.
