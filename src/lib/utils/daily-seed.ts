import type { Island } from '$lib/types';

// Epoch date: January 1, 2024
const EPOCH_DATE = new Date('2024-01-01T00:00:00Z');

/**
 * Mulberry32 PRNG - deterministic random number generator
 */
function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Get the puzzle number for a given date.
 * Puzzle #1 = Day 1 from epoch date.
 */
export function getPuzzleNumber(date: Date = new Date()): number {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const diffTime = utcDate.getTime() - EPOCH_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

/**
 * Get the date string (YYYY-MM-DD) for a given date in UTC.
 */
export function getPuzzleDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Select a daily island deterministically based on puzzle number.
 */
export function getDailyIsland(islands: Island[], puzzleNumber: number): Island {
  const rng = mulberry32(puzzleNumber);
  const index = Math.floor(rng() * islands.length);
  return islands[index];
}

/**
 * Get puzzle info for today.
 */
export function getTodaysPuzzle(islands: Island[]): {
  island: Island;
  puzzleNumber: number;
  puzzleDate: string;
} {
  const now = new Date();
  const puzzleNumber = getPuzzleNumber(now);
  const puzzleDate = getPuzzleDate(now);
  const island = getDailyIsland(islands, puzzleNumber);

  return { island, puzzleNumber, puzzleDate };
}
