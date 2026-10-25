/**
 * Direct ports of the SWF's navigator colour helpers.
 * — com.sulake.habbo.window.utils.getUserCountColor
 * — com.sulake.habbo.navigator.view.search.results.RoomEntryUtils.getModulatedBackgroundColor
 */
import { toCssHexColor } from '#base/utils';

/** getUserCountColor(userCount, maxUserCount) — ARGB constants straight from the SWF */
export const getUserCountColor = (userCount: number, maxUserCount: number) => {
    const percent = 100 * (userCount / maxUserCount);

    if (percent >= 92) return toCssHexColor(4290917164); // #c2332c
    if (percent >= 80) return toCssHexColor(4294947099); // #ffb11b
    if (percent >= 50) return toCssHexColor(4294947099); // #ffb11b
    if (userCount > 0) return toCssHexColor(4284723554); // #63b162

    return toCssHexColor(4291545793); // #cbcac1
};

/** CategoryElementFactory: colorMod = 9412607, color = -1, accumulator starts at 1 */
export const ALTERNATING_COLOR_MOD = 9412607;
export const ALTERNATING_COLOR_NONE = -1;

/** getModulatedBackgroundColor(modulation, baseColor) — -1 leaves the colour untouched */
export const getModulatedBackgroundColor = (modulation: number, base: number) => {
    if (modulation === -1) return toCssHexColor(base);

    const br = ((0xFF0000 & base) >> 16) / 255;
    const bg = ((0xFF00 & base) >> 8) / 255;
    const bb = (0xFF & base) / 255;
    const mr = ((0xFF0000 & modulation) >> 16) / 255;
    const mg = ((0xFF00 & modulation) >> 8) / 255;
    const mb = (0xFF & modulation) / 255;

    const r = br * Math.min(1, mr * 1.5);
    const g = bg * Math.min(1, mg * 1.5);
    const b = bb * Math.min(1, mb * 1.5);

    return toCssHexColor((Math.trunc(r * 255) << 16) + (Math.trunc(g * 255) << 8) + Math.trunc(b * 255));
};

/**
 * `getNewRowElement` modulates the row's own colour: `navigator_entry_row_container` declares none,
 * so it keeps `WindowModel._fillColor`, 16777215 (0xFFFFFF). A tile keeps its layout colour - the
 * factory hands `getNewTileElement` the alternating colour and does not use it.
 */
export const ROW_BASE_COLOR = 0xFFFFFF;
