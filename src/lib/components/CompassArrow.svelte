<script lang="ts">
  import type { CompassDirection } from '$lib/types';
  import { getDirectionAngle } from '$lib/utils/direction';

  interface Props {
    direction: CompassDirection;
    size?: number;
  }

  let { direction, size = 16 }: Props = $props();

  const rotation = $derived(getDirectionAngle(direction));
</script>

{#if direction}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="compass-arrow"
    style="transform: rotate({rotation}deg)"
    aria-label="Direction: {direction}"
    role="img"
  >
    <defs>
      <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--color-gold)" />
        <stop offset="100%" stop-color="var(--color-gold-bright)" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L18 14H6L12 2Z"
      fill="url(#gold-gradient)"
    />
    <path
      d="M12 2L18 14H6L12 2Z"
      fill="none"
      stroke="var(--color-wood-dark)"
      stroke-width="0.5"
    />
  </svg>
{/if}

<style>
  .compass-arrow {
    display: inline-block;
    vertical-align: middle;
    transition: transform var(--transition-smooth);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
</style>
