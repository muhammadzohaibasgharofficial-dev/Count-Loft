/**
 * Count Loft — Pure Number & Currency Formatting Utilities
 * Adheres to strict formatting, fixed decimals, and tabular number presentation.
 */

export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Formats a numeric value into a localized currency string.
 */
export function formatCurrency(
  value: number,
  options: CurrencyFormatOptions = {}
): string {
  if (!Number.isFinite(value)) {
    return '$0.00';
  }

  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/**
 * Formats a numeric value with thousands separators and custom decimals.
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: string = 'en-US'
): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  } catch {
    return value.toFixed(decimals);
  }
}

/**
 * Formats a numeric value as an integer with thousands separators.
 */
export function formatInteger(value: number, locale: string = 'en-US'): string {
  return formatNumber(value, 0, locale);
}

/**
 * Formats a fraction/percentage value (e.g. 0.06 -> "6.00%" or 6 -> "6.00%").
 */
export function formatPercent(
  value: number,
  decimals: number = 2,
  isRawRatio: boolean = false
): string {
  if (!Number.isFinite(value)) {
    return '0%';
  }

  const num = isRawRatio ? value * 100 : value;
  return `${formatNumber(num, decimals)}%`;
}

/**
 * Safe parser for user-entered numeric strings, stripping commas and handling edge cases.
 */
export function parseNumberInput(input: string | number | undefined | null, fallback: number = 0): number {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : fallback;
  }
  if (!input || typeof input !== 'string') {
    return fallback;
  }

  const cleaned = input.trim().replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : fallback;
}
