import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');

  // Restore saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved && ['light','dark','sunset'].includes(saved)) {
      setThemeState(saved);
      if (saved !== 'light') document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const setTheme = (t) => {
    setThemeState(t);
    localStorage.setItem('portfolio-theme', t);
    if (t === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
