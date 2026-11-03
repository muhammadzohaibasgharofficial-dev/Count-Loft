/**
 * Count Loft — Pregnancy & Ovulation Calculation Engine
 * Implements Naegele's rule for estimated delivery date (EDD) and fertile cycle windows.
 */

export interface PregnancyResult {
  dueDate: string;
  currentWeek: number;
  currentDay: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
}

export function calculatePregnancyDueDate(lmpDateStr: string, cycleLengthDays: number = 28): PregnancyResult {
  const lmp = new Date(lmpDateStr);
  const now = new Date();

  if (isNaN(lmp.getTime())) {
    return { dueDate: '', currentWeek: 0, currentDay: 0, trimester: 1, daysRemaining: 0 };
  }

  // Naegele's rule adjusted for cycle length: LMP + 280 days + (cycleLength - 28)
  const cycleOffset = cycleLengthDays - 28;
  const dueDate = new Date(lmp.getTime() + (280 + cycleOffset) * 24 * 60 * 60 * 1000);

  const elapsedMs = now.getTime() - lmp.getTime();
  const elapsedDays = Math.max(0, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));

  const currentWeek = Math.min(42, Math.floor(elapsedDays / 7));
  const currentDay = elapsedDays % 7;

  let trimester: 1 | 2 | 3 = 1;
  if (currentWeek >= 28) trimester = 3;
  else if (currentWeek >= 14) trimester = 2;

  const remainingDays = Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));

  return {
    dueDate: dueDate.toISOString().split('T')[0] || '',
    currentWeek,
    currentDay,
    trimester,
    daysRemaining: remainingDays
  };
}

export interface OvulationResult {
  estimatedOvulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  nextPeriodDate: string;
}

export function calculateOvulation(lmpDateStr: string, cycleLengthDays: number = 28): OvulationResult {
  const lmp = new Date(lmpDateStr);

  if (isNaN(lmp.getTime())) {
    return {
      estimatedOvulationDate: '',
      fertileWindowStart: '',
      fertileWindowEnd: '',
      nextPeriodDate: ''
    };
  }

  const nextPeriod = new Date(lmp.getTime() + cycleLengthDays * 24 * 60 * 60 * 1000);
  // Ovulation typically occurs 14 days before next period
  const ovulation = new Date(nextPeriod.getTime() - 14 * 24 * 60 * 60 * 1000);
  const fertileStart = new Date(ovulation.getTime() - 5 * 24 * 60 * 60 * 1000);
  const fertileEnd = new Date(ovulation.getTime() + 1 * 24 * 60 * 60 * 1000);

  return {
    estimatedOvulationDate: ovulation.toISOString().split('T')[0] || '',
    fertileWindowStart: fertileStart.toISOString().split('T')[0] || '',
    fertileWindowEnd: fertileEnd.toISOString().split('T')[0] || '',
    nextPeriodDate: nextPeriod.toISOString().split('T')[0] || ''
  };
}
