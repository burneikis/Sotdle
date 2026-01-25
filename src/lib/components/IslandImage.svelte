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
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .easy-mode-button {
    position: absolute;
    top: var(--spacing-xs);
    left: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 0.75rem;
    z-index: 1;
    transition: background-color var(--transition-fast);
  }

  .easy-mode-button:hover {
    background-color: var(--color-surface-hover);
  }

  .island-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--radius-md);
    display: block;
  }

  .island-reveal {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--radius-sm);
  }

  .island-name {
    font-family: var(--font-display);
    font-size: 1rem;
    color: white;
    white-space: nowrap;
  }
</style>
