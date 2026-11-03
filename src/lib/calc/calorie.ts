/**
 * Count Loft — Calorie & Macro Calculation Engine
 * Implements Mifflin-St Jeor formula and standard physical activity multipliers.
 */

export type BiologicalSex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export interface CalorieInput {
  age: number;
  sex: BiologicalSex;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface CalorieTargets {
  bmr: number;
  maintenanceTdee: number;
  mildLoss: number;     // -250 kcal
  weightLoss: number;   // -500 kcal
  extremeLoss: number;  // -1000 kcal
  mildGain: number;     // +250 kcal
  weightGain: number;   // +500 kcal
}

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

export function calculateCalories(input: CalorieInput): CalorieTargets {
  const { age, sex, weightKg, heightCm, activityLevel } = input;

  if (
    !Number.isFinite(age) ||
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightCm) ||
    age <= 0 ||
    weightKg <= 0 ||
    heightCm <= 0
  ) {
    return {
      bmr: 0,
      maintenanceTdee: 0,
      mildLoss: 0,
      weightLoss: 0,
      extremeLoss: 0,
      mildGain: 0,
      weightGain: 0
    };
  }

  // Mifflin-St Jeor Formula
  const baseBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  const bmr = Math.round(sex === 'male' ? baseBmr + 5 : baseBmr - 161);

  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  const maintenanceTdee = Math.round(bmr * multiplier);

  return {
    bmr,
    maintenanceTdee,
    mildLoss: Math.max(1200, maintenanceTdee - 250),
    weightLoss: Math.max(1200, maintenanceTdee - 500),
    extremeLoss: Math.max(1200, maintenanceTdee - 1000),
    mildGain: maintenanceTdee + 250,
    weightGain: maintenanceTdee + 500
  };
}
