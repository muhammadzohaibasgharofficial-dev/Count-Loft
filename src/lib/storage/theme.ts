/**
 * Count Loft — Theme Persistence & State Helper
 * Strict TypeScript module for managing light / dark theme state.
 * Adheres strictly to the hierarchy:
 *   1. Explicit user preference ('light' | 'dark' in localStorage)
 *   2. Operating system preference (matchMedia prefers-color-scheme: dark)
 *   3. Safe fallback ('light')
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Validates whether a raw string is a valid Theme.
 */
export function isValidTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Resolves the active theme using the canonical hierarchy.
 * @param saved - Raw value from storage (or null)
 * @param osDark - Boolean indicating OS dark preference, or null if matchMedia is unavailable
 */
export function resolveTheme(saved: string | null | undefined, osDark: boolean | null | undefined): Theme {
  if (isValidTheme(saved)) {
    return saved;
  }
  if (typeof osDark === 'boolean') {
    return osDark ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Safely reads the explicit theme stored by the user.
 * Returns null if localStorage is inaccessible or contains an invalid value.
 */
export function getStoredTheme(): Theme | null {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isValidTheme(raw)) {
        return raw;
      }
    }
  } catch {
    // Graceful degradation when localStorage is blocked or throws SecurityError
  }
  return null;
}

/**
 * Safely reads the operating system's dark mode preference via matchMedia.
 * Returns null if matchMedia is unavailable (e.g. older browser or SSR).
 */
export function getSystemDarkPreference(): boolean | null {
  try {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch {
    // Graceful degradation if matchMedia throws
  }
  return null;
}

/**
 * Returns the currently active theme by evaluating stored user preference first,
 * then operating system preference, with a default fallback to 'light'.
 */
export function getActiveTheme(): Theme {
  return resolveTheme(getStoredTheme(), getSystemDarkPreference());
}

/**
 * Persists user preference and applies theme attributes to the document element.
 */
export function setTheme(theme: Theme): void {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Continue even if localStorage is unavailable
  }

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }
}

/**
 * Clears explicit user selection, reverting to the operating system preference.
 */
export function clearThemePreference(): void {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch {
    // Continue even if localStorage is unavailable
  }

  const systemTheme = resolveTheme(null, getSystemDarkPreference());
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', systemTheme);
    document.documentElement.style.colorScheme = systemTheme;
  }
}

/**
 * Toggles between light and dark themes explicitly.
 */
export function toggleTheme(): Theme {
  const current = getActiveTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}
