import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px', textAlign: 'center',
      background: 'var(--color-bg-alt)',
    }}>
      <div>
        {/* Giant 404 */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(100px, 22vw, 200px)',
          fontWeight: 800,
          color: 'var(--color-primary)',
          opacity: 0.12,
          lineHeight: 1,
          marginBottom: -10,
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}>
          404
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(24px,5vw,40px)', fontWeight: 700,
          color: 'var(--color-text)', marginBottom: 12 }}>
          Page Not Found
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
          color: 'var(--color-text-muted)', maxWidth: 400, margin: '0 auto 36px', lineHeight: 1.7 }}>
          This page doesn't exist yet — maybe it's a project idea for the future! Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 28px', borderRadius: 10,
              background: 'var(--color-primary)', color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Home size={15}/> Go Home
          </Link>
          <Link to="/projects"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 28px', borderRadius: 10,
              border: '1px solid var(--color-border)', background: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}