/**
 * Count Loft — Tip & Discount Calculation Engine
 * Computes restaurant gratuities, split checks, and retail discounts with tax.
 */

export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPersonTip: number;
  perPersonTotal: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  peopleCount: number = 1
): TipResult {
  const people = Math.max(1, Math.round(peopleCount));

  if (!Number.isFinite(billAmount) || !Number.isFinite(tipPercent) || billAmount <= 0) {
    return {
      tipAmount: 0,
      totalAmount: 0,
      perPersonTip: 0,
      perPersonTotal: 0
    };
  }

  const tipAmount = Math.round(((billAmount * tipPercent) / 100) * 100) / 100;
  const totalAmount = Math.round((billAmount + tipAmount) * 100) / 100;

  return {
    tipAmount,
    totalAmount,
    perPersonTip: Math.round((tipAmount / people) * 100) / 100,
    perPersonTotal: Math.round((totalAmount / people) * 100) / 100
  };
}

export interface DiscountResult {
  savingsAmount: number;
  salePrice: number;
  taxAmount: number;
  finalPriceWithTax: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
  taxPercent: number = 0
): DiscountResult {
  if (!Number.isFinite(originalPrice) || !Number.isFinite(discountPercent) || originalPrice <= 0) {
    return {
      savingsAmount: 0,
      salePrice: 0,
      taxAmount: 0,
      finalPriceWithTax: 0
    };
  }

  const savingsAmount = Math.round(((originalPrice * Math.min(100, discountPercent)) / 100) * 100) / 100;
  const salePrice = Math.round((originalPrice - savingsAmount) * 100) / 100;
  const taxAmount = Math.round(((salePrice * Math.max(0, taxPercent)) / 100) * 100) / 100;
  const finalPriceWithTax = Math.round((salePrice + taxAmount) * 100) / 100;

  return {
    savingsAmount,
    salePrice,
    taxAmount,
    finalPriceWithTax
  };
}
