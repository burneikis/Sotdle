<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { gameStore } from '$lib/stores/game.svelte';
  import { statisticsStore } from '$lib/stores/statistics.svelte';
  import { themeStore } from '$lib/stores/theme.svelte';

  let { children } = $props();

  onMount(() => {
    // Initialize stores on client
    themeStore.init();
    statisticsStore.init();
    gameStore.init();
  });
</script>

<svelte:head>
  <title>Sotdle - Sea of Thieves Island Guessing Game</title>
  <meta name="description" content="Guess the Sea of Thieves island from its map image. A Wordle-style daily puzzle game." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{@render children()}
