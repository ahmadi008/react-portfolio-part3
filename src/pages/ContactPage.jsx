import { useEffect } from 'react'
import { Mail, Linkedin, Github, Download, Send } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import Contact from '../components/Contact'

export default function ContactPage() {
  const { user } = useAppContext()

  useEffect(() => {
    document.title = `Contact — ${user.name}`
  }, [user.name])

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh' }}>

      {/* ── Header ── */}
      <section style={{
        padding: '60px 24px 40px',
        background: 'var(--color-bg-alt)',
        borderBottom: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--color-primary)',
            fontWeight: 600, marginBottom: 12 }}>Get In Touch</p>
          <h1 style={{ fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800,
            color: 'var(--color-text)', marginBottom: 16 }}>
            Let's Work Together
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16,
            color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: 32 }}>
            I'm open to <strong style={{ color: 'var(--color-text)' }}>internships</strong>,{' '}
            <strong style={{ color: 'var(--color-text)' }}>collaborations</strong>, and{' '}
            <strong style={{ color: 'var(--color-text)' }}>freelance opportunities</strong>.
            If you have a project in mind or want to connect, I'd love to hear from you!
          </p>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <Mail size={16}/>, label: 'Email', href: `mailto:${user.email}`, color: '#2563EB' },
              { icon: <Linkedin size={16}/>, label: 'LinkedIn', href: 'https://www.linkedin.com/in/zahra-ahmadi-7183431a5/', color: '#0A66C2' },
              { icon: <Github size={16}/>, label: 'GitHub', href: user.github, color: 'var(--color-text)' },
              { icon: <Download size={16}/>, label: 'Download CV', href: 'https://docs.google.com/document/d/1kUniMkgQYiYlX6HR5AmGjacWKsAku0Ze/edit', color: '#F97316' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = link.color; e.currentTarget.style.color = link.color }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reuse the Contact form component ── */}
      <Contact />
    </main>
  )
}