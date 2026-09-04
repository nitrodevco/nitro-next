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
    // `styles` limits the boot download/decode to the raster chunks these styles resolve to -
    // `styles: null` would eagerly decode EVERY packed chunk (~47MB of glyph tables) whether a
    // style is wired into the theme or not.
    preloadPromise ??= preloadTruffle({ base: TRUFFLE_BASE, styles: warmStyles.length ? (warmStyles as HabboStyleKey[]) : null });

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

export interface BakedShadow {
    /** The same text rasterised in the shadow colour. */
    buffer: RenderBuffer;
    angle: number;
    distance: number;
    alpha: number;
    /** The shadow colour as a number, for per-line re-rasterisation (`renderTruffleTextBlock`). */
    colorValue?: number;
}

/**
 * Fresh offscreen canvas sized exactly to `buffer`, for `TruffleTextPixi`'s `Texture.from(...)`.
 * With `shadow`, the shadow rasterisation is drawn first, offset by the shadow's distance/angle
 * at its alpha, and the text over it - the same composition `TruffleTextDom` does on its own
 * canvas, so both targets bake identical pixels.
 */
export const bufferToCanvas = (buffer: RenderBuffer, shadow?: BakedShadow): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, buffer.width);
    canvas.height = Math.max(1, buffer.height);

    if (shadow) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // `putImageData` ignores alpha/compositing, so stage the shadow on its own canvas
            // and composite that at the shadow's alpha.
            const layer = document.createElement('canvas');

            layer.width = Math.max(1, shadow.buffer.width);
            layer.height = Math.max(1, shadow.buffer.height);
            drawBufferToCanvas(layer, shadow.buffer);

            ctx.globalAlpha = shadow.alpha;
            ctx.drawImage(layer, Math.round(Math.cos(shadow.angle) * shadow.distance), Math.round(Math.sin(shadow.angle) * shadow.distance));
            ctx.globalAlpha = 1;
        }
    }

    if (shadow) {
        // Same staging for the text itself: `putImageData` would replace the shadow pixels
        // instead of compositing over them.
        const ctx = canvas.getContext('2d');
        const layer = document.createElement('canvas');

        layer.width = canvas.width;
        layer.height = canvas.height;
        drawBufferToCanvas(layer, buffer);
        ctx?.drawImage(layer, 0, 0);
    } else {
        drawBufferToCanvas(canvas, buffer);
    }

    return canvas;
};

/**
 * Renders `text` line by line and stacks the lines at an explicit `lineHeight` advance.
 * Truffle's own renderer ignores per-call leading (`renderToBuffer` forwards only
 * color/wordWrap/width/padding), so an explicit line height is composed here instead: each
 * line rasterised on its own and drawn `lineHeight` apart, shadow included. Only for explicit
 * newlines - word-wrapped text keeps truffle's own metrics.
 */
export const renderTruffleTextBlock = (text: string, habboKey: HabboStyleKey, options: RenderOptions, lineHeight: number, shadow?: Omit<BakedShadow, 'buffer'>): HTMLCanvasElement | undefined => {
    const lines = text.split('\n');
    const rendered = lines.map(line => renderTruffleText(line || ' ', habboKey, options));

    if (rendered.some(buffer => !buffer)) return undefined;

    const buffers = rendered as RenderBuffer[];
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, ...buffers.map(buffer => buffer.width));
    canvas.height = Math.max(1, lineHeight * (lines.length - 1) + (buffers[buffers.length - 1]?.height ?? lineHeight));

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    buffers.forEach((buffer, index) => {
        const shadowBuffer = shadow?.colorValue !== undefined ? renderTruffleText(lines[index] || ' ', habboKey, { ...options, color: shadow.colorValue }) : undefined;
        const line = bufferToCanvas(buffer, shadowBuffer && shadow ? { buffer: shadowBuffer, angle: shadow.angle, distance: shadow.distance, alpha: shadow.alpha } : undefined);

        ctx.drawImage(line, 0, index * lineHeight);
    });

    return canvas;
};
