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

<div class="guess-list" role="list" aria-label="Your guesses">
  {#each slots as guess, i (i)}
    <GuessRow {guess} index={i} />
  {/each}
</div>

<style>
  .guess-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    max-width: 400px;
  }
</style>
