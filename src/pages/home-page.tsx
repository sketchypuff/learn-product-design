import { Link } from 'react-router'
import { LessonThumbnail } from '@/components/lesson-thumbnail'
import { SiteHeader } from '@/components/site-header'
import { StatusBadge } from '@/components/status-badge'
import { useCompletedLessons } from '@/hooks/use-completed-lessons'
import { SECTIONS, type Lesson } from '@/lib/lessons'

export function HomePage() {
  const completed = useCompletedLessons()

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1096px] px-4 pt-8 pb-32">
        <h1 className="sr-only">Learn Product Design</h1>
        <div className="space-y-20">
          {SECTIONS.map((section) => (
            <section key={section.title} aria-labelledby={sectionId(section.title)}>
              <h2
                id={sectionId(section.title)}
                className="mb-6 inline-flex h-8 items-center rounded-full bg-card px-3 text-sm font-normal"
              >
                {section.title}
              </h2>
              <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <LessonCard lesson={lesson} completed={completed.has(lesson.slug)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

function LessonCard({ lesson, completed }: { lesson: Lesson; completed: boolean }) {
  const body = (
    <>
      <div className="relative">
        <LessonThumbnail
          kind={lesson.thumbnail}
          className="transition-shadow duration-150 group-hover:shadow-[0_0_0_1px_oklch(1_0_0/22%),0_1px_2px_oklch(0_0_0/16%)]"
        />
        <div className="absolute right-2 bottom-2">
          <StatusBadge lesson={lesson} completed={completed} />
        </div>
      </div>
      <h3 className="mt-5 text-[15px] leading-[1.5] font-medium">{lesson.title}</h3>
      <p className="text-[15px] leading-6 text-muted-foreground">{lesson.description}</p>
    </>
  )

  if (!lesson.published) {
    return <div className="opacity-60">{body}</div>
  }

  return (
    <Link
      to={`/learn/${lesson.slug}`}
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {body}
    </Link>
  )
}

const sectionId = (title: string) => `section-${title.toLowerCase().replaceAll(' ', '-')}`
