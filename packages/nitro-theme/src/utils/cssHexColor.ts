/**
 * Flash colour numbers and the theme's `#rrggbb` colour strings, each way.
 */

/**
 * A Flash colour number as the `#rrggbb` string Pixi and canvas take: the low 24 bits, zero padded
 * to six digits, so an `0xAARRGGBB` value loses its alpha byte (read that separately).
 */
export const toCssHexColor = (color: number): string => `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;

/**
 * A theme colour string as the number it spells: `#rgb` (each digit doubled), `#rrggbb`, or
 * `#aarrggbb` / `0xaarrggbb` with its alpha byte. `NaN` when it is not one - each caller picks
 * its own fallback.
 */
export const parseCssHexColor = (color: string): number => {
    let hex = color.trim().replace(/^#|^0x/i, '');

    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

    return Number.parseInt(hex, 16);
};
