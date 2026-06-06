import { useState, useEffect } from 'react'

// Props passed in: name, welcomeMessage
const motivationalQuotes = [
  'The best time to start was yesterday. The second best time is now.',
  'Every expert was once a beginner.',
  'First, solve the problem. Then, write the code.',
  'The only way to learn to program is by writing programs.',
  'Simplicity is the soul of efficiency.',
  'Dream big, code bigger.',
]

export default function Header({ name, welcomeMessage }) {
  const [quote, setQuote]     = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Pick a random quote on mount
    const i = Math.floor(Math.random() * motivationalQuotes.length)
    setQuote(motivationalQuotes[i])
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Split name so second word gets orange color
  const words = name.split(' ')

  return (
    <header id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '120px 24px 80px',
      maxWidth: '1100px', margin: '0 auto', position: 'relative',
    }}>

      {/* Radial glow background */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: '600px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
      }} />

      {/* Content fades in on load */}
      <div style={{
        position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s, transform 0.7s',
      }}>

        {/* welcomeMessage is a prop */}
        <p style={{
          fontSize: '0.875rem', fontWeight: 500,
          color: 'var(--accent-orange)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          {welcomeMessage}
        </p>

        {/* name is a prop — split into words, second word is orange */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1, marginBottom: '24px',
        }}>
          {words.map((word, i) => (
            <span key={word} style={{
              display: 'block',
              color: i === 0 ? 'var(--text-primary)' : 'var(--accent-orange)',
            }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Orange divider line */}
        <div style={{
          width: '60px', height: '3px',
          backgroundColor: 'var(--accent-orange)',
          borderRadius: '2px', marginBottom: '24px',
        }} />

        {/* Random motivational quote – conditional rendering with && */}
        {quote && (
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'var(--text-muted)', maxWidth: '520px',
            fontStyle: 'italic', lineHeight: 1.6,
            borderLeft: '2px solid var(--border-accent)',
            paddingLeft: '16px',
          }}>
            &ldquo;{quote}&rdquo;
          </p>
        )}

        {/* CTA Buttons */}
        <div style={{
          marginTop: '48px', display: 'flex',
          gap: '16px', flexWrap: 'wrap',
        }}>
          <a href="#projects" style={{
            padding: '12px 28px',
            backgroundColor: 'var(--accent-orange)',
            color: '#000', fontFamily: 'var(--font-heading)',
            fontWeight: 700, borderRadius: '8px', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View Projects
          </a>
          <a href="#contact" style={{
            padding: '12px 28px',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600, borderRadius: '8px', cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)'
              e.currentTarget.style.color = 'var(--accent-orange)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  )
}
