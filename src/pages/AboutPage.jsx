import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Code2, Layers, Smartphone, Globe, ArrowRight } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const SKILLS = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vite'] },
  { category: 'Styling', items: ['CSS Variables', 'Flexbox', 'CSS Grid', 'Responsive Design'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Joomla'] },
  { category: 'Backend / DB', items: ['PHP', 'MySQL', 'REST APIs'] },
]

const STRENGTHS = [
  { icon: <Code2 size={20}/>, title: 'Clean Code', desc: 'Writing readable, maintainable, and well-structured React components.' },
  { icon: <Layers size={20}/>, title: 'Component Thinking', desc: 'Breaking UIs into reusable, focused, composable pieces.' },
  { icon: <Smartphone size={20}/>, title: 'Responsive First', desc: 'Every layout works beautifully on mobile, tablet, and desktop.' },
  { icon: <Globe size={20}/>, title: 'Real-World Projects', desc: 'Built and deployed apps used by real schools and real clients.' },
]

export default function AboutPage() {
  const { user } = useAppContext()

  useEffect(() => {
    document.title = `About — ${user.name}`
  }, [user.name])

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: '64px 24px 48px',
        background: 'var(--color-bg-alt)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--color-primary)',
            fontWeight: 600, marginBottom: 12 }}>About Me</p>
          <h1 style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800,
            color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 20 }}>
            Hi, I'm {user.name} —<br/>
            <span style={{ color: 'var(--color-primary)' }}>Frontend Developer</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17,
            color: 'var(--color-text-muted)', lineHeight: 1.8,
            maxWidth: 580, marginBottom: 28 }}>
            I build fast, accessible, and creative React applications. My journey started
            with a simple HTML page and grew into full-stack web projects deployed to real schools
            and businesses.
          </p>
          <NavLink to="/projects"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 28px', borderRadius: 10,
              background: 'var(--color-primary)', color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            See My Projects <ArrowRight size={15}/>
          </NavLink>
        </div>
      </section>

      {/* ── Career Goals ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700,
            color: 'var(--color-text)', marginBottom: 16 }}>My Journey & Goals</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 24 }} className="goals-grid">
            {[
              { label: 'Career Goal', text: 'To become a professional frontend developer building accessible, performant web applications that make a real difference for users.' },
              { label: 'Learning Philosophy', text: 'I believe in learning by building. Every project teaches me something new — from Joomla CMS to React Router to Context API.' },
              { label: 'Work Mindset', text: 'Detail-oriented and user-first. I focus on clean code, accessibility, and making sure every interaction feels polished.' },
              { label: 'Next Step', text: 'Deepening my TypeScript and Next.js knowledge, and building full-stack applications with real-world impact.' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--color-primary)', fontWeight: 600, marginBottom: 8 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14,
                  color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strengths ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700,
            color: 'var(--color-text)', marginBottom: 24 }}>Strengths</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16 }} className="strengths-grid">
            {STRENGTHS.map(s => (
              <div key={s.title} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(37,99,235,0.1)',
                  color: 'var(--color-primary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15,
                    fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>
                    {s.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                    color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section style={{ padding: '60px 24px', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700,
            color: 'var(--color-text)', marginBottom: 24 }}>Tech Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20 }} className="skills-grid">
            {SKILLS.map(group => (
              <div key={group.category}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: 3, textTransform: 'uppercase',
                  color: 'var(--color-primary)', fontWeight: 600, marginBottom: 10 }}>
                  {group.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{
                      padding: '5px 12px', borderRadius: 7,
                      background: 'var(--color-bg-alt)',
                      border: '1px solid var(--color-border)',
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      fontWeight: 500, color: 'var(--color-text-muted)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .goals-grid, .strengths-grid, .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}