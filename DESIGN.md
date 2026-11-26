---
name: Zaid Shaikh — Portfolio
description: One ink, one paper, one red; condensed poster type; a page told in five chapters, each with its own signature object.
colors:
  ink: "#0a0a09"
  paper: "#f3eadb"
  hot: "#ff4a2a"
  field-red-hot: "#c5170c"
  field-red: "#9b0f07"
  field-red-deep: "#5c0703"
  hairline-on-paper: "#0a0a0926"
  hairline-on-ink: "#f3eadb22"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontWeight: 900
    fontVariation: "\"wdth\" 62"
    textTransform: uppercase
    note: "every headline, giant numeral and chapter word; sizes are per section, never on the shared scale"
  text:
    fontFamily: "Archivo, sans-serif"
    fontWeight: "400–800"
    fontVariation: "\"wdth\" 100"
  accent:
    fontFamily: "Instrument Serif, serif"
    fontStyle: italic
    fontWeight: 400
    note: "the one italic word in a headline, intertitles, proof lines; usually in hot"
  mono:
    fontFamily: "Martian Mono, monospace"
    fontWeight: "500–600"
    textTransform: uppercase
    letterSpacing: "0.08em–0.16em"
    note: "labels, measurements, chapter bars, commit messages, captions"
scale:
  t-xs: "9.5px (11px on phones)"
  t-sm: "10.5px (12px on phones)"
  t-md: "13px"
  t-body: "clamp(15px, 1.2vw, 18px)"
  t-lede: "clamp(18px, 1.6vw, 26px)"
  t-h4: "clamp(22px, 2.2vw, 34px)"
  t-h3: "clamp(28px, 3.2vw, 52px)"
motion:
  u-out: "cubic-bezier(.16, 1, .3, 1)   — enter"
  u-io: "cubic-bezier(.77, 0, .18, 1)   — travel"
  u-in: "cubic-bezier(.7, 0, .84, 0)    — exit"
  u-d1: "0.28s — touch"
  u-d2: "0.6s — reveal"
rounded:
  none: "0"
---

# Design System: Zaid Shaikh — Portfolio

The site lives in `src/site/`. It was designed and verified on the MagicPath canvas ("Portfolio · Unified") and ported as-is; `src/site/Unified.css` holds the shared tokens and every phone correction.

## Overview

**North star: one system, five chapters, one signature object each.** The page reads as a sequence of chapters that share one palette, three faces, one type scale and one motion language, but each chapter owns an idea nothing else on the page uses. Energy comes from that contrast, not from louder effects.

| Order | Surface | Chapter | Signature object |
|---|---|---|---|
| Hero | red field | — | Aura-edit cold open; cut-out portrait; the Slice menu |
| Statement | ink | — | "Every pipeline I build ships with the *number* that *decided* it", scroll-written |
| Intertitle | paper | — | "Claims are easy. / Here's what was measured." |
| 01 Measured | ink | Measured | Four positions, each with one giant counting number |
| 02 Work | paper | Work | The line: seven project posters on one ride, plus the detail panel |
| (Work, cont.) | paper | Work · the kit | The Swiss axis: 21 tools in six layers, sticker collages, the all-21 sheet |
| 03 Beyond | ink | Beyond the pipeline | `git log --graph`: data engineering is `main`, the second track branches off it |
| 04 Off the clock | paper | Off the clock | Swiss poster grid of panels; game posters; live Last.fm turntable |
| 05 Contact | red field | Contact | The Final Cut: the email as a liquid-fill copy target, the slate, the credits footer |

## Colors

- **One ink, one paper, one red.** `ink` and `paper` are the only surfaces; `hot` is the only accent. Nothing else enters, including in images' frames, posters and badges.
- **The red field is reserved for the bookends.** The hero and Contact use the field (`field-red-hot` → `field-red` → `field-red-deep` radial, public-domain art screened over it). No middle chapter uses it.
- **Surfaces alternate so chapters read.** Two neighbours never share a surface without something between them. Where they would (Statement and Measured are both ink), an intertitle sits between them on the *opposite* surface.
- **Section numbers are hot.** Every chapter label is `NN Name` with the number in `hot`, matching the menu exactly.

## Typography

- **Three faces, three jobs.** Archivo for everything structural, Instrument Serif italic for the one human word, Martian Mono for anything measured or labelled. No fourth face.
- **Two Archivo widths only.** `wdth 62` for display, `wdth 100` for text.
- **Display sizes belong to their section.** The shared scale (`--t-*`) covers small and mid text only; giant numerals and chapter words are tuned per section and never snapped to it.
- **Compressed type needs air.** Uppercase `wdth 62` at display size swallows spaces and outlines cross: set `word-spacing` ≈ `.12–.2em` on multi-word display lines, and open tracking (≥ `.01em`) on outlined numerals.
- **Fractions set like Work's 7/7.** The slash is a small serif italic with even optical space either side; balance it by eye, not by equal margins.

## Layout

- **Chapters are numbered 01–05 in page order and the menu matches.** Adding a chapter renumbers everything after it, including the menu strips, section labels and the Contact footer index.
- **Phones (≤760px) get their own corrections in one place** (`Unified.css`): pinned scroll stages unpin where the pin only created empty space (the Statement), giant words are sized to fit 375px, the menu becomes an icon-only hamburger, and every tap target is at least 44px.
- **Two-column tables share one grid.** Rows that line up across a table (the Beyond log) use a shared grid or subgrid, so a longer cell never shifts a row.

## Motion

- **One scroll engine.** `src/site/Scroll.ts` owns the page: a Lenis-style wheel glide on fine pointers, native scrolling elsewhere. Sections only *read* scroll position; `glide.hold` pauses the page while a sheet or panel owns the wheel.
- **Scroll-driven values are measured live**, every frame, with `getBoundingClientRect`; offsets are never cached. Loops are gated off-screen.
- **Never put a CSS transition on a scroll-driven value.** It lags behind the scroll (and freezes in throttled previews).
- **Three curves, two durations.** Enter `u-out`, travel `u-io`, exit `u-in`; `u-d1` for touch feedback, `u-d2` for reveals. Long authored moves (the menu slide, the odometer) keep their length but use the same curves.
- **Menu navigation never scroll-travels.** The page jumps under the closing Slice, the cover dissolves, and tall scroll-driven sections glide a short way in so their first lines write on arrival.
- **Reduced motion is honoured everywhere**: scroll reveals resolve to their end state and pins release.

## Components

- **Nav · The Slice.** The menu splits the portrait into one strip per chapter; a hovered strip flips to the x-ray face. On phones the strips slide 58% (a portrait sliver stays in every row) and every sliver shows the x-ray, since phones cannot hover.
- **Intertitle.** One sentence in Instrument Serif italic, words surfacing as it reaches the middle of the screen; second line in `hot`. Used only where neighbours would share a surface, on the opposite surface.
- **Beyond git graph.** Graph | Commit | Proves table. `main` (paper lane) carries the data-engineering builds as `feat(data):` commits; `beyond` (hot lane) carries one conventional commit per role, with a status stamp: Shipped (paper), Shipping (hot), Learning (hot outline, staged, hollow dashed commit). No invented hashes or dates.
- **Contact copy.** Desktop: a hover slate ("Click to copy" → timecode while holding → "Copied ✓") and the outlined host filling like liquid. Touch: a visible "Tap to copy" chip under the address that confirms in place.

## Do's and Don'ts

**Do**
- Claim a role or a number only where a project proves it; mark the rest "Learning".
- Keep tech logos in their original brand colours.
- Make selection click-only: hovering never changes what is selected.
- Ground any new section in a named moodboard reference, and check it does not repeat Work's content.

**Don't**
- Reintroduce the AI Resume Chat, the dark space theme, the 3D astronaut, animated flip words, or the retired vermilion/Bricolage "Signal Field" system.
- Reprise the Slice in Contact, or use the red field in a middle chapter.
- Use chapter breakers that read as literal chapter cards or that borrow a neighbour's vocabulary (the marquee and Swiss-poster breakers were both rejected); breaks are intertitles.
- Add a fourth face, a second accent colour, rounded corners or drop shadows on UI.
