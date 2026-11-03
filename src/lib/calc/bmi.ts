/**
 * Count Loft — Body Mass Index (BMI) Calculation Engine
 * Pure functions supporting Metric and Imperial units per WHO guidelines.
 */

export type BmiCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity Class I' | 'Obesity Class II' | 'Obesity Class III';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryColor: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
  unitSystem: 'metric' | 'imperial';
}

export function calculateBmiMetric(weightKg: number, heightCm: number): BmiResult {
  if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm) || weightKg <= 0 || heightCm <= 0) {
    return {
      bmi: 0,
      category: 'Normal weight',
      categoryColor: 'var(--color-text-muted)',
      healthyWeightMin: 0,
      healthyWeightMax: 0,
      unitSystem: 'metric'
    };
  }

  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  const bmi = Math.round(rawBmi * 10) / 10;

  const healthyMin = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyMax = Math.round(24.9 * heightM * heightM * 10) / 10;

  let category: BmiCategory = 'Normal weight';
  let categoryColor = 'var(--color-success)';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'var(--color-warning)';
  } else if (bmi <= 24.9) {
    category = 'Normal weight';
    categoryColor = 'var(--color-success)';
  } else if (bmi <= 29.9) {
    category = 'Overweight';
    categoryColor = 'var(--color-warning)';
  } else if (bmi <= 34.9) {
    category = 'Obesity Class I';
    categoryColor = 'var(--color-danger)';
  } else if (bmi <= 39.9) {
    category = 'Obesity Class II';
    categoryColor = 'var(--color-danger)';
  } else {
    category = 'Obesity Class III';
    categoryColor = 'var(--color-danger)';
  }

  return {
    bmi,
    category,
    categoryColor,
    healthyWeightMin: healthyMin,
    healthyWeightMax: healthyMax,
    unitSystem: 'metric'
  };
}

export function calculateBmiImperial(weightLbs: number, heightInches: number): BmiResult {
  if (!Number.isFinite(weightLbs) || !Number.isFinite(heightInches) || weightLbs <= 0 || heightInches <= 0) {
    return {
      bmi: 0,
      category: 'Normal weight',
      categoryColor: 'var(--color-text-muted)',
      healthyWeightMin: 0,
      healthyWeightMax: 0,
      unitSystem: 'imperial'
    };
  }

  const rawBmi = (703 * weightLbs) / (heightInches * heightInches);
  const bmi = Math.round(rawBmi * 10) / 10;

  const healthyMin = Math.round((18.5 * heightInches * heightInches / 703) * 10) / 10;
  const healthyMax = Math.round((24.9 * heightInches * heightInches / 703) * 10) / 10;

  let category: BmiCategory = 'Normal weight';
  let categoryColor = 'var(--color-success)';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'var(--color-warning)';
  } else if (bmi <= 24.9) {
    category = 'Normal weight';
    categoryColor = 'var(--color-success)';
  } else if (bmi <= 29.9) {
    category = 'Overweight';
    categoryColor = 'var(--color-warning)';
  } else if (bmi <= 34.9) {
    category = 'Obesity Class I';
    categoryColor = 'var(--color-danger)';
  } else if (bmi <= 39.9) {
    category = 'Obesity Class II';
    categoryColor = 'var(--color-danger)';
  } else {
    category = 'Obesity Class III';
    categoryColor = 'var(--color-danger)';
  }

  return {
    bmi,
    category,
    categoryColor,
    healthyWeightMin: healthyMin,
    healthyWeightMax: healthyMax,
    unitSystem: 'imperial'
  };
}
