export type CompassDirection = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW' | null;

export type Region =
  | 'The Shores of Plenty'
  | 'The Ancient Isles'
  | 'The Wilds'
  | 'The Devils Roar';

export type GuessStatus = 'correct' | 'same-region' | 'wrong';

export interface Island {
  id: string;
  name: string;
  region: Region;
  locationX: string;
  locationY: number;
  imagePath: string;
}

export interface Guess {
  island: Island;
  status: GuessStatus;
  direction: CompassDirection;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  targetIsland: Island;
  guesses: Guess[];
  gameStatus: GameStatus;
  puzzleNumber: number;
  puzzleDate: string;
}

export interface Statistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: [number, number, number, number, number, number];
  lastPlayedDate: string;
}
