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
    <path
      d="M12 2L18 14H6L12 2Z"
      fill="currentColor"
    />
  </svg>
{/if}

<style>
  .compass-arrow {
    display: inline-block;
    vertical-align: middle;
    transition: transform var(--transition-fast);
  }
</style>
