/**
 * Count Loft — Currency Conversion Engine
 * Converts amounts using versioned static FX benchmarks without browser network calls.
 */
import fxData from '../../data/fx-rates.json';

export interface CurrencyConversionResult {
  convertedAmount: number;
  exchangeRate: number;
  source: string;
  lastVerified: string;
}

export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string
): CurrencyConversionResult {
  const rates = fxData.rates as Record<string, number>;
  const fromRate = rates[fromCode] ?? 1.0;
  const toRate = rates[toCode] ?? 1.0;

  if (!Number.isFinite(amount) || amount <= 0 || fromRate <= 0 || toRate <= 0) {
    return {
      convertedAmount: 0,
      exchangeRate: 1,
      source: fxData.source,
      lastVerified: fxData.lastVerified
    };
  }

  // Convert from fromCode -> USD -> toCode
  const inUsd = amount / fromRate;
  const converted = inUsd * toRate;
  const exchangeRate = Math.round((toRate / fromRate) * 10000) / 10000;

  return {
    convertedAmount: Math.round(converted * 100) / 100,
    exchangeRate,
    source: fxData.source,
    lastVerified: fxData.lastVerified
  };
}
