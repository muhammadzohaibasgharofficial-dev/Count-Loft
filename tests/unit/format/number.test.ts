import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  parseNumberInput
} from '../../../src/lib/format/number';

describe('Number and Currency Formatter', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(469.7)).toBe('$469.70');
    expect(formatCurrency(22545.63)).toBe('$22,545.63');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(NaN)).toBe('$0.00');
  });

  it('formats numbers with thousand separators and decimals', () => {
    expect(formatNumber(1234567.891, 2)).toBe('1,234,567.89');
    expect(formatNumber(1000, 0)).toBe('1,000');
    expect(formatNumber(NaN)).toBe('0');
  });

  it('formats percentages accurately', () => {
    expect(formatPercent(6.5, 2)).toBe('6.50%');
    expect(formatPercent(0.065, 2, true)).toBe('6.50%');
  });

  it('safely parses user input strings with commas', () => {
    expect(parseNumberInput('20,000')).toBe(20000);
    expect(parseNumberInput(' 1,234.56 ')).toBe(1234.56);
    expect(parseNumberInput('invalid', 100)).toBe(100);
    expect(parseNumberInput('', 50)).toBe(50);
  });
});
