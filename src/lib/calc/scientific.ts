/**
 * Count Loft — Scientific Calculator Calculation Engine
 * Safe mathematical evaluator with trigonometric, logarithmic, and power operations.
 */

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= Math.min(n, 170); i++) {
    res *= i;
  }
  return res;
}

export function evaluateScientificFunction(
  fn: string,
  arg: number,
  isDegreeMode: boolean = false
): number {
  const angle = isDegreeMode ? (arg * Math.PI) / 180 : arg;

  switch (fn) {
    case 'sin': return Math.round(Math.sin(angle) * 1e10) / 1e10;
    case 'cos': return Math.round(Math.cos(angle) * 1e10) / 1e10;
    case 'tan': {
      const cosVal = Math.cos(angle);
      if (Math.abs(cosVal) < 1e-15) return NaN;
      return Math.round(Math.tan(angle) * 1e10) / 1e10;
    }
    case 'sqrt': return arg >= 0 ? Math.sqrt(arg) : NaN;
    case 'cbrt': return Math.cbrt(arg);
    case 'log': return arg > 0 ? Math.log10(arg) : NaN;
    case 'ln': return arg > 0 ? Math.log(arg) : NaN;
    case 'exp': return Math.exp(arg);
    case 'abs': return Math.abs(arg);
    case 'factorial': return factorial(arg);
    default: return arg;
  }
}
