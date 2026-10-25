/**
 * Not Flash's: the template patches extensions have added (`@nitrodevco/nitro-theme`'s
 * `applyTemplatePatches`), the bindings they give elements, and the hooks they run after a window's
 * own `arrange`. `useTemplate` reads every template through `patchedTemplate`, so a window drawn after
 * a patch is added - or redrawn because one was - shows it; nothing is rebuilt per render, a template
 * is patched once per change of the patches and, for patches that read it, once per window context.
 *
 * Where the patches come from: client modules (`api.templates.patch`) and plugins' declarative
 * `template-patches.json` files the hotel names in `templates.patches` (`loadTemplatePatchFiles`).
 *
 * What a template's patches did is said where an author looks: a patch naming an element the
 * template lacks, or two owners setting one property, is a console warning, and every owner's
 * applied, unmatched and clashing ops go to the server's extension inspector (`reportClientExtension`).
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { applyTemplatePatches, chainTemplateArranges, EMPTY_TEMPLATE_CONTEXT, mergeTemplateBindings, ownedElementName, Template, TemplateBinding, TemplateBindings, TemplateContext, templateContextKey, TemplateExtensionArrange, TemplatePatch, TemplatePatchConflict, TemplatePatchError, templatePatchErrorMessage, templatePatchesUseContext, TemplatePatchOp, TemplatePatchReport, TemplateWindows, WINDOW_CODE_OWNER } from '@nitrodevco/nitro-theme';
import { useSyncExternalStore } from 'react';

import { reportClientExtension } from '#base/commands/client-modules/clientExtensionReports';
import { parseObject, resolveStyles } from '#base/theme/templateStyles';

/** A binding, or what it is for a window's context. */
export type TemplateExtensionBinding = TemplateBinding | ((context: TemplateContext) => TemplateBinding);

interface ExtensionBinding {
    owner: string;
    template: string;
    /** The element's owned name, `<owner>:<name>`; with `override`, the name as the window's code has it. */
    element: string;
    binding: TemplateExtensionBinding;
    /** Over the window's own binding of the element, for the fields it sets (`bind(..., { override: true })`). */
    override: boolean;
}

interface ExtensionArrange {
    owner: string;
    template: string;
    arrange: TemplateExtensionArrange;
}

let patches: readonly TemplatePatch[] = [];
let bindings: readonly ExtensionBinding[] = [];
let arranges: readonly ExtensionArrange[] = [];
const listeners = new Set<() => void>();

/** How many patched copies of one template are kept for the contexts last drawn (a context is a user shown, say). */
const CONTEXTS_KEPT = 16;

/** A source template's patched copies for the patch list they were made from, by context key (`''` for any). */
const patched = new WeakMap<Template, { patches: readonly TemplatePatch[]; byContext: Map<string, Template> }>();
/** The last report per template id, for the inspector; logged when it changes. */
const reports = new Map<string, TemplatePatchReport>();
/** The last conflicts of override bindings per template id, by the signature they were logged at. */
const bindingConflicts = new Map<string, { signature: string; conflicts: TemplatePatchConflict[] }>();
/** The errors extension code threw per template id (bindings of a context, arranges), each logged once. */
const codeErrors = new Map<string, TemplatePatchError[]>();

const changed = () => {
    // An owner's errors go with the last of what it added.
    const owners = new Set([ ...patches, ...bindings, ...arranges ].map(entry => entry.owner));

    for (const [ id, errors ] of codeErrors) {
        const kept = errors.filter(error => owners.has(error.owner));

        if (kept.length) codeErrors.set(id, kept);
        else codeErrors.delete(id);
    }

    listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const getPatches = () => patches;
const getBindings = () => bindings;
const getArranges = () => arranges;

/** The patches added, as a value a component reads: a new list whenever one is added or taken out. */
export const useTemplatePatchList = () => useSyncExternalStore(subscribe, getPatches);

/** Records an error extension code threw for `template`, logged the first time it is seen. */
const reportCodeError = (template: string, owner: string, error: unknown) => {
    const message = templatePatchErrorMessage(error);
    const errors = codeErrors.get(template) ?? [];

    if (errors.some(entry => entry.owner === owner && entry.message === message)) return;

    codeErrors.set(template, [ ...errors, { template, owner, message } ]);

    const text = `${template}: ${owner}'s code threw and was skipped: ${message}`;

    console.warn(`[TemplatePatches] ${text}`);
    reportClientExtension({ owner, kind: 'module.failed', subject: template, reason: 'template', message: text });
};

/**
 * The bindings extensions give `id`'s elements - under the window's own, or over them for an
 * override - for the window's `context`, as a value of its inputs: the list is read as a snapshot,
 * so a memoised caller (the React Compiler memoises by what a computation reads) recomputes when a
 * module binds or unbinds.
 */
export const useTemplateExtensionBindings = (id: string, own: TemplateBindings | undefined, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT) => mergeExtensionBindings(id, own, useSyncExternalStore(subscribe, getBindings), context);

/**
 * The window's `arrange` with the extensions' for `id` run after it, each given the window's model
 * and `context`; one that throws is reported and skipped. The window's own as it is while none is added.
 */
export const useTemplateExtensionArrange = (id: string, own: ((windows: TemplateWindows) => void) | undefined, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT) => combineArranges(id, own, useSyncExternalStore(subscribe, getArranges), context);

const combineArranges = (id: string, own: ((windows: TemplateWindows) => void) | undefined, all: readonly ExtensionArrange[], context: TemplateContext) => chainTemplateArranges(own, all.filter(entry => entry.template === id), context, (entry, error) => reportCodeError(id, entry.owner, error));

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

/**
 * Gives an element a binding in every window drawn from `template`: one `owner` added (`name`, its
 * short name), or with `override` one the window's code binds (`name` as the code names it), over
 * the code's binding for the fields it sets.
 */
export const addTemplateBinding = (owner: string, template: string, name: string, binding: TemplateExtensionBinding, options: { override?: boolean } = {}) => {
    const override = options.override === true;
    const entry: ExtensionBinding = { owner, template, element: override ? name : ownedElementName(owner, name), binding, override };

    bindings = [ ...bindings, entry ];
    changed();

    return () => {
        if (!bindings.includes(entry)) return;

        bindings = bindings.filter(item => item !== entry);
        changed();
    };
};

/** Runs `arrange` after the own `arrange` of every window drawn from `template`. */
export const addTemplateArrange = (owner: string, template: string, arrange: TemplateExtensionArrange) => {
    const entry: ExtensionArrange = { owner, template, arrange };

    arranges = [ ...arranges, entry ];
    changed();

    return () => {
        if (!arranges.includes(entry)) return;

        arranges = arranges.filter(item => item !== entry);
        changed();
    };
};

const sameReport = (a: TemplatePatchReport | undefined, b: TemplatePatchReport) => !!a && JSON.stringify(a) === JSON.stringify(b);

/** Says what `id`'s patches did: warnings for what missed or clashed, and each owner's figures to the server. */
const announceReport = (id: string, report: TemplatePatchReport) => {
    for (const conflict of report.conflicts) {
        const message = `${id}: ${conflict.owners.join(', ')} all set ${conflict.property} of '${conflict.element}'; ${conflict.owners.at(-1)}'s is used.`;

        console.warn(`[TemplatePatches] ${message}`);

        for (const owner of new Set(conflict.owners)) reportClientExtension({ owner, kind: 'patch.conflict', subject: id, reason: `${conflict.element}.${conflict.property}`, message });
    }

    for (const miss of report.unmatched) {
        const message = `${id}: ${miss.owner}'s patch names '${miss.element}', which this template does not have.`;

        console.warn(`[TemplatePatches] ${message} Alt-click the element in the inspector for its key.`);
        reportClientExtension({ owner: miss.owner, kind: 'patch.unmatched', subject: id, reason: miss.element, message });
    }

    for (const error of report.errors) {
        const message = `${id}: ${error.owner}'s patch threw and was skipped: ${error.message}`;

        console.warn(`[TemplatePatches] ${message}`);
        reportClientExtension({ owner: error.owner, kind: 'module.failed', subject: id, reason: 'patch', message });
    }

    for (const [ owner, count ] of Object.entries(report.ops)) {
        const applied = count - report.unmatched.filter(miss => miss.owner === owner).length;

        reportClientExtension({ owner, kind: 'patch.applied', subject: id, reason: String(applied), message: `${applied} of ${count} op(s) applied.` });
    }
};

/**
 * The template `id` as `list` (the patches added, `useTemplatePatchList`) makes it for the window's
 * `context`: the source itself while none applies to it. Made once per patch list and - only when a
 * patch reads it - per context, kept for the last few contexts; never copied per render.
 */
export const patchedTemplate = (id: string, source: Template | undefined, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT, list: readonly TemplatePatch[] = patches): Template | undefined => {
    if (!source || !list.length) return source;

    let entry = patched.get(source);

    if (entry?.patches !== list) patched.set(source, (entry = { patches: list, byContext: new Map() }));

    const key = templatePatchesUseContext(list, id) ? templateContextKey(context) : '';
    const cached = entry.byContext.get(key);

    if (cached) return cached;

    const { template, report } = applyTemplatePatches(source, id, list, context);

    if (!sameReport(reports.get(id), report)) {
        reports.set(id, report);
        announceReport(id, report);
    }

    if (entry.byContext.size >= CONTEXTS_KEPT) entry.byContext.delete(entry.byContext.keys().next().value);

    entry.byContext.set(key, template);

    return template;
};

/** A binding given as a function, as made for one context: kept per entry while its context's values stay. */
const resolvedBindings = new WeakMap<ExtensionBinding, { key: string; binding: TemplateBinding | undefined }>();

const bindingFor = (id: string, entry: ExtensionBinding, context: TemplateContext): TemplateBinding | undefined => {
    if (typeof entry.binding !== 'function') return entry.binding;

    const key = templateContextKey(context);
    const cached = resolvedBindings.get(entry);

    if (cached?.key === key) return cached.binding;

    let binding: TemplateBinding | undefined;

    try {
        binding = entry.binding(context);
    } catch (error) {
        reportCodeError(id, entry.owner, error);
    }

    resolvedBindings.set(entry, { key, binding });

    return binding;
};

/** Notes the override conflicts of one render, logging them when they differ from the last render's. */
const noteBindingConflicts = (id: string, conflicts: TemplatePatchConflict[]) => {
    if (!conflicts.length && !bindingConflicts.has(id)) return;

    const signature = conflicts.map(conflict => `${conflict.element}.${conflict.property}:${conflict.owners.join(',')}`).join('|');

    if (bindingConflicts.get(id)?.signature === signature) return;

    bindingConflicts.set(id, { signature, conflicts });

    for (const conflict of conflicts) {
        const message = `${id}: ${conflict.owners.join(', ')} all bind ${conflict.property} of '${conflict.element}'; ${conflict.owners.at(-1)}'s is used.`;

        console.warn(`[TemplatePatches] ${message}`);

        for (const owner of new Set(conflict.owners)) {
            if (owner !== WINDOW_CODE_OWNER) reportClientExtension({ owner, kind: 'patch.conflict', subject: id, reason: `${conflict.element}.${conflict.property}`, message });
        }
    }
};

const mergeExtensionBindings = (id: string, own: TemplateBindings | undefined, all: readonly ExtensionBinding[], context: TemplateContext): TemplateBindings | undefined => {
    const { bindings: merged, conflicts } = mergeTemplateBindings(id, own, all.filter(entry => entry.template === id), entry => bindingFor(id, entry, context));

    noteBindingConflicts(id, conflicts);

    return merged;
};

/**
 * What a template's last application reported - its patches' conflicts, misses and errors, with
 * the conflicts of override bindings and the errors of extension code in its windows - once it has
 * been drawn.
 */
export const templatePatchReport = (id: string): TemplatePatchReport | undefined => {
    const report = reports.get(id);
    const overrides = bindingConflicts.get(id)?.conflicts ?? [];
    const errors = codeErrors.get(id) ?? [];

    if (!report && !overrides.length && !errors.length) return undefined;

    return {
        applied: report?.applied ?? 0,
        ops: report?.ops ?? {},
        conflicts: [ ...(report?.conflicts ?? []), ...overrides ],
        unmatched: report?.unmatched ?? [],
        errors: [ ...(report?.errors ?? []), ...errors ],
    };
};

/** The patches added now: for the inspector, which lists those naming the element it shows. */
export const templatePatchList = (): readonly TemplatePatch[] => patches;

interface TemplatePatchFile {
    patches?: { template: string; ops: TemplatePatchOp[]; order?: number }[];
}

/** The patch files loaded per owner, so a changed `templates.patches` loads only what changed. */
const filePatches = new Map<string, { url: string; dispose: () => void }>();

/**
 * Loads the declarative patch files a hotel names in `templates.patches` (`{ "<plugin key>": "<url>" }`,
 * or that object as JSON text): each file's patches are added under its key, the owner. A file that
 * does not load or is not a patch file is logged and adds nothing; the others still apply. Theme
 * style values (`templates.styles`, `{ "<plugin key>:<name>": value }`) fill the `${style:name}`
 * the files name.
 */
export const loadTemplatePatchFiles = async (value: unknown, styleValues?: unknown) => {
    const styles = parseObject(styleValues);

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

            const missing = new Set<string>();
            const file = resolveStyles(await response.json(), styles, owner, missing) as TemplatePatchFile;

            if (!Array.isArray(file.patches)) throw new Error('no "patches" list');

            if (missing.size > 0) NitroLogger.warn('TemplatePatches', `${owner}'s patch file names styles the hotel has no value of: ${[ ...missing ].join(', ')}.`);

            const disposers = file.patches.map(patch => addTemplatePatch({ owner, template: patch.template, ops: patch.ops ?? [], order: patch.order }));

            filePatches.set(owner, { url, dispose: () => disposers.forEach(dispose => dispose()) });
        } catch (error) {
            NitroLogger.error('TemplatePatches', `${owner}'s patch file ${url} did not load: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));
};
