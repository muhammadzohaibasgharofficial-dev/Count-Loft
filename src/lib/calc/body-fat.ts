/**
 * Count Loft — Body Fat Calculation Engine
 * US Navy Circumference Method for Males and Females.
 */

export interface BodyFatInput {
  sex: 'male' | 'female';
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // Required for females
  weightKg?: number;
}

export interface BodyFatResult {
  bodyFatPercent: number;
  category: string;
  fatMassKg?: number;
  leanMassKg?: number;
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const { sex, heightCm, neckCm, waistCm, hipCm = 0, weightKg } = input;

  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(neckCm) ||
    !Number.isFinite(waistCm) ||
    heightCm <= 0 ||
    neckCm <= 0 ||
    waistCm <= 0
  ) {
    return { bodyFatPercent: 0, category: 'Unknown' };
  }

  let bodyFat = 0;

  if (sex === 'male') {
    if (waistCm <= neckCm) return { bodyFatPercent: 0, category: 'Unknown' };
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    if (waistCm + hipCm <= neckCm) return { bodyFatPercent: 0, category: 'Unknown' };
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  const rounded = Math.round(Math.max(2, Math.min(60, bodyFat)) * 10) / 10;

  // Standard category classification
  let category = 'Fitness';
  if (sex === 'male') {
    if (rounded < 6) category = 'Essential fat';
    else if (rounded <= 13) category = 'Athletes';
    else if (rounded <= 17) category = 'Fitness';
    else if (rounded <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    if (rounded < 14) category = 'Essential fat';
    else if (rounded <= 20) category = 'Athletes';
    else if (rounded <= 24) category = 'Fitness';
    else if (rounded <= 31) category = 'Average';
    else category = 'Obese';
  }

  const res: BodyFatResult = { bodyFatPercent: rounded, category };

  if (weightKg && weightKg > 0) {
    const fatMass = Math.round((weightKg * (rounded / 100)) * 10) / 10;
    res.fatMassKg = fatMass;
    res.leanMassKg = Math.round((weightKg - fatMass) * 10) / 10;
  }

  return res;
}
