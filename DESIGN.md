---
name: Zaid Shaikh — Portfolio
description: A data engineer's evidence file on near-black ground, executed at the linear.app craft bar.
colors:
  surface: "#08090A"
  surface-raised: "#0F1011"
  surface-overlay: "#16181A"
  border: "rgba(255, 255, 255, 0.08)"
  border-strong: "rgba(255, 255, 255, 0.16)"
  ink: "#F7F8F8"
  ink-secondary: "#B4B9C2"
  ink-muted: "#8A8F98"
  accent: "#EBA352"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  metric:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontFeature: "tabular-nums"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  gutter: "1.25rem"
  gutter-lg: "4rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#FFFFFF"
  button-ghost:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-ghost-hover:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  card-hover:
    backgroundColor: "#111315"
  tech-pill:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
  role-tag-default:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
  role-tag-accent:
    backgroundColor: "rgba(235, 163, 82, 0.1)"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.ink}"
  schematic-node:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "0.3125rem 0.5rem"
---

# Design System: Zaid Shaikh — Portfolio

## Overview

**Creative North Star: "The Instrument Panel"**

The site is a data engineer's evidence file rendered as lit instrumentation on a near-black ground. Nothing decorates; every surface either carries a measured value, frames one, or gets out of the way. The world is three steps of near-black, hairline rules at 8% white, and a single warm amber that appears only where something is live or measured — the three headline metrics, the availability dots, the systems role tag, and every focus ring.

The form language is a **standing product commitment, not a per-page choice**: offered a derived visual world, the owner chose the category standard — the conventional developer-portfolio canon — with **linear.app named as the craft bar**. That bar is why this system is not a flat dark template. Surfaces are *lit*: every raised plane carries a 1px inset top-edge highlight so it reads as catching light from above, and the page ground itself is modulated by a fixed radial wash rather than one uniform fill. Precise grid, exact spacing, and real state detail on every interactive element are the price of that bar; a future pass that flattens the highlights or drops the hover states is lowering it, not simplifying it.

Density is high and text-forward. The page refuses the expanding-accordion résumé that hides its numbers behind a click: the numbers sit at rest at display scale, and only the *architecture* is behind an interaction. There is exactly one authored motion moment — the pipeline schematic drawing itself, stage by stage, when a project card opens — and it is decoration-free, purely explanatory, and fully removable under reduced motion with no loss of content.

**Key Characteristics:**
- Three surface steps only (`#08090A` page → `#0F1011` raised → `#16181A` overlay); no fourth step exists.
- Hairline borders, always 1px, always white at 8% or 16% — never a solid grey.
- One accent (`#EBA352`), reserved for measured values, live status, the systems tag, and focus.
- Every text tone clears 4.5:1 against the *worst-case* surface, not just the page.
- Lit surfaces: inset top-edge highlight plus two-part ambient shadow, both lifting on hover.
- Inter only, tight negative tracking on headings, tabular figures on every number.
- One authored motion moment; everything else is a 150ms state transition.

## Colors

A three-step near-black ground, a three-tone cool-grey ink ramp, and a single warm amber that is the only chromatic event on the page.

### Primary
- **Signal Amber** (`{colors.accent}`): The only saturated colour in the system, and it is never decorative. It carries the three hero metric values, the live-availability dots in Hero and About, the Systems Engineering / Backend SWE role tag, the text selection highlight, and every focus ring. On the page ground it measures 8.39:1.

### Neutral
- **Void** (`{colors.surface}`): The page ground. Not flat — the body carries a fixed radial wash of white at 3.5% falling to zero by 55% height, anchored top-centre, so the viewport has a light source instead of a fill.
- **Raised Plane** (`{colors.surface-raised}`): Cards, ghost buttons, the About availability panel. One step up from the ground.
- **Overlay Plane** (`{colors.surface-overlay}`): The topmost step — tech pills, role tags, schematic nodes, ghost-button hover. Anything sitting *on* a card sits here.
- **Hairline** (`{colors.border}`): Every default rule, divider, section boundary, and card edge.
- **Hairline Strong** (`{colors.border-strong}`): The emphasis rule — card hover borders, the decision-log left rule, schematic edges, highlight bullets.
- **Primary Ink** (`{colors.ink}`): Headings, names, metric values inside cards, primary-button fill. 16.73:1 on the overlay surface.
- **Secondary Ink** (`{colors.ink-secondary}`): All body prose, pill text, schematic node labels. 9.04:1 on the overlay surface.
- **Muted Ink** (`{colors.ink-muted}`): Labels, metric captions, section eyebrows-as-group-headings, nav links at rest. 5.48:1 on the overlay surface.

### Named Rules

**The Worst-Surface Rule.** Every text tone is chosen to clear 4.5:1 against `{colors.surface-overlay}` — the lightest surface in the system — not against the page ground. A tone that passes only on `#08090A` is not in this palette. Measured: ink 16.73:1, secondary 9.04:1, muted 5.48:1, accent 8.39:1.

**The Reserved Accent Rule.** Amber appears only where something is measured, live, or focused. If you cannot name the number, the status, or the interaction it represents, it does not get the accent. It is never a background fill for a large area, never a heading colour, and never used to make a section "pop".

**The Three Steps Rule.** There are exactly three surfaces. Depth beyond the third step is expressed with the inset highlight and ambient shadow, never by inventing a fourth fill. (The card hover fill `#111315` is a *state* of the raised plane, not a step.)

**The Hairline Rule.** Separation is a 1px white-alpha rule at 8%, stepping to 16% for emphasis. No solid grey borders, no 2px rules, no double rules.

## Typography

**Display Font:** Inter (with `sans-serif` fallback)
**Body Font:** Inter (same family; the ramp is carried by weight, size, and tracking)
**Label/Mono Font:** none — numeric alignment is handled by Inter's tabular figures, not a mono face.

**Character:** One family, worked hard. Inter is a deliberate, recorded decision: it is the pinned canon's own typeface and the craft bar's, and the owner was shown the "Inter is overused" trade-off explicitly and kept it. It is a decision, not debt. The system earns differentiation from tracking and figures rather than from a display face: headings run tight negative tracking (−0.03em to −0.055em) so large type reads as set rather than typed, and every number on the page is tabular.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 6vw, 3.75rem)`, 1.05, −0.04em): The name in the first viewport and the Contact ask. The only type allowed above 3rem.
- **Headline** (600, 36→48px, −0.03em): Section headings (`.text-heading`) — "Selected systems", "Stack", the About claim.
- **Metric** (600, 36→48px, −0.025em, tabular): The three hero numbers, in accent. Card-level metrics use the same treatment at 24px in primary ink.
- **Title** (600, 20px, 1.375): Project names inside cards.
- **Body** (400, 16px, 1.625): All prose. Capped at `max-w-2xl` (~42rem) on every standfirst and paragraph.
- **Small** (400, 14px, 1.625): Card outcome statements, highlights, decision-log rows, nav and footer links.
- **Label** (500, 12px, +0.08em, uppercase): Group headings, schematic stage names, "Key Highlights", "Architecture Decision", footer column heads. A quieter 12px variant at +0.02em (`.text-label`) covers non-uppercase captions.

### Named Rules

**The Tabular Figures Rule.** Every number that a reader might compare or that sits in a ruled row — hero metrics, card metrics, group counts, the copyright year — is set `font-variant-numeric: tabular-nums`. Proportional figures in a metric row are a defect.

**The Tight-Top Rule.** Tracking tightens as size grows: −0.02em at 24px, −0.03em at section headings, −0.04em at display, −0.055em at the largest setting. Small type never goes negative; uppercase labels always go positive (+0.02em to +0.08em).

**The No-Kicker Rule.** Headings stand alone. Eyebrow kickers and pre-heading labels were eliminated site-wide during the build and must not return. The 12px uppercase label is a *group index* (a category name with a count, a footer column head) — it never sits above a heading as its introduction.

## Layout

A single-column page of full-width sections, each capped at `max-w-7xl` (80rem) and centred, with a responsive gutter that steps 20px → 40px (≥640px) → 64px (≥1024px). Vertical rhythm is one value: 96px section padding, 128px at ≥768px. Sections are separated by a top hairline, never by a colour change — the ground is continuous from nav to footer.

The spacing scale is small and repeated: 6px / 8px / 16px / 24px / 32px for internal rhythm, 24px card padding, 16px grid gaps, 64px between the two columns of a split section.

**Responsive behaviour.** Breakpoints are Tailwind defaults and only three are actually used: 640px (nav collapses to a dropdown, the hero metric row goes from three ruled columns to a stacked list with top rules, buttons go full-width), 768px (project grid goes two-up, Skills rows adopt a fixed 220px category column, About and Contact become multi-column), 1024px (gutter widens only).

Two column models recur: the **3fr / 2fr split** (About: argument left, availability panel right) and the **fixed-label index** (Skills: a 220px category column against a fluid content column, so every row scans on one axis). Contact uses a 3fr / 2fr / 2fr variant.

### Named Rules

**The Ruled Row Rule.** Related numbers sit in one row divided by hairlines, not in separate cards. The hero metric row is three equal columns with a left rule and 32px of left padding on each subsequent cell; below 640px those rules rotate to top rules with 24px of padding and margin. Boxing each metric would make three cards where there is one comparison.

**The Open-Card-Takes-the-Row Rule.** At ≥768px, a project card whose toggle is `aria-expanded="true"` spans both grid columns (`:has()` selector on the article). An expanded card is a detail view; at half width its schematic container is 518px and five stages crush together.

**The Container-Query Rule.** The architecture schematic responds to *its own* width, not the viewport's (`@container (min-width: 34rem)` on an `inline-size` container). Because cards sit two-up, a 1400px viewport still gives the schematic only 518px. Any component whose layout depends on the box it sits in — not the screen — uses a container query.

## Elevation & Depth

Hybrid, and the depth is the thing that separates this world from a flat dark template. Tonal layering does the structural work (three surface steps), and light does the material work: every raised plane carries a 1px **inset top-edge highlight** in white alpha, so its top edge reads as catching light from a source above the fold, and a **two-part ambient shadow** (a tight contact shadow plus a wide, heavily negative-spread ambient) seats it against the ground. The page ground itself is lit by a fixed radial wash rather than being a flat fill. On hover the card raises all three at once — highlight brightens, both shadows deepen and spread, fill lifts one notch — in a single 150ms transition. This is directly downstream of the linear.app craft bar.

### Shadow Vocabulary
- **Card rest** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.055), 0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.7)`): Every card and card-like panel at rest.
- **Card hover** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 2px 4px rgba(0,0,0,0.45), 0 14px 34px -14px rgba(0,0,0,0.8)`): Paired with the border stepping to strong and the fill shifting to `#111315`.
- **Pill highlight** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`): Tech pills. The smallest surfaces still get lit.
- **Ghost-button highlight** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.045)`): Secondary buttons.
- **Primary-button ambient** (`box-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 8px 20px -10px rgba(0,0,0,0.9)`): The light-on-dark primary button, which needs seating rather than lighting.
- **Ground wash** (`radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 55%)`, `background-attachment: fixed`): The page's light source. Fixed, so scrolling moves content through the light rather than dragging the light along.

### Named Rules

**The Lit Surface Rule.** Any element that sits on a step above its parent takes an inset top-edge highlight. Flat fill plus flat border is what makes a dark page look like a template; the highlight is 1px and between 4% and 9% white, never more.

**The Whole-State Rule.** A hover changes fill, border, highlight, and shadow together, in one 150ms transition. A border-only hover reads as a bug at this craft bar.

## Shapes

Rounded rectangles throughout, on a four-step radius scale that tracks element size: 6px for the smallest chips and schematic nodes, 8px for buttons and role rows, 12px for cards and panels, full for role tags. Nothing is square-cornered except rules and dividers, and nothing is a circle except status dots (6px) and bullet marks (4px).

Borders are always 1px white-alpha and carry most of the structure: they divide the metric row, separate every section, rule the credential list and the Skills index, and mark the left edge of the decision log. The decision log's single left rule at 16% is the system's only asymmetric border and reads as a margin annotation.

The architecture schematic is the one geometric departure: a flow of labelled boxes joined by 1px edges, vertical on narrow containers and horizontal on wide ones, built from HTML rather than SVG so its labels stay selectable, screen-readable, and never scale below legibility.

## Components

### Buttons
- **Shape:** Softly rounded (8px), inline-flex with a 8px icon gap and 10px/20px padding.
- **Primary:** Inverted — primary ink fill on near-black text, carrying the ambient seating shadow. Used for the one real action per region: the mailto in the hero, the copy-email button, the contact address.
- **Ghost:** Raised-plane fill, hairline border, secondary ink, with its own inset highlight. Used for the social links alongside the primary.
- **Hover / Focus:** Primary goes to pure white; ghost steps border to strong, fill to the overlay plane, text to primary ink — all at 150ms. Focus falls through to the global ring.

### Chips
- **Tech pill:** Overlay-plane fill, hairline border, secondary ink, 12px, 6px radius, with a 4% inset highlight. Marks a tool that actually carried a shipped system.
- **Plain tech text:** The long tail of the stack renders as muted 12px text joined by middots — true, present, and deliberately not competing with the pills.
- **Role tag:** Full-radius, 12px medium. Default is overlay fill with a hairline border; the Systems / Backend variant is an accent hairline — amber text on a 10% amber wash with a 35% amber border. On a dark ground, emphasis is an accent hairline, never an ink inversion.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** Raised plane at rest, `#111315` on hover.
- **Shadow Strategy:** Card rest → card hover (see Elevation & Depth); all three layers move together.
- **Border:** 1px hairline at rest, stepping to hairline-strong on hover.
- **Internal Padding:** 24px, with a 20px-gap internal stack and a hairline top rule separating the expanded layer.

### Navigation
Fixed full-width header, 64px tall, on a 72%-opaque ground fill with a medium backdrop blur and a hairline bottom border — the page scrolls beneath it and stays readable. Wordmark is plain text "Zaid" with a muted period. Links are 14px muted ink, going to primary ink on hover at 150ms. Below 640px the links collapse into a three-line toggle whose bars animate into a cross, and the menu drops in as a bordered panel. Anchor scrolling is smooth with a 5rem scroll-padding so a target never lands beneath the header.

### Focus
A single global treatment: a 2px accent outline at 2px offset with a 4px radius, applied to everything that does not define its own. Focus is the accent's fourth job and is never removed.

### Architecture Schematic (signature)
The system's one authored motion moment. When a project card opens, the pipeline draws itself: each stage node settles in (4px rise plus fade, 400ms on a decelerating curve) and each connecting edge extends from its origin (320ms, scaling from zero), staggered 90ms per index so the flow reads left-to-right as construction rather than appearing all at once. Nodes are overlay-plane boxes at 6px radius with a 12px uppercase stage label above; edges are 1px hairline-strong. The flow is a vertical stack by default and switches to a horizontal row at a 34rem *container* width. Under `prefers-reduced-motion: reduce` all animation is dropped and every node and edge renders at full opacity and identity transform — the diagram is complete and legible with no motion at all.

### Named Rules

**The One Motion Moment Rule.** The page has exactly one authored animation: the schematic drawing itself. Everything else is a 150ms colour/shadow state transition or a ≤220ms disclosure. No scroll-triggered reveals, no parallax, no entrance animations on load.

**The Reduced-Motion-Is-Complete Rule.** Every animated element renders fully legible at rest under `prefers-reduced-motion`. Motion may sequence information; it may never be the only way to see it.

**The Computed-Claim Rule.** Where the copy states a rule about the content, the component computes it. The Skills standfirst claims the highlighted tools are the ones that carried the six systems, so the pill/plain split is derived at render time from those projects' own `technologies` arrays — not from hand-maintained source order. If the component changes, the claim must stay computed or the standfirst must change.

## Do's and Don'ts

### Do:
- **Do** keep to the three surface steps (`#08090A` / `#0F1011` / `#16181A`) and express further depth with the inset highlight and ambient shadow.
- **Do** give every raised surface a 1px inset top-edge highlight between 4% and 9% white — this is the craft-bar rule that keeps the world off the flat-dark-template floor.
- **Do** verify new text tones against `#16181A`, the worst-case surface, at 4.5:1 minimum.
- **Do** reserve the amber for measured values, live status, the systems role tag, and focus rings.
- **Do** set every number `tabular-nums`.
- **Do** change fill, border, highlight, and shadow together on hover, at 150ms.
- **Do** use a container query when a component's layout depends on the box it sits in rather than the viewport.
- **Do** put related numbers in one hairline-ruled row rather than in separate cards.
- **Do** let every animated element render complete and legible under `prefers-reduced-motion`.

### Don't:
- **Don't** reintroduce eyebrow kickers or pre-heading labels; they were removed site-wide and headings stand alone.
- **Don't** invent a fourth surface step or a solid grey border; separation is 1px white-alpha at 8% or 16%.
- **Don't** use the amber as a background fill, a heading colour, or decoration — if you cannot name the number, status, or interaction it marks, it does not get the accent.
- **Don't** flatten the surfaces: removing the inset highlights, the ambient shadows, or the fixed radial ground wash lowers the stated craft bar rather than simplifying the code.
- **Don't** add a second authored animation, a scroll reveal, or a load-in entrance; the schematic is the page's one motion moment.
- **Don't** emphasise on a dark ground by inverting to an ink fill; emphasis is an accent hairline.
- **Don't** hide a measured number behind an interaction — architecture is the only thing allowed behind the card toggle.
- **Don't** add a second typeface; the ramp is carried by weight, size, and tracking within Inter.
