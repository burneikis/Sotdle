<script lang="ts">
  import type { Guess } from '$lib/types';
  import CompassArrow from './CompassArrow.svelte';

  interface Props {
    guess: Guess | null;
    index: number;
  }

  let { guess, index }: Props = $props();

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
        <CompassArrow direction={guess.direction} size={14} />
        <span class="direction-text">{guess.direction}</span>
      </span>
    {/if}
  {/if}
</div>

<style>
  .guess-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    min-height: 1.75rem;
    font-family: var(--font-display);
    font-size: 0.8rem;
    background-color: var(--color-surface);
    transition: background-color var(--transition-fast);
  }

  .guess-row.correct {
    background-color: var(--color-correct-bg);
    color: black;
  }

  .guess-row.close {
    background-color: var(--color-close-bg);
    color: black;
  }

  .guess-row.wrong {
    background-color: var(--color-wrong-bg);
  }

  .guess-row.empty {
    opacity: 0.7;
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
  }

  .direction-text {
    font-size: 0.8rem;
  }
</style>
