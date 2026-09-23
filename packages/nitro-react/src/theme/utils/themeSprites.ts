import { boxBlurAlpha } from './boxBlur';
import { THEME_ASSETS } from './themeAssets';

/**
 * One theme asset's rect inside the packed sheet the `theme` bundle carries (`theme.png`, built
 * by scripts/build-asset-bundles.ts from every `THEME_ASSETS` entry).
 */
export interface ThemeSprite {
    /** The `THEME_ASSETS` key. */
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ThemeAtlas {
    width: number;
    height: number;
    /** The decoded sheet, for slicing a sprite onto a canvas - the `ImageBitmap` the bundle decoded to. */
    image: CanvasImageSource;
}

let atlas: ThemeAtlas | undefined;
const sprites = new Map<string, ThemeSprite>();

/**
 * Standalone copies sliced out of the atlas on demand, each made once and kept for the session:
 * a plain slice (Pixi's TilingSprite cannot repeat a sub-rect of a sheet), a solid-colour
 * silhouette (the sprite's alpha shape in one colour) and a drop shadow (a blurred silhouette).
 * Keyed by theme key + effect so nothing is ever rendered to a canvas twice.
 */
const sliceCanvases = new Map<string, HTMLCanvasElement>();

/** Registers the sheet and every sprite rect it holds. Called once by `preloadThemeAssets`. */
export const registerThemeAtlas = (sheet: { image: CanvasImageSource; width: number; height: number }, frames: Record<string, { frame: { x: number; y: number; w: number; h: number } }>): void => {
    atlas = sheet;

    for (const [ key, asset ] of Object.entries(THEME_ASSETS)) {
        const rect = frames[asset]?.frame;

        if (rect) sprites.set(key, { key, x: rect.x, y: rect.y, width: rect.w, height: rect.h });
    }
};

/** The sheet rect of a theme key, or `undefined` while the `theme` bundle hasn't loaded. */
export const getThemeSprite = (key: string | undefined): ThemeSprite | undefined => (key ? sprites.get(key) : undefined);

export type ThemeSliceEffect
    = | { kind: 'plain' }
        | { kind: 'tint'; color: string }
        | { kind: 'silhouette'; color: string }
        /**
         * A Flash `DropShadowFilter` of the sprite: its silhouette in `color` at `alpha`,
         * box-blurred `blurX` x `blurY` wide (quality 1), on a canvas padded `pad` on every side
         * so the blur has room to spread past the art's edge.
         */
        | { kind: 'shadow'; color: string; alpha: number; blurX: number; blurY: number; pad: number };

export const themeSliceEffectId = (effect: ThemeSliceEffect): string => {
    switch (effect.kind) {
        case 'plain': return 'plain';
        case 'shadow': return `shadow:${effect.color}:${effect.alpha}:${effect.blurX}:${effect.blurY}:${effect.pad}`;
        default: return `${effect.kind}:${effect.color}`;
    }
};

/**
 * Closes a partly painted skin downwards: every empty row below the last painted one repeats
 * that row.
 *
 * A window skin does not have to paint its whole sheet, and the shadow is of the window, not of
 * one sheet - Flash filtered the rendered window and cast a shadow down its full height. The
 * skin's own sheets are unioned before this runs (`ShadowLayer`), which is what closes the
 * ubuntu frames, whose colorizing sheet holds only the title bar and whose `-plain` sheet holds
 * the body; this is left for a sheet taller than any of its art - `frame-7`'s 64x73 template,
 * whose bottom 9 rows no sheet paints - so the shadow still reaches the window's own bottom
 * instead of stopping short of it. A sheet painted to its last row is left exactly as it was.
 */
const extendLastPaintedRow = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, pad: number): void => {
    const image = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const { data } = image;
    const rowIsEmpty = (y: number): boolean => {
        for (let x = 0; x < canvasWidth; x++) {
            if (data[(((y * canvasWidth) + x) * 4) + 3]) return false;
        }

        return true;
    };

    // The art sits inside the padding the blur needs, so only its own rows are candidates.
    const bottom = canvasHeight - pad;

    let last = bottom - 1;

    while ((last >= pad) && rowIsEmpty(last)) last--;

    // Painted to the bottom already, or nothing painted at all.
    if ((last < pad) || (last === (bottom - 1))) return;

    const start = last * canvasWidth * 4;
    const stride = canvasWidth * 4;

    for (let y = last + 1; y < bottom; y++) data.copyWithin(y * stride, start, start + stride);

    ctx.putImageData(image, 0, 0);
};

/** The rect of the sheet a slice occupies - `ThemeSprite` without its key. */
export type SliceRect = Pick<ThemeSprite, 'x' | 'y' | 'width' | 'height'>;

/**
 * Draws `slices` of `source`, stacked on one another at the first one's size, onto a fresh
 * canvas with `effect` applied - the one recolour routine every atlas slice and effect texture
 * shares. All but the shadow pass a single rect; a shadow passes every sheet the skin is drawn
 * from, so the silhouette it blurs is the whole window's shape (see `getThemeSliceCanvas`).
 */
export const renderSliceEffect = (source: CanvasImageSource, slices: readonly SliceRect[], effect: ThemeSliceEffect): HTMLCanvasElement | undefined => {
    const [ first ] = slices;

    if (!first) return undefined;

    const { width, height } = first;
    const pad = (effect.kind === 'shadow') ? effect.pad : 0;
    const canvas = document.createElement('canvas');

    canvas.width = width + (pad * 2);
    canvas.height = height + (pad * 2);

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    const drawSlices = () => {
        for (const slice of slices) ctx.drawImage(source, slice.x, slice.y, slice.width, slice.height, pad, pad, slice.width, slice.height);
    };

    drawSlices();

    // Before the silhouette is taken, so the window's body casts a shadow too.
    if (effect.kind === 'shadow') extendLastPaintedRow(ctx, canvas.width, canvas.height, pad);

    if (effect.kind === 'tint') {
        // Multiply the colour in, then clip back to the art's own alpha shape.
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = effect.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-in';
        drawSlices();
    } else if (effect.kind === 'silhouette' || effect.kind === 'shadow') {
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = effect.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (effect.kind === 'shadow') {
        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = image;

        for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * effect.alpha);

        boxBlurAlpha(image, effect.blurX, effect.blurY);
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(image, 0, 0);
    }

    return canvas;
};

/**
 * A canvas holding one theme sprite cut out of the atlas, optionally recoloured. Synchronous
 * (the atlas is already decoded), so a first render never flashes without its chrome.
 *
 * Several keys are drawn over one another at the first one's size, for a skin whose shape is
 * spread over more than one sheet - the shadow's silhouette (see `ShadowLayer`). Every key has
 * to resolve, so a sheet the atlas has not registered yields nothing rather than half a shape.
 */
export const getThemeSliceCanvas = (key: string | readonly string[], effect: ThemeSliceEffect = { kind: 'plain' }): HTMLCanvasElement | undefined => {
    const keys = (typeof key === 'string') ? [ key ] : key;
    const slices = keys.map(name => sprites.get(name)).filter((sprite): sprite is ThemeSprite => !!sprite);

    if (!atlas || (slices.length !== keys.length) || !slices.length) return undefined;

    const cacheKey = `${keys.join('+')}|${themeSliceEffectId(effect)}`;
    const cached = sliceCanvases.get(cacheKey);

    if (cached) return cached;

    const canvas = renderSliceEffect(atlas.image, slices, effect);

    if (!canvas) return undefined;

    sliceCanvases.set(cacheKey, canvas);

    return canvas;
};
