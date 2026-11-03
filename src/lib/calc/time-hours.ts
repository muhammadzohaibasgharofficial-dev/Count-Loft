/**
 * Count Loft — Time Duration & Work Hours Calculation Engine
 * Calculates net elapsed shift hours, lunch break deductions, decimal hours, and pay earnings.
 */

export interface TimeHoursInput {
  startTime: string; // "HH:MM" 24h or "09:00"
  endTime: string;   // "HH:MM" 24h or "17:30"
  breakMinutes?: number;
  hourlyRate?: number;
}

export interface TimeHoursResult {
  totalMinutes: number;
  decimalHours: number;
  hours: number;
  minutes: number;
  formattedDuration: string;
  grossPay?: number;
}

export function calculateTimeHours(input: TimeHoursInput): TimeHoursResult {
  const { startTime, endTime, breakMinutes = 0, hourlyRate } = input;

  const [startH = 0, startM = 0] = (startTime || '09:00').split(':').map(Number);
  const [endH = 0, endM = 0] = (endTime || '17:00').split(':').map(Number);

  const startTotalM = startH * 60 + startM;
  let endTotalM = endH * 60 + endM;

  // Handle overnight shifts (e.g. 22:00 to 06:00)
  if (endTotalM < startTotalM) {
    endTotalM += 24 * 60;
  }

  const rawDiff = endTotalM - startTotalM;
  const netMinutes = Math.max(0, rawDiff - Math.max(0, breakMinutes));

  const hours = Math.floor(netMinutes / 60);
  const minutes = netMinutes % 60;
  const decimalHours = Math.round((netMinutes / 60) * 100) / 100;

  const formattedDuration = `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
  const grossPay = hourlyRate && hourlyRate > 0 ? Math.round(decimalHours * hourlyRate * 100) / 100 : undefined;

  return {
    totalMinutes: netMinutes,
    decimalHours,
    hours,
    minutes,
    formattedDuration,
    grossPay
  };
}
