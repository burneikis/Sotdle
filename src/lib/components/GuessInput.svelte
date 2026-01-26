<script lang="ts">
  import type { Island } from '$lib/types';

  interface Props {
    islands: Island[];
    disabled?: boolean;
    onSubmit: (island: Island) => void;
  }

  let { islands, disabled = false, onSubmit }: Props = $props();

  let inputValue = $state('');
  let selectedIsland: Island | null = $state(null);
  let isOpen = $state(false);
  let highlightedIndex = $state(-1);
  let inputEl: HTMLInputElement | null = $state(null);
  let listEl: HTMLUListElement | null = $state(null);

  const filteredIslands = $derived(
    inputValue.trim()
      ? islands.filter((island) =>
          island.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : islands
  );

  // Check if current input matches an island exactly
  const matchedIsland = $derived(
    islands.find((i) => i.name.toLowerCase() === inputValue.toLowerCase())
  );

  function handleInput() {
    isOpen = true;
    highlightedIndex = filteredIslands.length > 0 ? 0 : -1;
    selectedIsland = null; // Clear selection when typing
  }

  function handleFocus() {
    isOpen = true;
    if (filteredIslands.length > 0 && highlightedIndex === -1) {
      highlightedIndex = 0;
    }
  }

  function handleBlur() {
    // Delay to allow click on dropdown item
    setTimeout(() => {
      isOpen = false;
    }, 150);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen && filteredIslands.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        isOpen = true;
        highlightedIndex = 0;
        e.preventDefault();
        return;
      }
    }

    if (!isOpen) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
        return;
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        highlightedIndex = Math.min(
          highlightedIndex + 1,
          filteredIslands.length - 1
        );
        scrollToHighlighted();
        break;
      case 'ArrowUp':
        e.preventDefault();
        highlightedIndex = Math.max(highlightedIndex - 1, 0);
        scrollToHighlighted();
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredIslands[highlightedIndex]) {
          selectIsland(filteredIslands[highlightedIndex]);
        }
        break;
      case 'Tab':
        if (highlightedIndex >= 0 && filteredIslands[highlightedIndex]) {
          selectIsland(filteredIslands[highlightedIndex]);
        }
        break;
      case 'Escape':
        isOpen = false;
        break;
    }
  }

  function scrollToHighlighted() {
    if (listEl && highlightedIndex >= 0) {
      const item = listEl.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }

  function selectIsland(island: Island) {
    inputValue = island.name;
    selectedIsland = island;
    isOpen = false;
    highlightedIndex = -1;
    inputEl?.focus();
  }

  function submitGuess() {
    const toSubmit = selectedIsland || matchedIsland;
    if (toSubmit) {
      onSubmit(toSubmit);
      inputValue = '';
      selectedIsland = null;
      inputEl?.focus();
    }
  }

  function handleItemClick(island: Island) {
    selectIsland(island);
  }

  // Update highlighted index when filtered list changes
  $effect(() => {
    if (isOpen && filteredIslands.length > 0) {
      if (highlightedIndex >= filteredIslands.length) {
        highlightedIndex = filteredIslands.length - 1;
      } else if (highlightedIndex < 0) {
        highlightedIndex = 0;
      }
    }
  });
</script>

<div class="guess-input-container">
  <div class="input-row">
    <div class="input-wrapper">
      <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        bind:this={inputEl}
        bind:value={inputValue}
        oninput={handleInput}
        onfocus={handleFocus}
        onblur={handleBlur}
        onkeydown={handleKeydown}
        type="text"
        placeholder="Type an island name..."
        {disabled}
        class="guess-input"
        autocomplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="island-listbox"
        aria-autocomplete="list"
        aria-activedescendant={highlightedIndex >= 0
          ? `island-option-${highlightedIndex}`
          : undefined}
      />
    </div>
    <button
      type="button"
      class="guess-button"
      disabled={disabled || (!selectedIsland && !matchedIsland)}
      onclick={submitGuess}
    >
      Guess
    </button>
  </div>

  {#if isOpen && !disabled && filteredIslands.length > 0}
    <ul
      bind:this={listEl}
      id="island-listbox"
      class="island-dropdown"
      role="listbox"
    >
      {#each filteredIslands as island, i (island.id)}
        <li
          id="island-option-{i}"
          class="island-option"
          class:highlighted={i === highlightedIndex}
          role="option"
          aria-selected={i === highlightedIndex}
          onmousedown={() => handleItemClick(island)}
          onmouseenter={() => (highlightedIndex = i)}
        >
          {island.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .guess-input-container {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  .input-row {
    display: flex;
    gap: var(--spacing-sm);
  }

  .input-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: var(--spacing-sm);
    color: var(--color-text-muted);
    pointer-events: none;
    transition: color var(--transition-fast);
  }

  .input-wrapper:focus-within .input-icon {
    color: var(--color-gold);
  }

  .guess-input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 2.5rem;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 0.9rem;
    transition: all var(--transition-fast);
  }

  .guess-input::placeholder {
    color: var(--color-text-muted);
  }

  .guess-input:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 3px var(--color-gold-glow);
  }

  .guess-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .guess-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%);
    color: var(--color-wood-dark);
    font-family: var(--font-text);
    font-size: 0.9rem;
    font-weight: 600;
    transition: all var(--transition-fast);
    box-shadow: 0 2px 8px var(--color-gold-glow);
  }

  .guess-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-gold-glow);
  }

  .guess-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .guess-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  .island-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: var(--spacing-xs);
    max-height: 200px;
    overflow-y: auto;
    background: var(--color-surface);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    list-style: none;
    z-index: 10;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.15s var(--ease-out-expo);
  }

  .island-option {
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    font-family: var(--font-text);
    font-size: 0.85rem;
    color: var(--color-text);
    transition: all var(--transition-fast);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .island-option:last-child {
    border-bottom: none;
  }

  .island-option:hover,
  .island-option.highlighted {
    background: var(--glass-bg);
    color: var(--color-gold);
  }

  @media (max-width: 480px) {
    .input-row {
      flex-direction: column;
    }

    .guess-button {
      width: 100%;
    }
  }
</style>
