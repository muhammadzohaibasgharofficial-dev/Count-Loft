/**
 * Count Loft — Grade & Final Exam Target Calculation Engine
 * Calculates weighted grade averages and required final exam scores to reach a target class grade.
 */

export interface GradeItem {
  name: string;
  score: number;  // e.g. 85 for 85%
  weight: number; // e.g. 20 for 20%
}

export interface FinalExamTargetInput {
  currentGradePercent: number;
  targetGradePercent: number;
  finalExamWeightPercent: number;
}

export interface FinalExamTargetResult {
  requiredScorePercent: number;
  isPossible: boolean;
  status: 'achievable' | 'impossible_too_high' | 'already_secured';
}

export function calculateWeightedGrade(items: GradeItem[]): {
  weightedAverage: number;
  totalWeight: number;
  letterGrade: string;
} {
  const valid = items.filter(i => Number.isFinite(i.score) && Number.isFinite(i.weight) && i.weight > 0);
  const totalWeight = valid.reduce((acc, i) => acc + i.weight, 0);

  if (totalWeight === 0) {
    return { weightedAverage: 0, totalWeight: 0, letterGrade: 'N/A' };
  }

  const weightedSum = valid.reduce((acc, i) => acc + (i.score * i.weight), 0);
  const weightedAverage = Math.round((weightedSum / totalWeight) * 100) / 100;

  let letterGrade = 'F';
  if (weightedAverage >= 93) letterGrade = 'A';
  else if (weightedAverage >= 90) letterGrade = 'A-';
  else if (weightedAverage >= 87) letterGrade = 'B+';
  else if (weightedAverage >= 83) letterGrade = 'B';
  else if (weightedAverage >= 80) letterGrade = 'B-';
  else if (weightedAverage >= 77) letterGrade = 'C+';
  else if (weightedAverage >= 73) letterGrade = 'C';
  else if (weightedAverage >= 70) letterGrade = 'C-';
  else if (weightedAverage >= 60) letterGrade = 'D';

  return { weightedAverage, totalWeight, letterGrade };
}

export function calculateFinalExamRequiredScore(input: FinalExamTargetInput): FinalExamTargetResult {
  const { currentGradePercent, targetGradePercent, finalExamWeightPercent } = input;

  if (finalExamWeightPercent <= 0 || finalExamWeightPercent >= 100) {
    return { requiredScorePercent: 0, isPossible: false, status: 'impossible_too_high' };
  }

  const currentWeight = (100 - finalExamWeightPercent) / 100;
  const finalWeight = finalExamWeightPercent / 100;

  // Formula: Target = (Current * CurrentWeight) + (FinalScore * FinalWeight)
  // FinalScore = (Target - Current * CurrentWeight) / FinalWeight
  const required = (targetGradePercent - (currentGradePercent * currentWeight)) / finalWeight;
  const roundedRequired = Math.round(required * 100) / 100;

  let status: 'achievable' | 'impossible_too_high' | 'already_secured' = 'achievable';
  let isPossible = true;

  if (roundedRequired <= 0) {
    status = 'already_secured';
  } else if (roundedRequired > 100) {
    status = 'impossible_too_high';
    isPossible = false;
  }

  return {
    requiredScorePercent: roundedRequired,
    isPossible,
    status
  };
}
