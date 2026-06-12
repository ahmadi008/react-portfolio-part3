import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Star } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import TechBadge from '../components/TechBadge'
import { useAppContext } from '../context/AppContext'

const STATUS_STYLES = {
  'Featured':    { bg: 'rgba(249,115,22,0.15)', border: '#F97316', color: '#EA580C' },
  'Completed':   { bg: 'rgba(16,185,129,0.15)', border: '#10B981', color: '#059669' },
  'In Progress': { bg: 'rgba(37,99,235,0.15)',  border: '#2563EB', color: '#1D4ED8' },
}

export default function ProjectDetailPage() {
  const { id } = useParams()                       // ← useParams() gets the dynamic :id
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useAppContext()

  // Find project from central data store
  const project = PROJECTS.find(p => p.id === Number(id))

  if (!project) {
    return (
      <main style={{ paddingTop: 80, minHeight: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 40,
          color: 'var(--color-text)', marginBottom: 16 }}>Project Not Found</h1>
        <Link to="/projects" style={{ color: 'var(--color-primary)',
          fontFamily: 'var(--font-body)', fontSize: 15 }}>
          ← Back to Projects
        </Link>
      </main>
    )
  }

  const fav = isFavorite(project.id)
  const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES['Completed']
  const initials = project.title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${project.color}18 0%, var(--color-bg-alt) 100%)`,
        borderBottom: '1px solid var(--color-border)',
        padding: '60px 24px 40px',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <button onClick={() => navigate('/projects')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 'none', color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer',
              marginBottom: 28, padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = project.color}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
            <ArrowLeft size={16}/> Back to Projects
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            {/* Project initials icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 16, background: project.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800,
              boxShadow: `0 8px 24px ${project.color}44`, flexShrink: 0,
            }}>
              {initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12,
                flexWrap: 'wrap', marginBottom: 10 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(26px,5vw,44px)', fontWeight: 800,
                  color: 'var(--color-text)', margin: 0 }}>
                  {project.title}
                </h1>
                <span style={{
                  padding: '4px 14px', borderRadius: 100,
                  background: statusStyle.bg, border: `1px solid ${statusStyle.border}`,
                  color: statusStyle.color, fontSize: 12, fontWeight: 700,
                  fontFamily: 'var(--font-body)', letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {project.status}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16,
                color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {project.desc}
              </p>
            </div>

            {/* Favourite toggle */}
            <button onClick={() => toggleFavorite(project.id)}
              aria-label={fav ? 'Remove from favourites' : 'Star this project'}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 10,
                border: `1px solid ${fav ? '#F59E0B' : 'var(--color-border)'}`,
                background: fav ? '#F59E0B22' : 'var(--color-surface)',
                color: fav ? '#F59E0B' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
              }}>
              <Star size={15} fill={fav ? 'currentColor' : 'none'}/>
              {fav ? 'Starred' : 'Star'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div className="detail-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start'
        }}>

          {/* Left: About + Progress + Buttons */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
              color: 'var(--color-text)', marginBottom: 12 }}>About This Project</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--color-text)', lineHeight: 1.85, marginBottom: 32 }}>
              {project.details}
            </p>

            {/* Progress bar */}
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15,
              fontWeight: 700, color: 'var(--color-text)', marginBottom: 10 }}>
              Completion
            </h3>
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                  color: 'var(--color-text-muted)' }}>Progress</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700,
                  color: project.color }}>{project.progress}%</span>
              </div>
              <div role="progressbar" aria-valuenow={project.progress}
                aria-valuemin={0} aria-valuemax={100}
                aria-label={`${project.title} is ${project.progress}% complete`}
                style={{ height: 10, borderRadius: 5,
                  background: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${project.progress}%`,
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}99)`,
                  borderRadius: 5, transition: 'width 1s ease',
                }} />
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, padding: '12px 0',
                  borderRadius: 10, background: project.color, color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                  textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <ExternalLink size={15}/> View Live
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, padding: '12px 0',
                  borderRadius: 10, border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)', color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}>
                <Github size={15}/> Source Code
              </a>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div>
            <div style={{ background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
                color: 'var(--color-text)', marginBottom: 14, paddingBottom: 10,
                borderBottom: '1px solid var(--color-border)' }}>Tech Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.tech.map(t => <TechBadge key={t} tech={t} />)}
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
                color: 'var(--color-text)', marginBottom: 14, paddingBottom: 10,
                borderBottom: '1px solid var(--color-border)' }}>Other Projects</h3>
              {PROJECTS.filter(p => p.id !== project.id).slice(0, 4).map(p => {
                const ini = p.title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                return (
                  <Link key={p.id} to={`/projects/${p.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 0', borderBottom: '1px solid var(--color-border)',
                      textDecoration: 'none', color: 'var(--color-text)',
                      transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = p.color}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}>
                    <div style={{ width: 34, height: 34, borderRadius: 8,
                      background: p.color, color: '#fff', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-heading)', fontSize: 11,
                      fontWeight: 800, flexShrink: 0 }}>
                      {ini}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                        fontWeight: 600 }}>{p.title}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                        color: 'var(--color-text-muted)' }}>{p.tech.slice(0, 2).join(', ')}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}