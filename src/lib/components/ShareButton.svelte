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

<button type="button" class="share-button" onclick={handleShare}>
  {copied ? 'Copied!' : 'Share Results'}
</button>

<style>
  .share-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--color-correct);
    color: black;
    font-family: var(--font-text);
    font-size: 1rem;
    cursor: pointer;
    transition: opacity var(--transition-fast);
  }

  .share-button:hover {
    opacity: 0.9;
  }
</style>
