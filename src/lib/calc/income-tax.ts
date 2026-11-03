/**
 * Count Loft — US / Global Income Tax Calculation Engine
 * Computes progressive tax brackets, standard deductions, FICA, and effective tax rates.
 */

export type FilingStatus = 'single' | 'married_joint';

export interface TaxBracket {
  rate: number;
  threshold: number;
}

export const US_2026_BRACKETS: Record<FilingStatus, { deduction: number; brackets: TaxBracket[] }> = {
  single: {
    deduction: 15000,
    brackets: [
      { rate: 0.10, threshold: 11925 },
      { rate: 0.12, threshold: 48475 },
      { rate: 0.22, threshold: 103350 },
      { rate: 0.24, threshold: 197300 },
      { rate: 0.32, threshold: 250525 },
      { rate: 0.35, threshold: 626350 },
      { rate: 0.37, threshold: Infinity }
    ]
  },
  married_joint: {
    deduction: 30000,
    brackets: [
      { rate: 0.10, threshold: 23850 },
      { rate: 0.12, threshold: 96950 },
      { rate: 0.22, threshold: 206700 },
      { rate: 0.24, threshold: 394600 },
      { rate: 0.32, threshold: 501050 },
      { rate: 0.35, threshold: 751600 },
      { rate: 0.37, threshold: Infinity }
    ]
  }
};

export interface IncomeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveTaxRate: number;
  netTakeHome: number;
}

export function calculateIncomeTax(grossIncome: number, filingStatus: FilingStatus = 'single'): IncomeTaxResult {
  if (!Number.isFinite(grossIncome) || grossIncome <= 0) {
    return {
      grossIncome: 0,
      standardDeduction: 0,
      taxableIncome: 0,
      federalTax: 0,
      ficaTax: 0,
      totalTax: 0,
      effectiveTaxRate: 0,
      netTakeHome: 0
    };
  }

  const config = US_2026_BRACKETS[filingStatus];
  const deduction = config.deduction;
  const taxableIncome = Math.max(0, grossIncome - deduction);

  // Progressive bracket calculation
  let federalTax = 0;
  let prevThreshold = 0;

  for (const b of config.brackets) {
    if (taxableIncome > prevThreshold) {
      const taxableInBracket = Math.min(taxableIncome, b.threshold) - prevThreshold;
      federalTax += taxableInBracket * b.rate;
      prevThreshold = b.threshold;
    } else {
      break;
    }
  }

  // FICA: Social Security 6.2% up to $176,100 + Medicare 1.45%
  const socialSecurity = Math.min(grossIncome, 176100) * 0.062;
  const medicare = grossIncome * 0.0145;
  const ficaTax = Math.round((socialSecurity + medicare) * 100) / 100;

  const roundedFedTax = Math.round(federalTax * 100) / 100;
  const totalTax = Math.round((roundedFedTax + ficaTax) * 100) / 100;
  const netTakeHome = Math.max(0, Math.round((grossIncome - totalTax) * 100) / 100);
  const effectiveRate = grossIncome > 0 ? Math.round((totalTax / grossIncome) * 1000) / 10 : 0;

  return {
    grossIncome,
    standardDeduction: deduction,
    taxableIncome,
    federalTax: roundedFedTax,
    ficaTax,
    totalTax,
    effectiveTaxRate: effectiveRate,
    netTakeHome
  };
}
