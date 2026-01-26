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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    <span>Easy Mode</span>
  </button>
  <div class="image-wrapper">
    <div class="frame-corner frame-corner-tl"></div>
    <div class="frame-corner frame-corner-tr"></div>
    <div class="frame-corner frame-corner-bl"></div>
    <div class="frame-corner frame-corner-br"></div>
    <img
      src={island.imagePath}
      alt={revealed ? island.name : 'Mystery island'}
      class="island-image"
    />
  </div>
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
    animation: gentleFloat 4s ease-in-out infinite;
  }

  .easy-mode-button {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 0.75rem;
    z-index: 2;
    transition: all var(--transition-fast);
  }

  .easy-mode-button:hover {
    background: var(--color-surface-hover);
    color: var(--color-gold);
    border-color: var(--color-gold-glow);
  }

  .easy-mode-button svg {
    flex-shrink: 0;
  }

  .image-wrapper {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }

  /* Ornate corner decorations */
  .frame-corner {
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 1;
    pointer-events: none;
  }

  .frame-corner::before,
  .frame-corner::after {
    content: '';
    position: absolute;
    background: var(--color-rope);
    border-radius: 2px;
  }

  .frame-corner::before {
    width: 100%;
    height: 4px;
  }

  .frame-corner::after {
    width: 4px;
    height: 100%;
  }

  .frame-corner-tl {
    top: -8px;
    left: -8px;
  }
  .frame-corner-tl::before { top: 0; left: 0; }
  .frame-corner-tl::after { top: 0; left: 0; }

  .frame-corner-tr {
    top: -8px;
    right: -8px;
  }
  .frame-corner-tr::before { top: 0; right: 0; }
  .frame-corner-tr::after { top: 0; right: 0; }

  .frame-corner-bl {
    bottom: -8px;
    left: -8px;
  }
  .frame-corner-bl::before { bottom: 0; left: 0; }
  .frame-corner-bl::after { bottom: 0; left: 0; }

  .frame-corner-br {
    bottom: -8px;
    right: -8px;
  }
  .frame-corner-br::before { bottom: 0; right: 0; }
  .frame-corner-br::after { bottom: 0; right: 0; }

  .island-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;

    /* Ornate wooden frame border */
    border: 5px solid var(--color-wood);
    border-radius: var(--radius-lg);
    box-shadow:
      inset 0 0 0 2px var(--color-wood-dark),
      0 0 0 2px var(--color-wood-light),
      0 0 0 4px var(--color-wood-dark),
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .island-reveal {
    position: absolute;
    bottom: var(--spacing-md);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    animation: fadeIn 0.3s var(--ease-out-expo);
  }

  .island-name {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-gold-bright);
    white-space: nowrap;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
</style>
