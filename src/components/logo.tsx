import { cn } from '@/lib/utils'

/** The site mark: an "L" and a blue dot on a dark tile with a light rim. Same drawing as the favicon. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-7', className)}>
      <rect width="32" height="32" rx="7" fill="var(--paper)" />
      <rect x="3" y="3" width="26" height="26" rx="5" fill="var(--card)" />
      <path
        d="M10 9v14h6"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="21" r="2.5" fill="var(--diagram-accent)" />
    </svg>
  )
}
