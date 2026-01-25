import type { Statistics, Guess } from '$lib/types';

const STORAGE_KEYS = {
  STATISTICS: 'sotdle-statistics',
  GAME_STATE: 'sotdle-game-state',
  THEME: 'sotdle-theme',
} as const;

/**
 * Check if we're in a browser environment.
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * Get data from localStorage with type safety.
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Save data to localStorage.
 */
export function saveToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage might be full or unavailable
  }
}

/**
 * Default statistics object.
 */
export function getDefaultStatistics(): Statistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastPlayedDate: '',
  };
}

/**
 * Load statistics from localStorage.
 */
export function loadStatistics(): Statistics {
  return getFromStorage(STORAGE_KEYS.STATISTICS, getDefaultStatistics());
}

/**
 * Save statistics to localStorage.
 */
export function saveStatistics(stats: Statistics): void {
  saveToStorage(STORAGE_KEYS.STATISTICS, stats);
}

export interface SavedGameState {
  puzzleDate: string;
  puzzleNumber: number;
  guessedIslandIds: string[];
  gameStatus: 'playing' | 'won' | 'lost';
}

/**
 * Load saved game state from localStorage.
 */
export function loadGameState(): SavedGameState | null {
  return getFromStorage<SavedGameState | null>(STORAGE_KEYS.GAME_STATE, null);
}

/**
 * Save game state to localStorage.
 */
export function saveGameState(state: SavedGameState): void {
  saveToStorage(STORAGE_KEYS.GAME_STATE, state);
}

/**
 * Clear game state from localStorage.
 */
export function clearGameState(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
}

/**
 * Load theme preference.
 */
export function loadTheme(): 'light' | 'dark' {
  return getFromStorage<'light' | 'dark'>(STORAGE_KEYS.THEME, 'light');
}

/**
 * Save theme preference.
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  saveToStorage(STORAGE_KEYS.THEME, theme);
}
