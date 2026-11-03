/**
 * Count Loft — GPA Calculation Engine
 * Pure math supporting unweighted 4.0 and weighted high-school / college GPA.
 */

export interface CourseGrade {
  name: string;
  grade: string;
  credits: number;
  courseType?: 'regular' | 'honors' | 'ap';
}

export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
}

export function calculateGpa(courses: CourseGrade[]): GpaResult {
  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const c of courses) {
    if (!c.credits || c.credits <= 0) continue;
    let basePts = GRADE_POINTS[c.grade.toUpperCase()] ?? 0;

    if (c.courseType === 'honors') {
      basePts += 0.5;
    } else if (c.courseType === 'ap') {
      basePts += 1.0;
    }

    totalCredits += c.credits;
    totalGradePoints += basePts * c.credits;
  }

  const gpa = totalCredits > 0 ? Math.round((totalGradePoints / totalCredits) * 100) / 100 : 0.0;

  return {
    gpa,
    totalCredits,
    totalGradePoints: Math.round(totalGradePoints * 100) / 100
  };
}
