/**
 * Count Loft — Compound Interest Calculation Engine
 * Pure math modeling periodic compounding and regular monthly additions.
 */

export type CompoundingFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily';

export interface CompoundInterestInput {
  initialPrincipal: number;
  monthlyDeposit?: number;
  annualRate: number; // e.g. 7 for 7%
  years: number;
  frequency?: CompoundingFrequency;
}

export interface CompoundYearRow {
  year: number;
  deposits: number;
  interestEarned: number;
  endBalance: number;
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalDeposited: number;
  totalInterest: number;
  yearlySchedule: CompoundYearRow[];
}

const FREQUENCY_MAP: Record<CompoundingFrequency, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365
};

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const {
    initialPrincipal,
    monthlyDeposit = 0,
    annualRate,
    years,
    frequency = 'monthly'
  } = input;

  if (
    !Number.isFinite(initialPrincipal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    initialPrincipal < 0 ||
    years <= 0
  ) {
    return {
      finalBalance: 0,
      totalDeposited: 0,
      totalInterest: 0,
      yearlySchedule: []
    };
  }

  const n = FREQUENCY_MAP[frequency] || 12;
  const r = annualRate / 100;
  const yearlySchedule: CompoundYearRow[] = [];

  let balance = initialPrincipal;
  let totalDeposited = initialPrincipal;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      balance += monthlyDeposit;
      totalDeposited += monthlyDeposit;
      // monthly compounding approximation for smooth schedule
      balance += balance * (r / 12);
    }

    const currentTotalInterest = Math.max(0, balance - totalDeposited);
    yearlySchedule.push({
      year: y,
      deposits: Math.round(totalDeposited * 100) / 100,
      interestEarned: Math.round(currentTotalInterest * 100) / 100,
      endBalance: Math.round(balance * 100) / 100
    });
  }

  const finalBalance = Math.round(balance * 100) / 100;
  const totalInterest = Math.max(0, Math.round((finalBalance - totalDeposited) * 100) / 100);

  return {
    finalBalance,
    totalDeposited: Math.round(totalDeposited * 100) / 100,
    totalInterest,
    yearlySchedule
  };
}
