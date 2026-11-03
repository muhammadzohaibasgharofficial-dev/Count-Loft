/**
 * Count Loft — Simple vs Compound Interest Comparison Engine
 */

export interface InterestInput {
  principal: number;
  annualRate: number; // e.g. 5 for 5%
  timeYears: number;
}

export interface InterestComparisonResult {
  simpleInterest: number;
  simpleTotal: number;
  compoundInterest: number;
  compoundTotal: number;
  compoundingAdvantage: number;
}

export function compareInterest(input: InterestInput): InterestComparisonResult {
  const { principal, annualRate, timeYears } = input;

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(timeYears) ||
    principal <= 0 ||
    timeYears <= 0
  ) {
    return {
      simpleInterest: 0,
      simpleTotal: 0,
      compoundInterest: 0,
      compoundTotal: 0,
      compoundingAdvantage: 0
    };
  }

  const r = annualRate / 100;
  // Simple interest: I = P * r * t
  const simpleInterest = Math.round(principal * r * timeYears * 100) / 100;
  const simpleTotal = Math.round((principal + simpleInterest) * 100) / 100;

  // Annual compounding: A = P * (1 + r)^t
  const compoundTotal = Math.round(principal * Math.pow(1 + r, timeYears) * 100) / 100;
  const compoundInterest = Math.round((compoundTotal - principal) * 100) / 100;
  const compoundingAdvantage = Math.round((compoundInterest - simpleInterest) * 100) / 100;

  return {
    simpleInterest,
    simpleTotal,
    compoundInterest,
    compoundTotal,
    compoundingAdvantage: Math.max(0, compoundingAdvantage)
  };
}
