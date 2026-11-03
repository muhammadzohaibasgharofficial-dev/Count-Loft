/**
 * Count Loft — Percentage Calculation Engine
 * Pure functions covering standard percentage questions and percentage change.
 */

export interface PercentageOfResult {
  result: number;
  formula: string;
}

export function calculatePercentageOf(percent: number, total: number): PercentageOfResult {
  if (!Number.isFinite(percent) || !Number.isFinite(total)) {
    return { result: 0, formula: '0% of 0 = 0' };
  }
  const result = Math.round((percent / 100) * total * 10000) / 10000;
  return {
    result,
    formula: `(${percent} ÷ 100) × ${total} = ${result}`
  };
}

export interface WhatPercentageResult {
  percentage: number;
  formula: string;
}

export function calculateWhatPercentage(part: number, total: number): WhatPercentageResult {
  if (!Number.isFinite(part) || !Number.isFinite(total) || total === 0) {
    return { percentage: 0, formula: 'Invalid denominator (cannot divide by zero)' };
  }
  const percentage = Math.round((part / total) * 100 * 10000) / 10000;
  return {
    percentage,
    formula: `(${part} ÷ ${total}) × 100 = ${percentage}%`
  };
}

export interface PercentageChangeResult {
  changePercent: number;
  difference: number;
  direction: 'increase' | 'decrease' | 'none';
  formula: string;
}

export function calculatePercentageChange(fromValue: number, toValue: number): PercentageChangeResult {
  if (!Number.isFinite(fromValue) || !Number.isFinite(toValue) || fromValue === 0) {
    return {
      changePercent: 0,
      difference: 0,
      direction: 'none',
      formula: 'Initial value cannot be zero'
    };
  }

  const diff = toValue - fromValue;
  const changePercent = Math.round((diff / Math.abs(fromValue)) * 100 * 100) / 100;
  const direction = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'none';

  return {
    changePercent: Math.abs(changePercent),
    difference: Math.round(diff * 100) / 100,
    direction,
    formula: `((${toValue} - ${fromValue}) ÷ |${fromValue}|) × 100 = ${changePercent}%`
  };
}
