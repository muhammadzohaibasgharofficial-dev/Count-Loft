import { describe, it, expect } from 'vitest';
import { calculatePercentageOf, calculateWhatPercentage, calculatePercentageChange } from '../../../src/lib/calc/percentage';
import { calculateBmiMetric, calculateBmiImperial } from '../../../src/lib/calc/bmi';
import { calculateMortgage } from '../../../src/lib/calc/mortgage';
import { calculateCalories } from '../../../src/lib/calc/calorie';
import { calculateCompoundInterest } from '../../../src/lib/calc/compound-interest';
import { calculateAge } from '../../../src/lib/calc/age';
import { evaluateScientificFunction, factorial } from '../../../src/lib/calc/scientific';
import { calculateFractions, simplifyFraction } from '../../../src/lib/calc/fraction';
import { calculateGpa } from '../../../src/lib/calc/gpa';
import { calculateSalaryToHourly } from '../../../src/lib/calc/salary';
import { compareInterest } from '../../../src/lib/calc/interest';
import { convertCurrency } from '../../../src/lib/calc/currency';
import { calculateTip, calculateDiscount } from '../../../src/lib/calc/tip-discount';

describe('Tier 1 Calculators Engine Suite', () => {
  // Tool 1: Percentage
  it('calculates percentages correctly', () => {
    expect(calculatePercentageOf(20, 150).result).toBe(30);
    expect(calculateWhatPercentage(30, 150).percentage).toBe(20);
    expect(calculatePercentageChange(100, 125).changePercent).toBe(25);
    expect(calculatePercentageChange(100, 80).direction).toBe('decrease');
  });

  // Tool 2: BMI
  it('calculates metric and imperial BMI with WHO categories', () => {
    const metric = calculateBmiMetric(70, 175);
    expect(metric.bmi).toBe(22.9);
    expect(metric.category).toBe('Normal weight');

    const imperial = calculateBmiImperial(160, 68);
    expect(imperial.bmi).toBe(24.3);
    expect(imperial.category).toBe('Normal weight');
  });

  // Tool 3: Mortgage
  it('calculates mortgage payment and components', () => {
    const result = calculateMortgage({
      homePrice: 400000,
      downPayment: 80000, // 20% down, no PMI
      loanTermYears: 30,
      annualInterestRate: 6.5,
      annualPropertyTax: 4800,
      annualHomeInsurance: 1200
    });

    expect(result.loanAmount).toBe(320000);
    expect(result.monthlyPrincipalInterest).toBeCloseTo(2022.62, 0);
    expect(result.monthlyPropertyTax).toBe(400);
    expect(result.monthlyHomeInsurance).toBe(100);
    expect(result.monthlyPmi).toBe(0);
    expect(result.totalMonthlyPayment).toBeCloseTo(2522.62, 0);
  });

  // Tool 5: Calorie
  it('calculates BMR and TDEE accurately', () => {
    const res = calculateCalories({
      age: 30,
      sex: 'male',
      weightKg: 80,
      heightCm: 180,
      activityLevel: 'moderate' // 1.55 multiplier
    });

    // BMR: 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(res.bmr).toBe(1780);
    expect(res.maintenanceTdee).toBe(2759);
    expect(res.weightLoss).toBe(2259);
  });

  // Tool 6: Compound Interest
  it('calculates compound growth with monthly deposits', () => {
    const res = calculateCompoundInterest({
      initialPrincipal: 10000,
      monthlyDeposit: 200,
      annualRate: 7,
      years: 5
    });

    expect(res.totalDeposited).toBe(22000); // 10000 + 200*60
    expect(res.finalBalance).toBeGreaterThan(28000);
    expect(res.yearlySchedule).toHaveLength(5);
  });

  // Tool 7: Age
  it('calculates age between dates', () => {
    const res = calculateAge('2000-01-01', '2026-10-31');
    expect(res.years).toBe(26);
    expect(res.months).toBe(9);
    expect(res.days).toBe(30);
  });

  // Tool 8: Scientific
  it('computes scientific functions and factorials', () => {
    expect(factorial(5)).toBe(120);
    expect(evaluateScientificFunction('sqrt', 144)).toBe(12);
    expect(evaluateScientificFunction('sin', 90, true)).toBe(1);
    expect(evaluateScientificFunction('log', 1000)).toBe(3);
  });

  // Tool 9: Fractions
  it('adds and multiplies fractions with step-by-step reduction', () => {
    const sum = calculateFractions(
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 3 },
      'add'
    );
    expect(sum.simplifiedNumerator).toBe(5);
    expect(sum.simplifiedDenominator).toBe(6);

    const mult = calculateFractions(
      { numerator: 3, denominator: 4 },
      { numerator: 2, denominator: 3 },
      'multiply'
    );
    expect(mult.simplifiedNumerator).toBe(1);
    expect(mult.simplifiedDenominator).toBe(2);
  });

  // Tool 10: GPA
  it('calculates unweighted and weighted GPA', () => {
    const gpa = calculateGpa([
      { name: 'Math', grade: 'A', credits: 4, courseType: 'regular' }, // 4.0 * 4 = 16
      { name: 'English', grade: 'B', credits: 3, courseType: 'regular' }, // 3.0 * 3 = 9
      { name: 'Chemistry', grade: 'A', credits: 4, courseType: 'ap' } // (4.0 + 1.0) * 4 = 20
    ]);

    expect(gpa.totalCredits).toBe(11);
    expect(gpa.totalGradePoints).toBe(45);
    expect(gpa.gpa).toBe(4.09);
  });

  // Tool 11: Salary
  it('converts salary to hourly and biweekly', () => {
    const res = calculateSalaryToHourly({ annualSalary: 52000, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(res.hourlyRate).toBe(25.00);
    expect(res.biweeklyRate).toBe(2000.00);
    expect(res.monthlyRate).toBe(4333.33);
    expect(res.overtimeRate).toBe(37.50);
  });

  // Tool 12: Interest Comparison
  it('compares simple and compound interest returns', () => {
    const res = compareInterest({ principal: 10000, annualRate: 5, timeYears: 5 });
    expect(res.simpleInterest).toBe(2500);
    expect(res.compoundInterest).toBe(2762.82);
    expect(res.compoundingAdvantage).toBe(262.82);
  });

  // Tool 13: Currency Converter
  it('converts currencies using static benchmark rates', () => {
    const res = convertCurrency(100, 'USD', 'EUR');
    expect(res.convertedAmount).toBe(92.15);
    expect(res.exchangeRate).toBe(0.9215);
  });

  // Tool 14: Tip and Discount
  it('calculates tip and split bill', () => {
    const tip = calculateTip(100, 20, 2);
    expect(tip.tipAmount).toBe(20);
    expect(tip.totalAmount).toBe(120);
    expect(tip.perPersonTotal).toBe(60);

    const discount = calculateDiscount(80, 25, 10);
    expect(discount.savingsAmount).toBe(20);
    expect(discount.salePrice).toBe(60);
    expect(discount.finalPriceWithTax).toBe(66);
  });
});
