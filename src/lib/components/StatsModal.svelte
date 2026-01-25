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
        X
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
                style="width: {(count / maxDistribution) * 100}%"
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
    z-index: 100;
    padding: var(--spacing-md);
  }

  .modal-content {
    position: relative;
    background-color: var(--color-modal-bg);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    width: 100%;
    max-width: 400px;
  }

  .close-button {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--color-text);
    cursor: pointer;
    padding: var(--spacing-xs);
  }

  .modal-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    font-family: var(--font-display);
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
  }

  .stat-value {
    font-family: var(--font-display);
    font-size: 1.5rem;
  }

  .stat-label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  .distribution-title {
    text-align: center;
    font-family: var(--font-display);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
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
  }

  .distribution-bar-container {
    flex: 1;
    min-height: 1.5rem;
  }

  .distribution-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 1.5rem;
    height: 1.5rem;
    background-color: var(--color-surface-hover);
    border-radius: var(--radius-sm);
    padding-right: var(--spacing-xs);
  }

  .distribution-count {
    font-family: var(--font-text);
    font-size: 0.8rem;
  }
</style>
