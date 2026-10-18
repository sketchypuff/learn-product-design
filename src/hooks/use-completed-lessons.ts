import { useCallback, useSyncExternalStore } from 'react'

// Completion is a per-browser convenience, so localStorage is enough. Every access is guarded:
// storage throws in some private windows and embedded previews, and the site must still render.
const KEY = 'completed-lessons'
const listeners = new Set<() => void>()
let cache: Set<string> | null = null

function read(): Set<string> {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    cache = new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [])
  } catch {
    cache = new Set()
  }
  return cache
}

function write(next: Set<string>) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify([...next]))
  } catch {
    // Keep the in-memory value for this visit.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCompletedLessons(): Set<string> {
  return useSyncExternalStore(subscribe, read, read)
}

export function useToggleCompleted() {
  return useCallback((slug: string) => {
    const next = new Set(read())
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    write(next)
  }, [])
}

export function useResetCompleted() {
  return useCallback(() => write(new Set()), [])
}
