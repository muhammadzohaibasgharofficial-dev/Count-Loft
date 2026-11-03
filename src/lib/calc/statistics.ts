/**
 * Count Loft — Descriptive Statistics & Standard Deviation Calculation Engine
 * Computes mean, median, mode, range, variance, and sample vs population standard deviations.
 */

export interface StatisticsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  sampleVariance: number;
  populationVariance: number;
  sampleStandardDeviation: number;
  populationStandardDeviation: number;
}

export function calculateStatistics(data: number[]): StatisticsResult {
  const clean = data.filter(n => Number.isFinite(n)).sort((a, b) => a - b);
  const n = clean.length;

  if (n === 0) {
    return {
      count: 0,
      sum: 0,
      mean: 0,
      median: 0,
      modes: [],
      min: 0,
      max: 0,
      range: 0,
      sampleVariance: 0,
      populationVariance: 0,
      sampleStandardDeviation: 0,
      populationStandardDeviation: 0
    };
  }

  const sum = clean.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;

  // Median
  let median = 0;
  const mid = Math.floor(n / 2);
  if (n % 2 !== 0) {
    median = clean[mid] ?? 0;
  } else {
    median = ((clean[mid - 1] ?? 0) + (clean[mid] ?? 0)) / 2;
  }

  // Mode
  const freqMap = new Map<number, number>();
  let maxFreq = 0;
  for (const val of clean) {
    const f = (freqMap.get(val) ?? 0) + 1;
    freqMap.set(val, f);
    if (f > maxFreq) maxFreq = f;
  }

  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const [val, f] of freqMap.entries()) {
      if (f === maxFreq) modes.push(val);
    }
  }

  const min = clean[0] ?? 0;
  const max = clean[n - 1] ?? 0;
  const range = max - min;

  // Variances & Standard Deviations
  const sumSquaredDiffs = clean.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const populationVariance = sumSquaredDiffs / n;
  const sampleVariance = n > 1 ? sumSquaredDiffs / (n - 1) : 0;

  const populationStandardDeviation = Math.sqrt(populationVariance);
  const sampleStandardDeviation = Math.sqrt(sampleVariance);

  const round = (val: number) => Math.round(val * 10000) / 10000;

  return {
    count: n,
    sum: round(sum),
    mean: round(mean),
    median: round(median),
    modes,
    min,
    max,
    range: round(range),
    sampleVariance: round(sampleVariance),
    populationVariance: round(populationVariance),
    sampleStandardDeviation: round(sampleStandardDeviation),
    populationStandardDeviation: round(populationStandardDeviation)
  };
}
