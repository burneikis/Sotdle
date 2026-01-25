<script lang="ts">
  import { gameStore } from '$lib/stores/game.svelte';
  import { statisticsStore } from '$lib/stores/statistics.svelte';
  import Header from './Header.svelte';
  import IslandImage from './IslandImage.svelte';
  import GuessInput from './GuessInput.svelte';
  import GuessList from './GuessList.svelte';
  import MapOverlay from './MapOverlay.svelte';
  import StatsModal from './StatsModal.svelte';
  import ShareButton from './ShareButton.svelte';
  import type { Island } from '$lib/types';

  let isMapOpen = $state(false);
  let isStatsOpen = $state(false);

  function handleGuess(island: Island) {
    const guess = gameStore.submitGuess(island);

    // Only track stats for daily mode
    if (gameStore.mode === 'daily') {
      if (guess?.status === 'correct') {
        statisticsStore.recordWin(gameStore.guesses.length, gameStore.puzzleDate);
        setTimeout(() => {
          isStatsOpen = true;
        }, 1500);
      } else if (gameStore.gameStatus === 'lost') {
        statisticsStore.recordLoss(gameStore.puzzleDate);
        setTimeout(() => {
          isStatsOpen = true;
        }, 1500);
      }
    }
  }
</script>

<div class="game">
  <Header onStatsClick={() => (isStatsOpen = true)} />

  <main class="game-main">
    <div class="mode-toggle">
      <button
        type="button"
        class="mode-button"
        class:active={gameStore.mode === 'daily'}
        onclick={() => gameStore.setMode('daily')}
      >
        Daily
      </button>
      <button
        type="button"
        class="mode-button"
        class:active={gameStore.mode === 'infinite'}
        onclick={() => gameStore.setMode('infinite')}
      >
        Infinite
      </button>
    </div>

    <div class="puzzle-info">
      {#if gameStore.mode === 'daily'}
        <span class="puzzle-number">Puzzle #{gameStore.puzzleNumber}</span>
      {:else}
        <span class="puzzle-number">Infinite Mode</span>
      {/if}
    </div>

    <IslandImage
      island={gameStore.targetIsland}
      revealed={gameStore.isGameOver}
      onEasyModeClick={() => (isMapOpen = true)}
    />

    <div class="game-controls">
      {#if gameStore.gameStatus === 'playing'}
        <GuessInput
          islands={gameStore.availableIslands}
          onSubmit={handleGuess}
        />
      {:else}
        <div class="game-over">
          {#if gameStore.gameStatus === 'won'}
            <p class="result-text win">You got it in {gameStore.guesses.length}!</p>
          {:else}
            <p class="result-text lose">
              The answer was <strong>{gameStore.targetIsland.name}</strong>
            </p>
          {/if}
          <div class="game-over-buttons">
            {#if gameStore.mode === 'daily'}
              <ShareButton
                puzzleNumber={gameStore.puzzleNumber}
                guesses={gameStore.guesses}
                gameWon={gameStore.gameStatus === 'won'}
              />
            {:else}
              <button
                type="button"
                class="next-button"
                onclick={() => gameStore.nextIsland()}
              >
                Next Island
              </button>
            {/if}
          </div>
        </div>
      {/if}

      <GuessList guesses={gameStore.guesses} />
    </div>
  </main>

  <MapOverlay isOpen={isMapOpen} onClose={() => (isMapOpen = false)} />
  <StatsModal isOpen={isStatsOpen} onClose={() => (isStatsOpen = false)} />
</div>

<style>
  .game {
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .game-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-md);
    gap: var(--spacing-xs);
    min-height: 0;
    overflow: hidden;
  }

  .mode-toggle {
    display: flex;
    gap: 2px;
    background-color: var(--color-surface);
    border-radius: var(--radius-sm);
    padding: 2px;
    flex-shrink: 0;
  }

  .mode-button {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: none;
    border-radius: var(--radius-sm);
    background-color: transparent;
    color: var(--color-text-muted);
    font-family: var(--font-text);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .mode-button.active {
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  .mode-button:hover:not(.active) {
    color: var(--color-text);
  }

  .puzzle-info {
    text-align: center;
    flex-shrink: 0;
  }

  .puzzle-number {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  .game-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    width: 100%;
    max-width: 400px;
    flex-shrink: 0;
  }

  .game-over {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
  }

  .game-over-buttons {
    display: flex;
    gap: var(--spacing-sm);
  }

  .result-text {
    font-family: var(--font-display);
    font-size: 1.1rem;
  }

  .result-text.win {
    color: var(--color-correct);
  }

  .result-text.lose {
    color: var(--color-text);
  }

  .result-text strong {
    color: var(--color-close);
  }

  .next-button {
    padding: var(--spacing-xs) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-correct);
    color: black;
    font-family: var(--font-text);
    font-size: 0.9rem;
    cursor: pointer;
    transition: opacity var(--transition-fast);
  }

  .next-button:hover {
    opacity: 0.9;
  }
</style>
