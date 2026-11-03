
/**
 * Loan amortization calculation utilities.
 * All functions are pure and have full TypeScript typings.
 */

/**
 * Compute the monthly payment for a fixed-rate loan.
 */
export function monthlyPayment(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return +(principal / months).toFixed(2);
  }

  const payment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months));

  return +payment.toFixed(2);
}

/**
 * Compute total interest paid over the life of the loan.
 */
export function totalInterest(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;

  const payment = monthlyPayment(principal, annualRate, months);
  const totalPaid = payment * months;

  return +(totalPaid - principal).toFixed(2);
}

/**
 * Compute total amount paid (principal + interest).
 */
export function totalPaid(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;

  const payment = monthlyPayment(principal, annualRate, months);

  return +(payment * months).toFixed(2);
}

/**
 * Full loan calculation result.
 */
export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  principalPercent: number;
  interestPercent: number;
  schedule?: Array<{
    month: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    remainingBalance: number;
  }>;
}

/**
 * Calculate loan details and optional amortization schedule.
 */
export function calculateLoan(
  params: {
    principal: number;
    annualRate: number;
    termMonths: number;
  },
  includeSchedule = false,
): LoanResult {
  const { principal, annualRate, termMonths } = params;

  if (
    principal <= 0 ||
    termMonths <= 0 ||
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(termMonths) ||
    annualRate <= -1200
  ) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      principalPercent: 0,
      interestPercent: 0,
    };
  }

  const payment = monthlyPayment(
    principal,
    annualRate,
    termMonths,
  );

  const interest = totalInterest(
    principal,
    annualRate,
    termMonths,
  );

  const total = totalPaid(
    principal,
    annualRate,
    termMonths,
  );

  const principalPct = +(principal / total * 100).toFixed(1);
  const interestPct = +(interest / total * 100).toFixed(1);

  const result: LoanResult = {
    monthlyPayment: payment,
    totalInterest: interest,
    totalPayment: total,
    principalPercent: principalPct,
    interestPercent: interestPct,
  };

  if (includeSchedule) {
    const schedule: LoanResult['schedule'] = [];
    let balance = principal;

    const monthlyRate = annualRate / 100 / 12;

    for (let m = 1; m <= termMonths; m++) {
      const interestPayment = +(
        balance * monthlyRate
      ).toFixed(2);

      const principalPayment = +(
        payment - interestPayment
      ).toFixed(2);

      balance = +(
        balance - principalPayment
      ).toFixed(2);

      if (balance < 0) balance = 0;

      schedule.push({
        month: m,
        payment,
        principalPayment,
        interestPayment,
        remainingBalance: balance,
      });
    }

    result.schedule = schedule;
  }

  return result;
}
