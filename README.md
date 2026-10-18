# Learn Product Design

A free, self-paced course on product design: lessons grouped into sections, each one a short article
with diagrams.

## Run it locally

```bash
pnpm install
pnpm dev
```

## Writing a lesson

1. Add the lesson to `SECTIONS` in `src/lib/lessons.ts`.
2. Write the article in `src/lessons/<slug>.tsx` using the blocks in `src/components/prose.tsx`.
3. Register it in `src/lessons/index.ts` and set `published: true`.

## Built with

Vite, React, TypeScript, React Router, Tailwind CSS v4, and shadcn/ui, with Vitest for tests. It's
a fully static site with no backend.
