import type { CompassDirection, Island } from '$lib/types';

/**
 * Calculate the compass direction from a guessed island to the target island.
 * Lower Y = North, Higher Y = South
 * Lower X (charCode) = West, Higher X = East
 */
export function calculateDirection(guess: Island, target: Island): CompassDirection {
  const dx = target.locationX.charCodeAt(0) - guess.locationX.charCodeAt(0);
  const dy = target.locationY - guess.locationY;

  let ns: string = '';
  let ew: string = '';

  // North/South based on Y coordinate
  if (dy < 0) {
    ns = 'N';
  } else if (dy > 0) {
    ns = 'S';
  }

  // East/West based on X coordinate
  if (dx > 0) {
    ew = 'E';
  } else if (dx < 0) {
    ew = 'W';
  }

  const direction = ns + ew;
  return direction === '' ? null : (direction as CompassDirection);
}

/**
 * Get the rotation angle for a compass direction.
 * North = 0deg, each direction is 45deg clockwise.
 */
export function getDirectionAngle(direction: CompassDirection): number {
  const angles: Record<string, number> = {
    'N': 0,
    'NE': 45,
    'E': 90,
    'SE': 135,
    'S': 180,
    'SW': 225,
    'W': 270,
    'NW': 315,
  };
  return direction ? angles[direction] ?? 0 : 0;
}
