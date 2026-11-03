/**
 * Count Loft — Zakat Calculation Engine
 * Islamic jurisprudence compliant calculation of zakat at 2.5% on qualifying wealth above Nisab.
 */
import zakatData from '@data/zakat-nisab.json';

export interface ZakatInput {
  cashInHandAndBank: number;
  goldValue: number;
  silverValue: number;
  businessGoodsValue: number;
  investmentSharesValue: number;
  moneyOwedToYou: number;
  immediateDebts: number;
  nisabStandard?: 'silver' | 'gold';
  customNisabValue?: number;
}

export interface ZakatResult {
  grossAssets: number;
  netZakatableWealth: number;
  nisabThreshold: number;
  isEligibleForZakat: boolean;
  zakatDue: number;
  nisabStandardUsed: 'silver' | 'gold';
}

export function calculateZakat(input: ZakatInput): ZakatResult {
  const {
    cashInHandAndBank = 0,
    goldValue = 0,
    silverValue = 0,
    businessGoodsValue = 0,
    investmentSharesValue = 0,
    moneyOwedToYou = 0,
    immediateDebts = 0,
    nisabStandard = 'silver',
    customNisabValue
  } = input;

  const grossAssets = Math.max(0,
    (Number.isFinite(cashInHandAndBank) ? cashInHandAndBank : 0) +
    (Number.isFinite(goldValue) ? goldValue : 0) +
    (Number.isFinite(silverValue) ? silverValue : 0) +
    (Number.isFinite(businessGoodsValue) ? businessGoodsValue : 0) +
    (Number.isFinite(investmentSharesValue) ? investmentSharesValue : 0) +
    (Number.isFinite(moneyOwedToYou) ? moneyOwedToYou : 0)
  );

  const debts = Math.max(0, Number.isFinite(immediateDebts) ? immediateDebts : 0);
  const netZakatableWealth = Math.max(0, grossAssets - debts);

  const defaultNisab = nisabStandard === 'silver'
    ? zakatData.notifiedSilverNisabPkr
    : 87.48 * 25292; // Gold nisab in PKR based on 24K per gram

  const nisabThreshold = customNisabValue && customNisabValue > 0 ? customNisabValue : defaultNisab;
  const isEligibleForZakat = netZakatableWealth >= nisabThreshold;
  const zakatDue = isEligibleForZakat ? Math.round(netZakatableWealth * 0.025) : 0;

  return {
    grossAssets: Math.round(grossAssets),
    netZakatableWealth: Math.round(netZakatableWealth),
    nisabThreshold: Math.round(nisabThreshold),
    isEligibleForZakat,
    zakatDue,
    nisabStandardUsed: nisabStandard
  };
}

export function calculateSilverZakat(silverGrams: number, pricePerGramPkr: number = 822): {
  silverGrams: number;
  totalValue: number;
  isAboveNisab: boolean;
  zakatGrams: number;
  zakatPkr: number;
} {
  const grams = Math.max(0, Number.isFinite(silverGrams) ? silverGrams : 0);
  const price = Math.max(0, Number.isFinite(pricePerGramPkr) ? pricePerGramPkr : 0);
  const totalValue = Math.round(grams * price);
  const isAboveNisab = grams >= zakatData.silverNisabGrams;
  const zakatGrams = isAboveNisab ? Math.round((grams * 0.025) * 100) / 100 : 0;
  const zakatPkr = isAboveNisab ? Math.round(totalValue * 0.025) : 0;

  return {
    silverGrams: grams,
    totalValue,
    isAboveNisab,
    zakatGrams,
    zakatPkr
  };
}
