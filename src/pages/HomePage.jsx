import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import FeedbackWall from '../components/FeedbackWall'
import Contact from '../components/Contact'
import Confetti from '../components/Confetti'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data/projects'
import { useAppContext } from '../context/AppContext'

export default function HomePage() {
  const { user } = useAppContext()       // ← Context API: no prop drilling needed
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!fired.current) {
      fired.current = true
      const t = setTimeout(() => {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [])

  const featuredProjects = PROJECTS.filter(p => p.featured)

  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />

        {/* ── Featured Projects Preview ── */}
        <section style={{ padding: '80px 24px', background: 'var(--color-bg-alt)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4,
                textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 8 }}>
                Highlights
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,48px)',
                fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>
                Featured Projects
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto' }}>
                A selection of my best work — each one a story of problem-solving and craft.
              </p>
            </div>

            {/* Responsive grid: 2 columns desktop, 1 on mobile */}
            <div className="featured-grid" style={{ display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 40 }}>
              {featuredProjects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            {/* CTA to full projects page */}
            <div style={{ textAlign: 'center' }}>
              <NavLink to="/projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 32px', borderRadius: 10,
                  background: 'var(--color-primary)', color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                View All Projects <ArrowRight size={16}/>
              </NavLink>
            </div>
          </div>
        </section>

        <FeedbackWall />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700,
            color: 'var(--color-primary)', marginBottom: 12 }}>
            {user.name}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14,
            color: 'var(--color-text-muted)', marginBottom: 24 }}>
            {user.title} · Building with passion
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
            {[
              { icon: <Github size={18}/>, href: user.github, label: 'GitHub' },
              { icon: <Linkedin size={18}/>, href: user.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={18}/>, href: '#contact', label: 'Email' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                style={{ width: 38, height: 38, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', borderRadius: 8, border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = '' }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} {user.name}. Built with React & Vite.
          </p>
        </div>
      </footer>

      <Confetti active={showConfetti} />

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{ position: 'fixed', bottom: 88, right: 24, width: 44, height: 44, borderRadius: '50%',
            background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)', zIndex: 500, transition: 'transform 0.2s',
            fontSize: 20 }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}>
          ↑
        </button>
      )}

      <style>{`
        @media (max-width: 640px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}