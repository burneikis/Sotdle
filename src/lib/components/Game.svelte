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

  function handleKeydown(e: KeyboardEvent) {
    // Don't handle if typing in input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case 'e':
      case 'm':
        // Toggle easy mode map
        if (!isStatsOpen) {
          isMapOpen = !isMapOpen;
        }
        break;
      case 'escape':
        // Close any open modal
        if (isMapOpen) {
          isMapOpen = false;
        } else if (isStatsOpen) {
          isStatsOpen = false;
        }
        break;
      case 'n':
      case 'enter':
        // Next island in infinite mode when game is over
        if (gameStore.mode === 'infinite' && gameStore.isGameOver && !isMapOpen && !isStatsOpen) {
          gameStore.nextIsland();
        }
        break;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

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
      <div
        class="mode-indicator"
        class:right={gameStore.mode === 'infinite'}
      ></div>
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
          {#if gameStore.gameStatus === 'lost'}
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
    padding: var(--spacing-sm) var(--spacing-md);
    gap: var(--spacing-sm);
    min-height: 0;
    overflow: hidden;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }

  .mode-toggle {
    position: relative;
    display: flex;
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    padding: 3px;
    flex-shrink: 0;
  }

  .mode-button {
    position: relative;
    z-index: 1;
    padding: var(--spacing-xs) var(--spacing-md);
    border: none;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--color-text-muted);
    font-family: var(--font-text);
    font-size: 0.8rem;
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .mode-button.active {
    color: var(--color-wood-dark);
  }

  .mode-button:hover:not(.active) {
    color: var(--color-text);
  }

  .mode-indicator {
    position: absolute;
    top: 3px;
    left: 3px;
    width: calc(50% - 3px);
    height: calc(100% - 6px);
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%);
    border-radius: var(--radius-full);
    transition: transform var(--transition-smooth);
    box-shadow: 0 2px 8px var(--color-gold-glow);
  }

  .mode-indicator.right {
    transform: translateX(100%);
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
    color: var(--color-gold-bright);
  }

  .next-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%);
    color: var(--color-wood-dark);
    font-family: var(--font-text);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: 0 2px 8px var(--color-gold-glow);
  }

  .next-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-gold-glow);
  }

  .next-button:active {
    transform: translateY(0);
  }
</style>
