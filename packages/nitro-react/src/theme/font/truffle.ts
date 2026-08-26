import { Color } from 'pixi.js';
import type { HABBO_STYLES, RenderBuffer, RenderOptions } from 'truffle-text';
import { getTruffle, preloadTruffle } from 'truffle-text/react';

/**
 * Runtime (not build-time) text rendering via `truffle-text` - the pre-baked bitmap-font-atlas
 * approach this replaced could never fully reproduce truffle's own output: truffle's kerning,
 * subpixel positioning and pixel grid-fitting are all computed from the *whole string* being
 * shaped together, and decomposing that into independently-baked per-character advances
 * necessarily throws away exactly the contextual information that makes it look right (see git
 * history for the two rounds of atlas-side workarounds that still couldn't fully fix it). Truffle
 * is designed to be called at render time for a whole string via `renderToBuffer` - both render
 * targets do exactly that and blit the resulting RGBA buffer, matching the reference integration
 * this was ported from (github.com/iSetht/nitro-react-rose, per truffle's own author).
 */

/** A key into truffle's own certified `HABBO_STYLES` catalog (the 67 selectors transcribed
 *  from Habbo's decompiled styles.css) - see `theme/utils/textStyles.ts`'s `habboKey` field. */
export type HabboStyleKey = keyof typeof HABBO_STYLES;

const TRUFFLE_BASE = '/assets/truffle';

let preloadPromise: ReturnType<typeof preloadTruffle> | undefined;

/** Preloads truffle's font/calibration payload (see `public/assets/truffle`, extracted from the
 *  `truffle-text` package via `yarn truffle:setup`) - called alongside `loadThemeFonts()` in
 *  `index.tsx` so `getTruffle()` is already resolved before anything first renders. `styles: null`
 *  loads the base manifest/fonts only; `warmStyles` (pass `WIRED_HABBO_KEYS` from
 *  `theme/utils/textStyles.ts`) then eagerly loads calibration for every style this app actually
 *  references, so no first render risks a temporary uncalibrated/native-fallback render while a
 *  style's calibration is still in flight - anything outside that known set still lazy-loads
 *  normally on first use (one extra fetch, cached thereafter). */
export const preloadNitroTruffle = (warmStyles: readonly HabboStyleKey[] = []) => {
    preloadPromise ??= preloadTruffle({ base: TRUFFLE_BASE, styles: null }).then(async (truffle) => {
        if (warmStyles.length) await truffle.ensureStyles(warmStyles as HabboStyleKey[]);

        return truffle;
    });

    return preloadPromise;
};

/** Synchronous - safe to call during render once boot-time preload has resolved (the normal
 *  case). `undefined` before that, which callers treat as "fall back to native rendering", the
 *  same brief-flash tradeoff `useBitmapFont` used to document for the atlas it replaced. */
export const renderTruffleText = (text: string, habboKey: HabboStyleKey, options: RenderOptions): RenderBuffer | undefined => {
    const truffle = getTruffle();

    if (!truffle) return undefined;

    try {
        return truffle.renderToBuffer(text, habboKey, options);
    } catch {
        return undefined;
    }
};

/** Converts a CSS hex color string (`textOptions.fill` / a style's `color`) to the numeric
 *  form `RenderOptions.color` wants - reuses Pixi's own battle-tested parser rather than
 *  hand-rolling hex parsing a second time. */
export const colorStringToNumber = (color: string): number => new Color(color).toNumber();

/** Draws a truffle `RenderBuffer` onto an existing canvas via `putImageData` - no scaling,
 *  truffle already rasterized at the exact size/hinting the style calls for. Used directly by
 *  `TruffleTextDom` (its own JSX-rendered canvas) and by `bufferToCanvas` below (a fresh
 *  offscreen one, for Pixi's `Texture.from(...)`) - going through the same browser `ImageData`
 *  path on both backends is what guarantees they can never disagree on color/channel order the
 *  way a hand-rolled GPU buffer upload (e.g. Pixi's `BufferImageSource`, which defaults 8-bit
 *  typed arrays to BGRA) could. */
export const drawBufferToCanvas = (canvas: HTMLCanvasElement, buffer: RenderBuffer): void => {
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    try {
        ctx.putImageData(new ImageData(new Uint8ClampedArray(buffer.data), buffer.width, buffer.height), 0, 0);
    } catch {
        // Leave the canvas blank on a malformed buffer rather than throwing during render.
    }
};

/** Fresh offscreen canvas sized exactly to `buffer`, for `TruffleTextPixi`'s `Texture.from(...)`. */
export const bufferToCanvas = (buffer: RenderBuffer): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, buffer.width);
    canvas.height = Math.max(1, buffer.height);

    drawBufferToCanvas(canvas, buffer);

    return canvas;
};
