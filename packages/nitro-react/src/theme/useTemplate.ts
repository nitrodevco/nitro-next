import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Template, TemplateContext, TemplateLibrary, TemplatePatch } from '@nitrodevco/nitro-theme';
import { useEffect, useMemo, useState } from 'react';

import { assetOverlaysPending, loadTemplateBundle } from '#base/utils';

import { patchedTemplate, useTemplatePatchList } from './templatePatches';

/** The library every other one's templates draw shared bitmaps from, as `getAssetByName` falls back to it. */
const WINDOW_MANAGER = 'habbo-window-manager-com';

/** A template's library: what its id starts with (`habbo-toolbar-com/purse_xml`). */
const libraryOf = (id: string) => id.slice(0, id.indexOf('/'));

/** The template as the library has it, `undefined` until its bundle is in. */
const sourceTemplate = (id: string) => GetAssetManager().getBundleFile<TemplateLibrary>(libraryOf(id), 'templates')?.templates[id];

/** Whether a library's bundle and the window manager's are both in, with their `asset.overlays`: a template of it can be drawn. */
const libraryLoaded = (library: string) => !!GetAssetManager().getBundleFile<TemplateLibrary>(library, 'templates') && !!GetAssetManager().getBundleFile<TemplateLibrary>(WINDOW_MANAGER, 'templates') && !assetOverlaysPending(library) && !assetOverlaysPending(WINDOW_MANAGER);

/**
 * Loads a library's bundle with the window manager's, whose bitmaps every library's templates may
 * name - the way Flash loads a component's library; the library once both are in.
 */
const useLoadedLibrary = (library: string) => {
    const [ loaded, setLoaded ] = useState(() => (libraryLoaded(library) ? library : undefined));

    useEffect(() => {
        let cancelled = false;

        void Promise.all([ loadTemplateBundle(library), library === WINDOW_MANAGER ? true : loadTemplateBundle(WINDOW_MANAGER) ]).then(() => {
            if (!cancelled) setLoaded(library);
        });

        return () => {
            cancelled = true;
        };
    }, [ library ]);

    // A window switched to a template of a library already in draws it at once, not after the effect.
    return loaded === library || libraryLoaded(library);
};

/** `id` with `list` applied for `context`: a cache read once made (`patchedTemplate`). */
const readTemplate = (id: string, context: TemplateContext | undefined, list: readonly TemplatePatch[]) => patchedTemplate(id, sourceTemplate(id), context, list);

/**
 * A Flash window template by id - `<library>/<asset>`, the asset the client's code builds the window
 * from (`getAssetByName("purse_xml")` is `habbo-toolbar-com/purse_xml`) - with the extensions'
 * patches applied for the window's `context` (`TemplateWindow`'s). Its library's bundle is loaded the
 * first time one of its templates is asked for. `undefined` until it is in, or for good when the
 * config names no `asset.bundles.templates`.
 *
 * Read during render, so a new context or a patch added is drawn in the same pass: the patch list is
 * a value this reads (`useTemplatePatchList`), and the patched copy is made once per list and context.
 */
export const useTemplate = (id: string, context?: TemplateContext) => {
    const list = useTemplatePatchList();
    const loaded = useLoadedLibrary(libraryOf(id));

    return loaded ? readTemplate(id, context, list) : undefined;
};

/** Every template of a library with the extensions' patches applied, by id; the library's own object while none applies. */
const readLibrary = (library: string, list: readonly TemplatePatch[]) => {
    const source = GetAssetManager().getBundleFile<TemplateLibrary>(library, 'templates');

    if (!source) return source;

    let templates: Record<string, Template> | undefined;

    for (const [ id, template ] of Object.entries(source.templates)) {
        const patched = patchedTemplate(id, template, undefined, list);

        if (patched === template) continue;

        templates ??= { ...source.templates };
        templates[id] = patched!;
    }

    return templates ? { ...source, templates } : source;
};

/**
 * Every template of a library (`habbo-catalog-com`), by id - for code that builds windows from
 * several of its assets as it goes (`getAssetByName(widgetId)`, each grid item's template), loaded as
 * `useTemplate` loads one. `undefined` until the bundles are in.
 */
export const useTemplateLibrary = (library: string) => {
    const list = useTemplatePatchList();
    const loaded = useLoadedLibrary(library);

    // One object per patch list: what a window builds from it compares it by identity.
    return useMemo(() => (loaded ? readLibrary(library, list)?.templates : undefined), [ loaded, library, list ]);
};
