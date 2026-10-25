import { GetConfigValue } from './GetConfigValue';

/**
 * Where a Flash library's template bundle is fetched from: `asset.bundles.templates` with
 * `%libname%` the library, unless `asset.bundles.templates.overrides` names a url of its own for
 * that library - which is how a theme pack ships only the libraries it changes (the window
 * manager's skin and text styles, a toolbar, a chat library) and leaves every other one the
 * hotel's. The overrides are a `{ "<library>": "<url>" }` object, or that object as JSON text
 * (a launch parameter or a hotel variable arrives as a string). `undefined` when neither names one.
 *
 * `templatesUrl` stands in for the config's pattern where the caller holds its own (the imager).
 */
export const GetTemplateBundleUrl = (library: string, templatesUrl: string | undefined = GetConfigValue<string>('asset.bundles.templates')): string | undefined => {
    const override = GetTemplateBundleOverrides()[library];

    if (override) return override;

    return GetHotelTemplateBundleUrl(library, templatesUrl);
};

/**
 * The hotel's own url for a library's template bundle - `asset.bundles.templates` with `%libname%`
 * the library, whatever a theme pack names for it - which is what a pack's url that does not load
 * falls back to (`DownloadTemplateBundle`). `undefined` when the config names none.
 */
export const GetHotelTemplateBundleUrl = (library: string, templatesUrl: string | undefined = GetConfigValue<string>('asset.bundles.templates')): string | undefined => templatesUrl?.replace('%libname%', library) || undefined;

/** `asset.bundles.templates.overrides`, read as `GetTemplateBundleUrl` reads it; an unreadable value names none. */
export const GetTemplateBundleOverrides = (): Record<string, string> => {
    let value = GetConfigValue<unknown>('asset.bundles.templates.overrides');

    if (typeof value === 'string') {
        try {
            value = JSON.parse(value);
        } catch {
            return {};
        }
    }

    if (!value || (typeof value !== 'object') || Array.isArray(value)) return {};

    return Object.fromEntries(Object.entries(value).filter((entry): entry is [ string, string ] => (typeof entry[1] === 'string') && (entry[1].length > 0)));
};
