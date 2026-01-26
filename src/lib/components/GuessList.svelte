<script lang="ts">
  import type { Guess } from '$lib/types';
  import GuessRow from './GuessRow.svelte';

  interface Props {
    guesses: Guess[];
    maxGuesses?: number;
  }

  let { guesses, maxGuesses = 6 }: Props = $props();

  const slots = $derived(
    Array.from({ length: maxGuesses }, (_, i) => guesses[i] ?? null)
  );
</script>

<div class="guess-list-container">
  <div class="guess-list" role="list" aria-label="Your guesses">
    {#each slots as guess, i (i)}
      <GuessRow {guess} index={i} isNew={guess !== null && i === guesses.length - 1} />
    {/each}
  </div>
</div>

<style>
  .guess-list-container {
    width: 100%;
    max-width: 400px;
  }

  .guess-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
  }
</style>
