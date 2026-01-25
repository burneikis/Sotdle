import type { Island, Guess, GameStatus, GuessStatus, CompassDirection } from '$lib/types';
import { islands, getIslandById } from '$lib/data/islands';
import { getTodaysPuzzle } from '$lib/utils/daily-seed';
import { calculateDirection } from '$lib/utils/direction';
import {
  loadGameState,
  saveGameState,
  type SavedGameState,
} from '$lib/utils/storage';

const MAX_GUESSES = 6;

export type GameMode = 'daily' | 'infinite';

class GameStore {
  targetIsland: Island = $state(islands[0]);
  guesses: Guess[] = $state([]);
  gameStatus: GameStatus = $state('playing');
  puzzleNumber: number = $state(0);
  puzzleDate: string = $state('');
  mode: GameMode = $state('daily');

  remainingGuesses = $derived(MAX_GUESSES - this.guesses.length);
  isGameOver = $derived(this.gameStatus !== 'playing');
  guessedIslandIds = $derived(this.guesses.map((g) => g.island.id));

  availableIslands = $derived(
    islands.filter((island) => !this.guessedIslandIds.includes(island.id))
  );

  constructor() {
    // Will be initialized in init()
  }

  init() {
    const { island, puzzleNumber, puzzleDate } = getTodaysPuzzle(islands);
    this.puzzleNumber = puzzleNumber;
    this.puzzleDate = puzzleDate;
    this.targetIsland = island;
    this.mode = 'daily';

    // Try to restore saved game state
    const saved = loadGameState();
    if (saved && saved.puzzleDate === puzzleDate) {
      this.restoreGameState(saved);
    } else {
      // New day, reset game
      this.guesses = [];
      this.gameStatus = 'playing';
      this.persistGameState();
    }
  }

  private restoreGameState(saved: SavedGameState) {
    this.gameStatus = saved.gameStatus;
    this.guesses = saved.guessedIslandIds
      .map((id) => {
        const island = getIslandById(id);
        if (!island) return null;
        return this.createGuess(island);
      })
      .filter((g): g is Guess => g !== null);
  }

  private createGuess(island: Island): Guess {
    let status: GuessStatus;
    let direction: CompassDirection;

    if (island.id === this.targetIsland.id) {
      status = 'correct';
      direction = null;
    } else if (island.region === this.targetIsland.region) {
      status = 'same-region';
      direction = calculateDirection(island, this.targetIsland);
    } else {
      status = 'wrong';
      direction = null;
    }

    return { island, status, direction };
  }

  private persistGameState() {
    // Only persist daily mode
    if (this.mode !== 'daily') return;

    const state: SavedGameState = {
      puzzleDate: this.puzzleDate,
      puzzleNumber: this.puzzleNumber,
      guessedIslandIds: this.guesses.map((g) => g.island.id),
      gameStatus: this.gameStatus,
    };
    saveGameState(state);
  }

  private getRandomIsland(): Island {
    const index = Math.floor(Math.random() * islands.length);
    return islands[index];
  }

  submitGuess(island: Island): Guess | null {
    if (this.gameStatus !== 'playing') return null;
    if (this.guessedIslandIds.includes(island.id)) return null;
    if (this.guesses.length >= MAX_GUESSES) return null;

    const guess = this.createGuess(island);
    this.guesses = [...this.guesses, guess];

    if (guess.status === 'correct') {
      this.gameStatus = 'won';
    } else if (this.guesses.length >= MAX_GUESSES) {
      this.gameStatus = 'lost';
    }

    this.persistGameState();
    return guess;
  }

  setMode(newMode: GameMode) {
    if (newMode === this.mode) return;

    this.mode = newMode;

    if (newMode === 'daily') {
      // Switch back to daily - restore today's puzzle
      this.init();
    } else {
      // Switch to infinite - start fresh with random island
      this.targetIsland = this.getRandomIsland();
      this.puzzleNumber = 0;
      this.puzzleDate = '';
      this.guesses = [];
      this.gameStatus = 'playing';
    }
  }

  nextIsland() {
    // Only works in infinite mode
    if (this.mode !== 'infinite') return;

    this.targetIsland = this.getRandomIsland();
    this.guesses = [];
    this.gameStatus = 'playing';
  }

  reset() {
    if (this.mode === 'daily') {
      const { island, puzzleNumber, puzzleDate } = getTodaysPuzzle(islands);
      this.targetIsland = island;
      this.puzzleNumber = puzzleNumber;
      this.puzzleDate = puzzleDate;
    } else {
      this.targetIsland = this.getRandomIsland();
    }
    this.guesses = [];
    this.gameStatus = 'playing';
    this.persistGameState();
  }
}

export const gameStore = new GameStore();
