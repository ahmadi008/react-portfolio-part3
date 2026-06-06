import { createContext, useContext, useState, useEffect } from 'react'

// -----------------------------------------------------------------
// PROP DRILLING PROBLEM → CONTEXT SOLUTION
//
// Without Context, to show the favorites badge in Navbar:
//   App → Layout → Navbar (requires passing `favorites` as props
//   through every level — this is PROP DRILLING)
//
// With Context, any component just calls useAppContext() directly.
// No props needed. This is the Context API solution.
// -----------------------------------------------------------------

const AppContext = createContext(null)

export const USER_INFO = {
  name: 'Zahra Ahmadi',
  title: 'Frontend Developer',
  bio: 'Building meaningful experiences with code and passion.',
  github: 'https://github.com/ahmadi008',
  linkedin: '#',
  email: 'zahra@example.com',
}

export function AppProvider({ children }) {
  // Load favorites from localStorage on mount — useEffect + localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('pf_favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [searchQuery, setSearchQuery] = useState('')

  // Side effect: persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem('pf_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )

  const isFavorite = (id) => favorites.includes(id)

  return (
    <AppContext.Provider value={{
      user: USER_INFO,
      favorites,
      toggleFavorite,
      isFavorite,
      searchQuery,
      setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook — eliminates prop drilling entirely
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>')
  return ctx
}

export default AppContext