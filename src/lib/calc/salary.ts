/**
 * Count Loft — Salary to Hourly Calculation Engine
 * Converts annual wage to hourly, daily, weekly, biweekly, and overtime rates.
 */

export interface SalaryInput {
  annualSalary: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
}

export interface SalaryBreakdown {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  biweeklyRate: number;
  monthlyRate: number;
  overtimeRate: number;
  annualSalary: number;
}

export function calculateSalaryToHourly(input: SalaryInput): SalaryBreakdown {
  const {
    annualSalary,
    hoursPerWeek = 40,
    weeksPerYear = 52
  } = input;

  if (
    !Number.isFinite(annualSalary) ||
    !Number.isFinite(hoursPerWeek) ||
    !Number.isFinite(weeksPerYear) ||
    annualSalary <= 0 ||
    hoursPerWeek <= 0 ||
    weeksPerYear <= 0
  ) {
    return {
      hourlyRate: 0,
      dailyRate: 0,
      weeklyRate: 0,
      biweeklyRate: 0,
      monthlyRate: 0,
      overtimeRate: 0,
      annualSalary: 0
    };
  }

  const totalAnnualHours = hoursPerWeek * weeksPerYear;
  const hourlyRate = Math.round((annualSalary / totalAnnualHours) * 100) / 100;
  const hoursPerDay = hoursPerWeek / 5;
  const dailyRate = Math.round(hourlyRate * hoursPerDay * 100) / 100;
  const weeklyRate = Math.round((annualSalary / weeksPerYear) * 100) / 100;
  const biweeklyRate = Math.round((weeklyRate * 2) * 100) / 100;
  const monthlyRate = Math.round((annualSalary / 12) * 100) / 100;
  const overtimeRate = Math.round(hourlyRate * 1.5 * 100) / 100;

  return {
    hourlyRate,
    dailyRate,
    weeklyRate,
    biweeklyRate,
    monthlyRate,
    overtimeRate,
    annualSalary
  };
}
