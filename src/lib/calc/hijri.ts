/**
 * Count Loft — Hijri-Gregorian Calendar Converter Engine
 * Converts dates between the Islamic lunar calendar (AH) and the Gregorian solar calendar (CE)
 * using the standard astronomical Julian Day Number (JDN) algorithmic method.
 */

export const HIJRI_MONTH_NAMES = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Ula',
  'Jumada al-Akhirah',
  'Rajab',
  'Sha\'ban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qi\'dah',
  'Dhu al-Hijjah'
];

export interface HijriDate {
  year: number;
  month: number; // 1-12
  monthName: string;
  day: number;
  formatted: string;
}

export interface GregorianDate {
  year: number;
  month: number; // 1-12
  day: number;
  formatted: string;
}

/**
 * Converts a Gregorian date (year, month 1-12, day) to Julian Day Number (JDN)
 */
export function gregorianToJdn(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

/**
 * Converts Julian Day Number (JDN) to Gregorian date
 */
export function jdnToGregorian(jdn: number): GregorianDate {
  const z = Math.floor(jdn + 0.5);
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const b = z + 1 + a - Math.floor(a / 4);
  const c = b + 1524;
  const d = Math.floor((c - 122.1) / 365.25);
  const e = Math.floor(365.25 * d);
  const g = Math.floor((c - e) / 30.6001);
  const day = Math.floor(c - e - Math.floor(30.6001 * g));
  const month = g < 14 ? g - 1 : g - 13;
  const year = month > 2 ? d - 4716 : d - 4715;

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');

  return {
    year,
    month,
    day,
    formatted: `${year}-${mm}-${dd}`
  };
}

/**
 * Converts JDN to Islamic Hijri date
 */
export function jdnToHijri(jdn: number): HijriDate {
  const jd = Math.floor(jdn) + 0.5;
  const l = Math.floor(jd - 1948440 + 10632);
  const n = Math.floor((l - 1) / 10631);
  const lPrime = l - 10631 * n + 354;
  const j = (Math.floor((10985 - lPrime) / 5316)) * (Math.floor((50 * lPrime) / 17719)) +
            (Math.floor(lPrime / 5670)) * (Math.floor((43 * lPrime) / 15238));
  const lDoublePrime = lPrime - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
                       (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const month = Math.floor((24 * lDoublePrime) / 709);
  const day = Math.floor(lDoublePrime - Math.floor((709 * month) / 24));
  const year = Math.floor(30 * n + j - 30);

  const safeMonth = Math.max(1, Math.min(12, month));
  const monthName = HIJRI_MONTH_NAMES[safeMonth - 1] ?? 'Ramadan';

  return {
    year,
    month: safeMonth,
    monthName,
    day,
    formatted: `${day} ${monthName} ${year} AH`
  };
}

/**
 * Converts Islamic Hijri date to JDN
 */
export function hijriToJdn(year: number, month: number, day: number): number {
  return Math.floor((11 * year + 3) / 30) +
         354 * year +
         30 * month -
         Math.floor((month - 1) / 2) +
         day +
         1948440 -
         385;
}

export function convertGregorianToHijri(dateStr: string): HijriDate {
  const [yStr, mStr, dStr] = dateStr.split('-');
  const y = parseInt(yStr || '2026', 10);
  const m = parseInt(mStr || '1', 10);
  const d = parseInt(dStr || '1', 10);

  const jdn = gregorianToJdn(y, m, d);
  return jdnToHijri(jdn);
}

export function convertHijriToGregorian(year: number, month: number, day: number): GregorianDate {
  const jdn = hijriToJdn(year, month, day);
  return jdnToGregorian(jdn);
}
