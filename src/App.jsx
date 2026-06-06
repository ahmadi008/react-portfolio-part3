import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { AppProvider } from './context/AppContext'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NotFoundPage from './pages/NotFoundPage'

// Scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/projects"     element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*"             element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  )
}