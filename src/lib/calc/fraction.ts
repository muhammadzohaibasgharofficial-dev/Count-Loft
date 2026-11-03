/**
 * Count Loft — Fraction Calculation Engine
 * Pure math supporting addition, subtraction, multiplication, division, and simplification.
 */

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  numerator: number;
  denominator: number;
  simplifiedNumerator: number;
  simplifiedDenominator: number;
  wholePart: number;
  remainderNumerator: number;
  decimalValue: number;
  steps: string[];
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 0 };
  const divisor = gcd(num, den);
  const sign = den < 0 ? -1 : 1;
  return {
    num: (num / divisor) * sign,
    den: (den / divisor) * sign
  };
}

export function calculateFractions(
  f1: Fraction,
  f2: Fraction,
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
): FractionResult {
  const steps: string[] = [];

  if (f1.denominator === 0 || f2.denominator === 0) {
    return {
      numerator: 0,
      denominator: 0,
      simplifiedNumerator: 0,
      simplifiedDenominator: 0,
      wholePart: 0,
      remainderNumerator: 0,
      decimalValue: 0,
      steps: ['Error: Denominator cannot be zero.']
    };
  }

  let num = 0;
  let den = 1;

  if (operation === 'add') {
    num = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    den = f1.denominator * f2.denominator;
    steps.push(`Find common denominator: ${f1.denominator} × ${f2.denominator} = ${den}`);
    steps.push(`Adjust numerators: (${f1.numerator} × ${f2.denominator}) + (${f2.numerator} × ${f1.denominator}) = ${num}`);
  } else if (operation === 'subtract') {
    num = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    den = f1.denominator * f2.denominator;
    steps.push(`Find common denominator: ${f1.denominator} × ${f2.denominator} = ${den}`);
    steps.push(`Adjust numerators: (${f1.numerator} × ${f2.denominator}) - (${f2.numerator} × ${f1.denominator}) = ${num}`);
  } else if (operation === 'multiply') {
    num = f1.numerator * f2.numerator;
    den = f1.denominator * f2.denominator;
    steps.push(`Multiply numerators: ${f1.numerator} × ${f2.numerator} = ${num}`);
    steps.push(`Multiply denominators: ${f1.denominator} × ${f2.denominator} = ${den}`);
  } else if (operation === 'divide') {
    if (f2.numerator === 0) {
      return {
        numerator: 0,
        denominator: 0,
        simplifiedNumerator: 0,
        simplifiedDenominator: 0,
        wholePart: 0,
        remainderNumerator: 0,
        decimalValue: 0,
        steps: ['Cannot divide by zero fraction.']
      };
    }
    num = f1.numerator * f2.denominator;
    den = f1.denominator * f2.numerator;
    steps.push(`Multiply by reciprocal: (${f1.numerator}/${f1.denominator}) × (${f2.denominator}/${f2.numerator}) = ${num}/${den}`);
  }

  const simplified = simplifyFraction(num, den);
  steps.push(`Simplify by GCD: ${num}/${den} reduces to ${simplified.num}/${simplified.den}`);

  const wholePart = Math.floor(Math.abs(simplified.num) / simplified.den) * (simplified.num < 0 ? -1 : 1);
  const remainderNumerator = Math.abs(simplified.num) % simplified.den;

  return {
    numerator: num,
    denominator: den,
    simplifiedNumerator: simplified.num,
    simplifiedDenominator: simplified.den,
    wholePart,
    remainderNumerator,
    decimalValue: Math.round((num / den) * 10000) / 10000,
    steps
  };
}
