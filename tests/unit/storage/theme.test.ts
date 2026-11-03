import { describe, it, expect } from 'vitest';
import { resolveTheme, isValidTheme } from '../../../src/lib/storage/theme';

describe('Theme Resolution & Validation (Phase 0B)', () => {
  it('identifies valid theme strings', () => {
    expect(isValidTheme('light')).toBe(true);
    expect(isValidTheme('dark')).toBe(true);
    expect(isValidTheme('auto')).toBe(false);
    expect(isValidTheme('')).toBe(false);
    expect(isValidTheme(null)).toBe(false);
    expect(isValidTheme(undefined)).toBe(false);
    expect(isValidTheme(123)).toBe(false);
  });

  it('prioritizes explicit user selection over OS dark preference', () => {
    // Explicit user 'light', OS preference dark -> user selection wins ('light')
    expect(resolveTheme('light', true)).toBe('light');
    // Explicit user 'dark', OS preference light -> user selection wins ('dark')
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('uses OS preference when no stored user selection exists', () => {
    // No stored theme, OS prefers dark -> 'dark'
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(undefined, true)).toBe('dark');
    // No stored theme, OS prefers light -> 'light'
    expect(resolveTheme(null, false)).toBe('light');
    expect(resolveTheme(undefined, false)).toBe('light');
  });

  it('ignores invalid stored theme values and falls back to OS preference', () => {
    expect(resolveTheme('invalid-value', true)).toBe('dark');
    expect(resolveTheme('invalid-value', false)).toBe('light');
  });

  it('safely defaults to light when both storage and matchMedia are unavailable', () => {
    expect(resolveTheme(null, null)).toBe('light');
    expect(resolveTheme(undefined, null)).toBe('light');
    expect(resolveTheme('unknown', null)).toBe('light');
  });
});
