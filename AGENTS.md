# Agents & Skills

Skills live in `.claude/skills/` (Claude Code) and `.codex/skills/` (Codex). Both folders are
git-ignored because the skills are licensed and this repo is public. The 28 aiforui skills are
installed per project with the vendor's installer:

```bash
npx @aiforui/install --token=<your token from aiforui.dev> --project -y
```

`interface-craft` is from a separate pack and is copied in by hand from `~/.claude/skills/`.

## Design & UI

- `emil-prototype` is for when a layout isn't settled (a new card style, the lesson sidebar on mobile,
  a search UI). Build two or three directions behind a picker before committing to one.
- `emil-component-design` is for designing component APIs before there are copies: lesson cards,
  thumbnails, prose blocks, and any interactive lesson examples.
- `emil-forms-and-inputs` is for any form: search, newsletter sign-up, feedback, quiz answers.
- `emil-touch-and-accessibility` covers navigation and anything interactive. Sidebar and contents
  links need visible focus, diagrams need labels, and tap targets must hold up on phones.
- `emil-ui-polish` is for the finishing pass: font rendering, hover/focus states, truncation, layout
  shift.
- `emil-design-foundations` covers spacing, hierarchy, type, and colour on any new screen.
- `emil-ui-review` should run before committing an interface change.
- `emil-animations` and `interface-craft` only apply when motion is in scope. The site is deliberately
  calm (see DESIGN.md), so use them for small feedback like press states and lesson demos, not
  page transitions.

## Project-specific

- Before committing, `pnpm test && pnpm lint && pnpm build` must pass. `build` runs `tsc -b`,
  which catches type errors that `vite dev` lets through.
- Changes to `src/lib/lessons.ts` ship with a test in `lessons.test.ts`.
- Verify UI changes in the browser pane via `.claude/launch.json` (config `dev`, port 5174), at
  desktop width and at 375px.
