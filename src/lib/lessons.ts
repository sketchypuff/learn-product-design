export type LessonStatus = 'new' | 'updated'

export type ThumbnailKind =
  | 'logo'
  | 'principles'
  | 'problem'
  | 'users'
  | 'hierarchy'
  | 'type'
  | 'states'
  | 'copy'
  | 'research'
  | 'prototype'
  | 'critique'
  | 'handoff'

export type Lesson = {
  slug: string
  title: string
  description: string
  thumbnail: ThumbnailKind
  status?: LessonStatus
  /** Lessons without a written article show "Soon" and don't link anywhere. */
  published: boolean
}

export type Section = {
  title: string
  lessons: Lesson[]
}

export const SECTIONS: Section[] = [
  {
    title: 'Fundamentals',
    lessons: [
      {
        slug: 'intro',
        title: 'Intro',
        description: 'Who this course is for, and how to get the most from it.',
        thumbnail: 'logo',
        published: true,
      },
      {
        slug: 'mental-models',
        title: 'Mental models',
        description: 'Three ideas that sit underneath every lesson that follows.',
        thumbnail: 'principles',
        status: 'new',
        published: true,
      },
      {
        slug: 'problems-before-pixels',
        title: 'Problems before pixels',
        description: 'Why the first hour of a project should have no screens in it.',
        thumbnail: 'problem',
        status: 'updated',
        published: false,
      },
      {
        slug: 'you-are-not-the-user',
        title: 'You are not the user',
        description: 'Spotting your own assumptions before they ship.',
        thumbnail: 'users',
        published: false,
      },
    ],
  },
  {
    title: 'Interface craft',
    lessons: [
      {
        slug: 'visual-hierarchy',
        title: 'Visual hierarchy',
        description: 'Deciding what people see first, second, and never.',
        thumbnail: 'hierarchy',
        published: false,
      },
      {
        slug: 'type-that-works',
        title: 'Type that works',
        description: 'A small type scale that covers almost every screen.',
        thumbnail: 'type',
        published: false,
      },
      {
        slug: 'every-state',
        title: 'Designing every state',
        description: 'Empty, loading, error, and the ones nobody draws.',
        thumbnail: 'states',
        published: false,
      },
      {
        slug: 'interface-copy',
        title: 'Writing interface copy',
        description: 'Labels, buttons, and errors that explain themselves.',
        thumbnail: 'copy',
        published: false,
      },
    ],
  },
  {
    title: 'Process',
    lessons: [
      {
        slug: 'research-on-a-budget',
        title: 'Research on a budget',
        description: 'Five conversations that beat a fifty-question survey.',
        thumbnail: 'research',
        published: false,
      },
      {
        slug: 'prototyping-to-learn',
        title: 'Prototyping to learn',
        description: 'Build the cheapest thing that answers the question.',
        thumbnail: 'prototype',
        published: false,
      },
      {
        slug: 'running-a-critique',
        title: 'Running a critique',
        description: 'Giving and taking feedback without the bruises.',
        thumbnail: 'critique',
        published: false,
      },
      {
        slug: 'handing-off',
        title: 'Handing off to engineering',
        description: 'What a developer needs from you, and what they don’t.',
        thumbnail: 'handoff',
        published: false,
      },
    ],
  },
]

export function allLessons(sections: Section[] = SECTIONS): Lesson[] {
  return sections.flatMap((section) => section.lessons)
}

export function findLesson(slug: string, sections: Section[] = SECTIONS): Lesson | undefined {
  return allLessons(sections).find((lesson) => lesson.slug === slug)
}

/** The nearest published lessons before and after `slug`, skipping unwritten ones. */
export function neighbours(
  slug: string,
  sections: Section[] = SECTIONS,
): { previous?: Lesson; next?: Lesson } {
  const published = allLessons(sections).filter((lesson) => lesson.published)
  const index = published.findIndex((lesson) => lesson.slug === slug)
  if (index === -1) return {}
  return { previous: published[index - 1], next: published[index + 1] }
}
