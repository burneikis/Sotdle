<script lang="ts">
  import type { Island } from '$lib/types';

  interface Props {
    islands: Island[];
    disabled?: boolean;
    onSubmit: (island: Island) => void;
  }

  let { islands, disabled = false, onSubmit }: Props = $props();

  let inputValue = $state('');
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

  function handleInput() {
    isOpen = true;
    highlightedIndex = -1;
  }

  function handleFocus() {
    isOpen = true;
  }

  function handleBlur(e: FocusEvent) {
    // Delay to allow click on dropdown item
    setTimeout(() => {
      if (!listEl?.contains(document.activeElement)) {
        isOpen = false;
      }
    }, 150);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        isOpen = true;
        e.preventDefault();
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
        } else if (filteredIslands.length === 1) {
          selectIsland(filteredIslands[0]);
        }
        break;
      case 'Escape':
        isOpen = false;
        highlightedIndex = -1;
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
    inputValue = '';
    isOpen = false;
    highlightedIndex = -1;
    onSubmit(island);
    inputEl?.focus();
  }

  function handleItemClick(island: Island) {
    selectIsland(island);
  }

  // Auto-select first match when opening
  $effect(() => {
    if (isOpen && filteredIslands.length > 0 && highlightedIndex === -1) {
      highlightedIndex = 0;
    }
  });
</script>

<div class="guess-input-container">
  <div class="input-row">
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
    <button
      type="button"
      class="guess-button"
      disabled={disabled || filteredIslands.length === 0}
      onclick={() => {
        if (highlightedIndex >= 0 && filteredIslands[highlightedIndex]) {
          selectIsland(filteredIslands[highlightedIndex]);
        } else if (filteredIslands.length === 1) {
          selectIsland(filteredIslands[0]);
        }
      }}
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
    gap: var(--spacing-xs);
  }

  .guess-input {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 1rem;
  }

  .guess-input::placeholder {
    color: var(--color-text-muted);
  }

  .guess-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .guess-button {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-text);
    font-size: 1rem;
    transition: background-color var(--transition-fast);
  }

  .guess-button:hover:not(:disabled) {
    background-color: var(--color-surface-hover);
  }

  .guess-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .island-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: var(--spacing-xs);
    max-height: 200px;
    overflow-y: auto;
    background-color: var(--color-surface);
    border-radius: var(--radius-sm);
    list-style: none;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .island-option {
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    font-family: var(--font-text);
    transition: background-color var(--transition-fast);
  }

  .island-option:hover,
  .island-option.highlighted {
    background-color: var(--color-surface-hover);
  }
</style>
