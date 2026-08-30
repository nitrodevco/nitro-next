import { THEME_URLS } from './themeUrls';

/**
 * One theme asset's rect inside the packed atlas (`public/assets/theme-atlas/atlas.png`, built
 * by scripts/build-theme-atlas.ts from every `THEME_URLS` entry).
 */
export interface ThemeSprite {
    /** The `THEME_URLS` key. */
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ThemeAtlas {
    /** The atlas image's own URL - the one network/decoded copy every DOM reference shares. */
    url: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}

let atlas: ThemeAtlas | undefined;
const sprites = new Map<string, ThemeSprite>();

/**
 * Standalone copies sliced out of the atlas on demand, each made once and kept for the
 * session: a plain slice (DOM `border-image`/`background-repeat` can't address a sub-rect of a
 * sheet; Pixi's TilingSprite can't repeat one), a tinted slice (`multiply` + alpha clip, the
 * DOM equivalent of a sprite `tint`) and a solid-colour silhouette (the DOM/Pixi `blend`
 * highlight). Keyed by theme key + colour so nothing is ever rendered to a canvas twice.
 */
const sliceCanvases = new Map<string, HTMLCanvasElement>();
const sliceUrls = new Map<string, string>();

/** Registers the atlas and every sprite rect it holds. Called once by `preloadThemeAssets`. */
export const registerThemeAtlas = (image: HTMLImageElement, url: string, frames: Record<string, { frame: { x: number; y: number; w: number; h: number } }>): void => {
    atlas = { url, width: image.naturalWidth, height: image.naturalHeight, image };

    for (const [ key, fileUrl ] of Object.entries(THEME_URLS)) {
        const rect = frames[fileUrl.replace(/^\.\//, '')]?.frame;

        if (rect) sprites.set(key, { key, x: rect.x, y: rect.y, width: rect.w, height: rect.h });
    }
};

export const getThemeAtlas = (): ThemeAtlas | undefined => atlas;

/** The atlas rect of a theme key, or `undefined` while the atlas hasn't loaded (callers fall back to the per-file `THEME_URLS` URL). */
export const getThemeSprite = (key: string | undefined): ThemeSprite | undefined => (key ? sprites.get(key) : undefined);

export type ThemeSliceEffect = { kind: 'plain' } | { kind: 'tint'; color: string } | { kind: 'silhouette'; color: string };

const effectId = (effect: ThemeSliceEffect): string => (effect.kind === 'plain' ? 'plain' : `${effect.kind}:${effect.color}`);

/**
 * A canvas holding one theme sprite cut out of the atlas, optionally recoloured. Synchronous
 * (the atlas is already decoded), so a first render never flashes without its chrome.
 */
export const getThemeSliceCanvas = (key: string, effect: ThemeSliceEffect = { kind: 'plain' }): HTMLCanvasElement | undefined => {
    const sprite = sprites.get(key);

    if (!atlas || !sprite) return undefined;

    const cacheKey = `${key}|${effectId(effect)}`;
    const cached = sliceCanvases.get(cacheKey);

    if (cached) return cached;

    const canvas = document.createElement('canvas');

    canvas.width = sprite.width;
    canvas.height = sprite.height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    ctx.drawImage(atlas.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);

    if (effect.kind === 'tint') {
        // Multiply the colour in, then clip back to the art's own alpha shape.
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = effect.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(atlas.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
    } else if (effect.kind === 'silhouette') {
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = effect.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    sliceCanvases.set(cacheKey, canvas);

    return canvas;
};

/** `getThemeSliceCanvas` as an image URL for CSS, encoded once per key + effect. */
export const getThemeSliceUrl = (key: string, effect: ThemeSliceEffect = { kind: 'plain' }): string | undefined => {
    const cacheKey = `${key}|${effectId(effect)}`;
    const cached = sliceUrls.get(cacheKey);

    if (cached) return cached;

    const canvas = getThemeSliceCanvas(key, effect);

    if (!canvas) return undefined;

    const url = canvas.toDataURL('image/png');

    sliceUrls.set(cacheKey, url);

    return url;
};

/**
 * CSS that shows one theme sprite straight out of the shared atlas image, for a box of any
 * size - `background-size`/`background-position` in percentages scale the sheet so exactly
 * this sprite's rect fills the box (the percentage position formula: with the sheet scaled to
 * `W/w` of the box, an offset of `x/(W-w)` lands the rect's left edge on the box's left edge).
 * `offset` selects a sub-frame of the sprite (an icon out of the icon sheet).
 */
export const themeSpriteFillStyle = (sprite: ThemeSprite, offset?: { x: number; y: number; width: number; height: number }): {
    backgroundImage: string; backgroundSize: string; backgroundPosition: string; backgroundRepeat: 'no-repeat';
} | undefined => {
    if (!atlas) return undefined;

    const x = sprite.x + (offset?.x ?? 0);
    const y = sprite.y + (offset?.y ?? 0);
    const width = offset?.width ?? sprite.width;
    const height = offset?.height ?? sprite.height;
    const positionX = atlas.width === width ? 0 : (x / (atlas.width - width)) * 100;
    const positionY = atlas.height === height ? 0 : (y / (atlas.height - height)) * 100;

    return {
        backgroundImage: `url(${atlas.url})`,
        backgroundSize: `${(atlas.width / width) * 100}% ${(atlas.height / height) * 100}%`,
        backgroundPosition: `${positionX}% ${positionY}%`,
        backgroundRepeat: 'no-repeat',
    };
};

/**
 * CSS that shows a theme sprite (or a sub-frame of it) at its native size out of the atlas -
 * plain pixel offsets, for boxes sized to the sprite.
 */
export const themeSpriteNativeStyle = (sprite: ThemeSprite, offset?: { x: number; y: number }): {
    backgroundImage: string; backgroundPosition: string; backgroundRepeat: 'no-repeat';
} | undefined => (atlas
    ? {
            backgroundImage: `url(${atlas.url})`,
            backgroundPosition: `-${sprite.x + (offset?.x ?? 0)}px -${sprite.y + (offset?.y ?? 0)}px`,
            backgroundRepeat: 'no-repeat',
        }
    : undefined);
