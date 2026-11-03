/**
 * Count Loft — Systematic Investment Plan (SIP) Engine
 * Models periodic mutual fund SIP compounding returns.
 */

export interface SipInput {
  monthlyInvestment: number;
  expectedAnnualReturn: number; // e.g. 12%
  timePeriodYears: number;
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
}

export function calculateSip(input: SipInput): SipResult {
  const { monthlyInvestment, expectedAnnualReturn, timePeriodYears } = input;

  if (
    !Number.isFinite(monthlyInvestment) ||
    !Number.isFinite(expectedAnnualReturn) ||
    !Number.isFinite(timePeriodYears) ||
    monthlyInvestment <= 0 ||
    timePeriodYears <= 0
  ) {
    return { totalInvested: 0, estimatedReturns: 0, totalMaturityValue: 0 };
  }

  const n = timePeriodYears * 12;
  const i = expectedAnnualReturn / 12 / 100;

  if (i <= 0) {
    const total = monthlyInvestment * n;
    return { totalInvested: total, estimatedReturns: 0, totalMaturityValue: total };
  }

  // Future value of an annuity due: M = P * [((1 + i)^n - 1) / i] * (1 + i)
  const factor = Math.pow(1 + i, n);
  const maturityValue = monthlyInvestment * ((factor - 1) / i) * (1 + i);
  const totalInvested = monthlyInvestment * n;
  const estimatedReturns = Math.max(0, maturityValue - totalInvested);

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    estimatedReturns: Math.round(estimatedReturns * 100) / 100,
    totalMaturityValue: Math.round(maturityValue * 100) / 100
  };
}
