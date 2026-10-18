import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { Logo } from '@/components/logo'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCompletedLessons, useResetCompleted } from '@/hooks/use-completed-lessons'
import { ARTICLES } from '@/lessons'
import { allLessons, SECTIONS, type Lesson } from '@/lib/lessons'
import { cn } from '@/lib/utils'

// Search sits first, then page links, then the Account menu, as in the reference header.
const NAV = [
  { to: '/', label: 'Lessons' },
  { to: '/skills', label: 'Skills' },
]

const navItemClass =
  'text-sm whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:underline aria-[current=page]:text-foreground'

export function SiteHeader({ nav = true, className }: { nav?: boolean; className?: string }) {
  return (
    <header
      className={cn(
        'flex h-[72px] shrink-0 items-center justify-between bg-background p-4 antialiased md:p-5',
        className,
      )}
    >
      <Link
        to="/"
        aria-label="Learn Product Design, all lessons"
        className="flex w-fit items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Logo className="size-8" />
      </Link>
      {nav && (
        <nav aria-label="Main" className="flex flex-1 items-center justify-end">
          <ul className="flex items-center gap-4 md:gap-6">
            <li>
              <SearchButton />
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className={navItemClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <AccountMenu />
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

function SearchButton() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // ⌘K / Ctrl+K opens search from anywhere the header is shown.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={navItemClass}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1.5 inline-block size-4 align-[-3px]"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search lessons"
        description="Find a lesson by title or topic."
      >
        {/* Current shadcn needs an explicit <Command> inside CommandDialog, or cmdk crashes. */}
        {/* Plain substring match: cmdk's fuzzy default ranks scattered letters above real words. */}
        <Command
          filter={(value, search) => (value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
        >
          <CommandInput placeholder="Search lessons…" />
          <CommandList>
            <CommandEmpty>No lessons found.</CommandEmpty>
            {SECTIONS.map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.lessons
                  .filter((lesson) => lesson.published)
                  .map((lesson) => (
                    <CommandItem
                      key={lesson.slug}
                      value={searchText(lesson)}
                      onSelect={() => {
                        setOpen(false)
                        navigate(`/learn/${lesson.slug}`)
                      }}
                    >
                      <span>{lesson.title}</span>
                      <span className="truncate text-muted-foreground">{lesson.description}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

// Title, description, and the article's section headings, so "trade-offs" finds Mental models.
const searchText = (lesson: Lesson) =>
  [
    lesson.title,
    lesson.description,
    ...(ARTICLES[lesson.slug]?.headings ?? []).map((h) => h.title),
  ].join(' ')

// There are no accounts yet, so the menu holds what is personal today: progress in this browser.
function AccountMenu() {
  const completed = useCompletedLessons()
  const resetCompleted = useResetCompleted()
  const published = allLessons().filter((lesson) => lesson.published)
  const done = published.filter((lesson) => completed.has(lesson.slug)).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(navItemClass, 'flex items-center')}>
        Account
        <ChevronDown className="ml-0.5 size-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal text-muted-foreground">
          {done} of {published.length} lessons completed
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={done === 0} onSelect={resetCompleted}>
          Reset progress
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
