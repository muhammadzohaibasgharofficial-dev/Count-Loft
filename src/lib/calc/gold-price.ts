/**
 * Count Loft — Gold Price Calculator (Pakistan) Engine
 * Multi-unit conversion (tola, gram, ratti, masha), karats (24K, 22K, 21K, 18K), and making charges.
 */
import goldData from '@data/pk-gold-rates.json';

export type GoldUnit = 'tola' | 'gram' | 'ratti' | 'masha';
export type GoldKarat = '24k' | '22k' | '21k' | '18k';

export interface GoldPriceInput {
  weight: number;
  unit: GoldUnit;
  karat: GoldKarat;
  makingChargesPercent?: number;
  customRatePerTola?: number;
}

export interface GoldPriceResult {
  weightInGrams: number;
  weightInTolas: number;
  ratePerGram: number;
  ratePerTola: number;
  baseGoldCost: number;
  makingChargesCost: number;
  totalCost: number;
  karatPurityPercent: number;
}

export function calculateGoldPrice(input: GoldPriceInput): GoldPriceResult {
  const {
    weight,
    unit = 'tola',
    karat = '24k',
    makingChargesPercent = 0,
    customRatePerTola
  } = input;

  if (!Number.isFinite(weight) || weight <= 0) {
    return {
      weightInGrams: 0,
      weightInTolas: 0,
      ratePerGram: 0,
      ratePerTola: 0,
      baseGoldCost: 0,
      makingChargesCost: 0,
      totalCost: 0,
      karatPurityPercent: 100
    };
  }

  // Convert input weight to standard tolas
  let weightInTolas = 0;
  if (unit === 'tola') {
    weightInTolas = weight;
  } else if (unit === 'gram') {
    weightInTolas = weight / goldData.gramsPerTola;
  } else if (unit === 'ratti') {
    weightInTolas = weight / goldData.rattiPerTola;
  } else if (unit === 'masha') {
    weightInTolas = weight / goldData.mashaPerTola;
  }

  const weightInGrams = weightInTolas * goldData.gramsPerTola;

  // Determine rate per tola
  const standardRate = goldData.rates[karat] ?? goldData.rates['24k'];
  const baseRatePerTola = customRatePerTola && customRatePerTola > 0 ? customRatePerTola : standardRate.tola;
  const baseRatePerGram = Math.round(baseRatePerTola / goldData.gramsPerTola);

  const baseGoldCost = Math.round(weightInTolas * baseRatePerTola);
  const makingChargesCost = Math.round(baseGoldCost * (makingChargesPercent / 100));
  const totalCost = baseGoldCost + makingChargesCost;

  const purityMap: Record<GoldKarat, number> = {
    '24k': 99.9,
    '22k': 91.6,
    '21k': 87.5,
    '18k': 75.0
  };

  return {
    weightInGrams: Math.round(weightInGrams * 1000) / 1000,
    weightInTolas: Math.round(weightInTolas * 1000) / 1000,
    ratePerGram: baseRatePerGram,
    ratePerTola: baseRatePerTola,
    baseGoldCost,
    makingChargesCost,
    totalCost,
    karatPurityPercent: purityMap[karat] ?? 99.9
  };
}
