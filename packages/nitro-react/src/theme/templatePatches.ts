/**
 * Not Flash's: the template patches extensions have added (`@nitrodevco/nitro-theme`'s
 * `applyTemplatePatches`), and the bindings they give the elements they added. `useTemplate` reads
 * every template through `patchedTemplate`, so a window drawn after a patch is added - or redrawn
 * because one was - shows it; nothing is rebuilt per render, a template is patched once per change.
 *
 * Where the patches come from: client modules (`api.templates.patch`) and plugins' declarative
 * `template-patches.json` files the hotel names in `templates.patches` (`loadTemplatePatchFiles`).
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { applyTemplatePatches, ownedElementName, Template, TemplateBinding, TemplateBindings, TemplatePatch, TemplatePatchOp, TemplatePatchReport } from '@nitrodevco/nitro-theme';
import { useSyncExternalStore } from 'react';

interface ExtensionBinding {
    owner: string;
    template: string;
    /** The element's owned name, `<owner>:<name>`. */
    element: string;
    binding: TemplateBinding;
}

let patches: readonly TemplatePatch[] = [];
let bindings: readonly ExtensionBinding[] = [];
let version = 0;
const listeners = new Set<() => void>();
/** A source template's patched copy, for the version it was made at. */
const patched = new WeakMap<Template, { version: number; template: Template }>();
/** The last report per template id, for the inspector; logged when it changes. */
const reports = new Map<string, TemplatePatchReport>();

const changed = () => {
    version++;
    listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const getVersion = () => version;

/** Re-renders a component when the patches or extension bindings change. */
export const useTemplatePatchVersion = () => useSyncExternalStore(subscribe, getVersion);

const getBindings = () => bindings;

/**
 * The bindings extensions give `id`'s elements, under the window's own, as a value of its inputs:
 * the list is read as a snapshot, so a memoised caller (the React Compiler memoises by what a
 * computation reads) recomputes when a module binds or unbinds.
 */
export const useTemplateExtensionBindings = (id: string, own: TemplateBindings | undefined) => mergeExtensionBindings(id, own, useSyncExternalStore(subscribe, getBindings));

/** Adds a patch; the returned function takes it out again. */
export const addTemplatePatch = (patch: TemplatePatch) => {
    patches = [ ...patches, patch ];
    changed();

    return () => {
        if (!patches.includes(patch)) return;

        patches = patches.filter(entry => entry !== patch);
        changed();
    };
};

/** Gives an element `owner` added (`name`, its short name) a binding in every window drawn from `template`. */
export const addTemplateBinding = (owner: string, template: string, name: string, binding: TemplateBinding) => {
    const entry: ExtensionBinding = { owner, template, element: ownedElementName(owner, name), binding };

    bindings = [ ...bindings, entry ];
    changed();

    return () => {
        if (!bindings.includes(entry)) return;

        bindings = bindings.filter(item => item !== entry);
        changed();
    };
};

/** Takes out every patch and binding `owner` added. */
export const removeTemplatePatches = (owner: string) => {
    if (!patches.some(patch => patch.owner === owner) && !bindings.some(entry => entry.owner === owner)) return;

    patches = patches.filter(patch => patch.owner !== owner);
    bindings = bindings.filter(entry => entry.owner !== owner);
    changed();
};

const sameReport = (a: TemplatePatchReport | undefined, b: TemplatePatchReport) => !!a && JSON.stringify(a) === JSON.stringify(b);

/** The template `id` as the patches make it: the source itself while none applies to it. */
export const patchedTemplate = (id: string, source: Template | undefined): Template | undefined => {
    if (!source || !patches.length) return source;

    const cached = patched.get(source);

    if (cached?.version === version) return cached.template;

    const { template, report } = applyTemplatePatches(source, id, patches);

    if (!sameReport(reports.get(id), report)) {
        reports.set(id, report);

        for (const conflict of report.conflicts) NitroLogger.warn('TemplatePatches', `${id}: ${conflict.owners.join(', ')} all set ${conflict.property} of '${conflict.element}'; ${conflict.owners.at(-1)}'s is used.`);
        for (const miss of report.unmatched) NitroLogger.warn('TemplatePatches', `${id}: ${miss.owner}'s patch names '${miss.element}', which this template does not have.`);
    }

    patched.set(source, { version, template });

    return template;
};

/** The bindings extensions give the elements they added to `id`'s windows, under the window's own. */
export const templateExtensionBindings = (id: string, own: TemplateBindings | undefined): TemplateBindings | undefined => mergeExtensionBindings(id, own, bindings);

const mergeExtensionBindings = (id: string, own: TemplateBindings | undefined, all: readonly ExtensionBinding[]): TemplateBindings | undefined => {
    const mine = all.filter(entry => entry.template === id);

    if (!mine.length) return own;

    const merged: TemplateBindings = {};

    for (const entry of mine) merged[entry.element] = { ...merged[entry.element], ...entry.binding };

    // An owned name never collides with the window's own names: the window's code always wins anyway.
    return { ...merged, ...own };
};

/** What each patched template's last application reported: for an inspector, and for tests. */
export const templatePatchReports = (): ReadonlyMap<string, TemplatePatchReport> => reports;

/** The patches currently added, in no particular order. */
export const templatePatchList = (): readonly TemplatePatch[] => patches;

interface TemplatePatchFile {
    patches?: { template: string; ops: TemplatePatchOp[]; order?: number }[];
}

/** The patch files loaded per owner, so a changed `templates.patches` loads only what changed. */
const filePatches = new Map<string, { url: string; dispose: () => void }>();

/**
 * Loads the declarative patch files a hotel names in `templates.patches` (`{ "<plugin key>": "<url>" }`,
 * or that object as JSON text): each file's patches are added under its key, the owner. A file that
 * does not load or is not a patch file is logged and adds nothing; the others still apply.
 */
export const loadTemplatePatchFiles = async (value: unknown) => {
    let entries: Record<string, unknown> = {};

    try {
        const parsed = (typeof value === 'string') ? JSON.parse(value) as unknown : value;

        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) entries = parsed as Record<string, unknown>;
    } catch {
        NitroLogger.warn('TemplatePatches', 'templates.patches is not JSON: no patch files loaded.');
    }

    const wanted = new Map(Object.entries(entries).filter((entry): entry is [ string, string ] => typeof entry[1] === 'string' && entry[1].length > 0));

    for (const [ owner, loaded ] of filePatches) {
        if (wanted.get(owner) === loaded.url) continue;

        loaded.dispose();
        filePatches.delete(owner);
    }

    await Promise.all([ ...wanted ].filter(([ owner ]) => !filePatches.has(owner)).map(async ([ owner, url ]) => {
        try {
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const file = await response.json() as TemplatePatchFile;

            if (!Array.isArray(file.patches)) throw new Error('no "patches" list');

            const disposers = file.patches.map(patch => addTemplatePatch({ owner, template: patch.template, ops: patch.ops ?? [], order: patch.order }));

            filePatches.set(owner, { url, dispose: () => disposers.forEach(dispose => dispose()) });
        } catch (error) {
            NitroLogger.error('TemplatePatches', `${owner}'s patch file ${url} did not load: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));
};
