---
name: Zaid Shaikh — Portfolio
description: Near-black ground, one signal vermilion held as a field, condensed poster type.
colors:
  surface: "#08090A"
  surface-raised: "#0F1011"
  surface-overlay: "#16181A"
  surface-hover: "#111315"
  border: "rgba(255, 255, 255, 0.08)"
  border-strong: "rgba(255, 255, 255, 0.16)"
  ink: "#F7F8F8"
  ink-secondary: "#B4B9C2"
  ink-muted: "#8A8F98"
  field: "#FF3B14"
  field-ink: "#0A0A09"
  field-ink-secondary: "#2E1409"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "clamp(3.25rem, 13vw, 11rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  headline:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  hero-name:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "min(26.72cqw, 62vh)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 78"
    fontFeature: "font-optical-sizing: none"
  footer-wordmark:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "19.98cqw"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.012em"
    fontVariation: "\"wdth\" 100"
    fontFeature: "font-optical-sizing: none"
  marquee:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  metric:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "clamp(2.5rem, 4.5vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "\"wdth\" 78"
  metric-card:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.25rem, 3.4vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "wdth 78"
  title:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
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
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Azeret Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  action:
    fontFamily: "Bricolage Grotesque, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.005em"
    fontVariation: "\"wdth\" 82"
rounded:
  none: "0"
  ring: "0.375rem"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  card-pad: "1.5rem"
  section-y: "6rem"
  section-y-md: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.field-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.field-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink}"
  button-on-field:
    backgroundColor: "{colors.field-ink}"
    textColor: "{colors.field}"
    typography: "{typography.label}"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-pad}"
  card-hover:
    backgroundColor: "{colors.surface-hover}"
  tech-pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.125rem 0.5rem"
  tech-pill-on-field:
    backgroundColor: "transparent"
    textColor: "{colors.field-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.125rem 0.5rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    height: "2.75rem"
  nav-link-hover:
    textColor: "{colors.ink}"
  track-nav:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.none}"
    size: "28px"
  track-nav-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "28px"
  field-surface:
    backgroundColor: "{colors.field}"
    textColor: "{colors.field-ink}"
    rounded: "{rounded.none}"
    padding: "6rem 1.25rem"
---

# Design System: Zaid Shaikh — Portfolio

## Overview

**Creative North Star: "The Signal Field"**

A near-black ground interrupted by whole regions of one signal vermilion, with condensed poster type doing the talking. The system exists to prove interface craft by a data engineer, so every measured number is treated as the loudest element on its surface: display face, poster scale, field colour. Density is editorial rather than dashboard — long vertical rhythm, wide gutters, a single hairline where most systems would put a box.

The world is pinned, not rolled. It comes from bold-editorial references (Orbix Studio, Yucale Studio, CREATIQ, LAIN) and that genre is the craft bar: where a rule below reads as unusually forceful, it is holding the line against softening back toward restraint. PRODUCT.md records this as a standing brand commitment that replaced an earlier "category standard / linear.app" preference. The prior implementation of that preference — restrained near-black surfaces, an amber accent, Inter as the only face, rounded cards, inset lit edges, ambient shadows — is retired wholesale, not evolved.

Two anti-references are explicit and confirmed: teal-on-navy (the most-cloned engineer portfolio) and violet-glow (the AI-generated cluster). Vermilion was chosen against that competitive landscape, not by taste. Restraint itself is the third anti-reference: an earlier build of *this* world scattered the vermilion as accents (1.0% of the first viewport, 12.9% of the page) and the finish review returned a rebuild directive. The shipped build holds it as regions — 11.8% of the first viewport, 28.7% of the page.

**Key Characteristics:**
- One signal colour, held as whole surfaces rather than as trim
- Black ink on the field, never white — white fails contrast there
- Condensed variable-width display type at poster scale
- Three faces, three jobs, no overlap
- Hard edges: zero radius, no shadow, no lit edge
- Two type steps only — poster and section head, nothing in between
- Motion is entrance-in-CSS, authored-moments-in-GSAP, and absent under reduced motion

## Colors

A monochrome near-black ramp carrying all structure, plus exactly one chromatic voice that never appears in small doses.

### Primary
- **Signal Vermilion** (`{colors.field}`): The field. It is applied to whole regions, never to trim: the whole first viewport, the full-bleed display-scale marquee band that closes it, the entire Stack section, the footer, and two panels inside the About grid (Availability and the first of the three readings). It also carries every metric numeral, the focus ring, the selection highlight, and card hover borders — those are the only sub-region uses, and they are type or a hairline, never a filled chip on a dark surface.
- **Field Ink** (`{colors.field-ink}`): The only full-strength text tone permitted on the field (5.55:1). Also the background of the on-field button, inverting the region.
- **Field Ink Secondary** (`{colors.field-ink-secondary}`): The single legal de-emphasis tone on the field (4.83:1) — on-field links at rest, the long-tail stack list, on-field pill borders. A solid colour precisely so it is not an alpha composite. It is a real `@theme` token as of 2026-09-18; before that it was the literal `#2E1409` repeated in seven places across three components and the stylesheet, which is why the on-field caption inside a field panel had to be reasoned out rather than looked up.

### Neutral
- **Ground** (`{colors.surface}`): The page. A fixed radial wash of `rgba(255,255,255,0.035)` sits above it as its own compositing layer, giving a single top-of-page light source without repainting the body.
- **Raised** (`{colors.surface-raised}`): Card interiors.
- **Overlay** (`{colors.surface-overlay}`): Schematic nodes, ghost-button hover, default role chips.
- **Hover Ground** (`{colors.surface-hover}`): Card background on hover — a one-step lift, paired with the border going vermilion.
- **Hairline** (`{colors.border}`) / **Hairline Strong** (`{colors.border-strong}`): Structure is drawn with rules, not boxes: section tops, the metric row's dividers, the decision log's left rule, pill and card outlines.
- **Ink** (`{colors.ink}`) / **Ink Secondary** (`{colors.ink-secondary}`) / **Ink Muted** (`{colors.ink-muted}`): Headings and emphatic labels; prose and schematic items; labels, captions and nav at rest.

### Named Rules

**The Regions, Not Accents Rule.** Vermilion is applied as a whole surface. Three regions carry it and a fourth would be welcome; a *fifth vermilion detail* would not. Audit test: if the signal colour's coverage on the first viewport falls near 1% and reads as trim, the world has been reverted. The shipped build measures 11.8% first-viewport and 28.7% page-wide, and those are the floor, not a ceiling.

*Measurement note (2026-09-18):* counting pixels within tolerance of `#FF3B14` on a 1293×946 capture does not reproduce 11.8% — it reads **8.29%** for the build that figure was recorded against, so the two methods are not comparable and only like-for-like deltas mean anything. Under that method the four-block hero measured **8.74%**. The field hero that replaced it measures roughly **83%** — the first viewport *is* the region. Re-measure with the same script before trusting any future number.

**The Black-On-Field Rule.** Nothing on the field is ever white — white measures 3.57:1 there. Every on-field tone is a *solid* colour, never alpha: `rgba(10,10,9,0.72)` composites to 4.01:1 and fails AA for body text, and `rgba(10,9,8,0.38)` composites to ~2.2:1, under the 3:1 a UI boundary needs. Exactly two on-field tones are legal.

**The One Voice Rule.** There is no secondary or tertiary accent, and adding one is a change of world rather than an extension of it. Everything that is not the field is a step on the near-black neutral ramp.

## Typography

**Display Font:** Bricolage Grotesque (variable `opsz 12..96`, `wdth 75..100`, `wght 300..800`; falls back to Inter)
**Body Font:** Inter (variable `opsz 14..32`, `wght 400..600`)
**Label/Mono Font:** Azeret Mono (400 / 500 / 600)

**Character:** Condensed, heavy, tightly tracked poster type against plain workhorse prose, with a mono face reserved for anything that is a measurement. The pairing reads as a printed editorial spread rather than a product UI.

### Hierarchy
- **Display** (800, `clamp(3.25rem, 13vw, 11rem)`, line-height 0.85, `wdth 78`, tracking -0.02em): The name in the first viewport. Balanced wrap. One per page region at most.
- **Hero name** (Display, `min(26.72cqw, 62vh)` with `wdth 78`, tracking -0.035em, `font-optical-sizing: none`, uppercase, `nowrap`, line-height 0.82): The name filling the width of the field viewport. The face renders "ZAID SHAIKH" at 3.7324 em-widths under those settings, so `100 / 3.7324 = 26.79cqw` is edge to edge. It is set to **26.603cqw** so both sides carry the same air: at 26.72 the Z's left side bearing left a 6px gap while the H sat flush, because the -0.035em tracking applies after the final glyph too and ate the right bearing. Solving `3.7263F + 2(0.01632F) = container` balances them, and because both terms are em-relative the gaps stay equal at every width — measured 0px asymmetry at 1293, 1024 and 768, and 1px at 1376 from sub-pixel rounding. The `vh` term only binds on short, wide windows.
- **Footer wordmark** (Display, but `19.98cqw` with `wdth 100`, tracking -0.012em, `font-optical-sizing: none`, `nowrap`): The name set once on the field band, sized to fill the container so both ends meet the hairline above the meta row. Container units, not `vw` — the hairline's width stops at `max-w-7xl` and a `vw` size does not, so the two scales crossed past ~1294px and the line wrapped. Optical sizing is pinned because the `opsz` axis widens the face below ~120px, which no single multiplier can absorb.
- **Headline** (800, `clamp(2.75rem, 8vw, 6.5rem)`, line-height 0.86, `wdth 78`, uppercase): Section heads. The second and last step of the scale.
- **Metric** (800, `clamp(2.5rem, 4.5vw, 4rem)` in the hero and `clamp(2.25rem, 3.4vw, 3rem)` on cards, tracking -0.04em, tabular figures, field colour): Measured numbers. They rank above prose and below the section head.
- **Title** (800, 1.5rem rising to 1.875rem–2.25rem, uppercase, `wdth 78`): Project and stack-group names.
- **Body** (400, 1rem, line-height ~1.6, Inter): Prose only, capped at `max-w-2xl`; the About credo runs to `26ch` and the hero claim to `13–18ch`.
- **Label** (500, 0.75rem, tracking 0.1em, uppercase, Azeret Mono): Metric labels and context, tech pills, schematic stage names, tabular metadata, group counts.
- **Marquee** (800, `clamp(2rem, 5.5vw, 4.5rem)`, line-height 1, `wdth 78`, tracking -0.02em, uppercase, field-ink): The running stack inside a field band. It sits between Headline and Title and belongs to the band alone — nothing else on the page uses this step.
- **Action** (800, 1rem, uppercase, `wdth 82`, Bricolage): Buttons. Nav links use `wdth 85` at 0.875rem/600.

### Named Rules

**The Condensed Axis Rule.** Display type sets `font-variation-settings: "wdth" 78` (82 for actions, 85 for nav). The condensed axis *is* the genre. An earlier build loaded the width axis and then pinned it to 100, rendering a wide neutral grotesque; the review scored that as contradicting the genre. Never ship Bricolage at default width.

**The Two-Step Scale Rule.** The ramp has two large steps — the poster h1 and the section head — and nothing between them. A single poster moment over a page of small heads was scored as a failure; section heads must stay at display scale.

**The Measurement-Only Mono Rule.** Azeret Mono appears only where something is measured or enumerated: metric labels and context, tech pills, schematic stage names, tabular metadata. Monospace worn as a costume to signal "technical" is a refused pattern. Inter is prose only and is explicitly *not* the display voice.

**The No Kicker Rule.** No category label, eyebrow, or role tag sits above a heading. The project cards' `RoleTag` was deleted and its component removed for exactly this reason; the group heading above the grid carries the category instead.

**The Alternating Case Rule.** Section heads are uppercase; the About credo is display scale but deliberately lowercase, so two stacked caps blocks do not read as one long shout.

## Layout

A single centred column at `max-w-7xl` with a three-step gutter (1.25rem / 2.5rem / 4rem at `sm` and `lg`) and a vertical rhythm of 6rem rising to 8rem per section. Sections are separated by a top hairline, not by a change of background — except the two field regions, which are separated by being a different colour entirely.

The first viewport is one gesture and carries no column at all. The whole screen is the field region, and the name is set to the exact width of it — one line, `field-ink` on vermilion, `min(26.72cqw, 62vh)`. Everything that is not the name sits on an edge: a hairline above a two-column mono block holding role, location, availability, the email, the live-dashboard link and the degree. `Hero` therefore renders outside `<main>`, as `Contact` does, because the `max-w-7xl` clamp would cage the field.

Below the field the ground picks the page back up: the one-sentence claim, then the measurement rows, then a thin marquee band. The two field regions are separated by ground rather than touching, which is the same fix the Stack/footer boundary needed. Projects are no longer a grid at all — see Project Track.

The composition comes from looking at the references rather than measuring them. Every award-winning first viewport that could be captured statically makes one edge-to-edge move: white-desert.com sets ANTARCTICA against the viewport edges, warmnfuzzy.tv floods the screen with a single saturated colour, aspensearch.com divides it into full-bleed colour panels, noho.ink splits it down the middle. None centres a padded column. An earlier version of this hero did, and that — not its information budget — was why it did not hold a reader. The metadata block sits *below* the name, which keeps the No Kicker Rule intact.

Scroll behaviour lives on `html` (not `body`, where the browser ignores it for document scrolling) with `scroll-padding-top: 5rem` to clear the 64px fixed header.

### Named Rules

**The Two-Face Rule.** A project panel does not grow to show its detail; it trades faces. The old card expanded downward and measured **1192px against a 946px viewport**, which a pinned panel cannot show at all, so opening swaps the summary out and the architecture in inside one fixed box. The container stays 704px wide, which is what the schematic needs — the retired grid had to claim a whole row on open because at half width the container was 518px and five stages crushed together. The hidden face carries `inert`, so nothing behind is reachable by keyboard.

**The Container-Query Rule.** The architecture schematic reflows on its own width, never the viewport's — `container-type: inline-size` plus `@container (min-width: 34rem)` flips it from vertical to horizontal. A 1400px viewport still only gives this card 518px, so a media query would be measuring the wrong box.

## Elevation & Depth

There are no shadows in this system. Depth is a three-step tonal ramp (ground, raised, overlay) plus hairline rules, and nothing else. Two atmospheric elements sit over the ground, both fixed compositing layers of their own so the body is not repainted on every frame:

1. A **radial white wash at 3.5%**, which establishes a single top-of-page light source.
2. A **hairline grid** — 1px rules at 6% white on a 5.5rem module, whole page. It is the same move the rest of the system makes, structure drawn with rules rather than boxes, extended to the ground itself. Rendered, a grid line measures `rgb(26,27,28)`; the worst text tone over one (`ink-muted`) holds 5.31:1 and the field link 4.84:1.

A third atmospheric layer would be one too many.

### Named Rules

**The No Shadow, No Lit Edge Rule.** No `box-shadow`, no inset highlight, no ambient glow, anywhere. Rounded, lit, shadowed surfaces were the retired world's vocabulary; reintroducing any of them is reverting the world, not refining it.

## Shapes

Hard-edged blocks and hairline rules. `border-radius: 0` on cards, buttons, pills, and role chips; borders are 1px at 8% or 16% white. Emphasis on a dark ground is a vermilion hairline, never an inverted fill. The only radius in the system is `{rounded.ring}` (0.375rem) on the global focus ring, where it softens the outline around small targets.

Recurring silhouettes: the full-bleed field band (edge to edge, overflow hidden, one line of display type); the ruled row (siblings divided by 1px, never boxed); and the left-ruled log (a 1px left border with 1rem of inset standing in for a list marker).

## Components

### Buttons
- **Shape:** Square (`{rounded.none}`), no shadow.
- **Primary:** Field background, field-ink label, uppercase Bricolage at `wdth 82`, 0.875rem/1.5rem padding.
- **Hover / Focus:** Primary inverts to white ink ground on hover (colour transition, 150ms); focus uses the global vermilion ring at 2px with 2px offset.
- **Ghost:** Transparent with a strong hairline, ink label; hover fills to the overlay tone and keeps its border.
- **On Field:** Where a button sits inside a vermilion region it inverts — field-ink ground, vermilion label, Azeret Mono at 0.06em tracking — and its focus ring is field-ink, not vermilion, because vermilion on vermilion is invisible. **It hovers to the same white ground and near-black label as every other primary button**, which means setting the label explicitly: the resting label is vermilion, and letting that inherit onto white would invent a third treatment. A white button *fill* on the field is not a breach of the Black-On-Field Rule, which governs ink and borders drawn on vermilion, not a surface laid over it; the pair measures 4.75:1 as a boundary.

### Chips
- **Style:** Tech pills are transparent with a strong hairline and secondary ink, Azeret Mono at 0.75rem, square. On the field they keep the transparent ground but take a solid `{colors.field-ink-secondary}` border and field-ink text.
- **State:** A pill is metadata, never a control, but it does answer the pointer: 150ms to full ink on the dark ground, and on the field it takes the **same hover as every primary button there** — white ground, near-black label — because a second on-field hover treatment earns nothing. It inverted to a field-ink fill with a vermilion label until 2026-09-18. The accent role chip (vermilion fill, field ink) exists but is used only where a filled emphasis is the point.
- **Entrance:** In the Stack section the pills belong to that section's GSAP timeline (see Stack Timeline) rather than to a CSS reveal of their own; they rise 14px on a 0.07s stagger as their row resolves. A short-lived `.chip-in` CSS reveal was removed when the timeline took over — two systems animating the same pills is one too many.

### Contact
The close animates on entry rather than arriving flat. The "Open to the right opportunity." headline rises out of a clipping wrapper on `.rise-in`, which reuses the hero's own `word-rise` keyframe on a `view()` timeline instead of a load-time delay; the lede follows on `.on-scroll`, and the Index and Contact columns take `r1` and `r2` so they begin 12% and 24% later. In the field band the wordmark rises the same way, and the meta row under it follows.

Both masks clip with `overflow: clip` and the footer itself carries no overflow at all — see the Clip-Not-Hidden Rule, which this section is the reason for.

### Project Track
**One band, all six.** The section ran as two bands per category for a while; it is a single queue again, in resumeData's own order, which already leads with Data Engineering — the tie-break PRODUCT.md asks for. The two group names stay legible as a legend beside the controls, and each panel repeats its own category on its micro-label, so the grouping survives without splitting the track.

The proportions come from rauno.me, measured rather than eyeballed: his horizontal strips are **655px tall inside a 1200px container with `overflow-x: clip`**, items of non-uniform width (655 square, 916, 1414, 2356), and the next card peeking past the edge — the page keeps its rhythm above and below rather than being taken over. Panels here are `min(86vw, 40rem)` by `min(620px, 74vh)` — 640×620 at 1293px wide — and the band pins at `center center` so it sits mid-viewport while it travels, rather than at the top with the screen half empty.

The track is padded left by `max(0px, (100vw - 80rem) / 2) + c-space` so the first card's edge lines up with the heading column and the last runs off the right. Putting that padding on the track and not the wrapper keeps the travel distance as plain `track.scrollWidth - innerWidth`. GSAP translates `x` by exactly that, with `ease: "none"` — any other ease and scroll position stops agreeing with panel position.

**A band only pins if it overhangs by more than 160px**, so a track with a trivial overhang stays a native row rather than holding the page for a stutter. That guard existed because a two-project band overhung by only 58px; merged, all six panels sit at `min(86vw, 40rem)` and the track overhangs by 2576px, so the guard never fires — it stays as a floor for any future band.

The wrapper uses `overflow: clip`, not `hidden`, and the distinction is load-bearing: `hidden` still creates a scrollport, so focusing an off-screen panel let the browser reveal it by setting the wrapper's `scrollLeft` — 2646px of it, on top of the track's transform — which left the track doubly offset and the pin desynced for every later scroll. `clip` creates no scrollport, so that cannot happen.

Below 768px, and under reduced motion, `matchMedia` never runs the pin and the track stays what CSS makes it: a natively swipeable row with `scroll-snap`. That is the fallback, not a second code path.

**Controls.** A 28px square prev/next pair sits with the band's label, above the panels in both DOM and reading order. Pinned, they step the *page* by one panel width, which the 1:1 mapping turns into one panel of travel; unpinned, the track is a real scroller and takes the step directly. They disable at each end, driven by GSAP's progress when pinned and by the track's own scroll ratio when not — the same value that drives the progress rule.

**Keyboard.** Focus follows the same path: focusing anything inside a panel scrolls the page so that panel lines up with the heading column, `instant` rather than `smooth` because during a Tab run smooth scrolls queue up and fight. Two earlier attempts at this failed from inside the motion module — `scrollBy` in a native `focusin` handler was undone by the browser's own adjustment, and a frame-deferred one never fired. Doing it in the component, through the path the buttons had already proven, is what made the difference.

Verified with real `Tab` presses rather than programmatic focus: Next → Medicare → NYC Taxi → E-Commerce, every focused panel on screen, and every one of the six panels' toggles reachable in order.

### Cards / Containers
- **Corner Style:** Square.
- **Background:** Raised surface on the ground.
- **Shadow Strategy:** None — see Elevation & Depth.
- **Border:** 1px strong hairline, which goes vermilion on hover as the background lifts one step.
- **Internal Padding:** `{spacing.card-pad}` (1.5rem).

### Navigation
A fixed full-width header, 64px tall, on an opaque `{colors.surface}` ground with a bottom hairline. It was 72% translucent with `backdrop-blur-md` until the hero became a field region — over vermilion a translucent dark bar turns muddy brown, and a solid chrome bar reads as deliberate and holds its contrast on every section. Links are uppercase Bricolage at `wdth 85`, muted ink at rest, full ink on hover, each with a 2.75rem minimum height. The wordmark is plain text "Zaid" with a muted period. The mobile menu is *opaque* on purpose: over a 72% translucent header the poster headline bleeds through an open menu.

### Architecture Schematic
The page's one authored motion moment. A stage list of mono stage names and overlay-toned item boxes, connected by 1px edges. When a card opens, nodes settle in and edges extend stage by stage at a 90ms stagger; it replays on every open and never on page load. It is fully legible with the animation absent, and two items in one stage means a real branch in the architecture, not a layout convenience.

### Measurement Rows
Three full-width ruled rows under "How these were measured", `[2.5rem | number | evidence]` at 768px and stacked below it. The number is the Metric step in vermilion; the evidence column carries whichever form the measurement actually took — a two-bar comparison against the design it replaced (21,091 msg/s against ~500), or the pipeline path as mono stage names joined by hairlines. It replaced a three-column stats row that stated numbers without saying how they were taken, and `MetricStat` was deleted with it. A number on its own is a claim; this is the component that makes it evidence, which is the commitment position 03 in About already makes.

Counters parse prefix, number, and suffix so `21,091`, `<100ms`, and `9.66M` all survive the count-up intact, and the authored value is cached on the element so a re-run cannot read a half-counted "0" as its target.

### Gauge
The proportion primitive: a 3px track at 14% white with a fill that is vermilion for the achieved value and muted ink for the baseline. A rule, not a filled bar — emphasis on the dark ground is a vermilion hairline, never an inverted fill. The track has to stay visible because the interesting fills are short: 2.4% and 7.1%.

### Panel Grid
About is a hard modular grid of full-bleed panels that butt edge to edge, the structure `aspensearch.com` is built on: `label | statement`, then `bio | portrait | availability`, then three stat panels, then the four credentials and the four stances — **each one its own panel**, not a list inside a panel. Seven rows, eighteen panels.

The spans alternate deliberately so no two rows read as the same module: the records run `2+1` then `1+2`, the stances run `1+2` then `2+1`, and the tone alternates raised/surface across both so the checker never settles into a pattern. Aspen's grid never repeats a row either. `.panel-min` puts a 13rem floor under the record and stance panels so a short one does not sit squat beside a tall one, while the row still grows to whatever its tallest panel needs; the floor is off below 768px.

Two panels in the grid are field regions rather than tone steps: Availability, which spans rows 2–3 of the right-hand column, and the **first** of the three readings, flush to the left viewport edge in row 3. They bookend that band with two dark panels between them. The middle reading was tried first and reads worse — vermilion, dark, vermilion alternates, and the single panel caught between them looks like a hole rather than air. A reading and not a credential because vermilion already carries every metric numeral in this system, so a field panel *inverts* that pair (`field-ink` numeral, `field-ink-secondary` caption) instead of inventing a rule; the eight record and stance panels are a uniform family, and colouring one of them would have nothing behind it.

The readings therefore precede Availability **in source order**, which the desktop grid does not care about — `grid-template-areas` places every panel by name. The single mobile column follows the DOM, and with Availability first the two field panels butted into one unbroken 510px block of vermilion at 375px. Any future field panel has to be checked in the collapsed column as well as in the grid.

The whole section is one continuous grid; the positions band used to sit below it in a separate `max-w-7xl` container, which broke the run of panels.

Each panel carries exactly one thing, is named by a micro-label rather than a heading, and the portrait panel exists only when `public/assets/portrait.webp` does. An empty panel there read as a black rectangle rather than as air, so `.about-grid.no-portrait` drops the column and the bio widens into it instead. The hairlines between panels are the grid's own 1px gaps showing the container through, so there are no doubled rules where panels meet. `About` renders outside `<main>` for the same reason Hero and Contact do: panels that stop at 1280px are cards, not panels.

The structure is Aspen's; the palette and the type are this system's — they set a light neutral grotesk on white and mint, this sets heavy condensed Bricolage on near-black and vermilion. Their panels also carry halftone photography, which this site has no assets for.

### Panel Reveal
The second half of how the grid moves, and the part measured across Aspen's whole 11,180px page rather than one section: **45 elements animate**, and the repeated pattern is a scroll-linked rise and fade — `translateY(33px)` with `opacity: 0` easing to none and 1 as the element enters. At any one scroll position neighbours sit at different progress; one sample read 0.138, 0.505, 0.746 and 0.926 simultaneously. That stagger is what reads as each block moving independently, and it is the thing a single shared reveal does not give you.

Here it is three literal ranges — `entry 5% cover 22% / 34% / 46%` — cycled across the panels, so panels sharing a row finish at different times. The ranges are literal on purpose: `entry 0% cover calc(20% + var(--r) * 7%)` computed to `entry cover 20%`, a malformed range that never activated its timeline, and with `both` fill that pinned every panel at the from keyframe and rendered the whole section invisible. Behind `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`, so an engine without view timelines shows the panels outright and reduced motion is the absence of the animation.

Label panels are deliberately excluded: they hold the sticky labels, and the two devices should not compete in the same panel.

### Stack Timeline
One GSAP timeline scrubbed by the Stack section's own scroll progress (`start: top 85%`, `end: bottom bottom`, `scrub: 0.6`). The end matters: at `bottom 70%` progress only reached 1 once the section's top had left the viewport, so the last row could never be read at the same time as the first. Ending at `bottom bottom` completes the timeline exactly when the whole section is on screen.

The section is sized to make that possible. At `section-spacing` with 24px row padding and a 36px category head it measured **1121px against a 946px viewport**; it is **792px** now — `py-16 md:py-20`, `py-4` rows, a 30px head, and the lede beside the heading rather than under it, which alone was worth ~84px. Below roughly 860px of viewport height the six rows still will not share a screen; the next cuts would be `py-3` rows and `md:py-14`. Each row resolves in turn: its hairline draws left to right (`scaleX 0 → 1`, which is why the rule is a real element and not a `border-top` — a border cannot be drawn on), the category head slides in from `x: -28`, its pills stagger up 14px at 0.07s apart, and the plain-text tail fades last. Scrolling back up unwinds it.

Measured across the section: 0 of 30 pills visible before the trigger, 7 at 30% progress, 20 at 60%, 28 at 100%, all 30 past the end. Under `prefers-reduced-motion: reduce` the `matchMedia` branch never runs, so no start state is ever written and the section simply renders.

### Sticky Label
How the grid moves on scroll, and worth stating precisely because the obvious guess is wrong. Aspen transforms nothing: sampling their page across four scroll positions found one rotating graphic and **twelve `position: sticky` elements pinned at `top: 60px`**. A label column pins under the header while the content column beside it scrolls past, and that differential is the entire effect. Here the About, Credentials and How-I-work labels pin at `top: 5.5rem`, clearing the 64px header.

Sticky is not animation. It needs no `@supports` branch, no reduced-motion gate, and it carries none of the vestibular load that moving several layers at different speeds would. Below 768px the rule is off and the labels become plain section headers.

### Micro-label
A 6px filled vermilion square followed by the Label step — mono, 0.75rem, 0.1em, uppercase. It names a panel without spending a heading on it, and inverts to field-ink inside a field panel. It is the Label step and not a size of its own: a first pass set 0.6875rem here, a second micro size one pixel off the one the system already had.

### Stat Panel
One numeral at the Metric step and its caption at the Label step, pinned to the panel's foot with `margin-top: auto`. The scale gap between the two, inside one panel, is the whole device. It has no styles of its own — an earlier pass gave it a private `clamp(2.75rem, 5.5vw, 4.5rem)` and a private caption size, a third metric scale in a system that already had two. The numeral is vermilion because vermilion carries every metric numeral here.

### Named Rules

**The Fixed-Is-The-Parallax Rule.** Depth on scroll comes from a layer that does not move. `position: fixed` holds the grid at 0× while content runs at 1×, which is exactly what the measured reference (white-desert.com, Awwwards SOTD 11 Sep 2026) achieves by counter-translating its background at 1.00× scroll. Only two things are animated on scroll, both in CSS with no JS: the grid drifts 72px across the whole document, and the hero name lifts 190px over the first viewport — **0.20×**, inside the 0.2–0.3× band the reference sits in. Both live on custom properties in `:root` so the intensity is one number. One moving background layer, not three: the vestibular risk scales with layer count.

**The Clip-Not-Hidden Rule.** `overflow: hidden` creates a scrollport; `overflow: clip` does not. That distinction has broken three separate things on this page, so it is a rule rather than a note:

- A `view()` timeline resolves against the element's nearest scrollport. `overflow: hidden` on the footer made the footer that scrollport, and every reveal inside it silently never ran. Same again one level down, where the mask wrapper that makes a headline "rise from below" was itself clipping with `hidden` — a masked rise and a `view()` timeline cannot coexist through `hidden`. Same again on `.field-band`, which is why the footer wordmark sat still.
- On the pinned project track, `hidden` let the browser reveal an off-screen panel by setting the wrapper's `scrollLeft`, on top of the track's transform, desyncing the pin.

Use `clip` wherever the intent is masking. Reserve `hidden` for something that is genuinely meant to scroll.

**The Reachable-Range Rule.** Scroll-driven reveals end on `entry 100%`, not on a `cover` percentage. A `cover`-based range needs the element to travel a share of the viewport *plus* its own height, which an element in the last section can never do — the page runs out of scroll first. The footer's reveals were written `entry 5% cover 22%` and left its content invisible on a phone. `entry 0% entry 100%` completes exactly when the element is fully on screen, which is reachable wherever it sits. Stagger by moving the *start* (`entry 12%`, `entry 24%`), never the end.

**The CSS-Entrance Rule.** Entrance reveals are CSS animations, not GSAP. `gsap.from()` applies its start state immediately, so an interrupted tween can leave text permanently invisible — StrictMode's double-invoked effects orphaned a staggered word at `translateY(110%)` exactly that way. A CSS animation cannot be orphaned.

GSAP owns only what CSS cannot do, and that is now three things: the scroll-velocity marquee, the counters, and the Stack section's scrubbed timeline. The third was added at Zaid's request (2026-09-18) and is a real widening of this rule, recorded rather than smuggled. It earns the exception: a single sequence whose progress *is* the section's scroll progress cannot be built from `view()` timelines, because each element's CSS timeline starts from its own position and they cannot be sequenced against one another.

Anything GSAP reveals uses `gsap.set()` for the start state and `to()` for the tween — never `gsap.from()`, and not `fromTo` with `immediateRender: false` either: deferring the start state means a scrubbed timeline leaves everything visible at progress 0 and the section does nothing. `gsap.set()` applies immediately and is undone by `ctx.revert()`, so an interrupted context restores the markup instead of stranding it invisible.

**The Absence Rule.** Reduced motion is the *absence* of the animation, never a second code path. `gsap.matchMedia()` reverts what it created when its condition stops matching, and every CSS animation is switched off under `prefers-reduced-motion: reduce`. There is nothing to keep in sync.

## Do's and Don'ts

### Do:
- **Do** apply vermilion as a whole region — a full-bleed band, a whole section, the footer — and keep first-viewport coverage near 11.8% and page coverage near 28.7%.
- **Do** use only `{colors.field-ink}` (5.55:1) and `{colors.field-ink-secondary}` (4.83:1) on the field, as solid colours.
- **Do** set `"wdth" 78` on display and heading type, 82 on actions, 85 on nav.
- **Do** restrict Azeret Mono to measurements: metric labels and context, tech pills, schematic stage names, tabular metadata.
- **Do** keep section heads at display scale (`clamp(2.75rem, 8vw, 6.5rem)`), uppercase.
- **Do** draw structure with 1px hairlines and the three-step tonal ramp.
- **Do** keep every text tone at 4.5:1 or better against its worst-case surface, and every UI boundary at 3:1 or better.
- **Do** keep every interactive target at 24×24 CSS pixels or larger (WCAG 2.2 SC 2.5.8) — nav links and inline links carry explicit minimum heights for this reason.
- **Do** keep the global `:focus-visible` ring, and override it to field-ink inside a field region.
- **Do** keep `inert` on collapsed disclosure content so hidden panels stay out of the tab order and the accessibility tree.
- **Do** reflow the schematic on its own width with a container query, not a media query.
- **Do** put entrance reveals in CSS and leave GSAP the marquee and the counters.

### Don't:
- **Don't** scatter vermilion as accents, trim, or small badges on the dark ground. That produced a rebuild directive once already.
- **Don't** put white text on the field (3.57:1), and don't use any alpha-composited tone there.
- **Don't** add a second accent hue, and never teal-on-navy or violet-glow.
- **Don't** reintroduce border radius on cards, buttons, or pills, and don't reintroduce inset lit edges or ambient shadows.
- **Don't** render Bricolage at default width (`wdth 100`) — that is a wide neutral grotesque and contradicts the genre.
- **Don't** use Inter or Bricolage for a measurement, and don't use Azeret Mono as a costume for "technical" prose.
- **Don't** place a kicker, eyebrow, or category label above any heading; the group heading carries the category.
- **Don't** flatten the scale into one poster moment over a page of small heads.
- **Don't** stack two uppercase display blocks in a row.
- **Don't** use `gsap.from()` for entrance reveals, and don't add `@gsap/react` — it resolves its own React against React 19 and throws "Invalid hook call".
- **Don't** write a separate reduced-motion code path; remove the animation instead.
- **Don't** soften any of the above toward restraint. The craft bar is the pinned bold-editorial genre, not linear.app.
