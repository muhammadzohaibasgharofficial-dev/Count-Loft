/**
 * Count Loft — Mortgage Calculation Engine
 * Comprehensive mortgage calculation with taxes, insurance, HOA, and PMI.
 */

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  loanTermYears: number;
  annualInterestRate: number;
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  monthlyHoa?: number;
}

export interface MortgageResult {
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  loanAmount: number;
  downPaymentPercent: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    homePrice,
    downPayment,
    loanTermYears,
    annualInterestRate,
    annualPropertyTax = 0,
    annualHomeInsurance = 0,
    monthlyHoa = 0
  } = input;

  if (
    !Number.isFinite(homePrice) ||
    !Number.isFinite(downPayment) ||
    !Number.isFinite(loanTermYears) ||
    !Number.isFinite(annualInterestRate) ||
    homePrice <= 0 ||
    loanTermYears <= 0
  ) {
    return {
      monthlyPrincipalInterest: 0,
      monthlyPropertyTax: 0,
      monthlyHomeInsurance: 0,
      monthlyPmi: 0,
      monthlyHoa: 0,
      totalMonthlyPayment: 0,
      loanAmount: 0,
      downPaymentPercent: 0,
      totalInterestPaid: 0,
      totalCostOfLoan: 0
    };
  }

  const safeDownPayment = Math.min(homePrice, Math.max(0, downPayment));
  const loanAmount = Math.max(0, homePrice - safeDownPayment);
  const downPaymentPercent = Math.round((safeDownPayment / homePrice) * 100 * 10) / 10;
  const termMonths = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  let totalInterestPaid = 0;

  if (annualInterestRate <= 0) {
    monthlyPrincipalInterest = Math.round((loanAmount / termMonths) * 100) / 100;
    totalInterestPaid = 0;
  } else {
    const monthlyRate = annualInterestRate / 100 / 12;
    const factor = Math.pow(1 + monthlyRate, termMonths);
    const rawPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    monthlyPrincipalInterest = Math.round(rawPayment * 100) / 100;
    totalInterestPaid = Math.max(0, Math.round((monthlyPrincipalInterest * termMonths - loanAmount) * 100) / 100);
  }

  const monthlyPropertyTax = Math.round((annualPropertyTax / 12) * 100) / 100;
  const monthlyHomeInsurance = Math.round((annualHomeInsurance / 12) * 100) / 100;

  // PMI: if down payment is under 20%, estimate standard conventional 0.75% per year
  const monthlyPmi = downPaymentPercent < 20 && loanAmount > 0
    ? Math.round(((loanAmount * 0.0075) / 12) * 100) / 100
    : 0;

  const totalMonthlyPayment = Math.round(
    (monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPmi + monthlyHoa) * 100
  ) / 100;

  return {
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyHoa,
    totalMonthlyPayment,
    loanAmount,
    downPaymentPercent,
    totalInterestPaid,
    totalCostOfLoan: Math.round((safeDownPayment + (monthlyPrincipalInterest * termMonths)) * 100) / 100
  };
}
