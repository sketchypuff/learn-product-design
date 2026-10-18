import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { ComingSoonPage } from '@/pages/coming-soon-page'
import { HomePage } from '@/pages/home-page'
import { LessonPage } from '@/pages/lesson-page'

// Header destinations that don't exist yet. Each gets a placeholder page until it's built.
const COMING_SOON = [
  {
    path: '/skills',
    title: 'Skills',
    description: 'Agent skills for product design work, with notes on when to use each.',
  },
]

export default function App() {
  return (
    <BrowserRouter>
      <ResetTitle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn/:slug" element={<LessonPage />} />
        {COMING_SOON.map(({ path, title, description }) => (
          <Route
            key={path}
            path={path}
            element={<ComingSoonPage title={title} description={description} />}
          />
        ))}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

// Lesson pages set their own title; everything else uses the site name.
function ResetTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!pathname.startsWith('/learn/')) document.title = 'Learn Product Design'
  }, [pathname])
  return null
}
