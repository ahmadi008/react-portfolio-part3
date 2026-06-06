import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, Sunset, Star } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAppContext } from '../context/AppContext'

const THEMES = [
  { value: 'light',  icon: <Sun size={16}/>,    label: 'Light' },
  { value: 'dark',   icon: <Moon size={16}/>,   label: 'Dark' },
  { value: 'sunset', icon: <Sunset size={16}/>, label: 'Sunset' },
]

// NavLink style helper — highlights active route links
const navLinkStyle = ({ isActive }) => ({
  padding: '6px 14px',
  borderRadius: 8,
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  fontSize: 15,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
  background: isActive ? 'rgba(37,99,235,0.1)' : 'transparent',
})

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { favorites } = useAppContext()   // ← Context API — no prop drilling!
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu whenever the route changes
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Smart scroll: if on home page → smooth scroll; if on another page → navigate home first
  const scrollToSection = (id) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    }
  }

  const scrollBtnStyle = {
    padding: '6px 14px',
    borderRadius: 8,
    background: 'transparent',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 15,
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s',
      ...(scrolled ? {
        background: 'var(--color-surface)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      } : { background: 'transparent' }),
    }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — NavLink to home */}
        <NavLink to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700,
          color: 'var(--color-primary)', textDecoration: 'none' }}>
          ZA.
        </NavLink>

        {/* Desktop links */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: 4, listStyle: 'none',
          alignItems: 'center', margin: 0, padding: 0 }}>
          <li>
            <NavLink to="/" end style={navLinkStyle}>Home</NavLink>
          </li>
          <li>
            <button style={scrollBtnStyle}
              onClick={() => scrollToSection('about')}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              About
            </button>
          </li>
          <li>
            {/* NavLink to /projects — shows favorites badge from Context API */}
            <NavLink to="/projects" style={navLinkStyle}>
              Projects
              {favorites.length > 0 && (
                <span style={{
                  marginLeft: 5, background: '#F59E0B', color: '#fff',
                  borderRadius: '50%', width: 16, height: 16, fontSize: 10, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  verticalAlign: 'middle',
                }}>
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <button style={scrollBtnStyle}
              onClick={() => scrollToSection('contact')}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              Contact
            </button>
          </li>
        </ul>

        {/* Right: theme switcher + mobile button */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 2, background: 'var(--color-bg-alt)',
            borderRadius: 10, padding: 3, border: '1px solid var(--color-border)' }}>
            {THEMES.map(opt => (
              <button key={opt.value} onClick={() => setTheme(opt.value)} title={opt.label}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 28, borderRadius: 8, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: theme === opt.value ? 'var(--color-primary)' : 'transparent',
                  color: theme === opt.value ? '#fff' : 'var(--color-text-muted)' }}>
                {opt.icon}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
            className="mobile-menu-btn"
            style={{ display: 'none', width: 36, height: 36, alignItems: 'center',
              justifyContent: 'center', background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)', borderRadius: 8,
              cursor: 'pointer', color: 'var(--color-text)' }}>
            {menuOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: 64, left: 0, right: 0,
          background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
          padding: '12px 24px 20px', boxShadow: 'var(--shadow-md)' }}>
          {[
            { type: 'link', to: '/', end: true, label: 'Home' },
          ].map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              style={({ isActive }) => ({
                display: 'block', padding: '10px 0',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
                textDecoration: 'none', borderBottom: '1px solid var(--color-border)',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              })}>
              {item.label}
            </NavLink>
          ))}
          <button onClick={() => scrollToSection('about')}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0',
              background: 'transparent', border: 'none', borderBottom: '1px solid var(--color-border)',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
              color: 'var(--color-text)', cursor: 'pointer' }}>
            About
          </button>
          <NavLink to="/projects"
            style={({ isActive }) => ({
              display: 'block', padding: '10px 0',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
              textDecoration: 'none', borderBottom: '1px solid var(--color-border)',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
            })}>
            Projects
          </NavLink>
          <button onClick={() => scrollToSection('contact')}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0',
              background: 'transparent', border: 'none',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
              color: 'var(--color-text)', cursor: 'pointer' }}>
            Contact
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}