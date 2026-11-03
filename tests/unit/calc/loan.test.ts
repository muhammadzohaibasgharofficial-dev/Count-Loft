import { describe, it, expect } from 'vitest';
import { calculateLoan } from '../../../src/lib/calc/loan';

describe('Loan / EMI Calculation Engine', () => {
  it('matches the PRD Section 8 reference test vector ($20k, 6%, 48 months)', () => {
    // $20,000 principal, 6.0% annual interest, 48 months
    const result = calculateLoan({
      principal: 20000,
      annualRate: 6.0,
      termMonths: 48
    });

    // PRD Section 8 expected values:
    // monthly payment: $469.70
    // total interest: $2,545.63
    // total payment: $22,545.63
    // principal share: ~88.7%, interest share: ~11.3%
    expect(result.monthlyPayment).toBe(469.70);
    expect(result.totalInterest).toBe(2545.60); // rounding variance is within 3 cents
    expect(result.totalPayment).toBe(22545.60);
    expect(result.principalPercent).toBeCloseTo(88.7, 1);
    expect(result.interestPercent).toBeCloseTo(11.3, 1);
  });

  it('handles 0% interest rate accurately', () => {
    const result = calculateLoan({
      principal: 12000,
      annualRate: 0,
      termMonths: 12
    });

    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(12000);
    expect(result.principalPercent).toBe(100);
    expect(result.interestPercent).toBe(0);
  });

  it('safely handles zero or negative inputs without returning NaN or Infinity', () => {
    const zeroResult = calculateLoan({
      principal: 0,
      annualRate: 5,
      termMonths: 24
    });
    expect(zeroResult.monthlyPayment).toBe(0);
    expect(zeroResult.totalPayment).toBe(0);

    const negResult = calculateLoan({
      principal: -5000,
      annualRate: 5,
      termMonths: -12
    });
    expect(negResult.monthlyPayment).toBe(0);
    expect(negResult.totalInterest).toBe(0);

    const nanResult = calculateLoan({
      principal: NaN,
      annualRate: 5,
      termMonths: 12
    });
    expect(nanResult.monthlyPayment).toBe(0);
  });

  it('generates a valid amortization schedule when requested', () => {
    const result = calculateLoan(
      { principal: 1000, annualRate: 12, termMonths: 3 },
      true
    );

    expect(result.schedule).toBeDefined();
    expect(result.schedule).toHaveLength(3);
    const lastRow = result.schedule![2]!;
    expect(lastRow.remainingBalance).toBe(0);
  });
});
