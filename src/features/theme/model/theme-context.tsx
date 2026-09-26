'use client';

import { createContext, use, useCallback, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(getTheme());
      setIsMounted(true);
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem('theme')) {
          const next = e.matches ? 'dark' : 'light';
          document.documentElement.dataset.theme = next;
          setTheme(next);
        }
      } catch {
        // Ignore storage access errors
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem('theme', next);
        } catch {
          // Ignore storage access errors
        }
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext value={{ theme, toggleTheme, isMounted }}>
      {children}
    </ThemeContext>
  );
};

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider.');
  return context;
};
