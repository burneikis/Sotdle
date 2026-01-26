<script lang="ts">
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
</script>


{#if isOpen}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="overlay"
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-label="Sea of Thieves map"
    tabindex="-1"
  >
    <div class="overlay-content">
      <img
        src="/easy-mode-map.png"
        alt="Sea of Thieves full map"
        class="map-image"
      />
      <button
        type="button"
        class="close-button"
        onclick={onClose}
        aria-label="Close map"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-overlay);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 100;
    padding: var(--spacing-md);
    cursor: pointer;
    animation: backdropFade 0.2s ease-out;
  }

  .overlay-content {
    position: relative;
    cursor: default;
    max-width: 90vmin;
    max-height: 90vmin;
    animation: modalEnter 0.3s var(--ease-out-expo);
  }

  .map-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    border: 3px solid var(--color-wood);
    box-shadow:
      0 0 0 1px var(--color-wood-light),
      0 0 0 3px var(--color-wood-dark),
      0 16px 48px rgba(0, 0, 0, 0.5);
  }

  .close-button {
    position: absolute;
    top: calc(-1 * var(--spacing-md));
    right: calc(-1 * var(--spacing-md));
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    color: var(--color-text);
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .close-button:hover {
    background: var(--color-surface-hover);
    color: var(--color-gold);
    transform: scale(1.05);
  }

  .close-button:active {
    transform: scale(0.95);
  }
</style>
