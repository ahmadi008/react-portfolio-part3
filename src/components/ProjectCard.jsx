import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Github, Star, ChevronDown, ChevronUp } from 'lucide-react'
import TechBadge from './TechBadge'
import { useAppContext } from '../context/AppContext'

const STATUS_STYLES = {
  'Featured':    { bg: 'rgba(249,115,22,0.15)',  border: '#F97316', color: '#EA580C' },
  'Completed':   { bg: 'rgba(16,185,129,0.15)',  border: '#10B981', color: '#059669' },
  'In Progress': { bg: 'rgba(37,99,235,0.15)',   border: '#2563EB', color: '#1D4ED8' },
}

function getInitials(title) {
  return title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const { isFavorite, toggleFavorite } = useAppContext()  // ← Context API, no prop drilling
  const navigate = useNavigate()
  const fav = isFavorite(project.id)
  const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES['Completed']

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.borderColor = project.color
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {/* ── Image / Initials Banner ── */}
      <div style={{
        height: 84,
        background: `${project.color}18`,
        borderBottom: `3px solid ${project.color}`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'relative',
      }}>
        {/* Project initials (fallback since no real images) */}
        {project.image
          ? <img src={project.image} alt={project.title}
              style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
          : (
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: project.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
              boxShadow: `0 4px 16px ${project.color}55`,
              flexShrink: 0,
            }}>
              {getInitials(project.title)}
            </div>
          )
        }

        {/* Status Badge */}
        <span style={{
          padding: '4px 12px', borderRadius: 100,
          background: statusStyle.bg,
          border: `1px solid ${statusStyle.border}`,
          color: statusStyle.color,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          {project.status}
        </span>

        {/* Favorite / Star button */}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(project.id) }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: fav ? '#F59E0B' : 'var(--color-text-muted)',
            transition: 'transform 0.2s, color 0.2s',
            padding: 4, borderRadius: 6,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.25)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}>
          <Star size={15} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* ── Card Body ── */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700,
          color: 'var(--color-text)', margin: 0 }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14,
          color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
          {project.desc}
        </p>

        {/* ── Progress Bar (aria) ── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--color-text-muted)', fontWeight: 500 }}>Completion</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 12,
              color: project.color, fontWeight: 700 }}>{project.progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${project.title} is ${project.progress}% complete`}
            style={{
              height: 6, borderRadius: 3,
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}>
            <div style={{
              height: '100%',
              width: `${project.progress}%`,
              background: `linear-gradient(90deg, ${project.color}, ${project.color}99)`,
              borderRadius: 3,
              transition: 'width 0.8s ease',
            }} />
          </div>
        </div>

        {/* Tech Stack Badges — reusing TechBadge component */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tech.map(t => <TechBadge key={t} tech={t} />)}
        </div>

        {/* ── Expandable "More Info" — aria-expanded ── */}
        <button
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-controls={`project-info-${project.id}`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'transparent', border: '1px solid var(--color-border)',
            borderRadius: 8, padding: '8px 16px',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            color: 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
          {expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
          {expanded ? 'Less Info' : 'More Info'}
        </button>

        {/* Expandable section */}
        {expanded && (
          <div
            id={`project-info-${project.id}`}
            style={{
              padding: 14, background: 'var(--color-bg-alt)',
              borderRadius: 8, borderLeft: `3px solid ${project.color}`,
              animation: 'fadeInUp 0.25s ease',
            }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
              {project.details}
            </p>
          </div>
        )}

        {/* ── Action Buttons: View Project + View Code ── */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '9px 0', borderRadius: 8, border: 'none',
              background: project.color, color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', transition: 'opacity 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <ExternalLink size={13}/> View Project
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '9px 0', borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'transparent', color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
            <Github size={13}/> View Code
          </a>
        </div>

        {/* Dynamic route link — /projects/:id */}
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            background: 'transparent', border: 'none',
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            color: 'var(--color-text-muted)', cursor: 'pointer',
            padding: '4px 0', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = project.color}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
          Full Details →
        </button>
      </div>
    </div>
  )
}