import { describe, it, expect } from 'vitest';
import { calculateRetirement } from '../../../src/lib/calc/retirement';
import { calculateSip } from '../../../src/lib/calc/sip';
import { calculateIncomeTax } from '../../../src/lib/calc/income-tax';
import { calculateBodyFat } from '../../../src/lib/calc/body-fat';
import { calculatePregnancyDueDate, calculateOvulation } from '../../../src/lib/calc/pregnancy';
import { calculateSquareFootage, calculateConcrete, calculatePaint, calculateTiles } from '../../../src/lib/calc/construction';
import { convertLength, convertWeight, convertTemperature } from '../../../src/lib/calc/units';

describe('Tier 2 Calculators Engine Suite', () => {
  it('calculates retirement target and projected corpus', () => {
    const res = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      annualContribution: 10000,
      expectedAnnualReturn: 7,
      annualRetirementSpend: 60000
    });

    expect(res.yearsToRetire).toBe(35);
    expect(res.requiredNestEgg).toBe(1500000); // 60k * 25
    expect(res.retirementCorpus).toBeGreaterThan(1500000);
    expect(res.isFunded).toBe(true);
  });

  it('calculates mutual fund SIP returns', () => {
    const res = calculateSip({
      monthlyInvestment: 500,
      expectedAnnualReturn: 12,
      timePeriodYears: 10
    });

    expect(res.totalInvested).toBe(60000); // 500 * 120
    expect(res.totalMaturityValue).toBeGreaterThan(115000);
    expect(res.estimatedReturns).toBeGreaterThan(50000);
  });

  it('calculates progressive federal income tax and FICA', () => {
    const res = calculateIncomeTax(75000, 'single');
    expect(res.standardDeduction).toBe(15000);
    expect(res.taxableIncome).toBe(60000);
    expect(res.federalTax).toBeGreaterThan(6000);
    expect(res.ficaTax).toBeCloseTo(5737.5, 0); // 6.2% + 1.45% = 7.65% of 75000 = 5737.5
    expect(res.netTakeHome).toBeLessThan(75000);
  });

  it('calculates body fat using US Navy circumference formula', () => {
    const male = calculateBodyFat({
      sex: 'male',
      heightCm: 180,
      neckCm: 38,
      waistCm: 85,
      weightKg: 80
    });

    expect(male.bodyFatPercent).toBeGreaterThan(10);
    expect(male.bodyFatPercent).toBeLessThan(25);
    expect(male.fatMassKg).toBeDefined();
    expect(male.leanMassKg).toBeDefined();
  });

  it('calculates pregnancy due date and ovulation window', () => {
    const preg = calculatePregnancyDueDate('2026-01-01', 28);
    expect(preg.dueDate).toBe('2026-10-08');

    const ov = calculateOvulation('2026-01-01', 28);
    expect(ov.estimatedOvulationDate).toBe('2026-01-15');
    expect(ov.fertileWindowStart).toBe('2026-01-10');
  });

  it('calculates construction material quantities', () => {
    const area = calculateSquareFootage(20, 15);
    expect(area.sqFt).toBe(300);
    expect(area.sqMeters).toBeCloseTo(27.87, 1);

    // Concrete: 10ft x 10ft x 4in = 100 * 4 / 324 = 1.23 yd³
    const concrete = calculateConcrete(10, 10, 4);
    expect(concrete.cubicYards).toBe(1.23);
    expect(concrete.bags80lb).toBe(56);

    // Paint: 12x12 room, 8ft ceiling, 2 coats
    const paint = calculatePaint(12, 12, 8, 1, 2, 2);
    expect(paint.gallonsNeeded).toBeGreaterThanOrEqual(1);

    // Tiles: 10x10 room, 12x12 inch tiles (1 sq ft each), 10% waste
    const tiles = calculateTiles(10, 10, 12, 12, 10);
    expect(tiles.tilesNeeded).toBe(100);
    expect(tiles.tilesWithWaste).toBe(110);
  });

  it('converts length, weight, and temperature accurately', () => {
    expect(convertLength(1, 'kilometer', 'meter')).toBe(1000);
    expect(convertLength(1, 'mile', 'meter')).toBe(1609.344);
    expect(convertWeight(1, 'kilogram', 'pound')).toBeCloseTo(2.20462, 3);
    expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
    expect(convertTemperature(32, 'fahrenheit', 'celsius')).toBe(0);
    expect(convertTemperature(0, 'celsius', 'kelvin')).toBe(273.15);
  });
});
