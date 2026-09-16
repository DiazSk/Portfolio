---
name: Zaid Shaikh Portfolio
description: An ink-on-paper engineering portfolio where measured numbers are the loudest element on the page.
colors:
  paper: "#FAFAF9"
  paper-raised: "#F4F4F2"
  rule: "#E5E5E2"
  rule-strong: "#C9C9C6"
  ink: "#111111"
  ink-secondary: "#525252"
  ink-muted: "#6F6F6F"
  ink-pressed: "#2A2A2A"
  void: "#141414"
  live-signal: "#10B981"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  metric:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "tabular-nums"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline-void:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  watermark:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(9rem, 28vw, 24rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "0.2em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-small:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  xs: "0.25rem"
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.body-small}"
  button-primary-hover:
    backgroundColor: "{colors.ink-pressed}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.body-small}"
  button-ghost-hover:
    textColor: "{colors.ink}"
  card-base:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  tech-pill:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
    typography: "{typography.label}"
  role-tag-default:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
    typography: "{typography.label}"
  role-tag-inverted:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
    typography: "{typography.label}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-small}"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: Zaid Shaikh Portfolio

> **Three decisions in this file are inferred from the code, not confirmed by Zaid.** They are marked **[INFERRED]** inline: the role of the dark Contact section, the monochrome-with-inversion accent doctrine, and the Creative North Star. Everything else was extracted from `src/index.css` and the section and component source. Overturn any inference by saying so; the rest is observed fact.

## Overview

**Creative North Star: "The Quiet Ledger"** **[INFERRED]**

Ink on paper, tabular numerals, every claim accounted for. This is a ledger, not a brochure: the numbers are the artifact, and the design's entire job is to make sure nothing decorative ever competes with them. Restraint here is not an aesthetic preference — it is a credibility argument. A page with no gradient, no shadow, and no accent hue has nothing to hide behind, which is exactly the posture a skeptical engineer trusts.

The system is deliberately austere. A single typeface at three weights. A seven-step neutral ramp from near-white paper to near-black ink. Zero shadows anywhere in the codebase — depth comes from hairline rules and a two-step tonal shift, never from lift. Density is low and whitespace is generous, not for elegance but as a forcing function: when 96px of air separates sections and nothing carries color, the `21,091` set in 48px semibold is unavoidably the loudest thing on the screen.

The world it replaced is a permanent anti-reference: dark space theme, 3D astronaut, orbiting glassmorphic cards, animated flip words. Those were removed because they signalled junior-level showmanship to exactly the readers this site needs to convince. Nothing from that vocabulary returns — no glass, no glow, no gradient mesh, no floating 3D.

**Key Characteristics:**
- Ink-only palette; emphasis by inversion, never by hue
- Zero box-shadows in the entire system — hairline rules and tonal layering carry all depth
- One typeface (Inter) at three weights (400 / 500 / 600)
- Tabular numerals on every metric so digits align in a column
- Generous section rhythm (96px → 128px) that isolates each claim
- A single dark surface, used exactly once, at the end

## Colors

A seven-step neutral ramp warmed slightly off-neutral (the paper tones carry a faint yellow cast, the ink is pure), plus one near-black void surface and one functional green.

### Primary

The system has no chromatic primary. **Ink** (`#111111`) is the primary: it carries headlines, metrics, the wordmark, filled buttons, and inverted tags. Where another system would reach for an accent, this one reaches for full ink inversion.

- **Ink** (`#111111`): Headlines, metrics, project titles, the `Zaid.` wordmark, primary button fill, inverted role tags. Pure near-black, never softened.
- **Pressed Ink** (`#2A2A2A`): The only hover state for a filled surface. Lifts the primary button just enough to register a response.

### Neutral

- **Paper** (`#FAFAF9`): The page. A warm off-white that reads as stock, not as a screen.
- **Raised Paper** (`#F4F4F2`): One step down for nested surfaces — tech pills, role tags, the availability card, skill cards. This single tonal step is how the system indicates containment without a shadow.
- **Rule** (`#E5E5E2`): Every hairline — card borders, section dividers, the metric grid separators, the nav underline.
- **Strong Rule** (`#C9C9C6`): Hover borders and the decision-log left spine. The rule when it needs to be noticed.
- **Secondary Ink** (`#525252`): Body copy, outcome statements, ghost button labels. The workhorse reading color.
- **Muted Ink** (`#6F6F6F`): Eyebrows, metric labels, metadata, the card expand toggle. Passes WCAG AA on both paper tones (4.81:1 on Paper, 4.56:1 on Raised Paper). Was `#A3A3A3` until it was corrected for contrast; do not lighten it back.

### Tertiary

- **Void** (`#141414`): The Contact section only. Near-black rather than pure black, overlaid with an SVG fractal-noise grain at 0.55 opacity so it reads as inked stock rather than a screen turning off.
- **Live Signal** (`#10B981`): A single 6px dot on the availability pill. The only chromatic pixel in the system.

On Void, text steps through white at fixed alphas: `0.65` for links, `0.35` for labels and secondary links, `1.0` on hover, and `0.05` for the ZAID watermark.

### Named Rules

**The One Green Dot Rule.** `#10B981` appears exactly once, as the availability status indicator, and is never used for anything else — not for success states, not for links, not for a second accent. Its entire meaning is "this status is live." A second green pixel destroys the first one's meaning.

**The Inversion-Instead-of-Accent Rule.** **[INFERRED]** When an element must be emphasized, invert it to full ink fill rather than introducing a color. This is how Systems Engineering role tags separate from Data Engineering ones, and how the primary button separates from the ghost. The palette has no accent slot reserved and no accent is planned — monochrome is the system, not an unfinished state.

**The Single Dark Surface Rule.** **[INFERRED]** The page is paper that goes dark exactly once, at the close. Contact is the only section permitted to use Void, and the transition happens a single time, at the end of the scroll, as a deliberate final chapter. No other section may go dark, and there is no global dark mode.

## Typography

**Display Font:** Inter (variable, `opsz 14..32`, `wght 300..700`, loaded from Google Fonts)
**Body Font:** Inter — the same family
**Label/Mono Font:** None. Inter with tabular figures covers numeric display; there is no monospace face.

**Character:** One neutral grotesque doing every job, distinguished only by weight, size, and tracking. Inter was chosen for exactly the reason it's a default: it has no opinion, so the numbers and the words carry all of it. Tight negative tracking (`-0.025em`) on every large size keeps headlines and metrics from feeling loose at scale.

### Hierarchy

- **Display** (600, `2.25rem` → `3.75rem` at md, line-height 1.25, tracking `-0.025em`): The hero H1 only. One per page.
- **Metric** (600, `2.25rem` → `3rem` at md, line-height 1, tabular-nums, tracking `-0.025em`): Hero headline numbers. Set in `MetricStat`, borderless, pure type.
- **Headline** (600, `1.875rem` → `2.25rem` at md, tracking `-0.025em`): Section H2s via `.text-heading`. The Contact H2 scales on its own curve, `clamp(2rem, 4vw, 3.25rem)`.
- **Title** (600, `1.125rem`, line-height 1.375): Project card names. Card-level metrics sit at `1.5rem`/600/tabular.
- **Body** (400, `1rem`, line-height 1.625): The About summary and hero paragraph, capped at `max-w-2xl`.
- **Body Small** (400, `0.875rem`, line-height 1.625): Outcome statements, highlights, credentials, nav links, buttons. The dominant reading size.
- **Label** (500, `0.75rem`, uppercase, tracking `0.1em`): Eyebrows (`.text-eyebrow`), group headers, tech pills, role tags, the "Architecture Decision" header. On Void, this becomes the `/Quick links` and `/Contact` slash-prefixed form.

### Named Rules

**The Tabular Numerals Rule.** Every number that is a claim carries `font-variant-numeric: tabular-nums`. `21,091` and `<100ms` must align on their digit stems when stacked in a grid; proportional figures make a metric row look typeset rather than measured.

**The Three Weights Rule.** 400 for reading, 500 for labels and links, 600 for anything structural. There is no 300 and no 700 in the running system — the loaded variable range is wider than what gets used, and that restraint is intentional. The one exception is the ZAID watermark at 700, which is texture, not type.

## Layout

A single centered column at `max-w-7xl` (80rem), with gutters that step `1.25rem` → `2.5rem` at sm → `4rem` at lg (`.c-space`). Every section shares that container, so all left edges align down the entire page — the strongest alignment signal in the system.

Vertical rhythm is `6rem` → `8rem` at md (`.section-spacing`), with Contact taking slightly more (`8rem` → `9rem`). Sections separate with a `border-t` hairline rather than extra space, so the rhythm stays constant and the rule does the dividing.

Grids are asymmetric and content-driven, never equal columns for their own sake:
- **About:** `3fr 2fr` — the narrative outweighs the availability card.
- **Contact:** `3fr 2fr 2fr` — headline, quick links, contact.
- **Projects:** two equal columns, with a trailing odd card constrained to half width so it never stretches.
- **Skills:** 1 → 2 → 3 columns.
- **Hero metrics:** three equal columns divided by `1px` vertical rules with `2rem` of left padding.

**Responsive behavior:** one breakpoint does nearly all the work (`md`, 768px), with `sm` (640px) handling the nav collapse and the metric grid. Below 640px the metric grid flips from vertical rules to horizontal ones — the separator rotates rather than disappearing. Project cards center their title group and metric on mobile and left-align from `md` up.

### Named Rules

**The Shared Edge Rule.** Every section uses the same `max-w-7xl` + `.c-space` container. Nothing breaks the container except the Contact section's full-bleed Void background and its watermark.

## Elevation & Depth

**This system has no shadows.** Not one `box-shadow` exists in the codebase. Depth is communicated by exactly three devices, in order of strength:

1. **Hairline rules** (`1px solid #E5E5E2`) — the primary boundary device. Cards, sections, dividers, nav.
2. **Tonal layering** — one step from Paper (`#FAFAF9`) to Raised Paper (`#F4F4F2`) indicates a nested surface. There is no second step; the system never stacks three tones.
3. **Border darkening on hover** (`#E5E5E2` → `#C9C9C6`) — the only way a surface responds to a cursor.

The single exception is the fixed navbar, which uses `backdrop-blur-sm` over `rgba(250,250,249,0.85)` so content dissolves rather than collides as it scrolls beneath.

### Named Rules

**The No-Shadow Rule.** Surfaces never lift. If an element needs to separate from its background, darken its border or step its tone — never add a shadow, glow, or `filter: drop-shadow`. A shadow anywhere in this system reads as a foreign object.

## Shapes

Rectilinear with modest, consistently-scaled softening. Radius encodes container size rather than importance:

- **`0.25rem`** — Contact quick-link chips (the tightest, on Void)
- **`0.375rem`** — Tech pills
- **`0.5rem`** — Buttons, role-target rows
- **`0.75rem`** — Cards and panels (project cards, skill cards, availability card)
- **`9999px`** — Role tags, the availability pill, status dots, bullet markers

Borders are always exactly `1px`. There is no thick-border treatment, no double rule, no dashed or dotted stroke anywhere. The one non-uniform edge in the system is the decision log's `2px` left spine (`#C9C9C6`), which marks quoted architectural reasoning the way a blockquote rule would.

### Named Rules

**The Hairline Rule.** Every border in the system is `1px` except the decision log's `2px` spine. Weight is not an emphasis tool; tone is.

## Components

### Buttons

- **Shape:** Gently rounded (`0.5rem`), `0.625rem 1.25rem` padding, `0.875rem`/500 label, `150ms` color transition.
- **Primary:** Full ink fill (`#111111`) with paper text — the inversion device. Hover darkens to `#2A2A2A`.
- **Ghost:** Transparent with a hairline border and secondary ink text. Hover darkens both border (`#C9C9C6`) and text (`#111111`) simultaneously. Used for the hero's social row.
- **Contact link chips:** A distinct treatment on Void only — paper-filled chips with a dual-span vertical text swap on hover (visible label translates `-100%` while a duplicate rises from `+100%`, `300ms ease-out`). This is the system's one piece of showmanship and it is confined to the closing section.

### Chips

- **Tech pill:** Raised paper fill, hairline border, secondary ink, `0.375rem` radius, `0.75rem` text. Layer 1 of a project card shows four, then a `+N` overflow pill; Layer 2 shows all.
- **Role tag:** Fully rounded, `0.75rem`/500. Two variants carry real semantics — **default** (raised paper, secondary ink) for Data Engineering and Analytics Engineering; **inverted** (full ink fill, paper text) for Backend SWE and Systems Engineering. The inversion is the visual mechanism that lets an engineering manager self-select which track to read.

### Cards / Containers

- **Corner style:** `0.75rem`
- **Background:** Paper (`#FAFAF9`) — the card is the same tone as the page; only its border separates it
- **Shadow strategy:** None. See Elevation & Depth.
- **Border:** `1px solid #E5E5E2`, darkening to `#C9C9C6` on hover over `150ms`
- **Internal padding:** `1.5rem` (skill cards use `1.25rem`)

### Navigation

Fixed, full-width, `64px` min-height, `rgba(250,250,249,0.85)` with `backdrop-blur-sm` and a bottom hairline. Links are `0.875rem` secondary ink shifting to full ink on hover (`150ms`). The wordmark is `Zaid` in `1.25rem`/600 with a muted-ink period. Below `sm`, links collapse into a three-line toggle whose bars are `1px` tall and animate into an X via `translateY` + `rotate`; the dropdown enters with an 8px fade-slide over `150ms`. `scroll-padding-top: 5rem` keeps anchored sections clear of the fixed bar.

### Signature Component: the Dual-Layer Project Card

The system's defining component, and the one that resolves the two-audience problem.

- **Layer 1 (always visible):** role tag → project name → primary metric at `1.5rem`/600/tabular → plain-English outcome statement → four tech pills → a `0.75rem` muted "Architecture & details" toggle with a chevron that rotates 180°.
- **Layer 2 (expanded):** separated by a top hairline; contains the decision log (when present), key highlights as a bulleted list with `4px` strong-rule dots, the full tech stack, and an inline GitHub link with a `14px` inline SVG mark.
- **Motion:** height + opacity, `220ms ease-in-out`, via Framer Motion `AnimatePresence`. `aria-expanded` is wired to the toggle.

### Signature Component: the Decision Log

A `2px` left spine in strong rule with `1rem` of padding, headed by an "Architecture Decision" label. Three rows — **Chose / Over / Because** — with the labels in a fixed `3.5rem` muted small-caps column and values in secondary ink. Deliberately present on only two projects; it is evidence of hard decisions, not a template.

### Signature Component: the Void Close

The Contact section: `#141414` with an inline SVG fractal-noise grain (`baseFrequency 0.75`, 4 octaves, desaturated, `200px` tile, `0.55` opacity), a `clamp(9rem, 28vw, 24rem)` bold "ZAID" watermark at 5% white with `0.2em` tracking, bottom-clipped and animating from `y: 100%` to `y: 15%` over `1.1s` on `cubic-bezier(0.22, 1, 0.36, 1)` when scrolled into view. The three columns stagger in at `120ms` intervals.

## Do's and Don'ts

### Do:

- **Do** lead every project and section with its measured number, set in tabular numerals at `600` weight. The metric outranks the prose.
- **Do** use inversion (full `#111111` fill) when something must stand out. That is the accent.
- **Do** separate surfaces with a `1px` `#E5E5E2` hairline and, where containment is needed, one tonal step to `#F4F4F2`.
- **Do** keep transitions at `150ms` for state changes and `220ms` for disclosure. Use `cubic-bezier(0.22, 1, 0.36, 1)` for anything entering on scroll.
- **Do** keep body copy inside `max-w-2xl` and let the `max-w-7xl` container's left edge align across every section.
- **Do** write labels in `0.75rem`/500 uppercase with `0.1em` tracking.
- **Do** give every interactive element a `:focus-visible` treatment matching its hover state. On Void, that is a `2px` white outline at `3px` offset; anything animating on `group-hover` also needs `group-focus-visible`.

### Don't:

- **Don't** add a `box-shadow`, glow, gradient, or glassmorphic surface. The system has none and reads as tampered-with the moment one appears.
- **Don't** introduce an accent color. **[INFERRED — the code ships zero accent; confirm before treating as permanent]**
- **Don't** lighten `--color-ink-muted` past `#6F6F6F`. It carries eyebrows, metric labels, metadata, and the card expand toggle; anything lighter drops the toggle — an interactive control — below AA.
- **Don't** take a second section dark. Void belongs to Contact alone. **[INFERRED]**
- **Don't** add a second typeface or reach outside weights 400/500/600.
- **Don't** reintroduce the retired vocabulary: 3D models, orbiting cards, animated flip words, glassmorphism, or the dark space theme.
- **Don't** wire hover state through inline `onMouseEnter`/`onMouseLeave` handlers. Use CSS classes so `:focus-visible` gets the same treatment — `.link-void` / `.link-void-dim` cover the Void surface.
- **Don't** reintroduce a `tailwind.config.js`. This project is Tailwind v4, CSS-first: tokens live in the `@theme` block in `src/index.css`. The old config file was dead (no `@config` directive loaded it) and has been deleted.
