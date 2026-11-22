/**
 * The preview host's live overlays: a draft's `asset.overlays` entries (an uploaded skin set, one
 * sprite's replacement) drawn before they are saved, with no bundle loaded again. The client applies
 * overlays once, as a library's bundle loads (`utils/assetOverlays.ts`); here each bitmap a draft
 * replaces is swapped in the asset manager, the library's own kept to put back when a later draft
 * (or Habbo's own) leaves it, and the theme's sprites are registered again from the asset manager when
 * one of the theme sheet's changed (`preloadThemeAssets`, after `resetThemeArtCaches`). Only the
 * preview host calls it. Not a Flash feature.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager, TextureUtils } from '@nitrodevco/nitro-renderer';
import { overlayTextureName, parseAssetOverlays, preloadThemeAssets, resetThemeArtCaches, THEME_SKIN_LIBRARY } from '@nitrodevco/nitro-theme';
import { Texture } from 'pixi.js';

/** The texture the client had for each bitmap a draft replaces now: the library's own, or the hotel's overlay. */
const own = new Map<string, Texture>();
/** The url each of those is drawn from now. */
const drawn = new Map<string, string>();

const loadOne = async (name: string, url: string): Promise<Texture | undefined> => {
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        return await TextureUtils.textureFromEncodedBytes(await response.blob(), 'image/png', name);
    } catch (error) {
        NitroLogger.warn('DesignOverlays', `${name}: ${url} did not load (${error instanceof Error ? error.message : String(error)}).`);

        return undefined;
    }
};

/**
 * Draws the bitmaps `draft` (the draft's `asset.overlays`) replaces where it differs from `hotel` (the
 * hotel's own value), and puts back each one an earlier draft replaced that this one leaves. Resolves
 * true when any bitmap changed (the window is drawn again), once the theme's sprites are registered
 * again if one of them did; never rejects.
 */
export const applyDesignOverlays = async (hotel: unknown, draft: unknown): Promise<boolean> => {
    const hotels = parseAssetOverlays(hotel) ?? new Map<string, Map<string, string>>();
    const wanted = new Map<string, { library: string; url: string }>();

    for (const [ library, assets ] of parseAssetOverlays(draft) ?? []) {
        for (const [ asset, url ] of assets) {
            if (hotels.get(library)?.get(asset) !== url) wanted.set(overlayTextureName(library, asset), { library, url });
        }
    }

    const assetManager = GetAssetManager();
    let changed = false;

    let theme = false;

    for (const [ name, texture ] of own) {
        if (wanted.has(name)) continue;

        assetManager.setTexture(name, texture);
        own.delete(name);
        drawn.delete(name);
        changed = true;
        // A theme sheet sprite is named without its library (`overlayTextureName`).
        theme ||= name.startsWith('theme-');
    }

    await Promise.all([ ...wanted ].map(async ([ name, { library, url } ]) => {
        if (drawn.get(name) === url) return;

        const current = assetManager.getTexture(name);

        if (!current) {
            NitroLogger.warn('DesignOverlays', `${library}: the library has no bitmap ${name}; the overlay is not drawn.`);

            return;
        }

        const texture = await loadOne(name, url);

        if (!texture) return;

        // A draft's own bitmaps are left to the collector, not destroyed: Pixi's batches may still hold them.
        if (!own.has(name)) own.set(name, current);

        assetManager.setTexture(name, texture);
        drawn.set(name, url);
        changed = true;
        theme ||= library === THEME_SKIN_LIBRARY;
    }));

    if (theme) {
        resetThemeArtCaches();
        await preloadThemeAssets();
    }

    return changed;
};
