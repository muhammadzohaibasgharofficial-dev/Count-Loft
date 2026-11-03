/**
 * Count Loft — Date Difference Calculation Engine
 * Calculates the exact elapsed time between two calendar dates in years, months, weeks, days, and hours.
 */

export interface DateDifferenceResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  totalWeeks: number;
  remainingDays: number;
  totalHours: number;
  formattedSummary: string;
}

export function calculateDateDifference(startDateStr: string, endDateStr: string): DateDifferenceResult {
  let start = new Date(startDateStr);
  let end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      totalDays: 0,
      years: 0,
      months: 0,
      days: 0,
      totalWeeks: 0,
      remainingDays: 0,
      totalHours: 0,
      formattedSummary: '0 days'
    };
  }

  // Ensure start is before end
  if (start > end) {
    const tmp = start;
    start = end;
    end = tmp;
  }

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = totalDays * 24;

  // Calendar year, month, day difference
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

  return {
    totalDays,
    years,
    months,
    days,
    totalWeeks,
    remainingDays,
    totalHours,
    formattedSummary: parts.join(', ')
  };
}
