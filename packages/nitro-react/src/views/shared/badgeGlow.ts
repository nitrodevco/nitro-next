/**
 * `BadgeImageWidget.playGlow`'s numbers: a badge of a standalone rarity tier pulses in the tier's
 * glow colour - an outer glow, an inner glow and a colour tint, each scaled by one strength that a
 * `Timer(16, duration / 16)` steps along a curve. `useBadgeGlow` plays it.
 */

/** `playGlow`'s default duration, in ms (0 or less: 1000). */
export const BADGE_GLOW_DURATION = 500;

/** `startGlowAnimation`'s timer delay, in ms. */
export const BADGE_GLOW_TICK = 16;

/** `playGlow` waits this long for the badge's image (`Timer(5000, 1)`, `onPendingGlowTimeout`). */
export const BADGE_GLOW_IMAGE_TIMEOUT = 5000;

/** `startGlowAnimation`: the timer's repeat count, `max(1, int(duration / 16))`. */
export const badgeGlowTicks = (duration: number = BADGE_GLOW_DURATION): number => Math.max(1, Math.trunc(((duration <= 0) ? 1000 : duration) / BADGE_GLOW_TICK));

/**
 * `onGlowTick`: the strength at a tick, `easeInOutCubic(currentCount, 0, 1, repeatCount)` through
 * `clamp01`. Despite its name the curve is a parabola, `1 - (1.75t - 0.7)^2`: about half strength
 * at the first tick, full at 40% of the way and gone just before the end.
 */
export const badgeGlowStrength = (count: number, ticks: number): number => {
    const t = count / ticks;
    const value = 1 - ((t * 1.75) - 0.7) * ((t * 1.75) - 0.7);

    return Math.min(1, Math.max(0, value));
};

/** `applyGlowStrength`: no strength above this, no glow filters. */
export const BADGE_GLOW_MIN_STRENGTH = 0.001;

/** Flash's `GlowFilter` constructor arguments: color, alpha, blurX, blurY, strength, quality, inner, knockout. */
export type BadgeGlowFilterArgs = [ number, number, number, number, number, number, boolean, boolean ];

/** `createOuterGlowFilter`. */
export const badgeOuterGlowArgs = (color: number, strength: number): BadgeGlowFilterArgs => [ color, 0.7 * strength, 4 + (strength * 4), 4 + (strength * 4), 1 + (strength * 1.2), 2, false, false ];

/** `createInnerGlowFilter`. */
export const badgeInnerGlowArgs = (color: number, strength: number): BadgeGlowFilterArgs => [ color, 0.22 * strength, 2 + (strength * 2), 2 + (strength * 2), 0.8 + (strength * 0.6), 1, true, false ];

/**
 * `createColorTintFilter`: the `ColorMatrixFilter` matrix, Flash's 4x5 with its offsets in 0-255 -
 * each channel pulled 48% of the strength towards the colour's, a little of the others' mixed in
 * and up to 80 of the colour added.
 */
export const badgeTintMatrix = (color: number, strength: number): number[] => {
    const r = ((color >> 16) & 0xFF) / 255;
    const g = ((color >> 8) & 0xFF) / 255;
    const b = (color & 0xFF) / 255;
    const amount = 0.48 * strength;
    const cross = amount * 0.05;
    const offset = 80 * strength;

    return [
        1 - amount + (amount * r), cross * g, cross * b, 0, r * offset,
        cross * r, 1 - amount + (amount * g), cross * b, 0, g * offset,
        cross * r, cross * g, 1 - amount + (amount * b), 0, b * offset,
        0, 0, 0, 1, 0,
    ];
};
