import { describe, it, expect } from 'vitest';
import { calculatePkTax } from '@lib/calc/pk-tax';
import { calculatePkElectricity } from '@lib/calc/pk-electricity';
import { calculateZakat, calculateSilverZakat } from '@lib/calc/zakat';
import { calculateGoldPrice } from '@lib/calc/gold-price';
import { convertGregorianToHijri, convertHijriToGregorian } from '@lib/calc/hijri';
import { calculateAcTonnage } from '@lib/calc/ac-tonnage';
import { calculateDateDifference } from '@lib/calc/date-difference';
import { calculateTimeHours } from '@lib/calc/time-hours';
import { generateRandomNumbers } from '@lib/calc/random-number';
import { calculateStatistics } from '@lib/calc/statistics';
import { calculateWeightedGrade, calculateFinalExamRequiredScore } from '@lib/calc/grade';

describe('Tier 3 Calculation Engines', () => {
  describe('Pakistan Income Tax Engine (#31)', () => {
    it('returns zero tax for income up to Rs. 600,000 annually', () => {
      const res = calculatePkTax(50000); // 50,000 * 12 = 600,000
      expect(res.annualTax).toBe(0);
      expect(res.monthlyTax).toBe(0);
      expect(res.effectiveRate).toBe(0);
    });

    it('calculates 5% tax on slab 2 (Rs. 600,001 to Rs. 1,200,000)', () => {
      const res = calculatePkTax(100000); // 1,200,000 annual
      expect(res.annualTax).toBe(30000); // (1,200,000 - 600,000) * 0.05
      expect(res.monthlyTax).toBe(2500);
      expect(res.netMonthlySalary).toBe(97500);
    });

    it('applies 10% surcharge on income exceeding Rs. 10 million', () => {
      const res = calculatePkTax(1000000); // 12,000,000 annual
      expect(res.annualTax).toBeGreaterThan(3400000);
      expect(res.slabApplied).toContain('Surcharge');
    });
  });

  describe('Pakistan Electricity Bill Engine (#32)', () => {
    it('handles zero or negative units gracefully', () => {
      const res = calculatePkElectricity({ units: 0 });
      expect(res.baseEnergyCost).toBe(0);
      expect(res.totalBill).toBe(35); // TV fee baseline
    });

    it('calculates protected lifeline consumers', () => {
      const res = calculatePkElectricity({ units: 50, isProtected: true, fpaPerUnit: 0 });
      expect(res.baseEnergyCost).toBe(197.5);
    });

    it('calculates 300 units unprotected including FPA and GST', () => {
      const res = calculatePkElectricity({ units: 300, isProtected: false, fpaPerUnit: 3.5 });
      expect(res.units).toBe(300);
      expect(res.totalBill).toBeGreaterThan(9000);
      expect(res.effectiveRatePerUnit).toBeGreaterThan(30);
    });
  });

  describe('Zakat Engine (#33 & #35)', () => {
    it('returns zero zakat if wealth is below nisab threshold', () => {
      const res = calculateZakat({
        cashInHandAndBank: 100000,
        goldValue: 0,
        silverValue: 0,
        businessGoodsValue: 0,
        investmentSharesValue: 0,
        moneyOwedToYou: 0,
        immediateDebts: 0
      });
      expect(res.isEligibleForZakat).toBe(false);
      expect(res.zakatDue).toBe(0);
    });

    it('calculates 2.5% zakat if wealth is above silver nisab threshold', () => {
      const res = calculateZakat({
        cashInHandAndBank: 1000000,
        goldValue: 0,
        silverValue: 0,
        businessGoodsValue: 0,
        investmentSharesValue: 0,
        moneyOwedToYou: 0,
        immediateDebts: 200000
      });
      expect(res.isEligibleForZakat).toBe(true);
      expect(res.netZakatableWealth).toBe(800000);
      expect(res.zakatDue).toBe(20000); // 2.5% of 800,000
    });

    it('calculates silver weight zakat correctly', () => {
      const res = calculateSilverZakat(1000, 800);
      expect(res.isAboveNisab).toBe(true);
      expect(res.zakatGrams).toBe(25); // 2.5% of 1000g
      expect(res.zakatPkr).toBe(20000);
    });
  });

  describe('Gold Price Engine (#34)', () => {
    it('calculates tola gold price with making charges', () => {
      const res = calculateGoldPrice({
        weight: 1,
        unit: 'tola',
        karat: '24k',
        makingChargesPercent: 5
      });
      expect(res.baseGoldCost).toBe(295000);
      expect(res.makingChargesCost).toBe(14750);
      expect(res.totalCost).toBe(309750);
    });
  });

  describe('Hijri Calendar Engine (#36)', () => {
    it('converts Gregorian date to Hijri', () => {
      const res = convertGregorianToHijri('2026-03-20');
      expect(res.year).toBeGreaterThanOrEqual(1447);
      expect(res.monthName).toBeTruthy();
    });

    it('converts Hijri date back to Gregorian', () => {
      const greg = convertHijriToGregorian(1447, 9, 1);
      expect(greg.year).toBe(2026);
    });
  });

  describe('AC Tonnage Engine (#37)', () => {
    it('calculates standard room tonnage', () => {
      const res = calculateAcTonnage({ roomLengthFt: 12, roomWidthFt: 10 });
      expect(res.roomAreaSqFt).toBe(120);
      expect(res.recommendedTons).toBe(1.0);
    });

    it('adjusts tonnage for top floor sun exposure', () => {
      const res = calculateAcTonnage({
        roomLengthFt: 16,
        roomWidthFt: 20,
        isTopFloor: true,
        hasDirectSunlight: true
      });
      expect(res.recommendedTons).toBeGreaterThanOrEqual(2.0);
    });
  });

  describe('Date Difference Engine (#38)', () => {
    it('calculates exact duration between two dates', () => {
      const res = calculateDateDifference('2026-01-01', '2026-03-01');
      expect(res.totalDays).toBe(59);
      expect(res.months).toBe(2);
      expect(res.totalWeeks).toBe(8);
    });
  });

  describe('Time Hours Engine (#39)', () => {
    it('calculates standard working hours minus lunch break', () => {
      const res = calculateTimeHours({
        startTime: '09:00',
        endTime: '17:30',
        breakMinutes: 30,
        hourlyRate: 25
      });
      expect(res.hours).toBe(8);
      expect(res.minutes).toBe(0);
      expect(res.decimalHours).toBe(8);
      expect(res.grossPay).toBe(200);
    });
  });

  describe('Random Number Engine (#40)', () => {
    it('generates numbers within bounds without duplicates', () => {
      const res = generateRandomNumbers({ min: 1, max: 10, count: 5, allowDuplicates: false });
      expect(res.numbers.length).toBe(5);
      const unique = new Set(res.numbers);
      expect(unique.size).toBe(5);
      res.numbers.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(10);
      });
    });
  });

  describe('Statistics Engine (#41)', () => {
    it('calculates mean, median, range, and standard deviations', () => {
      const res = calculateStatistics([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(res.count).toBe(8);
      expect(res.sum).toBe(40);
      expect(res.mean).toBe(5);
      expect(res.median).toBe(4.5);
      expect(res.modes).toEqual([4]);
      expect(res.range).toBe(7);
      expect(res.sampleVariance).toBeCloseTo(4.5714, 2);
      expect(res.sampleStandardDeviation).toBeCloseTo(2.1381, 2);
    });
  });

  describe('Grade Engine (#42)', () => {
    it('calculates weighted grade average', () => {
      const res = calculateWeightedGrade([
        { name: 'Homework', score: 90, weight: 20 },
        { name: 'Midterm', score: 80, weight: 30 },
        { name: 'Project', score: 95, weight: 50 }
      ]);
      expect(res.weightedAverage).toBe(89.5);
      expect(res.letterGrade).toBe('B+');
    });

    it('calculates required final exam target score', () => {
      const res = calculateFinalExamRequiredScore({
        currentGradePercent: 85,
        targetGradePercent: 90,
        finalExamWeightPercent: 30
      });
      // (90 - 85 * 0.7) / 0.3 = (90 - 59.5) / 0.3 = 30.5 / 0.3 = 101.67
      expect(res.requiredScorePercent).toBeCloseTo(101.67, 1);
      expect(res.isPossible).toBe(false);
      expect(res.status).toBe('impossible_too_high');
    });
  });
});
