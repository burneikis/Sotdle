<script lang="ts">
  import type { Guess } from '$lib/types';

  interface Props {
    puzzleNumber: number;
    guesses: Guess[];
    gameWon: boolean;
  }

  let { puzzleNumber, guesses, gameWon }: Props = $props();

  let copied = $state(false);

  function getEmojiGrid(): string {
    return guesses
      .map((guess) => {
        if (guess.status === 'correct') return '🟢';
        if (guess.status === 'same-region') return '🟡';
        return '⬜';
      })
      .join('');
  }

  function getShareText(): string {
    const score = gameWon ? guesses.length : 'X';
    const grid = getEmojiGrid();
    return `Sotdle #${puzzleNumber} ${score}/6\n${grid}\nhttps://sotdle.xyz`;
  }

  async function handleShare() {
    const text = getShareText();

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }
</script>

<button type="button" class="share-button" class:copied onclick={handleShare}>
  {#if copied}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Copied!</span>
  {:else}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
    <span>Share Results</span>
  {/if}
</button>

<style>
  .share-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-xl);
    border: none;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-bright) 100%);
    color: var(--color-wood-dark);
    font-family: var(--font-text);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: 0 4px 12px var(--color-gold-glow);
    min-height: 44px;
  }

  .share-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--color-gold-glow);
  }

  .share-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px var(--color-gold-glow);
  }

  .share-button.copied {
    background: linear-gradient(135deg, var(--color-correct) 0%, #34d399 100%);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  }

  .share-button.copied:hover {
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  }

  .share-button svg {
    flex-shrink: 0;
  }
</style>
