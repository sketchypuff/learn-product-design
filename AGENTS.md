# Agents & Skills

The skills below are copied into `.claude/skills/` locally. That folder is git-ignored because the
skills come from licensed packs (AI for UI, Interface Craft, Animations.dev) and this repo is public.
On a new machine, install the packs from their vendors, then copy these nine skills in again.

## Design & UI

- `prototype` is for when a layout isn't settled (a new card style, the lesson sidebar on mobile,
  a search UI). Build two or three directions behind a picker before committing to one.
- `component-design` is for designing component APIs before there are copies: lesson cards,
  thumbnails, prose blocks, and any interactive lesson examples.
- `forms-and-inputs` is for any form: search, newsletter sign-up, feedback, quiz answers.
- `touch-and-accessibility` covers navigation and anything interactive. Sidebar and contents
  links need visible focus, diagrams need labels, and tap targets must hold up on phones.
- `ui-polish` is for the finishing pass: font rendering, hover/focus states, truncation, layout
  shift.
- `design-foundations` covers spacing, hierarchy, type, and colour on any new screen.
- `ui-review` should run before committing an interface change.
- `animations` and `interface-craft` only apply when motion is in scope. The site is deliberately
  calm (see DESIGN.md), so use them for small feedback like press states and lesson demos, not
  page transitions.

## Project-specific

- Before committing, `pnpm test && pnpm lint && pnpm build` must pass. `build` runs `tsc -b`,
  which catches type errors that `vite dev` lets through.
- Changes to `src/lib/lessons.ts` ship with a test in `lessons.test.ts`.
- Verify UI changes in the browser pane via `.claude/launch.json` (config `dev`, port 5174), at
  desktop width and at 375px.
