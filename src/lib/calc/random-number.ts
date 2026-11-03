/**
 * Count Loft — Random Number Generator Engine
 * Generates uniformly distributed pseudorandom numbers within user-defined bounds.
 */

export interface RandomNumberInput {
  min: number;
  max: number;
  count?: number;
  allowDuplicates?: boolean;
  sortOrder?: 'none' | 'asc' | 'desc';
}

export interface RandomNumberResult {
  numbers: number[];
  count: number;
  min: number;
  max: number;
}

export function generateRandomNumbers(input: RandomNumberInput): RandomNumberResult {
  let { min, max, count = 1, allowDuplicates = true, sortOrder = 'none' } = input;

  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  const range = max - min + 1;
  const safeCount = Math.max(1, Math.min(1000, count));

  const numbers: number[] = [];

  if (!allowDuplicates && safeCount > range) {
    // If duplicates not allowed and count exceeds range, cap count to range
    for (let i = min; i <= max; i++) numbers.push(i);
  } else if (!allowDuplicates) {
    const pool = new Set<number>();
    while (pool.size < safeCount) {
      const n = Math.floor(Math.random() * range) + min;
      pool.add(n);
    }
    numbers.push(...pool);
  } else {
    for (let i = 0; i < safeCount; i++) {
      const n = Math.floor(Math.random() * range) + min;
      numbers.push(n);
    }
  }

  if (sortOrder === 'asc') {
    numbers.sort((a, b) => a - b);
  } else if (sortOrder === 'desc') {
    numbers.sort((a, b) => b - a);
  }

  return {
    numbers,
    count: numbers.length,
    min,
    max
  };
}
