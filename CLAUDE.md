# Learn Product Design

A free, self-paced education site that teaches product design. A home page lists lessons in sections
as cards, and each lesson is an article page with a lesson sidebar and an "On this page" contents list.
It's a static, client-only React app, solo for now, meant to deploy to Vercel.

## Commands

- `pnpm dev` starts Vite. `.claude/launch.json` runs it on port **5174** (5173 is often taken by
  other local projects).
- `pnpm test` runs Vitest once. `pnpm test:watch` while working.
- `pnpm lint` runs **oxlint**, not ESLint. Rules live in `.oxlintrc.json`.
- `pnpm format` runs Prettier with the Tailwind class-sorting plugin.
- `pnpm dlx shadcn@latest add <name>` adds a shadcn component (radix base, Nova preset).
- pnpm lives in `/opt/homebrew/bin`, which non-login agent shells may not have on PATH. If you see
  `pnpm: command not found`, prefix the command with `PATH=/opt/homebrew/bin:$PATH`.

## Architecture

There's no backend or CMS. Routing is `react-router` in `src/App.tsx`: `/` is the home page and
`/learn/:slug` is a lesson. `vercel.json` rewrites every path to `index.html` so deep links work.

**Header** (`src/components/site-header.tsx`). It holds Search, Lessons, Skills, and an
Account menu. Survey, Vault, and Vocabulary from the reference were removed on purpose. Lesson pages hide the nav (`nav={false}`).

- Skills isn't built yet. Its route shows a `ComingSoonPage` (listed in `COMING_SOON` in `App.tsx`),
  so no link is dead. When you build it, replace its entry.
- Search is a cmdk `CommandDialog` (also ⌘K / Ctrl+K) over published lessons. It matches title,
  description, and article headings with a plain substring filter, because cmdk's fuzzy default
  ranked unrelated lessons first. Current shadcn needs an explicit `<Command>` inside
  `CommandDialog`, and its sr-only title was moved inside `DialogContent` so the dialog is labelled.
- There are no user accounts. Account shows completed-lesson progress and "Reset progress".

**Lesson catalogue** (`src/lib/lessons.ts`, tested). `SECTIONS` is the single list of sections and
lessons, in display order. It drives the home grid, the lesson sidebar, and previous/next links.

- `published: false` lessons show a "Soon" badge and are not links anywhere. Don't add a route or
  a dead link for them.
- `status` (`new` / `updated`) is shown only on published lessons, and a completed lesson shows a
  check instead.
- `neighbours()` skips unpublished lessons, so the pager never points at an unwritten lesson.

**Lesson articles** (`src/lessons/`). Each article is a TSX file that exports its component and a
`headings` array, registered in `src/lessons/index.ts` (`ARTICLES`). To publish a lesson: write the
file, add it to `ARTICLES`, and set `published: true` in `SECTIONS`. A slug that's published but
missing from `ARTICLES` redirects home.

- Build articles from `src/components/prose.tsx` (`P`, `H2`, `Ul`, `Strong`, `Diagram`). Don't
  style raw tags inline, so all articles stay consistent.
- Each `H2` id must match an entry in `headings`. That list feeds the contents list.
- `Diagram` is text art in the mono face. Build lines as string literals in `{'…'}` so Prettier
  and JSX don't collapse the whitespace. Colour runs with `DiagramAccent` / `DiagramFaint` /
  `DiagramBright`. Give it a `label`, since screen readers can't make sense of box-drawing.
- The fast-refresh lint rule is off for `src/lessons/**` because those files export `headings`.

**Contents scroll-spy** (`src/hooks/use-active-heading.ts`). The active heading is the last one
whose top has crossed 30% of the viewport, recomputed on scroll. It isn't an IntersectionObserver,
because that loses the heading while you're in the middle of a long section.

**Completion** (`src/hooks/use-completed-lessons.ts`). It's stored in `localStorage` under
`completed-lessons`, through a `useSyncExternalStore` store. Every storage access is in try/catch,
because storage throws in some private windows and embedded previews. It's a per-browser
convenience, not an account feature.

**Card art** (`src/components/lesson-thumbnail.tsx`). These are decorative (`aria-hidden`).
They come in two surfaces: `ink` (mono text on the page colour) and `paper` (light sheet with
drawn UI). Add a new `ThumbnailKind` there when you add a lesson. Keep art centred and inside the
220px height.

## Conventions

- Tailwind is **v4**, configured in CSS. Tokens are in `src/index.css`, and there's no
  `tailwind.config.js`. Add colours as CSS variables there (and map them in `@theme inline`), not as
  arbitrary values in components.
- The site is **dark only**. `<html class="dark">` is hard-coded in `index.html`, and `:root`
  holds the dark palette. There is no theme toggle. See DESIGN.md before adding one.
- The `@/` alias is declared in three places: `tsconfig.json` (for the shadcn CLI),
  `tsconfig.app.json`, and `vite.config.ts`. Change all three together. TS 6 deprecates `baseUrl`,
  so don't add it.
- `src/components/ui/` is shadcn-generated source that we own. `badge.tsx` has extra
  `new` / `updated` / `soon` variants for lesson status.
- All lesson text is original. The layout was modelled on aiforui.dev/learn. Don't copy text,
  illustrations, or its licensed fonts (Berkeley Mono, Tiempos, Heldane) from there.
