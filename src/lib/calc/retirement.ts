/**
 * Count Loft — Retirement Calculation Engine
 * Estimates required nest egg, projected retirement corpus, and withdrawal sustainability.
 */

export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy?: number;
  currentSavings: number;
  annualContribution: number;
  expectedAnnualReturn: number; // e.g. 7%
  annualRetirementSpend: number;
}

export interface RetirementResult {
  yearsToRetire: number;
  retirementCorpus: number;
  requiredNestEgg: number;
  isFunded: boolean;
  shortfallOrSurplus: number;
  sustainableWithdrawalRate: number;
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy = 85,
    currentSavings,
    annualContribution,
    expectedAnnualReturn,
    annualRetirementSpend
  } = input;

  if (
    !Number.isFinite(currentAge) ||
    !Number.isFinite(retirementAge) ||
    currentAge <= 0 ||
    retirementAge <= currentAge
  ) {
    return {
      yearsToRetire: 0,
      retirementCorpus: 0,
      requiredNestEgg: 0,
      isFunded: false,
      shortfallOrSurplus: 0,
      sustainableWithdrawalRate: 4.0
    };
  }

  const yearsToRetire = retirementAge - currentAge;
  const retirementYears = Math.max(1, lifeExpectancy - retirementAge);
  const r = expectedAnnualReturn / 100;

  // Project corpus at retirement
  let corpus = currentSavings;
  for (let y = 1; y <= yearsToRetire; y++) {
    corpus = (corpus + annualContribution) * (1 + r);
  }

  // Standard 4% rule benchmark or spending * retirementYears
  const requiredNestEgg = annualRetirementSpend > 0 ? annualRetirementSpend * 25 : 1000000;
  const corpusRounded = Math.round(corpus * 100) / 100;
  const difference = Math.round((corpusRounded - requiredNestEgg) * 100) / 100;

  return {
    yearsToRetire,
    retirementCorpus: corpusRounded,
    requiredNestEgg,
    isFunded: difference >= 0,
    shortfallOrSurplus: difference,
    sustainableWithdrawalRate: corpusRounded > 0 ? Math.round(((annualRetirementSpend / corpusRounded) * 100) * 10) / 10 : 4.0
  };
}
