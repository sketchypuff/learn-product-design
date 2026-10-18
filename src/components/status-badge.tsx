import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Lesson } from '@/lib/lessons'

const LABELS = { new: 'New', updated: 'Updated' } as const

/** "Soon" wins over a status, and "completed" wins over both on published lessons. */
export function StatusBadge({ lesson, completed }: { lesson: Lesson; completed?: boolean }) {
  if (!lesson.published) return <Badge variant="soon">Soon</Badge>
  if (completed)
    return (
      <span
        aria-label="Completed"
        className="grid size-4 place-items-center rounded-full bg-muted text-muted-foreground"
      >
        <Check className="size-2.5" strokeWidth={3} />
      </span>
    )
  if (lesson.status) return <Badge variant={lesson.status}>{LABELS[lesson.status]}</Badge>
  return null
}
