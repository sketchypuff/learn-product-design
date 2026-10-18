import type { ComponentType } from 'react'
import * as intro from './intro'
import * as mentalModels from './mental-models'

export type LessonHeading = { id: string; title: string }
export type LessonArticle = { Content: ComponentType; headings: LessonHeading[] }

/** Written articles by slug. A lesson in `SECTIONS` with `published: true` must have an entry here. */
export const ARTICLES: Record<string, LessonArticle> = {
  intro: { Content: intro.Intro, headings: intro.headings },
  'mental-models': { Content: mentalModels.MentalModels, headings: mentalModels.headings },
}
