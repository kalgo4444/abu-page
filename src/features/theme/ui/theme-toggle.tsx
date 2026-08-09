'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/features/theme/model/theme-context';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Light rejimga o‘tish' : 'Dark rejimga o‘tish'}
      aria-pressed={isDark}
      className="flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
