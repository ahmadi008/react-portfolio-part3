"use client";
import { useState, useEffect } from 'react';
import Navbar        from '@/components/Navbar';
import Hero          from '@/components/Hero';
import SkillsSection from '@/components/SkillsSection';
import Projects      from '@/components/Projects';
import About         from '@/components/About';
import ContactForm   from '@/components/ContactForm';
import FeedbackWall  from '@/components/FeedbackWall';
import Footer        from '@/components/Footer';

type Theme = 'dark' | 'light' | 'ocean';
const THEME_KEY = 'za_theme';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved && ['dark','light','ocean'].includes(saved)) setTheme(saved);
  }, []);

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh',
                  transition: 'background-color 0.3s, color 0.3s' }}>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <Projects />
        <ContactForm />
        <FeedbackWall />
      </main>
      <Footer name="Zahra Ahmadi" />
    </div>
  );
}
