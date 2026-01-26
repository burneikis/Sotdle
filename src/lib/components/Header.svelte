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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-label">Stats</span>
      </button>
      <button
        type="button"
        class="nav-button theme-toggle"
        onclick={() => themeStore.toggle()}
        aria-label="Toggle {themeStore.isDark ? 'light' : 'dark'} mode"
      >
        {#if themeStore.isDark}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        {:else}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
        <span class="nav-label">{themeStore.isDark ? 'Light' : 'Dark'}</span>
      </button>
      <a
        href="https://github.com/alexburneikis/sotdle"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-button"
        aria-label="View source on GitHub"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span class="nav-label">GitHub</span>
      </a>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid var(--glass-border);
    flex-shrink: 0;
  }

  .header-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  .logo {
    height: 2rem;
    width: auto;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    background: transparent;
    border: none;
    color: var(--color-text);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    font-family: var(--font-body);
    font-size: 0.8rem;
  }

  .nav-button:hover {
    background: var(--glass-bg);
    color: var(--color-gold);
  }

  .nav-button:hover svg {
    stroke: var(--color-gold);
    fill: var(--color-gold);
  }

  .nav-button svg {
    flex-shrink: 0;
    transition: all var(--transition-fast);
  }

  .nav-label {
    display: none;
  }

  @media (min-width: 480px) {
    .nav-label {
      display: inline;
    }
  }
</style>
