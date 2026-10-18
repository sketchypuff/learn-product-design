import { ArrowLeft, ArrowRight, Check, TextAlignStart } from 'lucide-react'
import { useEffect } from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router'
import { SiteHeader } from '@/components/site-header'
import { StatusBadge } from '@/components/status-badge'
import { useActiveHeading } from '@/hooks/use-active-heading'
import { useCompletedLessons, useToggleCompleted } from '@/hooks/use-completed-lessons'
import { ARTICLES, type LessonHeading } from '@/lessons'
import { findLesson, neighbours, SECTIONS } from '@/lib/lessons'
import { cn } from '@/lib/utils'

export function LessonPage() {
  const { slug = '' } = useParams()
  const lesson = findLesson(slug)
  const article = ARTICLES[slug]
  const completed = useCompletedLessons()
  const toggleCompleted = useToggleCompleted()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (lesson) document.title = `${lesson.title} · Learn Product Design`
  }, [lesson])

  if (!lesson || !article) return <Navigate to="/" replace />

  const { Content, headings } = article
  const { previous, next } = neighbours(slug)
  const isComplete = completed.has(slug)

  return (
    <div className="min-h-dvh">
      <SiteHeader nav={false} className="sticky top-0 z-20 bg-background" />
      <div className="flex">
        <LessonSidebar currentSlug={slug} completed={completed} />

        <main className="min-w-0 flex-1 px-4 pt-16 pb-32 sm:px-8">
          <article className="mx-auto max-w-[700px]">
            <h1 className="mb-4 text-2xl leading-8 font-medium">{lesson.title}</h1>
            <Content />

            <section aria-labelledby="feedback" className="mt-20 border-t border-border pt-10">
              <h2 id="feedback" className="text-base font-medium">
                Finished this lesson?
              </h2>
              <p className="mt-1 text-[15px] leading-6 text-muted-foreground">
                Mark it complete to track your progress on the home page.
              </p>
              <button
                type="button"
                aria-pressed={isComplete}
                onClick={() => toggleCompleted(slug)}
                className={cn(
                  'mt-4 inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-[background-color,scale] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]',
                  isComplete
                    ? 'bg-muted text-foreground hover:bg-muted/80'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90',
                )}
              >
                {isComplete && <Check className="size-4" />}
                {isComplete ? 'Completed' : 'Mark as complete'}
              </button>
            </section>

            <nav aria-label="Lessons" className="mt-12 grid grid-cols-2 gap-4">
              {previous ? (
                <PagerLink to={previous.slug} title={previous.title} direction="previous" />
              ) : (
                <span />
              )}
              {next && <PagerLink to={next.slug} title={next.title} direction="next" />}
            </nav>
          </article>
        </main>

        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}

function LessonSidebar({
  currentSlug,
  completed,
}: {
  currentSlug: string
  completed: Set<string>
}) {
  return (
    <aside className="sticky top-[72px] hidden h-[calc(100dvh-72px)] w-[260px] shrink-0 overflow-y-auto overscroll-contain pt-6 pr-6 pb-6 pl-3 lg:block">
      <nav aria-label="All lessons" className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 px-2 text-sm font-normal text-muted-foreground">{section.title}</h2>
            <ul>
              {section.lessons.map((lesson) => {
                const row = (
                  <>
                    <span className="truncate">{lesson.title}</span>
                    <StatusBadge lesson={lesson} completed={completed.has(lesson.slug)} />
                  </>
                )
                const rowClass =
                  'flex h-8 items-center justify-between gap-2 rounded-md px-2 text-sm'
                return (
                  <li key={lesson.slug}>
                    {lesson.published ? (
                      <NavLink
                        to={`/learn/${lesson.slug}`}
                        aria-current={lesson.slug === currentSlug ? 'page' : undefined}
                        className={cn(
                          rowClass,
                          'text-prose transition-colors outline-none hover:bg-card focus-visible:ring-2 focus-visible:ring-ring',
                          'aria-[current=page]:bg-accent aria-[current=page]:text-foreground',
                        )}
                      >
                        {row}
                      </NavLink>
                    ) : (
                      <div className={cn(rowClass, 'text-faint')}>{row}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

function TableOfContents({ headings }: { headings: LessonHeading[] }) {
  const active = useActiveHeading(headings.map((h) => h.id))

  return (
    <aside className="sticky top-[72px] hidden h-fit w-[220px] shrink-0 pt-4 pr-6 xl:block">
      <nav aria-labelledby="on-this-page">
        <h2 id="on-this-page" className="mb-3 flex items-center gap-2 text-sm font-normal">
          <TextAlignStart className="size-4 text-muted-foreground" />
          On this page
        </h2>
        <ul className="space-y-0.5 border-l border-transparent">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={heading.id === active ? 'location' : undefined}
                className={cn(
                  'block truncate border-l-2 py-1 pl-4 text-[13px] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground',
                  heading.id === active
                    ? 'border-foreground text-foreground'
                    : 'border-transparent',
                )}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

function PagerLink({
  to,
  title,
  direction,
}: {
  to: string
  title: string
  direction: 'previous' | 'next'
}) {
  const Icon = direction === 'previous' ? ArrowLeft : ArrowRight
  return (
    <Link
      to={`/learn/${to}`}
      className={cn(
        'group flex flex-col gap-1 rounded-lg p-4 shadow-thumb transition-colors outline-none hover:bg-card focus-visible:ring-2 focus-visible:ring-ring',
        direction === 'next' && 'col-start-2 items-end text-right',
      )}
    >
      <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
        {direction === 'previous' && <Icon className="size-3.5" />}
        {direction === 'previous' ? 'Previous' : 'Next'}
        {direction === 'next' && <Icon className="size-3.5" />}
      </span>
      <span className="text-[15px] font-medium">{title}</span>
    </Link>
  )
}
