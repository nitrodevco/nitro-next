/**
 * The client's own `.nitro` asset bundles: where they live, which ones are fetched before the
 * first view renders, and how a bundled bitmap is named.
 *
 * `scripts/build-asset-bundles.ts` packs everything under `public/assets/**` into a handful of
 * archives (see its docblock for the split between packed sheets and loose PNGs). Loading one
 * hands every bitmap in it to the shared `AssetManager` under its own name, so the room engine
 * and the UI share one decoded, GPU-uploaded copy and `getTexture(name)` reaches it from
 * anywhere - the same contract furniture, pet and figure libraries have always had.
 *
 * An asset's name is its path under `public/assets` with the extension dropped and `/` turned
 * into `-` (`window-manager/tile_preview_0.png` -> `window-manager-tile_preview_0`). A Flash library's own bitmaps are
 * not here: Nitro Studio publishes each library's in its template bundle (`loadTemplateBundle`),
 * named `<library>-<asset>` - the name `LayoutImage` builds from `<library>/<asset>.png`.
 */
import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

/** Where the bundles this repo builds and ships are, when the hotel's config names no other place. */
const DEFAULT_BUNDLE_URL = '/assets/bundles/%name%.nitro';

/**
 * Everything the client cannot draw its first frame without. `effect-icons` is deliberately
 * absent: it is not on screen at boot, and the one view that draws it asks for it
 * (`loadAssetBundle`) when it opens. `font-faces` is absent for the same reason plus one more -
 * it is only the browser's fallback for a string the exact text renderer cannot take, so
 * `preloadFlashFonts` starts it in the background instead of blocking on it. The window
 * manager's library bundle is in it - it carries the UI theme, and most of the art the views draw
 * by name is that library's - and the chat styles' and the avatar render library's, which the room
 * cannot draw its chat and avatar additions without. The room object visualization library's is the room engine's to load
 * (`VariableFxAssetLibrary`).
 */
const DEFAULT_PRELOAD = [ 'fonts', 'nitro-layouts', 'habbo-window-manager-com', 'habbo-free-flow-chat-com', 'habbo-avatar-render-lib' ];

/**
 * The bundles left out of the preload, by the asset-name prefix that belongs to each. A texture
 * request for one of their assets loads the bundle first (`loadTexture`), so a window opening
 * for the first time pulls in its art and every later open finds it cached - the caller never
 * names a bundle.
 */
const LAZY_BUNDLE_PREFIXES: [prefix: string, bundle: string][] = [
    [ 'effect-icons-', 'effect-icons' ],
];

/** Tells a bundle asset name from a url - the theme's own. */
export { isAssetName } from '@nitrodevco/nitro-theme';

/**
 * A Flash library's bundle is named after the library (`loadTemplateBundle`), and every library's
 * name starts with this - none of the client's own bundles' does.
 */
const LIBRARY_PREFIX = 'habbo-';

/**
 * The library bundle a Flash library's bitmap is in: `habbo-room-ui-com-roomtools_gear` is
 * `habbo-room-ui-com`'s. A Flash asset name has no `-`, so the library is everything before the
 * last one. `undefined` for any other name.
 */
const libraryBundleForAsset = (name: string): string | undefined => {
    const end = name.lastIndexOf('-');

    return (name.startsWith(LIBRARY_PREFIX) && (end > 0)) ? name.slice(0, end) : undefined;
};

/**
 * The not-preloaded bundle an asset belongs to, or `undefined` when it is in a preloaded one. A
 * library's bitmap pulls in its template bundle, the way a view drawing a library's template does.
 */
export const lazyBundleForAsset = (name: string): string | undefined => LAZY_BUNDLE_PREFIXES.find(([ prefix ]) => name.startsWith(prefix))?.[1] ?? libraryBundleForAsset(name);

/**
 * The bundles the hotel serves by a config key of their own, rather than as a library's (`asset.bundles.templates`):
 * the effect icons (`effect.icons.url`), which Nitro Studio builds from the client release and the hotel's own and
 * publishes. The client ships no copy of any: with its key unset, the bundle is not loaded. Nitro's
 * own keys - Flash's came in its SWF.
 */
const HOTEL_BUNDLE_KEYS: Record<string, string> = {
    'effect-icons': 'effect.icons.url',
};

/**
 * Where a bundle is fetched from; `undefined` for a hotel bundle whose config key is unset. A
 * library's bundle is `asset.bundles.templates`'s, with `%libname%` the library.
 */
export const assetBundleUrl = (name: string): string | undefined => {
    if (name.startsWith(LIBRARY_PREFIX)) return GetConfigValue<string>('asset.bundles.templates')?.replace('%libname%', name) || undefined;

    return Object.hasOwn(HOTEL_BUNDLE_KEYS, name)
        ? (GetConfigValue<string>(HOTEL_BUNDLE_KEYS[name]) || undefined)
        : (GetConfigValue<string>('asset.bundles.other') ?? DEFAULT_BUNDLE_URL).replace('%name%', name);
};

/**
 * Fetches a bundle, or joins the fetch already in flight for it. Safe to call on every render
 * path that needs one: the `AssetManager` keeps the promise, so a bundle is only ever read once.
 * `false` without a request for a hotel bundle the config names no url for.
 */
export const loadAssetBundle = async (name: string): Promise<boolean> => {
    const url = assetBundleUrl(name);

    return !!url && !!await GetAssetManager().downloadAssetBundle(name, url);
};

/**
 * Drops a bundle that is done with - the loading screen's, once the client has replaced it - and
 * frees its textures on the GPU. Nothing may still draw from it.
 */
export const unloadAssetBundle = (name: string): void => GetAssetManager().removeAssetBundle(name);

/**
 * A Flash library's window templates and every bitmap of the library's, in a bundle named after it -
 * which Nitro Studio publishes from the client release, one bundle per library, at
 * `asset.bundles.templates` with `%libname%` the library. Loaded the first time a template of the library
 * is drawn (`useTemplate`) or one of its bitmaps is asked for (`lazyBundleForAsset`); the window
 * manager's, which holds most of the art the views draw, is preloaded. `false` without a request
 * when the config names no url: the client ships none.
 */
export const loadTemplateBundle = (library: string): Promise<boolean> => loadAssetBundle(library);

/**
 * The boot load. A bundle that fails is logged and skipped rather than failing the boot - the
 * client comes up missing that bundle's art, which is far easier to diagnose than a blank
 * screen, and every other bundle still lands.
 */
export const preloadAssetBundles = async (): Promise<void> => {
    const names = GetConfigValue<string[]>('asset.bundles.preload') ?? DEFAULT_PRELOAD;

    await Promise.all(names.filter(name => assetBundleUrl(name)).map(async (name) => {
        if (!await loadAssetBundle(name)) NitroLogger.error(`Asset bundle failed to load: ${name}`);
    }));
};
