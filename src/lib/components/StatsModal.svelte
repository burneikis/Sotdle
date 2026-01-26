<script lang="ts">
  import { statisticsStore } from '$lib/stores/statistics.svelte';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  const maxDistribution = $derived(
    Math.max(...statisticsStore.guessDistribution, 1)
  );

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
    class="modal-overlay"
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="stats-title"
    tabindex="-1"
  >
    <div class="modal-content">
      <button
        type="button"
        class="close-button"
        onclick={onClose}
        aria-label="Close statistics"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      <h2 id="stats-title" class="modal-title">Statistics</h2>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{statisticsStore.gamesPlayed}</span>
          <span class="stat-label">Played</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{statisticsStore.winPercentage}</span>
          <span class="stat-label">Win %</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{statisticsStore.currentStreak}</span>
          <span class="stat-label">Current Streak</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{statisticsStore.maxStreak}</span>
          <span class="stat-label">Max Streak</span>
        </div>
      </div>

      <h3 class="distribution-title">Guess Distribution</h3>

      <div class="distribution">
        {#each statisticsStore.guessDistribution as count, i (i)}
          <div class="distribution-row">
            <span class="distribution-guess">{i + 1}</span>
            <div class="distribution-bar-container">
              <div
                class="distribution-bar"
                style="--bar-width: {(count / maxDistribution) * 100}%; --delay: {i * 50}ms"
              >
                <span class="distribution-count">{count}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
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
    animation: backdropFade 0.2s ease-out;
  }

  .modal-content {
    position: relative;
    background: var(--color-modal-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    width: 100%;
    max-width: 400px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalEnter 0.3s var(--ease-out-expo);
  }

  .close-button {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    color: var(--color-text);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .close-button:hover {
    background: var(--color-surface-hover);
    color: var(--color-gold);
  }

  .modal-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-gold-bright);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-sm);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
  }

  .stat-value {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-text-bright);
  }

  .stat-label {
    font-family: var(--font-body);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    margin-top: var(--spacing-xs);
  }

  .distribution-title {
    text-align: center;
    font-family: var(--font-display);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-bright);
  }

  .distribution {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .distribution-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .distribution-guess {
    font-family: var(--font-text);
    width: 1rem;
    text-align: center;
    color: var(--color-text-muted);
  }

  .distribution-bar-container {
    flex: 1;
    min-height: 1.75rem;
  }

  .distribution-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 2rem;
    width: var(--bar-width, 0%);
    height: 1.75rem;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%);
    border-radius: var(--radius-sm);
    padding-right: var(--spacing-sm);
    transform-origin: left center;
    animation: barGrow 0.5s var(--ease-out-expo) var(--delay, 0ms) both;
    box-shadow: 0 2px 4px var(--color-gold-glow);
  }

  .distribution-count {
    font-family: var(--font-text);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-wood-dark);
  }

  @media (max-width: 360px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
