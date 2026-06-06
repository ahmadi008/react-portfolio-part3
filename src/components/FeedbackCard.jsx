import { Star } from 'lucide-react'

// Reusable FeedbackCard — used inside FeedbackWall
// Props: { name, role, text, rating, avatar }
export default function FeedbackCard({ feedback }) {
  const { name, role, text, rating = 5, avatar } = feedback
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--color-primary)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--color-border)' }}>

      {/* Star rating */}
      <div style={{ display: 'flex', gap: 3 }} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? 'var(--color-primary)' : 'none'}
            color={i < rating ? 'var(--color-primary)' : 'var(--color-border)'}
          />
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--color-text)',
        lineHeight: 1.7,
        margin: 0,
        flex: 1,
        fontStyle: 'italic',
      }}>
        "{text}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {avatar
          ? <img src={avatar} alt={name}
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          : (
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--color-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
              flexShrink: 0,
            }}>
              {initials}
            </div>
          )
        }
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14,
            fontWeight: 700, color: 'var(--color-text)' }}>{name}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12,
            color: 'var(--color-text-muted)' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}