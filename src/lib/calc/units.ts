/**
 * Count Loft — Unit Conversions Engine
 * Length, Weight, and Temperature conversions with precise floating-point rounding.
 */

// Length conversions relative to 1 meter
export const LENGTH_RATES: Record<string, number> = {
  meter: 1.0,
  kilometer: 1000.0,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254
};

export function convertLength(value: number, from: string, to: string): number {
  if (!Number.isFinite(value) || value === 0) return 0;
  const fromRate = LENGTH_RATES[from] ?? 1.0;
  const toRate = LENGTH_RATES[to] ?? 1.0;
  const inMeters = value * fromRate;
  return Math.round((inMeters / toRate) * 1000000) / 1000000;
}

// Weight conversions relative to 1 kilogram
export const WEIGHT_RATES: Record<string, number> = {
  kilogram: 1.0,
  gram: 0.001,
  milligram: 0.000001,
  metric_ton: 1000.0,
  pound: 0.45359237,
  ounce: 0.028349523125,
  stone: 6.35029318
};

export function convertWeight(value: number, from: string, to: string): number {
  if (!Number.isFinite(value) || value === 0) return 0;
  const fromRate = WEIGHT_RATES[from] ?? 1.0;
  const toRate = WEIGHT_RATES[to] ?? 1.0;
  const inKg = value * fromRate;
  return Math.round((inKg / toRate) * 1000000) / 1000000;
}

// Temperature conversion
export function convertTemperature(value: number, from: 'celsius' | 'fahrenheit' | 'kelvin', to: 'celsius' | 'fahrenheit' | 'kelvin'): number {
  if (!Number.isFinite(value)) return 0;

  // First convert to Celsius
  let celsius = value;
  if (from === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (from === 'kelvin') {
    celsius = value - 273.15;
  }

  // Convert from Celsius to destination
  let result = celsius;
  if (to === 'fahrenheit') {
    result = (celsius * (9 / 5)) + 32;
  } else if (to === 'kelvin') {
    result = celsius + 273.15;
  }

  return Math.round(result * 100) / 100;
}
