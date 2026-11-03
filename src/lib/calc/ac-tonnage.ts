/**
 * Count Loft — AC Tonnage & BTU Calculator (Pakistan & Warm Climates)
 * Sizing split and inverter air conditioners for room dimensions, heat load, roof exposure, and sun orientation.
 */

export interface AcTonnageInput {
  roomLengthFt: number;
  roomWidthFt: number;
  ceilingHeightFt?: number;
  isTopFloor?: boolean;
  hasDirectSunlight?: boolean;
  occupants?: number;
}

export interface AcTonnageResult {
  roomAreaSqFt: number;
  roomVolumeCuFt: number;
  baseBtu: number;
  totalRequiredBtu: number;
  recommendedTons: number;
  suggestedUnit: string;
}

export function calculateAcTonnage(input: AcTonnageInput): AcTonnageResult {
  const {
    roomLengthFt,
    roomWidthFt,
    ceilingHeightFt = 10,
    isTopFloor = false,
    hasDirectSunlight = false,
    occupants = 2
  } = input;

  if (roomLengthFt <= 0 || roomWidthFt <= 0 || !Number.isFinite(roomLengthFt) || !Number.isFinite(roomWidthFt)) {
    return {
      roomAreaSqFt: 0,
      roomVolumeCuFt: 0,
      baseBtu: 0,
      totalRequiredBtu: 0,
      recommendedTons: 1.0,
      suggestedUnit: '1.0 Ton (12,000 BTU)'
    };
  }

  const roomAreaSqFt = roomLengthFt * roomWidthFt;
  const roomVolumeCuFt = roomAreaSqFt * Math.max(8, ceilingHeightFt);

  // In warm continental climates like Pakistan (summer 40°C–48°C),
  // standard baseline is ~60 to 70 BTU per square foot for typical insulated rooms.
  let btu = roomAreaSqFt * 65;

  // Ceiling height adjustment (standard is 10ft)
  if (ceilingHeightFt > 10) {
    btu *= (1 + (ceilingHeightFt - 10) * 0.05);
  }

  // Top floor direct roof heat load (+15%)
  if (isTopFloor) {
    btu *= 1.15;
  }

  // Direct afternoon western/southern sun through windows (+10%)
  if (hasDirectSunlight) {
    btu *= 1.10;
  }

  // Occupants: each person above 2 adds 500 BTU
  if (occupants > 2) {
    btu += (occupants - 2) * 500;
  }

  const totalRequiredBtu = Math.round(btu);
  const exactTons = totalRequiredBtu / 12000;

  // Commercial split AC standard sizes in PK market: 1.0T, 1.5T, 2.0T, 2.5T, 3.0T
  let recommendedTons = 1.0;
  let suggestedUnit = '1.0 Ton (12,000 BTU)';

  if (exactTons <= 1.15) {
    recommendedTons = 1.0;
    suggestedUnit = '1.0 Ton (12,000 BTU)';
  } else if (exactTons <= 1.65) {
    recommendedTons = 1.5;
    suggestedUnit = '1.5 Ton (18,000 BTU)';
  } else if (exactTons <= 2.2) {
    recommendedTons = 2.0;
    suggestedUnit = '2.0 Ton (24,000 BTU)';
  } else if (exactTons <= 2.7) {
    recommendedTons = 2.5;
    suggestedUnit = '2.5 Ton (30,000 BTU)';
  } else {
    recommendedTons = 3.0;
    suggestedUnit = '3.0 Ton (36,000 BTU / Multi-Split)';
  }

  return {
    roomAreaSqFt: Math.round(roomAreaSqFt),
    roomVolumeCuFt: Math.round(roomVolumeCuFt),
    baseBtu: Math.round(roomAreaSqFt * 65),
    totalRequiredBtu,
    recommendedTons,
    suggestedUnit
  };
}
