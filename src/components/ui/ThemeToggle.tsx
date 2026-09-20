'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Icon-only control that toggles light and dark themes.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`cursor-pointer rounded-lg border border-stone-200 bg-white p-2 text-stone-600 shadow-xs transition-colors hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 ${className}`}
      aria-label="Toggle color theme"
    >
      <Sun className="hidden h-4 w-4 text-amber-400 dark:block" />
      <Moon className="block h-4 w-4 text-stone-600 dark:hidden" />
    </button>
  );
}
