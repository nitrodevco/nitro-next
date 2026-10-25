import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Template, TemplateLibrary } from '@nitrodevco/nitro-theme';
import { useEffect, useState } from 'react';

import { loadTemplateBundle } from '#base/utils';

import { patchedTemplate, useTemplatePatchVersion } from './templatePatches';

/** The library every other one's templates draw shared bitmaps from, as `getAssetByName` falls back to it. */
const WINDOW_MANAGER = 'habbo-window-manager-com';

/** A template's library: what its id starts with (`habbo-toolbar-com/purse_xml`). */
const libraryOf = (id: string) => id.slice(0, id.indexOf('/'));

/** The template as the library has it, with the extensions' patches applied (`templatePatches`). */
const readTemplate = (id: string) => patchedTemplate(id, GetAssetManager().getBundleFile<TemplateLibrary>(libraryOf(id), 'templates')?.templates[id]);

/**
 * A Flash window template by id - `<library>/<asset>`, the asset the client's code builds the window
 * from (`getAssetByName("purse_xml")` is `habbo-toolbar-com/purse_xml`). Its library's bundle is
 * loaded the first time one of its templates is asked for, with the window manager's, whose bitmaps
 * every library's templates may name - the way Flash loads a component's library. `undefined` until
 * both are in, or for good when the config names no `asset.bundles.templates`.
 */
export const useTemplate = (id: string) => {
    const patchVersion = useTemplatePatchVersion();
    const [ template, setTemplate ] = useState(() => readTemplate(id));

    useEffect(() => {
        let cancelled = false;
        const library = libraryOf(id);

        void Promise.all([ loadTemplateBundle(library), library === WINDOW_MANAGER ? true : loadTemplateBundle(WINDOW_MANAGER) ]).then(() => {
            if (!cancelled) setTemplate(readTemplate(id));
        });

        return () => {
            cancelled = true;
        };
    }, [ id, patchVersion ]);

    return template;
};

/** Every template of a library with the extensions' patches applied, by id; the library's own object while none applies. */
const readLibrary = (library: string) => {
    const source = GetAssetManager().getBundleFile<TemplateLibrary>(library, 'templates');

    if (!source) return source;

    let templates: Record<string, Template> | undefined;

    for (const [ id, template ] of Object.entries(source.templates)) {
        const patched = patchedTemplate(id, template);

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
    const patchVersion = useTemplatePatchVersion();
    const [ templates, setTemplates ] = useState(() => readLibrary(library)?.templates);

    useEffect(() => {
        let cancelled = false;

        void Promise.all([ loadTemplateBundle(library), library === WINDOW_MANAGER ? true : loadTemplateBundle(WINDOW_MANAGER) ]).then(() => {
            if (!cancelled) setTemplates(readLibrary(library)?.templates);
        });

        return () => {
            cancelled = true;
        };
    }, [ library, patchVersion ]);

    return templates;
};
