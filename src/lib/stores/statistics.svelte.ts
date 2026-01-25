import type { Statistics } from '$lib/types';
import { loadStatistics, saveStatistics, getDefaultStatistics } from '$lib/utils/storage';

class StatisticsStore {
  gamesPlayed: number = $state(0);
  gamesWon: number = $state(0);
  currentStreak: number = $state(0);
  maxStreak: number = $state(0);
  guessDistribution: [number, number, number, number, number, number] = $state([0, 0, 0, 0, 0, 0]);
  lastPlayedDate: string = $state('');

  winPercentage = $derived(
    this.gamesPlayed > 0 ? Math.round((this.gamesWon / this.gamesPlayed) * 100) : 0
  );

  constructor() {
    // Will be initialized in init()
  }

  init() {
    const stats = loadStatistics();
    this.gamesPlayed = stats.gamesPlayed;
    this.gamesWon = stats.gamesWon;
    this.currentStreak = stats.currentStreak;
    this.maxStreak = stats.maxStreak;
    this.guessDistribution = stats.guessDistribution;
    this.lastPlayedDate = stats.lastPlayedDate;
  }

  private persist() {
    const stats: Statistics = {
      gamesPlayed: this.gamesPlayed,
      gamesWon: this.gamesWon,
      currentStreak: this.currentStreak,
      maxStreak: this.maxStreak,
      guessDistribution: this.guessDistribution,
      lastPlayedDate: this.lastPlayedDate,
    };
    saveStatistics(stats);
  }

  recordWin(guessCount: number, puzzleDate: string) {
    // Check if already recorded for this date
    if (this.lastPlayedDate === puzzleDate) return;

    this.gamesPlayed++;
    this.gamesWon++;
    this.lastPlayedDate = puzzleDate;

    // Update guess distribution (0-indexed, so guessCount 1 = index 0)
    if (guessCount >= 1 && guessCount <= 6) {
      const newDistribution = [...this.guessDistribution] as [number, number, number, number, number, number];
      newDistribution[guessCount - 1]++;
      this.guessDistribution = newDistribution;
    }

    // Update streaks
    this.currentStreak++;
    if (this.currentStreak > this.maxStreak) {
      this.maxStreak = this.currentStreak;
    }

    this.persist();
  }

  recordLoss(puzzleDate: string) {
    // Check if already recorded for this date
    if (this.lastPlayedDate === puzzleDate) return;

    this.gamesPlayed++;
    this.lastPlayedDate = puzzleDate;
    this.currentStreak = 0;

    this.persist();
  }

  reset() {
    const defaults = getDefaultStatistics();
    this.gamesPlayed = defaults.gamesPlayed;
    this.gamesWon = defaults.gamesWon;
    this.currentStreak = defaults.currentStreak;
    this.maxStreak = defaults.maxStreak;
    this.guessDistribution = defaults.guessDistribution;
    this.lastPlayedDate = defaults.lastPlayedDate;
    this.persist();
  }
}

export const statisticsStore = new StatisticsStore();
