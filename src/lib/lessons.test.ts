import { describe, expect, it } from 'vitest'
import { allLessons, findLesson, neighbours, SECTIONS, type Section } from './lessons'

const lesson = (slug: string, published = true) => ({
  slug,
  title: slug,
  description: '',
  thumbnail: 'logo' as const,
  published,
})

const sections: Section[] = [
  { title: 'A', lessons: [lesson('one'), lesson('two', false)] },
  { title: 'B', lessons: [lesson('three'), lesson('four')] },
]

describe('lessons', () => {
  it('has unique slugs', () => {
    const slugs = allLessons(SECTIONS).map((l) => l.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('finds a lesson by slug', () => {
    expect(findLesson('three', sections)?.title).toBe('three')
    expect(findLesson('missing', sections)).toBeUndefined()
  })

  it('skips unpublished lessons and crosses sections for neighbours', () => {
    expect(neighbours('one', sections)).toEqual({
      previous: undefined,
      next: sections[1].lessons[0],
    })
    expect(neighbours('four', sections).next).toBeUndefined()
  })

  it('has no neighbours for an unpublished or unknown lesson', () => {
    expect(neighbours('two', sections)).toEqual({})
    expect(neighbours('missing', sections)).toEqual({})
  })
})
