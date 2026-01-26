<script lang="ts">
  import { themeStore } from '$lib/stores/theme.svelte';

  interface Props {
    onStatsClick: () => void;
  }

  let { onStatsClick }: Props = $props();
</script>

<header class="header">
  <div class="header-content">
    <img src="/sotdle-logo.png" alt="Sotdle" class="logo" />
    <nav class="nav" aria-label="Main navigation">
      <button
        type="button"
        class="nav-button"
        onclick={onStatsClick}
        aria-label="View statistics"
      >
        Stats
      </button>
      <button
        type="button"
        class="nav-button theme-toggle"
        onclick={() => themeStore.toggle()}
        aria-label="Toggle {themeStore.isDark ? 'light' : 'dark'} mode"
      >
        {themeStore.isDark ? 'Light' : 'Dark'}
      </button>
      <a
        href="https://github.com/burneikis/sotdle"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link"
      >
        Github
      </a>
    </nav>
  </div>
</header>

<style>
  .header {
    padding: var(--spacing-xs) var(--spacing-md);
    text-align: center;
    flex-shrink: 0;
  }

  .header-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
  }

  .logo {
    height: 2rem;
    width: auto;
  }

  .nav {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    font-family: var(--font-body);
    font-size: 0.75rem;
  }

  .nav-button,
  .nav-link {
    background: none;
    border: none;
    color: var(--color-text);
    text-decoration: none;
    padding: 2px var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast);
  }

  .nav-button:hover,
  .nav-link:hover {
    background-color: var(--color-surface);
  }
</style>
