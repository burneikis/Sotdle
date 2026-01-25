<script lang="ts">
  import type { Island } from '$lib/types';

  interface Props {
    island: Island;
    revealed?: boolean;
    onEasyModeClick: () => void;
  }

  let { island, revealed = false, onEasyModeClick }: Props = $props();
</script>

<div class="island-image-container">
  <button
    type="button"
    class="easy-mode-button"
    onclick={onEasyModeClick}
    aria-label="Open easy mode map"
  >
    Easy Mode
  </button>
  <img
    src={island.imagePath}
    alt={revealed ? island.name : 'Mystery island'}
    class="island-image"
  />
  {#if revealed}
    <div class="island-reveal">
      <span class="island-name">{island.name}</span>
    </div>
  {/if}
</div>

<style>
  .island-image-container {
    position: relative;
    width: 100%;
    max-width: 70vmin;
    margin: 0 auto;
  }

  .easy-mode-button {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 0.8rem;
    z-index: 1;
    transition: background-color var(--transition-fast);
  }

  .easy-mode-button:hover {
    background-color: var(--color-surface-hover);
  }

  .island-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    display: block;
  }

  .island-reveal {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--spacing-md);
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }

  .island-name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: white;
  }
</style>
