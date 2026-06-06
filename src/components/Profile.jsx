// All data comes from props: name, title, bio
function AvatarSVG() {
  return (
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"
         style={{ width: '100%', height: '100%', borderRadius: '50%' }}>
      <defs>
        <radialGradient id="bg" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2a1f0a" />
          <stop offset="100%" stopColor="#111111" />
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="90" fill="url(#bg)" />
      {/* Body */}
      <ellipse cx="90" cy="135" rx="38" ry="28" fill="#3d2b0a" />
      {/* Head */}
      <circle cx="90" cy="75" r="28" fill="#d4956a" />
      {/* Hair */}
      <ellipse cx="90" cy="52" rx="29" ry="18" fill="#1a0a00" />
      <ellipse cx="68" cy="75" rx="5" ry="22" fill="#1a0a00" />
      <ellipse cx="112" cy="75" rx="5" ry="22" fill="#1a0a00" />
      {/* Eyes */}
      <circle cx="81" cy="74" r="4" fill="#1a0a00" />
      <circle cx="99" cy="74" r="4" fill="#1a0a00" />
      <circle cx="82" cy="73" r="1.5" fill="white" />
      <circle cx="100" cy="73" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M 83 84 Q 90 90 97 84" stroke="#1a0a00" strokeWidth="1.5"
            fill="none" strokeLinecap="round" />
      {/* Orange cat */}
      <ellipse cx="130" cy="140" rx="16" ry="18" fill="#F97316" />
      <ellipse cx="130" cy="125" rx="12" ry="11" fill="#F97316" />
      <polygon points="121,116 118,106 128,114" fill="#F97316" />
      <polygon points="139,116 142,106 132,114" fill="#F97316" />
      <polygon points="122,116 120,109 128,115" fill="#ffb380" />
      <polygon points="138,116 140,109 132,115" fill="#ffb380" />
      <circle cx="127" cy="124" r="2" fill="#1a0a00" />
      <circle cx="133" cy="124" r="2" fill="#1a0a00" />
      <path d="M 146 150 Q 158 138 155 128" stroke="#F97316"
            strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Chamomile flowers */}
      <circle cx="55" cy="148" r="4" fill="#f5c842" />
      <circle cx="55" cy="140" r="2.5" fill="white" />
      <circle cx="61" cy="142" r="2.5" fill="white" />
      <circle cx="63" cy="148" r="2.5" fill="white" />
      <circle cx="61" cy="154" r="2.5" fill="white" />
      <circle cx="55" cy="156" r="2.5" fill="white" />
      <circle cx="49" cy="154" r="2.5" fill="white" />
      <circle cx="47" cy="148" r="2.5" fill="white" />
      <circle cx="49" cy="142" r="2.5" fill="white" />
      <line x1="55" y1="152" x2="55" y2="165" stroke="#4a7c59" strokeWidth="2" />
    </svg>
  )
}

export default function Profile({ name, title, bio }) {
  return (
    <section id="profile" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '80px 24px', borderTop: '1px solid var(--border)',
    }}>
      <div className="profile-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr)',
        gap: '48px', alignItems: 'center',
      }}>

        {/* Avatar with decorative rings */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '180px', height: '180px' }}>
            <div style={{
              position: 'absolute', inset: '-8px', borderRadius: '50%',
              border: '2px solid var(--accent-orange)', opacity: 0.4,
            }} />
            <div style={{
              position: 'absolute', inset: '-16px', borderRadius: '50%',
              border: '1px solid var(--accent-orange)', opacity: 0.15,
            }} />
            <AvatarSVG />
          </div>
        </div>

        {/* Text info — all from props */}
        <div>
          <p style={{
            fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--accent-orange)', marginBottom: '8px',
          }}>
            {title}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            {name}
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            lineHeight: 1.75, maxWidth: '560px',
          }}>
            {bio}
          </p>
        </div>
      </div>
    </section>
  )
}
