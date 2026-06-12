import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/ThemeProvider'
import { AppProvider } from './context/AppContext'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main id="main-content" style={{ flex: 1, marginTop: 64 }}>
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AppProvider>
    </ThemeProvider>
  )
}
