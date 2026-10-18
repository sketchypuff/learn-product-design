import { Link } from 'react-router'
import { SiteHeader } from '@/components/site-header'

/** Stand-in for nav destinations that aren't built yet, so no header link is dead. */
export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] px-4 pt-24 pb-32">
        <span className="inline-flex h-6 items-center rounded-md bg-muted px-2 text-xs text-faint">
          Soon
        </span>
        <h1 className="mt-4 text-2xl leading-8 font-medium">{title}</h1>
        <p className="mt-2 text-base leading-[1.65] text-prose">{description}</p>
        <Link
          to="/"
          className="mt-8 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors outline-none hover:text-foreground focus-visible:underline"
        >
          Back to lessons
        </Link>
      </main>
    </div>
  )
}
