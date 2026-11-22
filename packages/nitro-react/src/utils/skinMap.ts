/**
 * Not Flash's: the skin map the client is served with, `skins.json` (`tools/skin-map.mjs`, written by the
 * build from the template bundles - nitro-theme `template/templateSkins.ts`): every skin of the theme, the
 * sprites it draws with their sizes, and the template windows that draw it. Fetched the first time the
 * extension inspector or the development build's overlay check asks, never for a player.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import type { SkinMap } from '@nitrodevco/nitro-theme';

let request: Promise<SkinMap | undefined> | undefined;

/** The skin map, or `undefined` when the client is served none (a build that could not reach the bundles). */
export const loadSkinMap = (): Promise<SkinMap | undefined> => (request ??= fetch(`${import.meta.env.BASE_URL}skins.json`)
    .then(async response => (response.ok ? await response.json() as SkinMap : undefined))
    .catch((error: unknown) => {
        NitroLogger.warn('SkinMap', `skins.json did not load (${error instanceof Error ? error.message : String(error)}).`);

        return undefined;
    }));

/** A skin's windows as a line names them: how many, and the first few. */
export const skinWindowsLine = (windows: Readonly<Record<string, readonly string[]>>, shown = 4): string => {
    const ids = Object.keys(windows);

    return `${ids.length} window${(ids.length === 1) ? '' : 's'}${ids.length ? `: ${ids.slice(0, shown).join(', ')}${(ids.length > shown) ? ', ...' : ''}` : ''}`;
};
