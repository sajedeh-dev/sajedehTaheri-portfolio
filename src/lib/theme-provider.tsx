'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { toggleTheme } from '@/lib/theme';

interface ThemeContextValue {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ toggleTheme });

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Exposes theme toggling to client components without reading localStorage
 * during render, which would cause a hydration mismatch.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Returns theme helpers from the nearest ThemeProvider.
 *
 * @returns Theme toggle function.
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
