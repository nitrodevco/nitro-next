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
 * applied, unmatched and clashing ops go to the server's extension inspector (`reportClientExtension`), as
 * does a `font_face` the page cannot draw (`templateFontFaces.ts`).
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { applyTemplatePatches, chainTemplateArranges, EMPTY_TEMPLATE_CONTEXT, FrameOverride, ineffectiveTemplateSets, isTemplateArrangeOp, isTemplateBindOp, loadTexture, mergeTemplateBindings, mergeTemplateItemBindings, ownedElementName, resolveTemplateBind, rootFrameOverride, runTemplateArrange, setFramePatchLooks, Template, TemplateArrangeOp, templateArrangeProblems, templateBindElement, TemplateBinding, TemplateBindings, TemplateBindOp, templateBindProblems, TemplateContext, templateContextKey, TemplateExtensionArrange, TemplateItem, TemplateItemBindings, TemplateItemContext, TemplatePatch, templatePatchAddedNames, TemplatePatchConflict, TemplatePatchError, templatePatchErrorMessage, templatePatchesUseContext, TemplatePatchIneffective, templatePatchMatches, TemplatePatchOp, TemplatePatchReport, TemplatePatchSet, templatePatchSets, TemplateWindows, WINDOW_CODE_OWNER } from '@nitrodevco/nitro-theme';
import { useSyncExternalStore } from 'react';

import { reportClientExtension } from '#base/commands/client-modules/clientExtensionReports';
import { translate } from '#base/context/system';
import { checkTemplatePatchFontFaces } from '#base/theme/templateFontFaces';
import { parseObject, resolveStyles } from '#base/theme/templateStyles';

/**
 * A binding, or what it is for a window's context - and, for an item binding (`items`), for the clone
 * of its list it is drawing (`item`: its key, its index in the list, the list's name).
 */
export type TemplateExtensionBinding = TemplateBinding | ((context: TemplateContext, item?: TemplateItemContext, itemContext?: TemplateContext) => TemplateBinding);

interface ExtensionBinding {
    owner: string;
    template: string;
    /** The element's owned name, `<owner>:<name>`; with `override`, the name as the window's code has it. */
    element: string;
    binding: TemplateExtensionBinding;
    /** Over the window's own binding of the element, for the fields it sets (`bind(..., { override: true })`). */
    override: boolean;
    /** In each clone of a list the element is in (a row the code adds per room), not the window (`bind(..., { items: true })`). */
    items: boolean;
    /** Where it is laid among the others, as a patch is by its `order`: a patch's `bind` op takes the patch's, a module's binding 0. */
    order: number;
}

interface ExtensionArrange {
    owner: string;
    template: string;
    arrange: TemplateExtensionArrange;
    /** Where it runs among the others, as a binding is laid: a patch's `arrange` op takes the patch's `order`, a module's arrange 0. */
    order: number;
}

let patches: readonly TemplatePatch[] = [];
let bindings: readonly ExtensionBinding[] = [];
let arranges: readonly ExtensionArrange[] = [];
const listeners = new Set<() => void>();

/** How many patched copies of one template are kept for the contexts last drawn (a context is a user shown, say). */
const CONTEXTS_KEPT = 16;

/** A source template's patched copies for the patch list they were made from, by context key (`''` for any). */
const patched = new WeakMap<Template, { patches: readonly TemplatePatch[]; byContext: Map<string, Template> }>();
/**
 * Each template's id, the patched copies' too: a clone drawn from another template (a catalogue
 * widget's view in its page, a grid item) gets the bindings extensions give that template.
 */
const templateIds = new WeakMap<Template, string>();

/** The id of the template a list item is drawn from, when it is a whole template the client has read. */
const itemTemplateIdOf = (from: TemplateItem['from']) => ((typeof from === 'object' && !('tag' in from)) ? templateIds.get(from) : undefined);

/** The last report per template id, for the inspector; logged when it changes. */
const reports = new Map<string, TemplatePatchReport>();
/** The last conflicts of override bindings per template id, by the signature they were logged at. */
const bindingConflicts = new Map<string, { signature: string; conflicts: TemplatePatchConflict[] }>();
/**
 * The override conflicts of item bindings per template id, by what clashed: every clone of a list
 * clashes alike (each row's colour), so one is kept, and logged, per element, field and owners.
 */
const itemBindingConflicts = new Map<string, Map<string, TemplatePatchConflict>>();
/** The errors extension code threw per template id (bindings of a context, arranges), each logged once. */
const codeErrors = new Map<string, TemplatePatchError[]>();
/** The `set` ops that matched but change nothing their window draws, per template id, by the signature they were logged at. */
const ineffectiveSets = new Map<string, { signature: string; ineffective: TemplatePatchIneffective[] }>();
/** The `set` ops last drawn per template id, for `appliedCounts`. */
const templateSetsSeen = new Map<string, readonly TemplatePatchSet[]>();
/** The `patch.applied` figures waiting for the window to be drawn (`APPLIED_REPORT_DELAY`), by template id. */
const appliedTimers = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * How long `patch.applied` waits after a template is patched: its window is drawn by then, so an op
 * its code's bindings make ineffective is counted as such, not as applied.
 */
const APPLIED_REPORT_DELAY = 1000;

const changed = () => {
    // An owner's errors go with the last of what it added.
    const owners = new Set([ ...patches, ...bindings, ...arranges ].map(entry => entry.owner));

    for (const [ id, errors ] of codeErrors) {
        const kept = errors.filter(error => owners.has(error.owner));

        if (kept.length) codeErrors.set(id, kept);
        else codeErrors.delete(id);
    }

    for (const [ id, conflicts ] of itemBindingConflicts) {
        for (const [ signature, conflict ] of conflicts) {
            if (!conflict.owners.every(owner => owner === WINDOW_CODE_OWNER || owners.has(owner))) conflicts.delete(signature);
        }

        if (!conflicts.size) itemBindingConflicts.delete(id);
    }

    for (const [ id, entry ] of ineffectiveSets) {
        const kept = entry.ineffective.filter(miss => owners.has(miss.owner));

        if (kept.length) ineffectiveSets.set(id, { ...entry, ineffective: kept });
        else ineffectiveSets.delete(id);
    }

    // Patches naming a frame of Nitro's own by its id (no `/`: not a template), for `Frame` to read.
    const list = patches;

    setFramePatchLooks(list.length ? frameId => frameLookOf(list, frameId) : undefined);
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

const combineArranges = (id: string, own: ((windows: TemplateWindows) => void) | undefined, all: readonly ExtensionArrange[], context: TemplateContext) => chainTemplateArranges(own, all.filter(entry => templatePatchMatches(entry.template, id)), context, (entry, error) => reportCodeError(id, entry.owner, error));

/** The placeholders a `bind` op's values named that had no value, per template, owner and placeholder: each said once. */
const bindMisses = new Set<string>();

/** The `bind` ops no client binds (`templateBindProblems`): they change nothing, so are not counted as applied. */
const refusedBindOps = new WeakSet<TemplateBindOp>();
/** Per `bind` op, the asset addresses its binding has drawn, and those that did not load. */
const bindAssets = new WeakMap<TemplateBindOp, { drawn: Set<string>; failed: Set<string> }>();

/** Whether `op` changes nothing its windows draw: refused, or every asset it drew failed to load. */
const deadBindOp = (op: TemplateBindOp) => {
    if (refusedBindOps.has(op)) return true;

    const assets = bindAssets.get(op);

    return !!assets && (assets.drawn.size > 0) && (assets.failed.size === assets.drawn.size);
};

/**
 * Loads the asset a `bind` op's binding drew, once per address: one that does not load (a 404, a
 * bundle asset no bundle has) draws nothing, so it is said - console and the server's extension
 * inspector, kind `patch.ineffective` with the address - and the op is not counted as applied while
 * nothing it drew loaded. A `${key}` left in it is the window's to fill (a hotel variable): not loaded here.
 */
const noteBindAsset = (patch: TemplatePatch, op: TemplateBindOp, url: string) => {
    let assets = bindAssets.get(op);

    if (!assets) bindAssets.set(op, (assets = { drawn: new Set(), failed: new Set() }));

    if (!url || url.includes('${') || assets.drawn.has(url)) return;

    const seen = assets;

    seen.drawn.add(url);

    void loadTexture(url).then((texture) => {
        if (texture) return;

        seen.failed.add(url);

        const message = `${patch.template}: ${patch.owner}'s bind of '${op.element}' draws ${url}, which did not load, so the element draws nothing there.`;

        console.warn(`[TemplatePatches] ${message}`);
        reportClientExtension({ owner: patch.owner, kind: 'patch.ineffective', subject: patch.template, reason: `${op.element}:${url}`, message });
        reannounceApplied(patch.template);
    });
};

/** Says once that a `bind` op's placeholder (or field) had nothing to fill it for a window drawn. */
const noteBindMiss = (template: string, owner: string, element: string, what: string) => {
    const key = JSON.stringify([ template, owner, element, what ]);

    if (bindMisses.has(key)) return;

    bindMisses.add(key);

    const message = `${template}: ${owner}'s bind of '${element}' names ${what}, which has no value of its type here; the field is left to the window.`;

    console.warn(`[TemplatePatches] ${message}`);
    reportClientExtension({ owner, kind: 'patch.unmatched', subject: template, reason: `${element}:${what}`, message });
};

/**
 * A patch's `bind` op as the binding it adds: its values filled for the window (and row) drawn, a
 * relative `asset` read from beside `base`. One `templateBindProblems` refuses adds nothing and is
 * reported.
 */
const bindOpBinding = (patch: TemplatePatch, op: TemplateBindOp, added: ReadonlySet<string>, base: string | undefined): ExtensionBinding | undefined => {
    const problems = templateBindProblems(op);

    if (problems.length) {
        const message = `${patch.template}: ${patch.owner}'s bind of '${op.element}' is skipped, so it changes nothing: ${problems.join(' ')}`;

        refusedBindOps.add(op);
        console.warn(`[TemplatePatches] ${message}`);
        reportClientExtension({ owner: patch.owner, kind: 'patch.ineffective', subject: patch.template, reason: `${op.element}:bind`, message });

        return undefined;
    }

    const binding = (context: TemplateContext, item?: TemplateItemContext, itemContext?: TemplateContext) => {
        const bound = resolveTemplateBind(
            op.bind,
            { context, item, itemContext, text: key => translate(key, key), base },
            what => noteBindMiss(patch.template, patch.owner, op.element, what),
        );

        if (typeof bound.asset === 'string') noteBindAsset(patch, op, bound.asset);

        return bound;
    };

    return { owner: patch.owner, template: patch.template, element: templateBindElement(patch.owner, op, name => added.has(name)), binding, override: op.override === true, items: op.items === true, order: patch.order ?? 0 };
};

/**
 * Bindings in the order they are laid, arranges in the order they run: by `order`, then owner, then as
 * added - as patches apply (`sortTemplatePatches`), never by when a file or module loaded.
 */
const sortBindings = <T extends { order: number; owner: string }>(list: readonly T[]) => [ ...list ].sort((a, b) => (a.order - b.order) || (a.owner < b.owner ? -1 : a.owner > b.owner ? 1 : 0));

/** The `arrange` ops no client runs (`templateArrangeProblems`): they change nothing, so are not counted as applied. */
const refusedArrangeOps = new WeakSet<TemplateArrangeOp>();

/** Says once that an `arrange` op's formula (or field) read nothing for a window drawn. */
const noteArrangeMiss = (template: string, owner: string, element: string, what: string) => {
    const key = JSON.stringify([ template, owner, element, 'arrange', what ]);

    if (bindMisses.has(key)) return;

    bindMisses.add(key);

    const message = `${template}: ${owner}'s arrange of '${element}' reads ${what}, which gives no number here; the field is left as the window laid it out.`;

    console.warn(`[TemplatePatches] ${message}`);
    reportClientExtension({ owner, kind: 'patch.unmatched', subject: template, reason: `${element}:arrange:${what}`, message });
};

/**
 * A patch's `arrange` op as the hook it adds after the window's own `arrange`. One
 * `templateArrangeProblems` refuses adds nothing and is reported.
 */
const arrangeOpHook = (patch: TemplatePatch, op: TemplateArrangeOp, added: ReadonlySet<string>): ExtensionArrange | undefined => {
    const problems = templateArrangeProblems(op);

    if (problems.length) {
        refusedArrangeOps.add(op);

        const message = `${patch.template}: ${patch.owner}'s arrange of '${op.element}' is skipped, so it changes nothing: ${problems.join(' ')}`;

        console.warn(`[TemplatePatches] ${message}`);
        reportClientExtension({ owner: patch.owner, kind: 'patch.ineffective', subject: patch.template, reason: `${op.element}:arrange`, message });

        return undefined;
    }

    const arrange: TemplateExtensionArrange = (windows, context) => {
        runTemplateArrange(patch.owner, op, windows, context, name => added.has(name), what => noteArrangeMiss(patch.template, patch.owner, op.element, what));
    };

    return { owner: patch.owner, template: patch.template, arrange, order: patch.order ?? 0 };
};

/**
 * Adds a patch; the returned function takes it out again. Its `bind` ops (in a list, not a function
 * of the context) add their bindings with it: an element named by its short name is one `added` names
 * (the owned names of what the owner's ops add - by default this patch's), a relative `asset` a file
 * beside `base` (the patch file's url, a module's base).
 */
export const addTemplatePatch = (patch: TemplatePatch, options: { base?: string; added?: ReadonlySet<string> } = {}) => {
    const ops = Array.isArray(patch.ops) ? patch.ops as readonly TemplatePatchOp[] : [];
    const added = options.added ?? templatePatchAddedNames(patch.owner, ops);
    const entries = ops.filter(isTemplateBindOp).map(op => bindOpBinding(patch, op, added, options.base)).filter(entry => entry !== undefined);
    const hooks = ops.filter(isTemplateArrangeOp).map(op => arrangeOpHook(patch, op, added)).filter(entry => entry !== undefined);

    patches = [ ...patches, patch ];

    if (entries.length) bindings = sortBindings([ ...bindings, ...entries ]);

    if (hooks.length) arranges = sortBindings([ ...arranges, ...hooks ]);

    changed();
    checkTemplatePatchFontFaces(patch);

    return () => {
        if (!patches.includes(patch)) return;

        patches = patches.filter(entry => entry !== patch);
        bindings = bindings.filter(entry => !entries.includes(entry));
        arranges = arranges.filter(entry => !hooks.includes(entry));
        changed();
    };
};

/**
 * Gives an element a binding in every window drawn from `template`: one `owner` added (`name`, its
 * short name), or with `override` one the window's code binds (`name` as the code names it), over
 * the code's binding for the fields it sets. With `items` the element is bound in each clone of a
 * list that has it (a row the code adds per room) rather than in the window, a function binding
 * given which clone it is drawing.
 */
export const addTemplateBinding = (owner: string, template: string, name: string, binding: TemplateExtensionBinding, options: { override?: boolean; items?: boolean } = {}) => {
    const override = options.override === true;
    const entry: ExtensionBinding = { owner, template, element: override ? name : ownedElementName(owner, name), binding, override, items: options.items === true, order: 0 };

    bindings = sortBindings([ ...bindings, entry ]);
    changed();

    return () => {
        if (!bindings.includes(entry)) return;

        bindings = bindings.filter(item => item !== entry);
        changed();
    };
};

/** Runs `arrange` after the own `arrange` of every window drawn from `template`. */
export const addTemplateArrange = (owner: string, template: string, arrange: TemplateExtensionArrange) => {
    const entry: ExtensionArrange = { owner, template, arrange, order: 0 };

    arranges = sortBindings([ ...arranges, entry ]);
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

    announceApplied(id, report);
};

/**
 * Each owner's `patch.applied` figure for `id`, once its window has been drawn (`APPLIED_REPORT_DELAY`).
 * An owner none of whose ops applied is not reported applied: its misses say why.
 */
const announceApplied = (id: string, report: TemplatePatchReport) => {
    clearTimeout(appliedTimers.get(id));
    appliedTimers.set(id, setTimeout(() => {
        appliedTimers.delete(id);

        for (const { owner, count, applied } of appliedCounts(id, report)) {
            if (applied > 0) reportClientExtension({ owner, kind: 'patch.applied', subject: id, reason: String(applied), message: `${applied} of ${count} op(s) applied.` });
        }
    }, APPLIED_REPORT_DELAY));
};

/** The figures again for every template `template` names, once a bound asset failed after they were said. */
const reannounceApplied = (template: string) => {
    for (const [ id, report ] of reports) {
        if (templatePatchMatches(template, id)) announceApplied(id, report);
    }
};

/** Whether every field `set` sets is one its window's bindings make ineffective. */
const whollyIneffective = (set: TemplatePatchSet, ineffective: readonly TemplatePatchIneffective[]) => Object.entries(set.set)
    .every(([ property, value ]) => (value === undefined) || ineffective.some(miss => miss.owner === set.owner && miss.element === set.element && miss.property === property));

/** `owner`'s `bind` ops for `id` that change nothing (`deadBindOp`), and its `arrange` ops the client refused. */
const deadBindOps = (id: string, owner: string) => patches
    .filter(patch => patch.owner === owner && Array.isArray(patch.ops) && templatePatchMatches(patch.template, id))
    .flatMap(patch => patch.ops as readonly TemplatePatchOp[])
    .filter(op => (isTemplateBindOp(op) && deadBindOp(op)) || (isTemplateArrangeOp(op) && refusedArrangeOps.has(op))).length;

/** Each owner's ops that matched and change what the window draws: neither unmatched, nor wholly ineffective, nor a dead `bind`. */
const appliedCounts = (id: string, report: TemplatePatchReport) => {
    const ineffective = ineffectiveSets.get(id)?.ineffective ?? [];
    const sets = templateSetsSeen.get(id) ?? [];

    return Object.entries(report.ops).map(([ owner, count ]) => {
        const unmatched = report.unmatched.filter(miss => miss.owner === owner).length;
        const dead = (ineffective.length ? sets.filter(set => set.owner === owner && whollyIneffective(set, ineffective)).length : 0) + deadBindOps(id, owner);

        return { owner, count, applied: Math.max(0, count - unmatched - dead) };
    });
};

/** The set ops of a patch list for a template or frame id, made once per list, id and (for patches that read it) context. */
const setsCache = new WeakMap<readonly TemplatePatch[], Map<string, readonly TemplatePatchSet[]>>();

const setsOf = (list: readonly TemplatePatch[], id: string, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT): readonly TemplatePatchSet[] => {
    let byKey = setsCache.get(list);

    if (!byKey) setsCache.set(list, (byKey = new Map()));

    const key = templatePatchesUseContext(list, id) ? `${id}\n${templateContextKey(context)}` : id;
    let sets = byKey.get(key);

    if (!sets) byKey.set(key, (sets = templatePatchSets(list, id, context)));

    return sets;
};

/** What patches naming a frame of Nitro's own by its id give it; a template id (`<library>/<asset>`) is no frame's. */
const frameLookOf = (list: readonly TemplatePatch[], frameId: string): FrameOverride | undefined => (frameId.includes('/') ? undefined : rootFrameOverride(setsOf(list, frameId)));

/**
 * The look template patches give the root frame of `id`'s window (`rootFrameOverride`: the `style`,
 * `color` and `position` of its root `set` ops), over its code's and `frame.overrides`; `undefined` for none.
 */
export const templateRootLook = (id: string, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT, list: readonly TemplatePatch[] = patches): FrameOverride | undefined => (list.length ? rootFrameOverride(setsOf(list, id, context)) : undefined);

/**
 * Notes, as `id`'s window is drawn, which patch `set` ops its bindings make ineffective
 * (`ineffectiveTemplateSets`), and says so - console and the server's extension inspector, kind
 * `patch.ineffective` - the first time each is seen.
 */
export const noteIneffectiveSets = (id: string, template: Template, context: TemplateContext, windowBindings: TemplateBindings | undefined, list: readonly TemplatePatch[] = patches) => {
    if (!list.length) return;

    const sets = setsOf(list, id, context);

    templateSetsSeen.set(id, sets);

    const ineffective = sets.length ? ineffectiveTemplateSets(id, template, sets, windowBindings) : [];

    if (!ineffective.length && !ineffectiveSets.has(id)) return;

    const keyOf = (miss: TemplatePatchIneffective) => `${miss.owner}:${miss.element}.${miss.property}`;
    const signature = ineffective.map(keyOf).join('|');
    const last = ineffectiveSets.get(id);

    if (last?.signature === signature) return;

    const before = new Set(last?.ineffective.map(keyOf));

    ineffectiveSets.set(id, { signature, ineffective });

    for (const miss of ineffective) {
        if (before.has(keyOf(miss))) continue;

        const position = miss.property === 'position';
        const message = `${id}: ${miss.owner}'s patch sets ${miss.property} of '${miss.element}', which changes nothing: ${position ? 'only a window\'s own frame (\'\') opens at a position' : `the window's code sets ${miss.property} of that element, and that is what it draws. Bind it with override: true instead`}.`;

        console.warn(`[TemplatePatches] ${message}`);
        reportClientExtension({ owner: miss.owner, kind: 'patch.ineffective', subject: id, reason: `${miss.element}.${miss.property}`, message });
    }
};

/**
 * The template `id` as `list` (the patches added, `useTemplatePatchList`) makes it for the window's
 * `context`: the source itself while none applies to it. Made once per patch list and - only when a
 * patch reads it - per context, kept for the last few contexts; never copied per render.
 */
export const patchedTemplate = (id: string, source: Template | undefined, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT, list: readonly TemplatePatch[] = patches): Template | undefined => {
    if (source && !templateIds.has(source)) templateIds.set(source, id);

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
    templateIds.set(template, id);

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
    const { bindings: merged, conflicts } = mergeTemplateBindings(id, own, all.filter(entry => templatePatchMatches(entry.template, id) && !entry.items), entry => bindingFor(id, entry, context));

    noteBindingConflicts(id, conflicts);

    return merged;
};

const noteItemBindingConflicts = (id: string, conflicts: TemplatePatchConflict[]) => {
    for (const conflict of conflicts) {
        const signature = `${conflict.element}.${conflict.property}:${conflict.owners.join(',')}`;
        const known = itemBindingConflicts.get(id) ?? new Map<string, TemplatePatchConflict>();

        if (known.has(signature)) continue;

        known.set(signature, conflict);
        itemBindingConflicts.set(id, known);

        const message = `${id}: ${conflict.owners.join(', ')} all bind ${conflict.property} of '${conflict.element}' in each item; ${conflict.owners.at(-1)}'s is used.`;

        console.warn(`[TemplatePatches] ${message}`);

        for (const owner of new Set(conflict.owners)) {
            if (owner !== WINDOW_CODE_OWNER) reportClientExtension({ owner, kind: 'patch.conflict', subject: id, reason: `${conflict.element}.${conflict.property}`, message });
        }
    }
};

/** An item binding as it is for one clone: called each time the clone is drawn (an item's index changes with its list). */
const itemBindingFor = (id: string, entry: ExtensionBinding, context: TemplateContext, at: TemplateItemContext, itemContext: TemplateContext | undefined): TemplateBinding | undefined => {
    if (typeof entry.binding !== 'function') return entry.binding;

    try {
        return entry.binding(context, at, itemContext);
    } catch (error) {
        reportCodeError(id, entry.owner, error);

        return undefined;
    }
};

const itemBindingsOf = (id: string, all: readonly ExtensionBinding[], context: TemplateContext): TemplateItemBindings | undefined => {
    const entries = all.filter(entry => templatePatchMatches(entry.template, id) && entry.items);
    // The bindings of the other templates a clone may be drawn from, as a window of that template has them.
    const others = all.filter(entry => !templatePatchMatches(entry.template, id) && !entry.items);

    if (!entries.length && !others.length) return undefined;

    return (item, at, prototype) => {
        const itemContext = item.context ? { ...context, ...item.context } : context;
        let merged = item.bindings;

        if (entries.length) {
            const { bindings, conflicts } = mergeTemplateItemBindings(id, prototype, merged, entries, entry => itemBindingFor(id, entry, itemContext, at, item.context));

            if (conflicts.length) noteItemBindingConflicts(id, conflicts);

            merged = bindings;
        }

        const from = itemTemplateIdOf(item.from);
        const fromEntries = from ? others.filter(entry => templatePatchMatches(entry.template, from)) : [];

        if (!from || !fromEntries.length) return merged;

        const { bindings, conflicts } = mergeTemplateItemBindings(from, prototype, merged, fromEntries, entry => itemBindingFor(from, entry, itemContext, at, item.context));

        if (conflicts.length) noteItemBindingConflicts(from, conflicts);

        return bindings;
    };
};

/**
 * What each clone of a list in `id`'s windows is drawn with: the code's item bindings and, over them,
 * the extensions' item bindings (`bind(..., { items: true })`) for the window's `context`;
 * `undefined` - the clones drawn with their own - while none is added for the template.
 */
export const useTemplateExtensionItemBindings = (id: string, context: TemplateContext = EMPTY_TEMPLATE_CONTEXT) => itemBindingsOf(id, useSyncExternalStore(subscribe, getBindings), context);

/**
 * What a template's last application reported - its patches' conflicts, misses and errors, with
 * the conflicts of override bindings and the errors of extension code in its windows - once it has
 * been drawn.
 */
export const templatePatchReport = (id: string): TemplatePatchReport | undefined => {
    const report = reports.get(id);
    const overrides = [ ...(bindingConflicts.get(id)?.conflicts ?? []), ...(itemBindingConflicts.get(id)?.values() ?? []) ];
    const errors = codeErrors.get(id) ?? [];
    const ineffective = ineffectiveSets.get(id)?.ineffective ?? [];

    if (!report && !overrides.length && !errors.length && !ineffective.length) return undefined;

    return {
        applied: report ? appliedCounts(id, report).reduce((sum, owner) => sum + owner.applied, 0) : 0,
        ops: report?.ops ?? {},
        conflicts: [ ...(report?.conflicts ?? []), ...overrides ],
        unmatched: report?.unmatched ?? [],
        errors: [ ...(report?.errors ?? []), ...errors ],
        ineffective,
    };
};

/** Per owner, the ops its patches gave a template and how many of them change what it draws (`patch.applied`), once drawn. */
export const templatePatchOwnerCounts = (id: string): { owner: string; count: number; applied: number }[] => {
    const report = reports.get(id);

    return report ? appliedCounts(id, report) : [];
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
 * the files name. A file at a new address replaces its owner's last once it is in, so a window drawn
 * meanwhile keeps the last; `again` reads every file again (live reload, the style values changed).
 */
export const loadTemplatePatchFiles = async (value: unknown, styleValues?: unknown, { again = false }: { again?: boolean } = {}) => {
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
        if (wanted.has(owner)) continue;

        loaded.dispose();
        filePatches.delete(owner);
    }

    await Promise.all([ ...wanted ].filter(([ owner, url ]) => again || (filePatches.get(owner)?.url !== url)).map(async ([ owner, url ]) => {
        try {
            const response = await fetch(url);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const missing = new Set<string>();
            const file = resolveStyles(await response.json(), styles, owner, missing) as TemplatePatchFile;

            if (!Array.isArray(file.patches)) throw new Error('no "patches" list');

            if (missing.size > 0) NitroLogger.warn('TemplatePatches', `${owner}'s patch file names styles the hotel has no value of: ${[ ...missing ].join(', ')}.`);

            // A `bind` op names what any of the file's patches adds by its short name, and reads a relative asset from beside the file.
            const base = new URL(url, window.location.href).href;
            const added = templatePatchAddedNames(owner, file.patches.flatMap(patch => (Array.isArray(patch.ops) ? patch.ops : [])));
            const disposers = file.patches.map(patch => addTemplatePatch({ owner, template: patch.template, ops: patch.ops ?? [], order: patch.order }, { base, added }));

            filePatches.get(owner)?.dispose();
            filePatches.set(owner, { url, dispose: () => disposers.forEach(dispose => dispose()) });
        } catch (error) {
            NitroLogger.error('TemplatePatches', `${owner}'s patch file ${url} did not load: ${error instanceof Error ? error.message : String(error)}`);
        }
    }));
};

/** The preview host's draft patches, and the styles the files were last resolved with. */
let previewDisposers: (() => void)[] = [];
let previewStyles: string | undefined;

/**
 * The preview host's draft (`previewHost`): the hotel's patch files (`value`, as `templates.patches`)
 * with `drafts` - a patch file per owner, as a panel editor holds it unsaved - standing in for those
 * owners' files, resolved with `styleValues` (`templates.styles` with the draft's values). `drafts`
 * null is Habbo's own: no patch file at all. Gives the styles a draft names that have no value.
 */
export const previewTemplatePatchFiles = async (value: unknown, styleValues: unknown, drafts: Readonly<Record<string, unknown>> | null): Promise<string[]> => {
    const styles = parseObject(styleValues);
    const stylesKey = JSON.stringify(styles);
    const files = parseObject(value);
    const missing = new Set<string>();

    previewDisposers.forEach(dispose => dispose());
    previewDisposers = [];

    // A file resolved with other style values is read again with these.
    if (!drafts || (stylesKey !== previewStyles)) await loadTemplatePatchFiles({});

    previewStyles = stylesKey;

    if (!drafts) return [];

    await loadTemplatePatchFiles(Object.fromEntries(Object.entries(files).filter(([ owner ]) => !(owner in drafts))), styles);

    for (const [ owner, draft ] of Object.entries(drafts)) {
        const file = resolveStyles(draft, styles, owner, missing) as TemplatePatchFile;

        if (!Array.isArray(file?.patches)) continue;

        const url = files[owner];
        // A theme the hotel gives no one yet has no entry: its draft names where its files are (`base`), for its pictures.
        const own = (draft as { base?: unknown } | null)?.base;
        const base = new URL((typeof url === 'string') && url.length ? url : (typeof own === 'string') && own.length ? own : '.', window.location.href).href;
        const list = file.patches.filter(patch => patch && (typeof patch.template === 'string'));
        const added = templatePatchAddedNames(owner, list.flatMap(patch => (Array.isArray(patch.ops) ? patch.ops : [])));

        previewDisposers.push(...list.map(patch => addTemplatePatch({ owner, template: patch.template, ops: Array.isArray(patch.ops) ? patch.ops : [], order: patch.order }, { base, added })));
    }

    return [ ...missing ];
};
