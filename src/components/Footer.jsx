import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer({ name }) {
  // Dynamic year — never hardcoded!
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/ahmadi008',
      icon: <Github size={18} />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zahra-ahmadi-7183431a5',
      icon: <Linkedin size={18} />,
    },
    {
      label: 'Email',
      href: 'mailto:ahmadi08zahra@gmail.com',
      icon: <Mail size={18} />,
    },
  ]

  return (
    <footer id="contact" style={{
      borderTop: '1px solid var(--border)',
      padding: '60px 24px 40px',
      marginTop: '40px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Contact CTA */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            Let&apos;s Connect
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            marginBottom: '28px',
          }}>
            Open to opportunities, collaborations, and conversations about technology.
          </p>
          <a
            href="mailto:ahmadi08zahra@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', backgroundColor: 'var(--accent-orange)',
              color: '#000', fontFamily: 'var(--font-heading)',
              fontWeight: 700, borderRadius: '8px', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Mail size={16} />
            Say Hello
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>

          {/* Dynamic copyright — name prop + new Date() */}
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            &copy; {year} {name}. All rights reserved.
          </p>

          {/* Social links — .map() rendering */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', width: '38px', height: '38px',
                  borderRadius: '8px', border: '1px solid var(--border)',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-orange)'
                  e.currentTarget.style.color = 'var(--accent-orange)'
                  e.currentTarget.style.backgroundColor = 'var(--accent-orange-muted)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
