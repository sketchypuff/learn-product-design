import type { ReactNode } from 'react'
import { Logo } from '@/components/logo'
import type { ThumbnailKind } from '@/lib/lessons'
import { cn } from '@/lib/utils'

/**
 * Decorative card art. Two surfaces: "ink" (mono text on the page colour) and "paper"
 * (a light sheet for drawn UI). Everything is aria-hidden; the card's title carries the meaning.
 */
export function LessonThumbnail({ kind, className }: { kind: ThumbnailKind; className?: string }) {
  const { surface, art } = THUMBNAILS[kind]
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative grid h-[220px] place-items-center overflow-hidden rounded-lg shadow-thumb select-none',
        surface === 'paper' ? 'bg-paper text-neutral-900' : 'bg-background',
        className,
      )}
    >
      {art}
    </div>
  )
}

function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('font-mono text-[11px] leading-[1.75] whitespace-pre text-faint', className)}
    >
      {children}
    </div>
  )
}

const Hi = ({ children }: { children: ReactNode }) => (
  <span className="text-diagram-accent">{children}</span>
)
const On = ({ children }: { children: ReactNode }) => (
  <span className="text-muted-foreground">{children}</span>
)
const Struck = ({ children }: { children: ReactNode }) => (
  <span className="line-through decoration-faint/70">{children}</span>
)

const THUMBNAILS: Record<ThumbnailKind, { surface: 'ink' | 'paper'; art: ReactNode }> = {
  logo: {
    surface: 'paper',
    art: (
      <div className="rounded-2xl bg-white p-3 shadow-[0_8px_24px_-8px_oklch(0_0_0/30%),0_0_0_1px_oklch(0_0_0/6%)]">
        <Logo className="size-16" />
      </div>
    ),
  },
  principles: {
    surface: 'ink',
    art: (
      <Mono>
        {'┌ principles ─────────────────┐\n'}
        {'│                              │\n'}
        {'│  '}
        <Hi>01</Hi>
        {'  '}
        <On>start from the problem</On>
        {'  │\n'}
        {'│  '}
        <Hi>02</Hi>
        {'  '}
        <On>design is trade-offs</On>
        {'    │\n'}
        {'│  '}
        <Hi>03</Hi>
        {'  '}
        <On>ship to learn</On>
        {'          │\n'}
        {'│                              │\n'}
        {'└──────────────────────────────┘'}
      </Mono>
    ),
  },
  problem: {
    surface: 'ink',
    art: (
      <Mono>
        <Struck>{'add a dashboard'}</Struck>
        {'\n'}
        <Struck>{'make it pop'}</Struck>
        {'\n'}
        <Struck>{'redesign the settings page'}</Struck>
        {'\n'}
        <Hi>{'people miss their renewal date'}</Hi>
        {'\n'}
        <Struck>{'we need an app'}</Struck>
        {'\n'}
        <Struck>{'copy what competitor x did'}</Struck>
      </Mono>
    ),
  },
  users: {
    surface: 'ink',
    art: (
      <Mono>
        {'you         '}
        <On>them</On>
        {'\n'}
        {'─────────── ───────────\n'}
        {'27" monitor '}
        <On>cracked phone</On>
        {'\n'}
        {'fibre       '}
        <On>one bar of 3G</On>
        {'\n'}
        {'knows jargon'}
        <On> skims labels</On>
        {'\n'}
        {'loves it    '}
        <Hi>{'has 4 minutes'}</Hi>
      </Mono>
    ),
  },
  hierarchy: {
    surface: 'paper',
    art: (
      <div className="w-52 space-y-2.5 rounded-lg bg-white p-4 shadow-[0_0_0_1px_oklch(0_0_0/8%)]">
        <div className="h-3 w-3/4 rounded-full bg-neutral-900" />
        <div className="h-1.5 w-full rounded-full bg-neutral-300" />
        <div className="h-1.5 w-5/6 rounded-full bg-neutral-300" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-md bg-neutral-900" />
          <div className="h-6 w-14 rounded-md shadow-[0_0_0_1px_oklch(0_0_0/15%)]" />
        </div>
      </div>
    ),
  },
  type: {
    surface: 'ink',
    art: (
      <div className="flex items-baseline gap-5 text-foreground">
        <span className="text-6xl font-semibold tracking-tight">Aa</span>
        <Mono>
          {'32 / 40  '}
          <On>display</On>
          {'\n24 / 32  '}
          <On>title</On>
          {'\n16 / 26  '}
          <Hi>body</Hi>
          {'\n13 / 20  '}
          <On>caption</On>
        </Mono>
      </div>
    ),
  },
  states: {
    surface: 'ink',
    art: (
      <Mono>
        {'Does the screen have data?\n'}
        {'├─ Yes ─ '}
        <On>default</On>
        {'\n└─ No\n'}
        {'   ├─ Still fetching? ─ '}
        <On>loading</On>
        {'\n'}
        {'   ├─ Request failed?  ─ '}
        <On>error</On>
        {'\n'}
        {'   └─ Nothing yet      ─ '}
        <Hi>empty</Hi>
      </Mono>
    ),
  },
  copy: {
    surface: 'ink',
    art: (
      <Mono>
        <span className="text-faint">{'- Error 422: invalid input'}</span>
        {'\n'}
        <Hi>{'+ Enter a date after today'}</Hi>
        {'\n\n'}
        <span className="text-faint">{'- Submit'}</span>
        {'\n'}
        <Hi>{'+ Book appointment'}</Hi>
        {'\n\n'}
        <span className="text-faint">{'- Are you sure?'}</span>
        {'\n'}
        <Hi>{'+ Delete 3 photos?'}</Hi>
      </Mono>
    ),
  },
  research: {
    surface: 'paper',
    art: (
      <div className="grid w-56 grid-cols-3 gap-2">
        {[
          '“I just export it”',
          '“Where’s the undo?”',
          '“My boss checks it”',
          '“Too many emails”',
          '“I use a spreadsheet”',
          '“I never log in”',
        ].map((quote, i) => (
          <div
            key={quote}
            className={cn(
              'flex aspect-square items-center rounded-sm p-1.5 text-[9px] leading-tight text-neutral-700 shadow-[0_1px_2px_oklch(0_0_0/12%)]',
              ['bg-amber-100', 'bg-sky-100', 'bg-lime-100'][i % 3],
              i % 2 ? 'rotate-2' : '-rotate-1',
            )}
          >
            {quote}
          </div>
        ))}
      </div>
    ),
  },
  prototype: {
    surface: 'paper',
    art: (
      <div className="flex items-center gap-3">
        {['A', 'B', 'C'].map((label, i) => (
          <div
            key={label}
            className={cn(
              'flex h-28 w-16 flex-col gap-1.5 rounded-xl bg-white p-2 shadow-[0_0_0_1px_oklch(0_0_0/10%)]',
              i === 1 && 'shadow-[0_0_0_2px_var(--diagram-accent)]',
            )}
          >
            <div className="h-1.5 w-2/3 rounded-full bg-neutral-800" />
            <div className={cn('rounded-md bg-neutral-200', ['h-8', 'h-4', 'h-12'][i])} />
            <div className="h-1 w-full rounded-full bg-neutral-200" />
            <div className="h-1 w-4/5 rounded-full bg-neutral-200" />
            <div className="mt-auto text-center font-mono text-[9px] text-neutral-500">{label}</div>
          </div>
        ))}
      </div>
    ),
  },
  critique: {
    surface: 'ink',
    art: (
      <Mono>
        {'"I don\'t like it"        '}
        <Hi>{'→ what goal does it miss?'}</Hi>
        {'\n'}
        {'"make the logo bigger"   '}
        <Hi>{'→ what should stand out?'}</Hi>
        {'\n'}
        {'"it feels off"           '}
        <Hi>{'→ where do you hesitate?'}</Hi>
        {'\n'}
        {'"users won\'t get it"     '}
        <Hi>{'→ which step, which user?'}</Hi>
      </Mono>
    ),
  },
  handoff: {
    surface: 'ink',
    art: (
      <Mono>
        {'.card {\n'}
        <span className="text-faint">{'-  padding: 17px 23px;'}</span>
        {'\n'}
        <span className="text-faint">{'-  color: #2f2f2f;'}</span>
        {'\n'}
        <Hi>{'+  padding: var(--space-4);'}</Hi>
        {'\n'}
        <Hi>{'+  color: var(--text-muted);'}</Hi>
        {'\n}'}
      </Mono>
    ),
  },
}
