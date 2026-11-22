/**
 * Not Flash's: windows a plugin defines as data, with no module - its `wwwroot/windows/<name>.json`,
 * listed by the hotel in `templates.windows` (`{ "<plugin key>/<name>": "<url>" }`). A file holds a
 * template in the shape the template bundles carry, what its named buttons do (`close`, or open an
 * in-client `link`) and where players open it from (`entries`: the me menu, the toolbar). Its
 * template is read under the id `<plugin key>/windows/<name>`, so it is drawn, patched, bound and
 * inspected as any template is (`useTemplate`); a draft the preview host is given stands in for the
 * saved file (`setDataWindowDrafts`).
 *
 * Kept free of React: the loader (`commands/client-modules/dataWindowCommands`) registers what it
 * reads here as the module windows, me menu entries and toolbar icons the client draws.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import type { Template, TemplateElement } from '@nitrodevco/nitro-theme';

/**
 * What a named element does when clicked: close its window, open an in-client link, or show the
 * element `show` names and hide the others buttons show - tabs, each showing its page.
 */
export interface DataWindowButton {
    close?: boolean;
    link?: string;
    show?: string;
}

/** Where players open the window from. */
export interface DataWindowEntry {
    where: 'memenu' | 'toolbar';
    caption?: string;
    /** A toolbar icon's address: a file of the plugin's wwwroot by its path there, or a url. */
    icon?: string;
    tooltip?: string;
}

export interface DataWindow {
    /** `<plugin key>/<name>`: its entry in `templates.windows`, and its link `window/<plugin key>/<name>`. */
    id: string;
    owner: string;
    name: string;
    title: string;
    /** `<plugin key>/windows/<name>`: the id its template is read under. */
    templateId: string;
    template: Template;
    buttons: Readonly<Record<string, DataWindowButton>>;
    entries: readonly DataWindowEntry[];
}

/** The id the template of the window `<owner>/<name>` is read under. */
export const dataWindowTemplateId = (id: string) => {
    const at = id.indexOf('/');

    return `${id.slice(0, at)}/windows/${id.slice(at + 1)}`;
};

const NAME = /^[a-z0-9][a-z0-9_-]{0,63}$/;
/** A file of its own: an image beside the window's file, not a bundle's bitmap name. */
const RELATIVE_IMAGE = /^(?![a-z][a-z\d+.-]*:|\/|\$\{)[^?#]+\.(?:png|gif|jpe?g|webp)(?:[?#].*)?$/i;

const isObject = (value: unknown): value is Record<string, unknown> => (typeof value === 'object') && (value !== null) && !Array.isArray(value);

const isNumber = (value: unknown): value is number => (typeof value === 'number') && Number.isFinite(value);

const resolve = (value: string, base: string) => (RELATIVE_IMAGE.test(value) ? new URL(value, base).href : value);

/** An element as `TemplateView` draws it: its `vars` and `children` always there, a relative image read from the plugin's wwwroot. */
const readElement = (value: unknown, base: string): TemplateElement | undefined => {
    if (!isObject(value) || (typeof value.tag !== 'string') || !isNumber(value.x) || !isNumber(value.y) || !isNumber(value.width) || !isNumber(value.height)) return undefined;

    const vars = isObject(value.vars) ? { ...value.vars } as TemplateElement['vars'] : {};

    if (typeof vars.asset_uri === 'string') vars.asset_uri = resolve(vars.asset_uri, base);

    const children = Array.isArray(value.children) ? value.children.map(child => readElement(child, base)).filter((child): child is TemplateElement => !!child) : [];

    return { ...value, vars, children } as TemplateElement;
};

/** The window a file holds, or why it is none. */
export const readDataWindow = (id: string, file: unknown, base: string): DataWindow | string => {
    const at = id.indexOf('/');
    const owner = id.slice(0, at);
    const name = id.slice(at + 1);

    if ((at <= 0) || !NAME.test(name)) return `"${id}" is no <plugin key>/<name>`;
    if (!isObject(file) || !isObject(file.template)) return 'it has no "template"';

    const template = file.template;

    if (!isNumber(template.width) || !isNumber(template.height) || !Array.isArray(template.elements)) return 'its template has no width, height and elements';

    const elements = template.elements.map(element => readElement(element, base)).filter((element): element is TemplateElement => !!element);

    if (!elements.length) return 'its template has no element to draw';

    const buttons: Record<string, DataWindowButton> = {};

    if (isObject(file.buttons)) {
        for (const [ element, action ] of Object.entries(file.buttons)) {
            if (!isObject(action)) continue;
            if (action.close === true) buttons[element] = { close: true };
            else if (typeof action.link === 'string') buttons[element] = { link: action.link };
            else if (typeof action.show === 'string') buttons[element] = { show: action.show };
        }
    }

    const entries = (Array.isArray(file.entries) ? file.entries : []).filter(isObject).flatMap((entry): DataWindowEntry[] => {
        if ((entry.where === 'memenu') && (typeof entry.caption === 'string') && entry.caption) return [ { where: 'memenu', caption: entry.caption } ];
        if ((entry.where === 'toolbar') && (typeof entry.icon === 'string') && entry.icon) return [ { where: 'toolbar', icon: resolve(entry.icon, base), tooltip: (typeof entry.tooltip === 'string') ? entry.tooltip : undefined } ];

        return [];
    });

    return {
        id,
        owner,
        name,
        title: (typeof file.title === 'string' && file.title) ? file.title : name,
        templateId: `${owner}/windows/${name}`,
        template: { name: (typeof template.name === 'string') ? template.name : name, width: template.width, height: template.height, elements, ...(isObject(template.skins) && { skins: template.skins as Template['skins'] }) },
        buttons,
        entries,
    };
};

let saved: ReadonlyMap<string, DataWindow> = new Map();
let drafts: ReadonlyMap<string, DataWindow> = new Map();
let windows: ReadonlyMap<string, DataWindow> = new Map();
/** By template id, for `useTemplate`. */
let byTemplate: ReadonlyMap<string, DataWindow> = new Map();
const listeners = new Set<() => void>();

const changed = () => {
    windows = new Map([ ...saved, ...drafts ]);
    byTemplate = new Map([ ...windows.values() ].map(window => [ window.templateId, window ]));
    listeners.forEach(listener => listener());
};

export const subscribeDataWindows = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

/** Every window defined as data, the preview's drafts over the saved ones, by `<plugin key>/<name>`. */
export const getDataWindows = () => windows;

/** The template of the data window `templateId` names, if one is defined. */
export const dataWindowTemplate = (templateId: string) => byTemplate.get(templateId)?.template;

/** The data window whose template id is `templateId`. */
export const dataWindowOf = (templateId: string) => byTemplate.get(templateId);

/** The files that loaded, by entry, with the url each was read from: a changed list reads only what changed. */
const files = new Map<string, { url: string; window: DataWindow }>();

/**
 * Reads the window files `templates.windows` names (`{ "<plugin key>/<name>": "<url>" }`, or that
 * object as JSON text). A file that does not load or is no window is logged and adds nothing; the
 * others still do.
 */
export const loadDataWindowFiles = async (value: unknown) => {
    let entries: Record<string, unknown> = {};

    try {
        const parsed = (typeof value === 'string') ? JSON.parse(value) as unknown : value;

        if (isObject(parsed)) entries = parsed;
    } catch {
        NitroLogger.warn('DataWindows', 'templates.windows is not JSON: no windows loaded.');
    }

    const wanted = new Map(Object.entries(entries).filter((entry): entry is [ string, string ] => (typeof entry[1] === 'string') && (entry[1].length > 0)));

    for (const [ id, loaded ] of files) {
        if (wanted.get(id) !== loaded.url) files.delete(id);
    }

    await Promise.all([ ...wanted ].filter(([ id ]) => !files.has(id)).map(async ([ id, url ]) => {
        try {
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            // A relative image is a file of the plugin's wwwroot by its path there, as a patch file's is: the folder above `windows/`.
            const window = readDataWindow(id, await response.json(), new URL('..', new URL(url, globalThis.location?.href)).href);

            if (typeof window === 'string') throw new Error(window);

            files.set(id, { url, window });
        } catch (error) {
            NitroLogger.error('DataWindows', `${id}'s window file ${url} did not load: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));

    saved = new Map([ ...files ].map(([ id, file ]) => [ id, file.window ]));
    changed();
};

/**
 * Where a plugin's files are, from the files the hotel lists of it (`templates.windows`, else its
 * `templates.patches` file, which is in its `wwwroot/`): what a draft's relative image is read from.
 * The page's own address for a plugin the hotel lists nothing of.
 */
export const pluginFilesBase = (owner: string, windowsValue: unknown, patchesValue: unknown) => {
    const read = (value: unknown) => {
        try {
            const parsed = (typeof value === 'string') ? JSON.parse(value) as unknown : value;

            return isObject(parsed) ? parsed : {};
        } catch {
            return {};
        }
    };
    const here = globalThis.location?.href;
    const window = Object.entries(read(windowsValue)).find(([ id, url ]) => id.startsWith(`${owner}/`) && (typeof url === 'string') && url.length)?.[1] as string | undefined;
    const patches = read(patchesValue)[owner];

    if (window) return new URL('..', new URL(window, here)).href;
    if ((typeof patches === 'string') && patches.length) return new URL('.', new URL(patches, here)).href;

    return here;
};

/**
 * The preview host's unsaved windows (`{ "<plugin key>/<name>": <window file> }`), each over the saved
 * one of its id until the next draft, a relative image read from `baseOf` its plugin; null or `{}`
 * takes them away. Gives why each that is no window is none.
 */
export const setDataWindowDrafts = (value: unknown, baseOf: (owner: string) => string): string[] => {
    const problems: string[] = [];
    const next = new Map<string, DataWindow>();

    if (isObject(value)) {
        for (const [ id, file ] of Object.entries(value)) {
            const window = readDataWindow(id, file, baseOf(id.slice(0, Math.max(0, id.indexOf('/')))));

            if (typeof window === 'string') problems.push(`${id}: ${window}`);
            else next.set(id, window);
        }
    }

    if (!next.size && !drafts.size) return problems;

    drafts = next;
    changed();

    return problems;
};
