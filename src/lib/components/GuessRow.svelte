<script lang="ts">
  import type { Guess } from '$lib/types';
  import CompassArrow from './CompassArrow.svelte';

  interface Props {
    guess: Guess | null;
    index: number;
    isNew?: boolean;
  }

  let { guess, index, isNew = false }: Props = $props();

  const statusClass = $derived(
    guess
      ? guess.status === 'correct'
        ? 'correct'
        : guess.status === 'same-region'
          ? 'close'
          : 'wrong'
      : 'empty'
  );
</script>

<div
  class="guess-row {statusClass}"
  class:animate-in={isNew}
  class:pulse={isNew && statusClass === 'correct'}
  role="listitem"
  aria-label={guess
    ? `Guess ${index + 1}: ${guess.island.name}, ${
        guess.status === 'correct'
          ? 'Correct!'
          : guess.status === 'same-region'
            ? `Same region, direction: ${guess.direction}`
            : 'Wrong region'
      }`
    : `Guess ${index + 1}: Empty`}
>
  {#if guess}
    <span class="guess-name">{guess.island.name}</span>
    {#if guess.direction}
      <span class="guess-direction">
        <CompassArrow direction={guess.direction} size={16} />
        <span class="direction-text">{guess.direction}</span>
      </span>
    {:else if guess.status === 'correct'}
      <span class="correct-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
    {/if}
  {:else}
    <span class="empty-slot">{index + 1}</span>
  {/if}
</div>

<style>
  .guess-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    min-height: 2.25rem;
    font-family: var(--font-display);
    font-size: 0.85rem;
    background: var(--glass-bg);
    border: 1px solid var(--color-wrong-border);
    transition: all var(--transition-fast);
  }

  .guess-row.animate-in {
    animation: guessRowEnter 0.3s var(--ease-out-expo);
  }

  .guess-row.pulse {
    animation: guessRowEnter 0.3s var(--ease-out-expo), correctPulse 0.6s ease-out 0.3s;
  }

  .guess-row.correct {
    background: var(--color-correct-bg);
    border-color: var(--color-correct-border);
    color: var(--color-correct);
  }

  .guess-row.close {
    background: var(--color-close-bg);
    border-color: var(--color-close-border);
    color: var(--color-close);
  }

  .guess-row.wrong {
    background: var(--glass-bg);
    border-color: var(--color-wrong-border);
    color: var(--color-text);
  }

  .guess-row.empty {
    opacity: 0.4;
  }

  .guess-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .guess-direction {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-family: var(--font-text);
    margin-left: var(--spacing-sm);
    color: var(--color-gold);
  }

  .direction-text {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .correct-icon {
    display: flex;
    align-items: center;
    color: var(--color-correct);
  }

  .empty-slot {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }
</style>
