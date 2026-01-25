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
        Close
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
    z-index: 100;
    padding: var(--spacing-md);
    cursor: pointer;
  }

  .overlay-content {
    position: relative;
    cursor: default;
    max-width: 90vmin;
    max-height: 90vmin;
  }

  .map-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }

  .close-button {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color var(--transition-fast);
  }

  .close-button:hover {
    background-color: var(--color-surface-hover);
  }
</style>
