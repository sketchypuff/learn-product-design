import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Building blocks for lesson articles. Lessons are TSX, not Markdown, so diagrams and
// interactive examples can sit inline without a content pipeline.

export function P({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('mb-3 text-base leading-[1.65] text-prose', className)} {...props} />
}

/** A section heading. Its `id` must match the lesson's `headings` list for the table of contents. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-16 mb-4 scroll-mt-24 text-xl leading-7 font-medium text-foreground">
      {children}
    </h2>
  )
}

export function Strong(props: ComponentProps<'strong'>) {
  return <strong className="font-medium text-foreground" {...props} />
}

export function Ul({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      className={cn(
        'mb-3 list-disc space-y-1.5 pl-5 text-base leading-[1.65] text-prose marker:text-faint',
        className,
      )}
      {...props}
    />
  )
}

/** A text-art figure in the mono face. Wrap emphasis in <DiagramAccent> or <DiagramFaint>. */
export function Diagram({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="my-10 flex justify-center overflow-x-auto" aria-label={label}>
      <pre className="font-mono text-[13px] leading-[1.6] text-muted-foreground">{children}</pre>
    </figure>
  )
}

export const DiagramAccent = ({ children }: { children: ReactNode }) => (
  <span className="text-diagram-accent">{children}</span>
)

export const DiagramFaint = ({ children }: { children: ReactNode }) => (
  <span className="text-faint">{children}</span>
)

export const DiagramBright = ({ children }: { children: ReactNode }) => (
  <span className="text-foreground">{children}</span>
)
