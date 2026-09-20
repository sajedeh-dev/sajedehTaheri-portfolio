import type { ThemeMode } from '@/types/portfolio';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Inline script that applies the saved or system theme before React hydrates.
 * Prevents a light/dark flash on first paint.
 */
export const THEME_INITIALIZER_SCRIPT = `(function() {
  try {
    var storageKey = '${THEME_STORAGE_KEY}';
    var saved = localStorage.getItem(storageKey);
    var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  } catch (error) {}
})();`;

/**
 * Applies a color theme to the document root and persists it.
 *
 * @param theme - Light or dark mode to apply.
 */
export function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Toggles between light and dark using the class already on the document.
 */
export function toggleTheme(): void {
  const nextTheme: ThemeMode = document.documentElement.classList.contains('dark')
    ? 'light'
    : 'dark';
  applyTheme(nextTheme);
}
