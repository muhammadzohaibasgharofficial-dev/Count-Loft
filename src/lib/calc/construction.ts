/**
 * Count Loft — Construction Calculations Engine
 * Square footage, concrete volume, paint coverage, and flooring tile estimators.
 */

export function calculateSquareFootage(lengthFt: number, widthFt: number): { sqFt: number; sqMeters: number } {
  if (lengthFt <= 0 || widthFt <= 0 || !Number.isFinite(lengthFt) || !Number.isFinite(widthFt)) {
    return { sqFt: 0, sqMeters: 0 };
  }
  const sqFt = Math.round(lengthFt * widthFt * 100) / 100;
  const sqMeters = Math.round(sqFt * 0.092903 * 100) / 100;
  return { sqFt, sqMeters };
}

export interface ConcreteResult {
  cubicYards: number;
  cubicMeters: number;
  bags60lb: number;
  bags80lb: number;
}

export function calculateConcrete(lengthFt: number, widthFt: number, thicknessInches: number): ConcreteResult {
  if (lengthFt <= 0 || widthFt <= 0 || thicknessInches <= 0) {
    return { cubicYards: 0, cubicMeters: 0, bags60lb: 0, bags80lb: 0 };
  }

  // Formula: (Length in ft * Width in ft * (Thickness in in / 12)) / 27 = cubic yards
  // Shortcut: (L * W * T) / 324
  const cubicYards = Math.round(((lengthFt * widthFt * thicknessInches) / 324) * 100) / 100;
  const cubicMeters = Math.round(cubicYards * 0.764555 * 100) / 100;
  // A 60lb bag yields ~0.017 yd³, 80lb bag yields ~0.022 yd³
  const bags60lb = Math.ceil(cubicYards / 0.017);
  const bags80lb = Math.ceil(cubicYards / 0.022);

  return { cubicYards, cubicMeters, bags60lb, bags80lb };
}

export interface PaintResult {
  totalWallAreaSqFt: number;
  gallonsNeeded: number;
  quartsNeeded: number;
}

export function calculatePaint(
  roomLengthFt: number,
  roomWidthFt: number,
  ceilingHeightFt: number,
  doors: number = 1,
  windows: number = 2,
  coats: number = 2
): PaintResult {
  if (roomLengthFt <= 0 || roomWidthFt <= 0 || ceilingHeightFt <= 0) {
    return { totalWallAreaSqFt: 0, gallonsNeeded: 0, quartsNeeded: 0 };
  }

  const perimeter = 2 * (roomLengthFt + roomWidthFt);
  const rawWallArea = perimeter * ceilingHeightFt;
  const deductions = (doors * 21) + (windows * 15); // standard door ~21 sq ft, window ~15 sq ft
  const netArea = Math.max(0, rawWallArea - deductions);
  const totalAreaToCover = netArea * Math.max(1, coats);

  // 1 gallon covers ~350 square feet
  const gallonsNeeded = Math.ceil(totalAreaToCover / 350);
  const quartsNeeded = Math.ceil((totalAreaToCover / 350) * 4);

  return {
    totalWallAreaSqFt: Math.round(netArea),
    gallonsNeeded,
    quartsNeeded
  };
}

export interface TileResult {
  roomAreaSqFt: number;
  tileAreaSqFt: number;
  tilesNeeded: number;
  tilesWithWaste: number;
  boxesNeeded?: number;
}

export function calculateTiles(
  roomLengthFt: number,
  roomWidthFt: number,
  tileLengthInches: number,
  tileWidthInches: number,
  wastePercent: number = 10,
  tilesPerBox: number = 10
): TileResult {
  if (roomLengthFt <= 0 || roomWidthFt <= 0 || tileLengthInches <= 0 || tileWidthInches <= 0) {
    return { roomAreaSqFt: 0, tileAreaSqFt: 0, tilesNeeded: 0, tilesWithWaste: 0 };
  }

  const roomArea = roomLengthFt * roomWidthFt;
  const tileAreaSqFt = (tileLengthInches * tileWidthInches) / 144;
  const exactTiles = roomArea / tileAreaSqFt;
  const rawWithWaste = exactTiles * (1 + wastePercent / 100);
  const tilesWithWaste = Math.ceil(Math.round(rawWithWaste * 10000) / 10000);

  return {
    roomAreaSqFt: Math.round(roomArea * 100) / 100,
    tileAreaSqFt: Math.round(tileAreaSqFt * 100) / 100,
    tilesNeeded: Math.ceil(exactTiles),
    tilesWithWaste,
    boxesNeeded: Math.ceil(tilesWithWaste / tilesPerBox)
  };
}
