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
 * into `-` (`room-ui/roomtools_gear.png` -> `room-ui-roomtools_gear`). `LayoutImage` builds
 * exactly that, so a call site still names the file the Flash layout named.
 */
import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

/** Used when the hotel's config names no bundle url - the bundles this repo builds and ships. */
const DEFAULT_BUNDLE_URL = '/assets/bundles/%name%.nitro';

/**
 * Everything the client cannot draw its first frame without. `effect-icons` is deliberately
 * absent: it is not on screen at boot, and the one view that draws it asks for it
 * (`loadAssetBundle`) when it opens. `font-faces` is absent for the same reason plus one more -
 * it is only the browser's fallback for a string the exact text renderer cannot take, so
 * `preloadFlashFonts` starts it in the background instead of blocking on it.
 */
const DEFAULT_PRELOAD = [ 'theme', 'fonts', 'chat-styles', 'nitro-renderer', 'nitro-wired', 'nitro-layouts' ];

/**
 * The bundles left out of the preload, by the asset-name prefix that belongs to each. A texture
 * request for one of their assets loads the bundle first (`loadTexture`), so a window opening
 * for the first time pulls in its art and every later open finds it cached - the caller never
 * names a bundle.
 */
const LAZY_BUNDLE_PREFIXES: [prefix: string, bundle: string][] = [
    [ 'effect-icons-', 'effect-icons' ],
];

/**
 * Tells a bundle asset name from a url. A name is a flat `<component>-<file>` token - no scheme,
 * no path separator, no extension - which nothing the client passes as a url ever is
 * (`https://...`, `//images.habbo.com/...`, `/assets/...`, `data:`, `blob:`).
 */
export const isAssetName = (value: string | undefined): value is string => !!value && !/[:/.]/.test(value);

/** The not-preloaded bundle an asset belongs to, or `undefined` when it is in a preloaded one. */
export const lazyBundleForAsset = (name: string): string | undefined => LAZY_BUNDLE_PREFIXES.find(([ prefix ]) => name.startsWith(prefix))?.[1];

export const assetBundleUrl = (name: string): string => (GetConfigValue<string>('asset.bundles.url') ?? DEFAULT_BUNDLE_URL).replace('%name%', name);

/**
 * Fetches a bundle, or joins the fetch already in flight for it. Safe to call on every render
 * path that needs one: the `AssetManager` keeps the promise, so a bundle is only ever read once.
 */
export const loadAssetBundle = async (name: string): Promise<boolean> => !!await GetAssetManager().downloadAssetBundle(name, assetBundleUrl(name));

/**
 * The boot load. A bundle that fails is logged and skipped rather than failing the boot - the
 * client comes up missing that bundle's art, which is far easier to diagnose than a blank
 * screen, and every other bundle still lands.
 */
export const preloadAssetBundles = async (): Promise<void> => {
    const names = GetConfigValue<string[]>('asset.bundles.preload') ?? DEFAULT_PRELOAD;

    await Promise.all(names.map(async (name) => {
        if (!await loadAssetBundle(name)) NitroLogger.error(`Asset bundle failed to load: ${name}`);
    }));
};
