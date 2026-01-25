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

    if (guess?.status === 'correct') {
      statisticsStore.recordWin(gameStore.guesses.length, gameStore.puzzleDate);
      // Show stats after a short delay
      setTimeout(() => {
        isStatsOpen = true;
      }, 1500);
    } else if (gameStore.gameStatus === 'lost') {
      statisticsStore.recordLoss(gameStore.puzzleDate);
      // Show stats after a short delay
      setTimeout(() => {
        isStatsOpen = true;
      }, 1500);
    }
  }
</script>

<div class="game">
  <Header onStatsClick={() => (isStatsOpen = true)} />

  <main class="game-main">
    <div class="puzzle-info">
      <span class="puzzle-number">Puzzle #{gameStore.puzzleNumber}</span>
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
          <ShareButton
            puzzleNumber={gameStore.puzzleNumber}
            guesses={gameStore.guesses}
            gameWon={gameStore.gameStatus === 'won'}
          />
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .game-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    gap: var(--spacing-md);
  }

  .puzzle-info {
    text-align: center;
  }

  .puzzle-number {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .game-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    width: 100%;
    max-width: 400px;
  }

  .game-over {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    text-align: center;
  }

  .result-text {
    font-family: var(--font-display);
    font-size: 1.2rem;
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
</style>
