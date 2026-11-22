import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { noteTemplateId, Template, TemplateContext, TemplateLibrary, TemplatePatch } from '@nitrodevco/nitro-theme';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

import { assetOverlaysPending, loadTemplateBundle } from '#base/utils';

import { dataWindowTemplate, subscribeDataWindows } from './dataWindows';
import { patchedTemplate, templatePatchList, useTemplatePatchList } from './templatePatches';

/** The library every other one's templates draw shared bitmaps from, as `getAssetByName` falls back to it. */
const WINDOW_MANAGER = 'habbo-window-manager-com';

/** A template's library: what its id starts with (`habbo-toolbar-com/purse_xml`). */
const libraryOf = (id: string) => id.slice(0, id.indexOf('/'));

/** The template as the library has it - or a plugin's window defined as data (`dataWindows.ts`) - `undefined` until its bundle is in. */
const sourceTemplate = (id: string) => dataWindowTemplate(id) ?? GetAssetManager().getBundleFile<TemplateLibrary>(libraryOf(id), 'templates')?.templates[id];

/**
 * Not Flash's: how far the patches moved the root of `id`'s window from where its library has it, as
 * drawn in `template` (patched); `undefined` unmoved. A window is drawn at its origin and its code
 * places it (`TemplateView`), so `TemplateWindow` moves a window with no frame of its own (the
 * toolbar, the purse, the friend bar) that far from the code's place.
 */
export const templateRootOffset = (id: string, template: Template): { x: number; y: number } | undefined => {
    const own = sourceTemplate(id)?.elements;
    const root = template.elements[0];

    if ((own?.length !== 1) || (template.elements.length !== 1) || !root) return undefined;

    const x = root.x - own[0].x;
    const y = root.y - own[0].y;

    return (x || y) ? { x, y } : undefined;
};

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

/** `id` with `list` applied for `context`: a cache read once made (`patchedTemplate`), its id noted (a part pressed in the preview is named by it). */
const readTemplate = (id: string, context: TemplateContext | undefined, list: readonly TemplatePatch[]) => {
    const template = patchedTemplate(id, sourceTemplate(id), context, list);

    if (template) noteTemplateId(template, id);

    return template;
};

/**
 * A Flash window template by id - `<library>/<asset>`, the asset the client's code builds the window
 * from (`getAssetByName("purse_xml")` is `habbo-toolbar-com/purse_xml`) - with the extensions'
 * patches applied for the window's `context` (`TemplateWindow`'s). Its library's bundle is loaded the
 * first time one of its templates is asked for. `undefined` until it is in, or for good when the
 * config names no `asset.bundles.templates`. A plugin's window defined as data (`<plugin key>/windows/<name>`)
 * is read the same way, its file's template standing in for the bundle's.
 *
 * Read during render, so a new context or a patch added is drawn in the same pass: the patch list is
 * a value this reads (`useTemplatePatchList`), and the patched copy is made once per list and context.
 */
export const useTemplate = (id: string, context?: TemplateContext) => {
    const list = useTemplatePatchList();
    // A window defined as data has no library of its own: it draws the window manager's bitmaps.
    const data = useSyncExternalStore(subscribeDataWindows, () => dataWindowTemplate(id));
    const loaded = useLoadedLibrary(data ? WINDOW_MANAGER : libraryOf(id));

    return loaded ? readTemplate(id, context, list) : undefined;
};

/**
 * A template as `useTemplate` reads it with the patches added now, once its library is in (a window
 * defined as data at once): what a window duplicated from it starts as. `undefined` for none.
 */
export const readTemplateSource = async (id: string) => {
    if (!dataWindowTemplate(id)) await Promise.all([ loadTemplateBundle(libraryOf(id)), loadTemplateBundle(WINDOW_MANAGER) ]);

    return readTemplate(id, undefined, templatePatchList());
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

    const read = templates ? { ...source, templates } : source;

    // A grid item built from one of them (`from: templates[id]`) is named by its id in the preview.
    for (const [ id, template ] of Object.entries(read.templates)) noteTemplateId(template, id);

    return read;
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
