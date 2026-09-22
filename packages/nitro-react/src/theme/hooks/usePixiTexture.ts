import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Assets, groupD8, Rectangle, Texture } from 'pixi.js';
import { useSyncExternalStore } from 'react';

import { isAssetName, lazyBundleForAsset, loadAssetBundle } from '#base/utils';

import { SpriteFrame } from '../utils/spriteFrame';
import { getThemeSliceCanvas, ThemeSliceEffect, themeSliceEffectId } from '../utils/themeSprites';

// ---------------------------------------------------------------------------------------------
// Theme textures - every chrome sprite the `theme` bundle's sheet holds, as a `Texture` sharing
// its one base texture (see utils/themeAssetBundle.ts). Filled once at boot; every lookup after that
// is a synchronous Map read, so no component ever creates a texture of its own for chrome.
//
// Every texture derived from one (a standalone copy, a silhouette, a shadow, a greyscale) is
// stored in the shared `AssetManager` under a namespaced key, so there is one registry of what
// the UI holds and nothing is built twice. Pixi's own global `Cache` is skipped for those
// (`Texture.from(canvas, true)`): it would otherwise keep a second strong reference to every
// canvas, released only by an explicit `destroy`.
// ---------------------------------------------------------------------------------------------

const themeTextures = new Map<string, Texture>();
const croppedTextures = new Map<string, Texture>();

export const registerThemeTexture = (key: string, texture: Texture): void => {
    themeTextures.set(key, texture);
};

/** The atlas-backed texture of a theme key, if the atlas has loaded. */
export const getThemeTexture = (key: string | undefined): Texture | undefined => (key ? themeTextures.get(key) : undefined);

/** A canvas as a texture the UI owns: pixel art, and outside Pixi's global `Cache` (see the module docblock). */
export const textureFromCanvas = (canvas: HTMLCanvasElement, label: string): Texture => {
    const texture = Texture.from(canvas, true);

    texture.source.scaleMode = 'nearest';
    texture.label = label;

    return texture;
};

/**
 * A texture built from a canvas once and kept in the `AssetManager` under `key` - the one
 * path every derived UI texture takes, so a second request for the same key finds the first.
 */
export const getOrBuildTexture = (key: string, build: () => HTMLCanvasElement | undefined): Texture | undefined => {
    const assetManager = GetAssetManager();
    const cached = assetManager.getTexture(key);

    if (cached) return cached;

    const canvas = build();

    if (!canvas) return undefined;

    const texture = textureFromCanvas(canvas, key);

    assetManager.setTexture(key, texture);

    return texture;
};

/**
 * A theme sprite as its own texture (its own source, `frame` = its full size) rather than a
 * region of the atlas. Only `TilingSprite` needs this: it can't repeat a sub-rect of a larger
 * source (`TilingSpritePipe` treats any texture whose frame is smaller than its source as
 * "not simple" and samples it flat instead of wrapping). Cut out of the decoded atlas image
 * once per key and kept.
 */
export const getStandaloneThemeTexture = (key: string | undefined): Texture | undefined => (key
    ? getOrBuildTexture(`theme:standalone:${key}`, () => getThemeSliceCanvas(key))
    : undefined);

/**
 * A theme sprite with a `ThemeSliceEffect` applied (a silhouette, a drop shadow) as its own
 * texture, cut out of the decoded atlas once per key + effect and kept.
 */
export const getThemeEffectTexture = (key: string | undefined, effect: ThemeSliceEffect): Texture | undefined => (key
    ? getOrBuildTexture(`theme:effect:${key}|${themeSliceEffectId(effect)}`, () => getThemeSliceCanvas(key, effect))
    : undefined);

/**
 * A copy of any loaded texture's frame on a 2D canvas, for a per-pixel derivation. Needs a
 * source a canvas can read (an image, bitmap or canvas; a render texture yields nothing).
 */
const textureToCanvas = (texture: Texture): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | undefined => {
    const resource = texture.source.resource as CanvasImageSource | undefined;

    if (!resource || typeof resource !== 'object') return undefined;

    const { x, y, width, height } = texture.frame;
    const canvas = document.createElement('canvas');

    canvas.width = Math.max(1, Math.ceil(width));
    canvas.height = Math.max(1, Math.ceil(height));

    const ctx = canvas.getContext('2d');

    if (!ctx) return undefined;

    try {
        ctx.drawImage(resource, x, y, width, height, 0, 0, width, height);
    } catch {
        return undefined;
    }

    return { canvas, ctx };
};

/** A texture's alpha channel, one byte per texel of its frame, row by row. */
export interface TextureAlpha {
    width: number;
    height: number;
    data: Uint8Array;
}

/** `null` marks a texture whose pixels a canvas cannot read (a render texture, a tainted image). */
const alphaChannels = new WeakMap<Texture, TextureAlpha | null>();

/**
 * The alpha channel of a loaded texture's frame - for an atlas sprite only its own sub-rect of
 * the shared sheet - read once per texture and kept as long as the texture is. The frame is read
 * as stored: a groupD8 `rotate` (a mirrored copy, see `getMirroredTexture`) is not applied, so
 * pass the unmirrored texture and mirror the coordinates. `undefined` when the pixels can't be read.
 */
export const getTextureAlpha = (texture: Texture): TextureAlpha | undefined => {
    const cached = alphaChannels.get(texture);

    if (cached !== undefined) return cached ?? undefined;

    const drawn = textureToCanvas(texture);
    let alpha: TextureAlpha | null = null;

    if (drawn) {
        try {
            const { width, height } = drawn.canvas;
            const pixels = drawn.ctx.getImageData(0, 0, width, height).data;
            const data = new Uint8Array(width * height);

            for (let i = 0; i < data.length; i++) data[i] = pixels[(i * 4) + 3];

            alpha = { width, height, data };
        } catch {
            alpha = null;
        }
    }

    alphaChannels.set(texture, alpha);

    return alpha ?? undefined;
};

/**
 * The alpha (0-255) of the texel under `(x, y)` in `alpha`'s frame, or 0 off it - Flash's
 * `BitmapData.getPixel32(x, y) >>> 24`, the value `BitmapData.hitTest` holds to its threshold.
 */
export const alphaAt = (alpha: TextureAlpha, x: number, y: number): number => {
    const u = Math.floor(x);
    const v = Math.floor(y);

    if (u < 0 || v < 0 || u >= alpha.width || v >= alpha.height) return 0;

    return alpha.data[(v * alpha.width) + u];
};

/** Derived textures of sources the `AssetManager` doesn't hold (a caller's own render), kept only as long as the source is. */
const transientDerived = new WeakMap<Texture, Map<string, Texture>>();

/**
 * One derived texture per source texture + variant, built by `derive` on first use. A source
 * the `AssetManager` holds (a layout bitmap, an atlas sprite, a crop of one) gets its derivation
 * registered there under `derived:<source>|<variant>`; any other source keeps its derivations
 * in a `WeakMap`, so they go when it does.
 */
const getDerivedTexture = (texture: Texture, variant: string, derive: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void): Texture | undefined => {
    const build = () => {
        const drawn = textureToCanvas(texture);

        if (!drawn) return undefined;

        derive(drawn.ctx, drawn.canvas);

        return drawn.canvas;
    };
    const label = texture.label;

    if (label && GetAssetManager().getTexture(label) === texture) return getOrBuildTexture(`derived:${label}|${variant}`, build);

    let byVariant = transientDerived.get(texture);
    const cached = byVariant?.get(variant);

    if (cached) return cached;

    const canvas = build();

    if (!canvas) return undefined;

    const derived = textureFromCanvas(canvas, `${label ?? 'texture'} (${variant})`);

    if (!byVariant) {
        byVariant = new Map();
        transientDerived.set(texture, byVariant);
    }

    byVariant.set(variant, derived);

    return derived;
};

/**
 * A solid-colour silhouette of any loaded texture (a layout bitmap, an icon-sheet frame) - the
 * copy a dynamic style's etching draws under a bitmap, or the white the `+77` brightening adds
 * over it. One per texture + colour.
 */
export const getTextureSilhouette = (texture: Texture, color: string): Texture | undefined => getDerivedTexture(texture, `silhouette:${color}`, (ctx, canvas) => {
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

/** The client's `BitmapDataRenderer` greyscale weights (Rec. 709 luminance). */
const GREY_R = 0.212671;
const GREY_G = 0.71516;
const GREY_B = 0.072169;

/**
 * A loaded texture reduced to luminance - a bitmap's `greyscale` variable. The client's
 * `ColorMatrixFilter` rows are the window colour's multipliers times these weights, so the
 * grey copy still takes the sprite's ordinary multiply `tint` to match it exactly. Alpha is
 * kept as is.
 */
export const getTextureGreyscale = (texture: Texture): Texture | undefined => getDerivedTexture(texture, 'greyscale', (ctx, canvas) => {
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = image;

    for (let i = 0; i < data.length; i += 4) {
        const grey = Math.round((data[i] * GREY_R) + (data[i + 1] * GREY_G) + (data[i + 2] * GREY_B));

        data[i] = grey;
        data[i + 1] = grey;
        data[i + 2] = grey;
    }

    ctx.putImageData(image, 0, 0);
});

/**
 * A bitmap's `rotation` variable (`BitmapDataRenderer.draw`): the source turned about its own
 * centre into a transparent bitmap of the *same* size, so whatever the turn carries past that
 * rect is cut off, and drawn without smoothing. Done before any scaling, as the client does.
 */
export const getTextureRotated = (texture: Texture, degrees: number): Texture | undefined => getDerivedTexture(texture, `rotate:${degrees}`, (ctx, canvas) => {
    const copy = document.createElement('canvas');

    copy.width = canvas.width;
    copy.height = canvas.height;
    copy.getContext('2d')?.drawImage(canvas, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees / 180) * Math.PI);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(copy, 0, 0);
});

const mirroredTextures = new WeakMap<Texture, Map<number, Texture>>();

/**
 * A texture drawn mirrored - horizontally, vertically or both - sharing its source. The flip is
 * the texture's groupD8 `rotate`, so the sprite keeps an ordinary positive scale and `@pixi/layout`
 * places it in its box as usual (a negative sprite scale would flip it about its corner, out of
 * the box). One per source texture + axes, kept only as long as the source is.
 */
export const getMirroredTexture = (texture: Texture, flipX: boolean, flipY: boolean): Texture => {
    if (!flipX && !flipY) return texture;

    const rotate = flipX && flipY ? groupD8.W : (flipX ? groupD8.MIRROR_HORIZONTAL : groupD8.MIRROR_VERTICAL);
    let byRotate = mirroredTextures.get(texture);
    const cached = byRotate?.get(rotate);

    if (cached) return cached;

    const mirrored = new Texture({
        source: texture.source,
        frame: texture.frame.clone(),
        orig: texture.orig.clone(),
        trim: texture.trim?.clone(),
        rotate: groupD8.add(texture.rotate, rotate),
        label: texture.label ? `${texture.label} (mirror:${rotate})` : undefined,
    });

    if (!byRotate) {
        byRotate = new Map();
        mirroredTextures.set(texture, byRotate);
    }

    byRotate.set(rotate, mirrored);

    return mirrored;
};

/**
 * A sub-frame of a texture (an icon out of the icon sheet, a slice of a nine-slice for tiling),
 * sharing its source. Cached per source + rect so repeated mounts of the same icon reuse one
 * `Texture` object instead of allocating a new one each time, and registered with the
 * `AssetManager` under the source's name plus the rect so a derivation of the crop has a
 * stable key too.
 */
export const getCroppedTexture = (base: Texture, frame: SpriteFrame): Texture => {
    const x = base.frame.x + frame.x;
    const y = base.frame.y + frame.y;
    const cacheKey = `${base.uid}|${x},${y},${frame.width},${frame.height}`;
    const cached = croppedTextures.get(cacheKey);

    if (cached) return cached;

    const texture = new Texture({ source: base.source, frame: new Rectangle(x, y, frame.width, frame.height) });
    const assetManager = GetAssetManager();

    if (base.label && assetManager.getTexture(base.label) === base) assetManager.setTexture(`${base.label}@${frame.x},${frame.y},${frame.width},${frame.height}`, texture);

    croppedTextures.set(cacheKey, texture);

    return texture;
};

// ---------------------------------------------------------------------------------------------
// Arbitrary URLs (avatar images, room thumbnails, a layout's bitmaps) - loaded through the
// shared AssetManager and cached there.
// ---------------------------------------------------------------------------------------------

const textureCache = new Map<string, Promise<Texture | undefined>>();
const RETRY_DELAYS_MS = [ 500, 1500, 4000 ];

/**
 * `AssetManager.downloadAsset` swallows its own fetch/decode errors internally (try/catch,
 * returns `false`) rather than rejecting - so a transient failure for a single asset URL never
 * throws here either, it just resolves `undefined`. Evicting that entry lets the next call for
 * the same URL retry instead of reusing the cached `undefined` forever.
 */
/**
 * Resolves a url to a texture through the shared asset manager, once per url - the room's badge
 * loader wants the same thing `useTextureFromUrl` does, without being a component.
 */
export const loadTexture = (url: string): Promise<Texture | undefined> => {
    const cached = textureCache.get(url);

    if (cached) return cached;

    const promise = (async () => {
        let texture = GetAssetManager().getTexture(url);

        // A bundle asset name, not a url. Everything the preload covers is already in the asset
        // manager; a name belonging to a bundle that is loaded on demand pulls that bundle in
        // once and is found on the way out. A name in neither is a typo or a missing build, and
        // the `undefined` stays cached so the retry loop below doesn't chase it.
        if (!texture && isAssetName(url)) {
            const bundle = lazyBundleForAsset(url);

            if (bundle && await loadAssetBundle(bundle)) texture = GetAssetManager().getTexture(url);

            return texture;
        }

        if (!texture && (url.startsWith('data:') || url.startsWith('blob:'))) {
            // `AssetManager.downloadAsset` routes by file extension, which a data/blob URL
            // doesn't have (a generated thumbnail, an extracted render) - Pixi's own loader
            // detects those by mime type instead.
            try {
                texture = await Assets.load<Texture>(url);

                if (texture) GetAssetManager().setTexture(url, texture);
            } catch {
                texture = undefined;
            }

            if (!texture) textureCache.delete(url);

            return texture;
        }

        if (!texture) {
            await GetAssetManager().downloadAsset(url);

            texture = GetAssetManager().getTexture(url);

            if (!texture) textureCache.delete(url);
        }

        return texture;
    })();

    textureCache.set(url, promise);

    return promise;
};

/**
 * Resolves an arbitrary asset URL to a Pixi Texture, downloading it through the shared
 * GetAssetManager() if it isn't already cached. Since the UI and the room share one
 * renderer/context (see theme/PixiApplicationRoot), a texture used by both is fetched,
 * decoded, and GPU-uploaded exactly once. Retries a few times (with backoff) on failure rather
 * than leaving an already-mounted component stuck blank forever.
 */
export const useTextureFromUrl = (url: string | undefined): Texture | undefined => {
    // The asset manager is the source of truth: whatever it holds for the url is what is shown,
    // so an already-cached texture is there on the very first render with nothing to copy into
    // state, and a change of url can never show the previous url's texture.
    const getSnapshot = () => (url ? GetAssetManager().getTexture(url) : undefined);

    // Subscribing is what starts the download; a finished load is the change to re-read.
    const subscribe = (onChange: () => void) => {
        if (!url || GetAssetManager().getTexture(url)) return () => {};

        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const attempt = (retriesLeft: number) => {
            void loadTexture(url).then((result) => {
                if (cancelled) return;

                if (result) {
                    onChange();
                } else if (retriesLeft > 0) {
                    const delay = RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - retriesLeft];

                    timeoutId = setTimeout(() => attempt(retriesLeft - 1), delay);
                }
            });
        };

        attempt(RETRY_DELAYS_MS.length);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    };

    return useSyncExternalStore(subscribe, getSnapshot);
};

export interface PixiTextureOptions {
    /** A texture with its own source (for `TilingSprite`) - see `getStandaloneThemeTexture`. */
    standalone?: boolean;
}

/**
 * Resolves a theme asset key (`'border-9-default-src'`) to its Pixi Texture - the one the
 * `theme` bundle's sheet was cut into at boot, read synchronously with no state. `undefined`
 * until that bundle has landed, and for a key the sheet does not carry.
 */
export const usePixiTexture = (themeKey: string | undefined, options?: PixiTextureOptions): Texture | undefined => (options?.standalone
    ? getStandaloneThemeTexture(themeKey)
    : getThemeTexture(themeKey));

/** A theme key with an effect applied, as a texture - cut out of the sheet once per key + effect. */
export const usePixiEffectTexture = (themeKey: string | undefined, effect: ThemeSliceEffect): Texture | undefined => getThemeEffectTexture(themeKey, effect);
