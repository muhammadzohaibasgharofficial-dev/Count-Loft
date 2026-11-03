/**
 * Count Loft — Pakistan Income Tax (FBR 2026-27) Engine
 * Salaried individuals tax calculations according to the Finance Act.
 */
import taxData from '@data/pk-tax-slabs.json';

export interface PkTaxResult {
  monthlySalary: number;
  annualSalary: number;
  annualTax: number;
  monthlyTax: number;
  netAnnualSalary: number;
  netMonthlySalary: number;
  effectiveRate: number;
  slabApplied: string;
}

export function calculatePkTax(monthlySalary: number): PkTaxResult {
  if (!Number.isFinite(monthlySalary) || monthlySalary <= 0) {
    return {
      monthlySalary: 0,
      annualSalary: 0,
      annualTax: 0,
      monthlyTax: 0,
      netAnnualSalary: 0,
      netMonthlySalary: 0,
      effectiveRate: 0,
      slabApplied: 'Exempt'
    };
  }

  const annualSalary = monthlySalary * 12;
  let annualTax = 0;
  let slabApplied = 'Exempt (Under Rs. 600,000)';

  if (annualSalary <= 600000) {
    annualTax = 0;
    slabApplied = 'Exempt (Up to Rs. 600,000)';
  } else if (annualSalary <= 1200000) {
    annualTax = (annualSalary - 600000) * 0.05;
    slabApplied = '5% on excess over Rs. 600,000';
  } else if (annualSalary <= 2200000) {
    annualTax = 30000 + (annualSalary - 1200000) * 0.15;
    slabApplied = 'Rs. 30,000 + 15% on excess over Rs. 1,200,000';
  } else if (annualSalary <= 3200000) {
    annualTax = 180000 + (annualSalary - 2200000) * 0.25;
    slabApplied = 'Rs. 180,000 + 25% on excess over Rs. 2,200,000';
  } else if (annualSalary <= 4100000) {
    annualTax = 430000 + (annualSalary - 3200000) * 0.30;
    slabApplied = 'Rs. 430,000 + 30% on excess over Rs. 3,200,000';
  } else {
    annualTax = 700000 + (annualSalary - 4100000) * 0.35;
    slabApplied = 'Rs. 700,000 + 35% on excess over Rs. 4,100,000';
  }

  // 10% surcharge on taxable income exceeding Rs. 10 million
  if (annualSalary > taxData.surchargeThreshold) {
    const surcharge = annualTax * taxData.surchargeRate;
    annualTax += surcharge;
    slabApplied += ' + 10% High-Earner Surcharge';
  }

  const roundedAnnualTax = Math.round(annualTax);
  const monthlyTax = Math.round(roundedAnnualTax / 12);
  const netAnnualSalary = Math.round(annualSalary - roundedAnnualTax);
  const netMonthlySalary = Math.round(netAnnualSalary / 12);
  const effectiveRate = Math.round((roundedAnnualTax / annualSalary) * 1000) / 10;

  return {
    monthlySalary,
    annualSalary,
    annualTax: roundedAnnualTax,
    monthlyTax,
    netAnnualSalary,
    netMonthlySalary,
    effectiveRate,
    slabApplied
  };
}
