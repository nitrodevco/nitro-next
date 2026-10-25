/**
 * The client's languages: the default localizations embedded in the `habbo-localization-com`
 * library, and the hotel's other languages.
 *
 * The library carries every language's default localizations - one
 * `default_localizations_<lang>.txt` each in its bundle, written by Nitro Studio - and only one is
 * read and parsed at a time, as Flash's `HabboLocalizationManager.loadDefaultEmbedLocalizations`
 * reads its embedded assets: `localization.default.language`'s at boot (English when the bundle has
 * none for it), and another one when `:lang <code>` asks for it. The hotel's texts override every
 * language's, so a swap lays the new language's down and the hotel's texts back over it.
 *
 * The hotel's other languages are Flash `CoreLocalizationManager`'s localization definitions, which
 * `HabboLocalizationManager.configureLocalizationLocations` registers from the configuration and
 * the `:lang <name>` chat command activates (`ChatInputWidgetHandler`).
 *
 * A definition's url is a gamedata hashes file (`https://www.habbo.fi/gamedata/hashes` in the
 * client's own `localization_configuration`), not a texts file: activating one reads the hashes,
 * then loads `<external_texts url>/<hash>` and lays it over the texts there are
 * (`parseLocalizationData` updates key by key - a key the new file lacks keeps its old text).
 * Every text a layout names by `${key}` is a registered listener in Flash and shows the new
 * language straight away (`updateAllListeners`); here those are the template windows, which read
 * the store's localizations. Text a view set from code keeps the language it was set in until it
 * is set again, as in Flash.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

import { configString, systemStore } from '#base/context/system';
import { loadTemplateBundle, normalizeLocalizationMap, parseLocalizationData } from '#base/utils';

/** The library the default localizations are embedded in, whose bundle carries every language's (`loadTemplateBundle`). */
const LOCALIZATION_LIBRARY = 'habbo-localization-com';

/** `loadDefaultEmbedLocalizations`'s fallback language, and the one used when the config names none. */
const FALLBACK_LANGUAGE = 'en';

const TEXT_DECODER = new TextDecoder();

/** The hotel's texts as they were last loaded, laid back over a language's default localizations when `:lang` swaps them. */
let hotelTexts: Record<string, string> = {};

/** The language whose default localizations are shown; empty before the first are read. */
let activeLanguage = '';

/** The language the client starts in: `localization.default.language`, else English. */
export const getDefaultLocalizationLanguage = (): string => {
    const value = configString('localization.default.language');

    return value.length ? value.toLowerCase() : FALLBACK_LANGUAGE;
};

/** The language whose default localizations are shown. */
export const getActiveLocalizationLanguage = (): string => activeLanguage;

/**
 * Every `${key}` in a text replaced by that key's text, as the loader always resolved them; a key
 * there is no text for stays as it is. An empty key is dropped. Resolves in place, in key order (a
 * reference to a later key reads it unresolved), so `data` must be a map of the caller's own. Only
 * the few values holding a `${` are touched: ~80 of ~54k.
 */
const resolveLocalizationReferences = (data: Record<string, string>): Record<string, string> => {
    const getValue = (key: string) => data[key] ?? `\${${key}}`;

    delete data[''];

    for (const key in data) {
        const value = data[key];

        if ((typeof value === 'string') && value.includes('${')) data[key] = value.replace(/\$\{([^}]+)\}/g, (_, refKey: string) => getValue(refKey));
    }

    return data;
};

/**
 * One language's entry in the library's bundle, parsed; undefined when the bundle has none for it.
 * Either Flash's text (`default_localizations_<lang>.txt`), parsed here and only for this language, or
 * the workspace's JSON map (`DefaultLocalizations_<lang>.json`), which the bundle reader parses as it
 * loads - every language's at once - and which only has Flash's value rules applied here.
 */
const readDefaultLocalizations = (language: string): Record<string, string> | undefined => {
    const assetManager = GetAssetManager();
    const bytes = assetManager.getBundleBinary(LOCALIZATION_LIBRARY, `default_localizations_${language}.txt`);

    if (bytes) return parseLocalizationData(TEXT_DECODER.decode(bytes));

    const map = assetManager.getBundleFile<Record<string, unknown>>(LOCALIZATION_LIBRARY, `DefaultLocalizations_${language}.json`);

    return map ? normalizeLocalizationMap(map) : undefined;
};

/**
 * `HabboLocalizationManager.loadDefaultEmbedLocalizations`: the language's default localizations,
 * or - with `fallback`, for a language the bundle has none for - English's. Undefined when there is
 * neither, or no bundle.
 */
const loadDefaultEmbedLocalizations = (language: string, fallback: boolean): { language: string; texts: Record<string, string> } | undefined => {
    const texts = readDefaultLocalizations(language);

    if (texts) return { language, texts };

    if (fallback && (language !== FALLBACK_LANGUAGE)) {
        NitroLogger.log(`Could not load default localizations default_localizations_${language} : Trying with default_localizations_${FALLBACK_LANGUAGE}...`);

        return loadDefaultEmbedLocalizations(FALLBACK_LANGUAGE, false);
    }

    NitroLogger.error(`Could not load default_localizations_${language}`);

    return undefined;
};

/**
 * The boot's texts: the default language's default localizations from the library's bundle, with
 * the hotel's texts over them, and every `${key}` between them resolved. A hotel whose config names
 * no template bundle url, or whose bundle fails, starts with the hotel's texts alone.
 */
export const initializeLocalizations = async (externalTexts: Record<string, string>): Promise<void> => {
    hotelTexts = externalTexts;

    const defaults = (await loadTemplateBundle(LOCALIZATION_LIBRARY)) ? loadDefaultEmbedLocalizations(getDefaultLocalizationLanguage(), true) : undefined;

    if (!defaults) NitroLogger.error(`The ${LOCALIZATION_LIBRARY} bundle has no default localizations - only the hotel's texts are shown`);

    activeLanguage = defaults?.language ?? '';

    systemStore.getState().setLocalization(resolveLocalizationReferences({ ...defaults?.texts, ...hotelTexts }));
};

/**
 * The default localizations of `language` made the ones shown, the hotel's texts laid back over
 * them. False when the bundle has none for it - no fallback, so a mistyped `:lang` changes nothing.
 * A key the new language lacks keeps its old text, as Flash's `parseLocalizationData` leaves it.
 */
export const activateDefaultLocalizations = (language: string): boolean => {
    const code = language.toLowerCase();

    if (code === activeLanguage) return true;

    const defaults = loadDefaultEmbedLocalizations(code, false);

    if (!defaults) return false;

    activeLanguage = defaults.language;

    systemStore.getState().setLocalization(resolveLocalizationReferences({ ...defaults.texts, ...hotelTexts }));

    return true;
};

/** `LocalizationDefinition`: `code` is `<language>_<country>.<encoding>` (`en_US.iso-8859-1`). */
export interface LocalizationDefinition {
    languageCode: string;
    countryCode: string;
    encoding: string;
    name: string;
    url: string;
}

/** The game data a hashes file names, as `GameDataResources.parse` reads it. */
interface GameDataResources {
    urls: Record<string, string>;
    hashes: Record<string, string>;
}

/** `GameDataResources.isValid`: the four resources the client cannot start without. */
const REQUIRED_GAME_DATA = [ 'external_texts', 'external_variables', 'furnidata', 'productdata' ];

const createLocalizationDefinition = (code: string, name: string, url: string): LocalizationDefinition => {
    const [ languageCode, region = '' ] = code.split('_');
    const [ countryCode, encoding ] = region.split('.');

    return { languageCode, countryCode, encoding, name, url };
};

/**
 * `HabboLocalizationManager.configureLocalizationLocations` with
 * `CoreLocalizationManager.registerLocalizationDefinition`: `localization.1`, `localization.2`, ...
 * until one is missing, each registered under the value of `localization.<n>` - the name `:lang`
 * takes - with its `.code`, `.name` and `.url`. A name already registered keeps its first
 * definition (the client's own list has `de` twice; `de` is Germany's).
 */
export const getLocalizationDefinitions = (): Map<string, LocalizationDefinition> => {
    const config = systemStore.getState().config;
    const property = (key: string) => {
        const value = config[key];

        return ((typeof value === 'string') || (typeof value === 'number')) ? String(value) : '';
    };
    const definitions = new Map<string, LocalizationDefinition>();

    for (let index = 1; config[`localization.${index}`] !== undefined; index++) {
        const key = `localization.${index}`;
        const id = property(key);

        if (!definitions.has(id)) definitions.set(id, createLocalizationDefinition(property(`${key}.code`), property(`${key}.name`), property(`${key}.url`)));
    }

    return definitions;
};

/** `GameDataResources.parse`: the `hashes` array of `{ name, url, hash }`; undefined unless `isValid`. */
const parseGameDataResources = (body: string): GameDataResources | undefined => {
    const resources: GameDataResources = { urls: {}, hashes: {} };
    const entries = (JSON.parse(body) as { hashes?: { name?: string; url?: string; hash?: string }[] }).hashes ?? [];

    for (const { name, url, hash } of entries) {
        if (!name) continue;

        resources.urls[name] = url ?? '';
        resources.hashes[name] = hash ?? '';
    }

    return REQUIRED_GAME_DATA.every(name => resources.urls[name] && resources.hashes[name]) ? resources : undefined;
};

/** `CoreLocalizationManager.validateLocalizationData` (never accepting an empty file). */
const isLocalizationData = (body: string) => (body.length > 0) && (body.indexOf('<!DOCTYPE html') === -1);

/** `onLocalizationReady` / `onLocalizationFailed`: the texts, asked for a second time when the first ask fails. */
const fetchExternalTexts = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);

        if (response.ok) return await response.text();
    } catch {
        // Flash's onLocalizationFailed loads the same url again.
    }

    const response = await fetch(url);

    if (!response.ok) throw new Error(`Localization ${url} answered ${response.status}`);

    return await response.text();
};

/**
 * `CoreLocalizationManager.loadLocalizationFromURL` then `onLocalizationReady`: the hashes, then
 * the external texts they point at, laid over the current texts. Flash's `parseLocalizationData`
 * stores no empty value, so an empty one here leaves the old text as it is.
 */
const loadLocalizationFromUrl = async (hashesUrl: string): Promise<boolean> => {
    if (!hashesUrl) {
        NitroLogger.error('[CoreLocalizationManager] Localization hashes URL was null or empty!');

        return false;
    }

    try {
        const response = await fetch(hashesUrl);
        const resources = response.ok ? parseGameDataResources(await response.text()) : undefined;

        if (!resources) {
            NitroLogger.error(`[CoreLocalizationManager] No valid game data hashes at ${hashesUrl}`);

            return false;
        }

        const body = await fetchExternalTexts(`${resources.urls.external_texts}/${resources.hashes.external_texts}`);

        if (!isLocalizationData(body)) return false;

        const localizations = parseLocalizationData(body);

        for (const key in localizations) {
            if (!localizations[key].length) delete localizations[key];
        }

        hotelTexts = { ...hotelTexts, ...localizations };

        systemStore.getState().setLocalization(localizations);

        return true;
    } catch (err) {
        NitroLogger.error(err);

        return false;
    }
};

/**
 * `:lang <name>`: the default localizations of that language, when the library's bundle has them
 * (`activateDefaultLocalizations`), and `CoreLocalizationManager.activateLocalizationDefinition` -
 * the texts of the hotel definition of that name, when the config has one, which start loading and
 * arrive after true comes back. False when neither knows the name. Flash's `:lang` returns null
 * either way, so nothing is said in the chat.
 */
export const activateLocalizationDefinition = (name: string): boolean => {
    const swapped = !!name && activateDefaultLocalizations(name);
    const definition = getLocalizationDefinitions().get(name);

    if (definition) void loadLocalizationFromUrl(definition.url);

    return swapped || !!definition;
};
