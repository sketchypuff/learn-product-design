# Design

## Direction

Quiet, dark, and reading-first, closer to a well-set book than a marketing site. The lesson content
is the hero. Chrome is near-black and low contrast, so the only colour on screen is the blue
diagram accent and the status badges. Visual system: shadcn/ui (radix base, Nova preset), with
departures made deliberately.

## Reference (decided 2026-10-18)

The layout is modelled on aiforui.dev/learn (home) and its lesson pages, at the user's request.
We copied structure and measurements, not content.

- Copied: the dark warm-neutral palette, the section pills, the 3-column card grid (24px column gap,
  32px row gap, 1096px wide), 220px card art with a hairline ring, the badge tints, the
  260px lesson sidebar, the 700px article column, and the right-hand "On this page" list.
- Not copied: any text, illustrations, the logo, or fonts. Their fonts (Berkeley Mono, Tiempos,
  Heldane) are commercial licences. We use Inter Variable and JetBrains Mono Variable instead.

## Source of truth

The code is the source of truth: `src/index.css` for tokens, `components.json` for the shadcn
style. There's no Figma file yet.

## Layout

- **Home.** A 72px header (logo left, nav right), then sections. Each section is a pill label and a
  grid of cards: 3 columns from `lg`, 2 from `sm`, 1 below. A card is art, then title (15px/500), then a
  one-line description (15px, muted). Unpublished lessons sit at 60% opacity with a "Soon" badge and
  aren't links.
- **Lesson.** A sticky header, a 260px sidebar (from `lg`), a centred 700px article, and a 220px
  contents list (from `xl`). The current lesson's sidebar row has the accent background. The
  active contents item gets a 2px white left rule.

## Tokens

- The palette is OKLCH in `src/index.css`. Warm near-black with a hue of about 100: background
  `0.177`, raised `0.213`, active `0.284`.
- Text has four steps: `foreground` (white, titles), `prose` (0.873, article body),
  `muted-foreground` (0.767, descriptions and nav), and `faint` (0.582, disabled and diagram
  strokes).
- Badges: New is a blue tint, Updated a violet tint, Soon neutral. They're 12px with a 6px radius.
- Card art uses `shadow-thumb`, a 1px white-10% ring plus a small drop shadow, instead of a border.
- Radius is `0.5rem`.

## Typography

- Inter Variable for UI and prose. JetBrains Mono Variable for diagrams and card art.
- Article: title 24/32, section heading 20/28, body 16 at 1.65. Sizes come from the reference.
- Use curly quotes and apostrophes in lesson copy.

## Motion

Almost none. There are colour transitions on hover (150ms) and a 0.97 press scale on buttons. No
scroll animations or page transitions. Reading pages should feel still.
