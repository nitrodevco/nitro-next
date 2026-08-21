/**
 * Direct ports of the SWF's navigator colour helpers.
 * — com.sulake.habbo.window.utils.getUserCountColor
 * — com.sulake.habbo.navigator.view.search.results.RoomEntryUtils.getModulatedBackgroundColor
 */

const toHex = (argb: number) => `#${(argb & 0xFFFFFF).toString(16).padStart(6, '0')}`;

/** getUserCountColor(userCount, maxUserCount) — ARGB constants straight from the SWF */
export const getUserCountColor = (userCount: number, maxUserCount: number) => {
    const percent = 100 * (userCount / maxUserCount);

    if (percent >= 92) return toHex(4290917164);   // #c2332c
    if (percent >= 80) return toHex(4294947099);   // #ffb11b
    if (percent >= 50) return toHex(4294947099);   // #ffb11b
    if (userCount > 0) return toHex(4284723554);   // #63b162

    return toHex(4291545793);                      // #cbcac1
};

/** CategoryElementFactory: colorMod = 9412607, color = -1, accumulator starts at 1 */
export const ALTERNATING_COLOR_MOD = 9412607;
export const ALTERNATING_COLOR_NONE = -1;

/** getModulatedBackgroundColor(modulation, baseColor) — -1 leaves the colour untouched */
export const getModulatedBackgroundColor = (modulation: number, base: number) => {
    if (modulation === -1) return toHex(base);

    const br = ((0xFF0000 & base) >> 16) / 255;
    const bg = ((0xFF00 & base) >> 8) / 255;
    const bb = (0xFF & base) / 255;
    const mr = ((0xFF0000 & modulation) >> 16) / 255;
    const mg = ((0xFF00 & modulation) >> 8) / 255;
    const mb = (0xFF & modulation) / 255;

    const r = br * Math.min(1, mr * 1.5);
    const g = bg * Math.min(1, mg * 1.5);
    const b = bb * Math.min(1, mb * 1.5);

    return toHex((Math.trunc(r * 255) << 16) + (Math.trunc(g * 255) << 8) + Math.trunc(b * 255));
};

/**
 * navigator_entry_tile declares color="0x0ebe9df" in navigator_frame_2.
 * navigator_entry_row_container declares no color, so it keeps
 * WindowModel._fillColor, which is 16777215 (0xFFFFFF) — see WindowModel.as:37.
 * Neither border sets background="true", so this colour tints the border graphic
 * rather than filling it; Pixi's multiplicative tint makes 0xFFFFFF the identity.
 */
export const TILE_BASE_COLOR = 0xEBE9DF;
export const ROW_BASE_COLOR = 0xFFFFFF;
