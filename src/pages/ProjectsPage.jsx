import { useState } from 'react'
import { Search, Star } from 'lucide-react'
import { PROJECTS, ALL_TAGS } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { useAppContext } from '../context/AppContext'

export default function ProjectsPage() {
  const { searchQuery, setSearchQuery, favorites } = useAppContext()
  const [filter, setFilter] = useState('All')
  const [showFavOnly, setShowFavOnly] = useState(false)

  const filtered = PROJECTS.filter(p => {
    const matchesTag = filter === 'All' || p.tech.includes(filter)
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFav = !showFavOnly || favorites.includes(p.id)
    return matchesTag && matchesSearch && matchesFav
  })

  const clearAll = () => {
    setFilter('All')
    setSearchQuery('')
    setShowFavOnly(false)
  }

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 8 }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,6vw,64px)',
            fontWeight: 700, color: 'var(--color-text)', marginBottom: 14 }}>
            All Projects
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
            color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto' }}>
            A complete collection of my work — from real-world deployments to learning experiments.
          </p>
        </div>

        {/* Search bar — state lives in Context so Navbar badge stays in sync */}
        <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto 28px' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects or technologies..."
            style={{
              width: '100%', padding: '11px 16px 11px 40px',
              borderRadius: 10, border: '1px solid var(--color-border)',
              background: 'var(--color-surface)', color: 'var(--color-text)',
              fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>

        {/* Tag Filter Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
          {ALL_TAGS.map(tag => (
            <button key={tag} onClick={() => setFilter(tag)}
              style={{
                padding: '7px 18px', borderRadius: 100, border: '1px solid',
                borderColor: filter === tag ? 'var(--color-primary)' : 'var(--color-border)',
                background: filter === tag ? 'var(--color-primary)' : 'var(--color-surface)',
                color: filter === tag ? '#fff' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {tag}
            </button>
          ))}

          {/* Starred filter — reads from Context */}
          <button onClick={() => setShowFavOnly(v => !v)}
            style={{
              padding: '7px 18px', borderRadius: 100, border: '1px solid',
              display: 'flex', alignItems: 'center', gap: 5,
              borderColor: showFavOnly ? '#F59E0B' : 'var(--color-border)',
              background: showFavOnly ? '#F59E0B' : 'var(--color-surface)',
              color: showFavOnly ? '#fff' : 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
            <Star size={12} fill={showFavOnly ? '#fff' : 'none'}/>
            Starred {favorites.length > 0 && `(${favorites.length})`}
          </button>
        </div>

        {/* Results summary */}
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 13,
          color: 'var(--color-text-muted)', marginBottom: 36 }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          {filter !== 'All' && ` · "${filter}"`}
          {searchQuery && ` · searching "${searchQuery}"`}
          {showFavOnly && ` · starred only`}
        </p>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px',
            background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--color-border)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22,
              color: 'var(--color-text-muted)', marginBottom: 16 }}>
              No projects match your filters
            </p>
            <button onClick={clearAll}
              style={{ padding: '9px 28px', background: 'var(--color-primary)', color: '#fff',
                border: 'none', borderRadius: 8, fontFamily: 'var(--font-body)',
                cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              Clear All Filters
            </button>
          </div>
        )}

        {/* Project Grid — 2 columns desktop, 1 column mobile */}
        <div className="projects-grid" style={{ display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}