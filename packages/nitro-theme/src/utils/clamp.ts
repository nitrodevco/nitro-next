/** `value` held to `[min, max]` - the one clamp the theme's drag, resize, scroll and tooltip code share. */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
