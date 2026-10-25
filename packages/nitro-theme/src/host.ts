/**
 * What the theme needs of the app it is drawn in - given once, at start-up, before anything is drawn
 * (`configureThemeHost`). The theme itself holds no app state: nitro-react hands it the client's asset
 * bundles, config and window manager; Nitro Studio's previews hand it their own.
 *
 * Left unconfigured, the theme still draws: no bundle loads (`loadAssetBundle` answers `false`), no
 * config value is set, and windows stack in a small window manager of the theme's own.
 */
import { useSyncExternalStore } from 'react';

export interface ThemeHost {
    /**
     * Fetches an asset bundle into the renderer's `AssetManager` by its name
     * (`habbo-window-manager-com`, `fonts`, `font-faces`), or joins the fetch in flight; `false` when the app serves no such bundle.
     */
    loadAssetBundle: (name: string) => Promise<boolean>;
    /** The bundle, not loaded up front, an asset of that name belongs to - fetched the first time it is asked for. */
    lazyBundleForAsset: (name: string) => string | undefined;
    /** A config value (`loading.icon.url`, `renderer.color.space`), as a hook: a change draws again. */
    useConfigValue: <T>(key: string) => T | undefined;
    /** A window's place in the stack, as a hook. */
    useWindowZIndex: (id: string) => number;
    /** Raises a window over the others. */
    bringWindowToFront: (id: string) => void;
    /** Forgets a window that is gone for good (a frame with a generated id), so the stack does not keep it. */
    releaseWindow: (id: string) => void;
}

/* ---------------------------------------------------------------- the theme's own window stack */

const BASE_Z_INDEX = 100;
const zIndexes = new Map<string, number>();
const listeners = new Set<() => void>();
let top = BASE_Z_INDEX;

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
};

const DEFAULT_HOST: ThemeHost = {
    loadAssetBundle: () => Promise.resolve(false),
    lazyBundleForAsset: () => undefined,
    useConfigValue: () => undefined,
    useWindowZIndex: id => useSyncExternalStore(subscribe, () => zIndexes.get(id) ?? BASE_Z_INDEX),
    bringWindowToFront: (id) => {
        zIndexes.set(id, ++top);

        for (const listener of listeners) listener();
    },
    releaseWindow: (id) => {
        zIndexes.delete(id);
    },
};

let host: ThemeHost = DEFAULT_HOST;

/** Gives the theme what it needs of the app; what is left out keeps the theme's own. */
export const configureThemeHost = (next: Partial<ThemeHost>) => {
    host = { ...host, ...next };
};

/** The host as configured - read on each call, so a component reads what start-up gave it. */
export const themeHost = (): ThemeHost => host;

/** `ThemeHost.useConfigValue`, as the hook the components call. */
export const useThemeConfigValue = <T>(key: string): T | undefined => host.useConfigValue<T>(key);

/** `ThemeHost.useWindowZIndex`, as the hook the components call. */
export const useThemeWindowZIndex = (id: string): number => host.useWindowZIndex(id);
