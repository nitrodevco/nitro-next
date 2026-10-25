/**
 * Not Flash's: `asset.overlays`, the hotel variable a theme replaces single bitmaps of a library with -
 * one frame's art, one icon - instead of shipping a copy of the whole library. `{ "<library>/<asset>":
 * "<url>" }`, the object or the object as JSON text; Turbo merges each plugin's entries in. The client
 * loads them as each library's bundle loads (nitro-react `utils/assetOverlays.ts`); this reads the value.
 */

/** The variable's key. */
export const ASSET_OVERLAYS_KEY = 'asset.overlays';

/** A sprite of the theme sheet: named so in its bundle, without the library in front (`themeTextureKeys`). */
const THEME_SPRITE_PREFIX = 'theme-';

/**
 * The asset manager's name for a library's asset: its own bitmaps carry the library's name in front
 * (`habbo-room-ui-com/roomtools_gear` is `habbo-room-ui-com-roomtools_gear`), the theme sheet's
 * sprites do not (`habbo-window-manager-com/theme-habbo-frame-frame-default`).
 */
export const overlayTextureName = (library: string, asset: string) => (asset.startsWith(THEME_SPRITE_PREFIX) ? asset : `${library}-${asset}`);

/**
 * `asset.overlays` by library, then asset: the urls a hotel names. Keys without a library or an asset,
 * and entries that are no url (an empty one is a hotel taking a plugin's overlay away), are left out;
 * `undefined` for text that is not JSON.
 */
export const parseAssetOverlays = (value: unknown): Map<string, Map<string, string>> | undefined => {
    const byLibrary = new Map<string, Map<string, string>>();
    let parsed = value;

    if (typeof parsed === 'string') {
        if (!parsed.trim().length) return byLibrary;

        try {
            parsed = JSON.parse(parsed) as unknown;
        } catch {
            return undefined;
        }
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return byLibrary;

    for (const [ key, url ] of Object.entries(parsed as Record<string, unknown>)) {
        const slash = key.indexOf('/');

        if (slash <= 0 || slash === key.length - 1 || typeof url !== 'string' || !url.length) continue;

        const library = key.slice(0, slash);
        let assets = byLibrary.get(library);

        if (!assets) byLibrary.set(library, (assets = new Map()));

        assets.set(key.slice(slash + 1), url);
    }

    return byLibrary;
};
