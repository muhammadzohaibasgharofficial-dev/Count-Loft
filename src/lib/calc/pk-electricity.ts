/**
 * Count Loft — Pakistan Electricity Bill Calculation Engine
 * NEPRA uniform residential tariff structure with fuel price adjustments (FPA) and taxes.
 */
import tariffData from '@data/pk-electricity-tariffs.json';

export interface PkElectricityInput {
  units: number;
  isProtected?: boolean;
  fpaPerUnit?: number;
  discoId?: string;
}

export interface PkElectricityResult {
  units: number;
  baseEnergyCost: number;
  fpaCost: number;
  electricityDuty: number;
  tvFee: number;
  gst: number;
  totalBill: number;
  effectiveRatePerUnit: number;
  discoName: string;
}

export function calculatePkElectricity(input: PkElectricityInput): PkElectricityResult {
  const {
    units,
    isProtected = false,
    fpaPerUnit = tariffData.defaultFpaPerUnit,
    discoId = 'lesco'
  } = input;

  const disco = tariffData.discos.find(d => d.id === discoId) ?? tariffData.discos[0]!;
  const discoName = disco.name;

  if (!Number.isFinite(units) || units <= 0) {
    return {
      units: 0,
      baseEnergyCost: 0,
      fpaCost: 0,
      electricityDuty: 0,
      tvFee: tariffData.tvFee,
      gst: 0,
      totalBill: tariffData.tvFee,
      effectiveRatePerUnit: 0,
      discoName
    };
  }

  let baseEnergyCost = 0;

  if (isProtected && units <= 100) {
    if (units <= 50) {
      baseEnergyCost = units * 3.95;
    } else {
      baseEnergyCost = (50 * 3.95) + ((units - 50) * 7.74);
    }
  } else {
    // Non-protected progressive slabs
    let remaining = units;
    const slabs = [
      { max: 100, rate: 16.48 },
      { max: 100, rate: 22.95 }, // 101-200
      { max: 100, rate: 27.14 }, // 201-300
      { max: 100, rate: 32.03 }, // 301-400
      { max: 100, rate: 35.24 }, // 401-500
      { max: 100, rate: 36.66 }, // 501-600
      { max: 100, rate: 37.80 }, // 601-700
      { max: Infinity, rate: 42.72 } // 701+
    ];

    for (const slab of slabs) {
      if (remaining <= 0) break;
      const consumedInSlab = Math.min(remaining, slab.max);
      baseEnergyCost += consumedInSlab * slab.rate;
      remaining -= consumedInSlab;
    }
  }

  const fpaCost = Math.round(units * fpaPerUnit * 100) / 100;
  const energyWithFpa = baseEnergyCost + fpaCost;
  const electricityDuty = Math.round(energyWithFpa * tariffData.electricityDutyRate * 100) / 100;
  const tvFee = tariffData.tvFee;

  let gst = 0;
  if (units > tariffData.gstUnitThreshold) {
    gst = Math.round((energyWithFpa + electricityDuty) * tariffData.gstRate * 100) / 100;
  }

  const totalBill = Math.round(baseEnergyCost + fpaCost + electricityDuty + tvFee + gst);
  const effectiveRate = units > 0 ? Math.round((totalBill / units) * 100) / 100 : 0;

  return {
    units,
    baseEnergyCost: Math.round(baseEnergyCost * 100) / 100,
    fpaCost,
    electricityDuty,
    tvFee,
    gst,
    totalBill,
    effectiveRatePerUnit: effectiveRate,
    discoName
  };
}
