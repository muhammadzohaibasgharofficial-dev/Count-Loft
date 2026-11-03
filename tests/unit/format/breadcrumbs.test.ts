import { describe, it, expect } from 'vitest';
import { buildBreadcrumbs } from '../../../src/lib/format/breadcrumbs';

describe('buildBreadcrumbs', () => {
  it('returns only Home when input is empty', () => {
    const result = buildBreadcrumbs([]);
    expect(result).toEqual([{ label: 'Home', href: '/' }]);
  });

  it('prefixes with Home and strips href from the final active page', () => {
    const input = [
      { label: 'Finance', href: '/finance' },
      { label: 'Loan Calculator', href: '/finance/loan-calculator' }
    ];

    const result = buildBreadcrumbs(input);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ label: 'Home', href: '/' });
    expect(result[1]).toEqual({ label: 'Finance', href: '/finance' });
    expect(result[2]).toEqual({ label: 'Loan Calculator', href: undefined });
  });

  it('trims whitespace from labels and links', () => {
    const input = [
      { label: ' Health ', href: ' /health ' },
      { label: ' BMI Calculator ' }
    ];

    const result = buildBreadcrumbs(input);

    expect(result[1]).toEqual({ label: 'Health', href: '/health' });
    expect(result[2]).toEqual({ label: 'BMI Calculator', href: undefined });
  });
});
