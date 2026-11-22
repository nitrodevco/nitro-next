/**
 * Not Flash's: `asset.overlays`, the hotel variable a theme replaces single bitmaps of a library with -
 * one frame's art, one icon - instead of shipping a copy of the whole library. `{ "<library>/<asset>":
 * "<url>" }`, the object or the object as JSON text; Turbo merges each plugin's entries in, a file of
 * its `wwwroot` named by its path (turbo-cloud `docs/extensions.md`).
 *
 * The asset is named as the library's bundle has it: a bitmap of the library's own by its asset name
 * (`habbo-room-ui-com/roomtools_gear` is the texture `habbo-room-ui-com-roomtools_gear`), a sprite of
 * the theme sheet the window manager library carries by its sprite name
 * (`habbo-window-manager-com/theme-habbo-frame-frame-default`, a frame's art). The bitmap is loaded and
 * put in the asset manager under that texture's name as the bundle loads (`loadAssetBundle`), before
 * anything reads it - the theme registers its sprites from the asset manager after (`preloadThemeAssets`),
 * cutting a slice of an overlaid sprite from the overlay rather than the sheet.
 *
 * An overlay keeps the size of the bitmap it replaces: a frame's nine-slice rects are of the sheet's
 * sprite. One of another size is still used and logged; one that does not load is said on the console
 * (with its address, whatever `log.error` is) and the library's own stays.
 *
 * Live reload (`theme/themeLive.ts`) draws a changed `asset.overlays` with no bundle loaded again
 * (`reapplyAssetOverlays`): each bitmap's own is kept the first time it is replaced, to put back when
 * an overlay is taken away.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { ASSET_OVERLAYS_KEY, overlayTextureName, parseAssetOverlays, preloadThemeAssets, resetThemeArtCaches, THEME_SKIN_LIBRARY } from '@nitrodevco/nitro-theme';
import type { Texture } from 'pixi.js';

import { checkThemeOverlays } from './assetOverlayCheck';

/** Each bundle's overlays, applied once: a bundle is fetched once too. */
const applied = new Map<string, Promise<void>>();
/** The bundles whose overlays are still loading: a window drawn from one waits (`assetOverlaysPending`). */
const pending = new Set<string>();
/** The library's own texture of each bitmap an overlay replaced, by texture name. */
const originals = new Map<string, Texture>();
/** The overlay each replaced bitmap is drawn from now, by texture name. */
const drawn = new Map<string, { library: string; url: string }>();

const applyOne = async (library: string, asset: string, url: string): Promise<boolean> => {
    const name = overlayTextureName(library, asset);
    const assetManager = GetAssetManager();
    const own = originals.get(name) ?? assetManager.getTexture(name);

    if (!own) {
        NitroLogger.warn('AssetOverlays', `${library}/${asset}: the library has no such bitmap (${name}); the overlay is not used.`);

        return false;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const texture = await TextureUtils.textureFromEncodedBytes(await response.blob(), 'image/png', name);

        if (texture.width !== own.width || texture.height !== own.height) NitroLogger.warn('AssetOverlays', `${library}/${asset}: the overlay is ${texture.width}x${texture.height}, the bitmap it replaces ${own.width}x${own.height}.`);

        if (!originals.has(name)) originals.set(name, own);

        assetManager.setTexture(name, texture);
        drawn.set(name, { library, url });

        return true;
    } catch (error) {
        const message = `${library}/${asset}: ${url} did not load (${error instanceof Error ? error.message : String(error)}); the library's own is used.`;

        NitroLogger.error('AssetOverlays', message);
        // Said whatever `log.error` is: the browser's own line is a bare 404 that names no overlay.
        console.warn('[AssetOverlays]', message);

        return false;
    }
};

/**
 * Puts a bundle's overlays (`overlays`, the hotel's `asset.overlays`) over its bitmaps, once the
 * bundle is in. Resolves when every one has loaded or failed; never rejects.
 */
export const applyAssetOverlays = (bundle: string, overlays: unknown): Promise<void> => {
    let promise = applied.get(bundle);

    if (!promise) {
        const parsed = parseAssetOverlays(overlays);

        if (!parsed) NitroLogger.warn('AssetOverlays', `${ASSET_OVERLAYS_KEY} is not JSON: no bitmap is replaced.`);

        const assets = parsed?.get(bundle);

        if (import.meta.env.DEV && assets && (bundle === THEME_SKIN_LIBRARY)) checkThemeOverlays(assets.keys());

        if (assets) {
            pending.add(bundle);
            promise = Promise.all([ ...assets ].map(([ asset, url ]) => applyOne(bundle, asset, url))).then(() => {
                pending.delete(bundle);
            });
        } else {
            promise = Promise.resolve();
        }

        applied.set(bundle, promise);
    }

    return promise;
};

/** Forgets a bundle's overlays with the bundle (`unloadAssetBundle`), so loading it again applies them again. */
export const forgetAssetOverlays = (bundle: string) => {
    applied.delete(bundle);
    pending.delete(bundle);
};

/** Whether a bundle's overlays are still loading: its bitmaps are not yet the ones to draw. */
export const assetOverlaysPending = (bundle: string) => pending.has(bundle);

/**
 * Live reload: draws `overlays` (the hotel's new `asset.overlays`) over the bundles already in - a
 * bitmap whose overlay changed loaded again, one no longer named put back to the library's own - and
 * registers the theme's sprites again when one of the theme sheet's changed. Resolves true when any
 * bitmap changed (what is open is drawn again); never rejects. A bundle loading later reads the
 * hotel's variables as it loads.
 */
export const reapplyAssetOverlays = async (overlays: unknown): Promise<boolean> => {
    const parsed = parseAssetOverlays(overlays) ?? new Map<string, Map<string, string>>();
    const wanted = new Map<string, { library: string; asset: string; url: string }>();

    for (const library of applied.keys()) {
        for (const [ asset, url ] of parsed.get(library) ?? []) wanted.set(overlayTextureName(library, asset), { library, asset, url });
    }

    const assetManager = GetAssetManager();
    let changed = false;
    let theme = false;

    for (const [ name, { library } ] of drawn) {
        if (wanted.has(name)) continue;

        const original = originals.get(name);

        if (original) assetManager.setTexture(name, original);

        drawn.delete(name);
        changed = true;
        theme ||= library === THEME_SKIN_LIBRARY;
    }

    await Promise.all([ ...wanted ].map(async ([ name, { library, asset, url } ]) => {
        if (drawn.get(name)?.url === url) return;

        if (!await applyOne(library, asset, url)) return;

        changed = true;
        theme ||= library === THEME_SKIN_LIBRARY;
    }));

    if (theme) {
        resetThemeArtCaches();
        await preloadThemeAssets();
    }

    return changed;
};
