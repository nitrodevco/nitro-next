/**
 * Not Flash's: live reload (Turbo's `docs/plugin-data.md`, "Live reload"). When staff change the look a
 * player draws - their theme's patches, style values, images, fonts, the hotel's texts, or which theme
 * they get - the server sends the Turbo named message `turbo.theme.changed { theme, revision, url }`;
 * the client reads the new look at `url` (`{ theme, variables }`: its theme's merged variables and the
 * hotel's texts address) and draws it over what is open, with no reload and the room session kept:
 * the patch files read again (`loadTemplatePatchFiles`, every one when the style values changed), the
 * bitmaps an overlay replaces swapped (`reapplyAssetOverlays`), the fonts and text style overrides set
 * again, the frame overrides read from the variables, the plugins' data windows read again
 * (`loadDataWindows`), and the texts that changed - the hotel's or the theme's own - laid over the shown
 * (`reloadHotelTexts`). New bitmaps are drawn in place (`notifyThemeArtChanged`: nothing is mounted again,
 * so a window keeps its place, scroll and typed text); a new font or text style draws the template windows
 * anew (`useThemeArt`), as the preview host does. A burst of
 * messages draws the last. A template library the theme swaps whole (`asset.bundles.templates.overrides`)
 * and the loading screen are read at the next load.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { ASSET_OVERLAYS_KEY, notifyThemeArtChanged, setFontFaceOverrides, setTextStyleOverrides } from '@nitrodevco/nitro-theme';
import { useSyncExternalStore } from 'react';

import { loadDataWindows } from '#base/commands/client-modules/dataWindowCommands';
import { onPluginMessage } from '#base/commands/client-modules/pluginMessages';
import { reloadHotelTexts } from '#base/commands/system/localizationCommands';
import { systemStore } from '#base/context/system';
import { reapplyAssetOverlays } from '#base/utils/assetOverlays';

import { loadTemplatePatchFiles } from './templatePatches';
import { loadTextFonts, TEXT_FONTS_KEY } from './textFonts';
import { noteThemeDrawn } from './themeSession';

const OWNER = 'theme';

/** The hotel's texts address, a variable the answer brings beside the merged ones. */
const TEXTS_KEY = 'gamedata.urls.externalTexts';

/** How long a message waits for the next of a burst: a save writing several files is one look. */
const DEBOUNCE_MS = 100;

interface ThemeChanged {
    theme: string;
    revision: string;
    url: string;
}

let art = 0;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const getArt = () => art;

/** Counts each live reload that changed a font or a text style: a template window keyed on it is drawn anew. */
export const useThemeArt = () => useSyncExternalStore(subscribe, getArt);

/** A merged variable's value as the server keeps it (JSON text), read as the file gives it. */
const valueOf = (json: string): unknown => {
    try {
        return JSON.parse(json);
    } catch {
        return json;
    }
};

const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** Draws a look read from the server: each variable that changed, and what reads it. */
const draw = async (theme: string, variables: Record<string, string>) => {
    const { config, setConfig } = systemStore.getState();
    const next: Record<string, unknown> = Object.fromEntries(Object.entries(variables).map(([ key, value ]) => [ key, valueOf(value) ]));
    const changed = new Set(Object.keys(next).filter(key => !same(config[key], next[key])));

    noteThemeDrawn(theme);

    if (!changed.size) return;

    setConfig({ ...config, ...next });

    const work: Promise<unknown>[] = [];

    if (changed.has('templates.patches') || changed.has('templates.styles')) work.push(loadTemplatePatchFiles(next['templates.patches'], next['templates.styles'], { again: changed.has('templates.styles') }));

    const overlays = changed.has(ASSET_OVERLAYS_KEY) ? reapplyAssetOverlays(next[ASSET_OVERLAYS_KEY]) : Promise.resolve(false);
    const fonts = changed.has(TEXT_FONTS_KEY);
    const styles = changed.has('text.styles.overrides') || changed.has('text.faces.overrides');

    if (fonts) work.push(loadTextFonts(next[TEXT_FONTS_KEY]));

    if (styles) {
        setTextStyleOverrides('hotel', next['text.styles.overrides'] ?? config['text.styles.overrides']);
        setFontFaceOverrides('hotel', next['text.faces.overrides'] ?? config['text.faces.overrides']);
    }

    if (changed.has('templates.windows')) work.push(loadDataWindows(next['templates.windows']));

    // The hotel's texts with the theme's own over them, read again when either changed.
    const texts = next[TEXTS_KEY] ?? config[TEXTS_KEY];

    if ((changed.has(TEXTS_KEY) || changed.has('text.overrides')) && (typeof texts === 'string')) work.push(reloadHotelTexts(texts));

    const [ bitmaps ] = await Promise.all([ overlays, ...work ]);

    if (bitmaps) notifyThemeArtChanged();

    if (fonts || styles) {
        art++;
        listeners.forEach(listener => listener());
    }

    NitroLogger.log('Theme', `Live: drew ${[ ...changed ].join(', ')}${theme ? ` (${theme})` : ''}.`);
};

let timer: ReturnType<typeof setTimeout> | undefined;
let latest: ThemeChanged | undefined;
let drawing: Promise<void> = Promise.resolve();

/** Reads the last message's look and draws it, after the one being drawn. */
const flush = () => {
    const message = latest;

    latest = undefined;

    if (!message) return;

    drawing = drawing.then(async () => {
        try {
            const response = await fetch(message.url);

            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

            const answer = await response.json() as { theme?: string; variables?: Record<string, string> };

            await draw(answer.theme ?? message.theme, answer.variables ?? {});
        } catch (error) {
            NitroLogger.warn('Theme', `The hotel's new look could not be read at ${message.url}: it is drawn at the next load.`, error);
        }
    });
};

let started = false;

/** Listens for `turbo.theme.changed` for the life of the page. */
export const startThemeLive = () => {
    if (started) return;

    started = true;

    onPluginMessage(OWNER, 'turbo.theme.changed', (data) => {
        if ((typeof data.url !== 'string') || !data.url.length) return;

        latest = { theme: typeof data.theme === 'string' ? data.theme : '', revision: typeof data.revision === 'string' ? data.revision : '', url: data.url };

        clearTimeout(timer);
        timer = setTimeout(flush, DEBOUNCE_MS);
    });
};
