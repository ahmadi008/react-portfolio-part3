import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Download, Linkedin, Github, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Hero() {
  const { user } = useAppContext()
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  // Page title
  useEffect(() => {
    document.title = `${user.name} — Frontend Developer`
  }, [user.name])

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Hero — introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        textAlign: 'center',
        background: 'var(--color-bg-alt)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background orb */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>

        {/* Label */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          color: 'var(--color-primary)', fontWeight: 600, marginBottom: 16,
        }}>
          Frontend Developer · React · CSS · JavaScript
        </p>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(38px, 7vw, 72px)',
          fontWeight: 800,
          color: 'var(--color-text)',
          lineHeight: 1.08,
          marginBottom: 20,
          letterSpacing: '-1px',
        }}>
          Hi, I'm{' '}
          <span style={{ color: 'var(--color-primary)' }}>Zahra Ahmadi</span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: 520,
          margin: '0 auto 36px',
        }}>
          I build fast, accessible, and creative web apps — from school
          management systems to interactive React portfolios.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {/* Primary: View Projects */}
          <NavLink
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 10,
              background: 'var(--color-primary)', color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            View My Projects <ArrowRight size={16}/>
          </NavLink>

          {/* Secondary: Download CV */}
          <a
            href="https://docs.google.com/document/d/1kUniMkgQYiYlX6HR5AmGjacWKsAku0Ze/edit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV — opens in new tab"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)', color: 'var(--color-text)',
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F97316'; e.currentTarget.style.color = '#F97316' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)' }}
          >
            <Download size={15}/> Download CV
          </a>
        </div>

        {/* Social links row */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {[
            {
              icon: <Linkedin size={17}/>,
              href: 'https://www.linkedin.com/in/zahra-ahmadi-7183431a5/',
              label: 'LinkedIn profile',
            },
            {
              icon: <Github size={17}/>,
              href: 'https://github.com/ahmadi008',
              label: 'GitHub profile',
            },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10,
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = '' }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 32,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 4,
          color: 'var(--color-text-muted)', fontSize: 11,
          fontFamily: 'var(--font-body)', letterSpacing: 2,
          textTransform: 'uppercase',
          animation: 'bounce 2s ease infinite',
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={16}/>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}
