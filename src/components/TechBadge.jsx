export default function TechBadge({ tech }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--color-accent)',
      backgroundColor: 'rgba(249,115,22,0.1)',
      border: '1px solid rgba(249, 115, 22, 0.25)',
      borderRadius: '4px',
      whiteSpace: 'nowrap',
    }}>
      {tech}
    </span>
  )
}
