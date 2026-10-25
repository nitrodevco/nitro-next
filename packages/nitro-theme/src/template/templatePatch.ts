/**
 * Not Flash's: changes an extension (a theme, a client module) makes to a window template as data,
 * applied where the client reads the template - not to a copy of the library it ships. Several
 * extensions may change one template; each change names an element as a binding names it
 * (`'name'`, `'panel/name'`, `'#TAG'`, `'@N'`, `''` for the window), so a patch addresses exactly what
 * the window's own code reaches with `findChildByName`.
 *
 * Applying is pure and deterministic: patches run by `order`, then by owner, then in the order they
 * were added. Two owners setting one property of one element is a conflict - the later one wins, as a
 * later stylesheet does, and the report names both - and a change whose element the template does not
 * have (a renamed element in a new client release) is reported as unmatched rather than guessed at.
 *
 * Kept free of runtime imports beyond the template helpers, so a build script or a test can run it
 * under Node.
 */
import { resolveTemplateNames, TemplateBinding, TemplateBindings, TemplateWindows } from './templateBindings';
import type { Template, TemplateElement, TemplateParams, TemplateValue } from './templateData';

/** What a patch may change on an element: its layout's own attributes, never its code's behaviour. */
export interface TemplateElementChanges {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    style?: string;
    dynamicStyle?: string;
    caption?: string;
    hidden?: boolean;
    /** `0xAARRGGBB`. */
    color?: number;
    background?: boolean;
    blend?: number;
    /** Merged into the element's `<variables>` by key (`asset_uri`, `text_color`, ...). */
    vars?: Record<string, TemplateValue>;
    /**
     * Merged into the element's layout flags by key, as `vars` are: `scale` (how it follows its
     * parent's resize - a widened element stops stretching with `[ 'fixed', 'fixed' ]`), `align`,
     * `accommodate`, ... (`TemplateParams`).
     */
    params?: Partial<TemplateParams>;
}

/**
 * An element a patch adds. With `like` it starts as a copy of an element the template has (named as
 * an op's `element` is, `'help_button'`, `'help_button/@0'`): its type, look, input flags and children
 * - a button "like the help button" - and the fields given replace the copy's (`vars` merged). Without
 * `like` it is built from the fields alone (`tag` then needed), the rest Flash's defaults.
 */
export type TemplateElementInput = Partial<Omit<TemplateElement, 'children' | 'name' | 'tag'>> & { name: string; tag?: string; like?: string; children?: TemplateElementInput[] };

export type TemplateInsertPosition = 'before' | 'after' | 'first' | 'last';

export type TemplatePatchOp
    = | { element: string; set: TemplateElementChanges }
        | { element: string; remove: true }
        | { element: string; insert: TemplateInsertPosition; add: TemplateElementInput }
        /**
         * Moves the element - its children with it - `before` / `after` the element `to` names, or
         * `first` / `last` inside it. It keeps its name, so the window's code still reaches it with
         * `findChildByName` and its bindings still apply; its `x` / `y` are now its new parent's.
         */
        | { element: string; move: TemplateInsertPosition; to: string }
        /**
         * Puts a new element (`add`, as `insert` builds it) in the element's place and the element - its
         * children with it, its name kept - inside it at (0, 0). The new one takes the element's rect
         * unless `add` gives its own: wrapping a part of a window in a `frame` makes it a separately
         * framed pane of the window (`docs/template-patches.md`). The window itself (`''`) is not wrapped.
         */
        | { element: string; wrap: TemplateElementInput };

/**
 * What a window tells patches about what it shows, read-only: the infostand's user id, type and
 * figure, whether it is the own user (`docs/template-patches.md` lists each window's keys). Flat
 * values only, so two contexts with the same values are the same context.
 */
export type TemplateContext = Readonly<Record<string, string | number | boolean | null | undefined>>;

/** A patch's ops, or what they are for a window's context (called once per context, not per render). */
export type TemplatePatchOps = readonly TemplatePatchOp[] | ((context: TemplateContext) => readonly TemplatePatchOp[]);

export interface TemplatePatch {
    /** Who made it: a plugin's key. Elements it adds are named `<owner>:<name>`. */
    owner: string;
    /** The template's id, `<library>/<asset>` (`habbo-friend-list-com/friend_list_xml`). */
    template: string;
    ops: TemplatePatchOps;
    /** Lower runs first; a theme that others build on takes a low order. Default 0. */
    order?: number;
}

export interface TemplatePatchConflict {
    template: string;
    element: string;
    property: string;
    /** Every owner that set it, in the order they ran; the last one's value is kept. */
    owners: string[];
}

export interface TemplatePatchUnmatched {
    template: string;
    owner: string;
    element: string;
}

/** An extension's code that threw - the ops for a context, a post-layout hook, a binding - and was skipped; the rest still applied. */
export interface TemplatePatchError {
    template: string;
    owner: string;
    message: string;
}

export interface TemplatePatchReport {
    applied: number;
    /** The ops each owner's patches gave this template (for a context, what its functions gave), by owner. */
    ops: Record<string, number>;
    conflicts: TemplatePatchConflict[];
    unmatched: TemplatePatchUnmatched[];
    errors: TemplatePatchError[];
}

/** No context: what a window that passes none is patched with. */
export const EMPTY_TEMPLATE_CONTEXT: TemplateContext = Object.freeze({});

/** Whether `id`'s patches depend on the window's context: any of them gives its ops as a function. */
export const templatePatchesUseContext = (patches: readonly TemplatePatch[], id: string) => patches.some(patch => patch.template === id && typeof patch.ops === 'function');

const contextKeys = new WeakMap<TemplateContext, string>();

/**
 * A context's identity by its values (`TemplateContext` is flat): what a cache of patched templates
 * is keyed by, so a window that builds its context anew each render still finds its copy. Worked
 * out once per context object.
 */
export const templateContextKey = (context: TemplateContext): string => {
    let key = contextKeys.get(context);

    if (key === undefined) {
        key = JSON.stringify(Object.keys(context).sort().map(name => [ name, context[name] ?? null ]));
        contextKeys.set(context, key);
    }

    return key;
};

/** A thrown value as a report's message. */
export const templatePatchErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));

/** The ops of `patch` for `context`: its list, or what its function gives; a throw is reported, not raised. */
const opsOf = (patch: TemplatePatch, context: TemplateContext, errors: TemplatePatchError[]): readonly TemplatePatchOp[] => {
    if (typeof patch.ops !== 'function') return patch.ops;

    try {
        const ops = patch.ops(context);

        return Array.isArray(ops) ? ops : [];
    } catch (error) {
        errors.push({ template: patch.template, owner: patch.owner, message: templatePatchErrorMessage(error) });

        return [];
    }
};

/** The name an element added by `owner` carries in the template: its owner's, so two owners' names never meet. */
export const ownedElementName = (owner: string, name: string) => `${owner}:${name}`;

/** Patches in the order they apply: `order`, then owner, then as given (the sort is stable). */
export const sortTemplatePatches = <T extends TemplatePatch>(patches: readonly T[]): T[] => [ ...patches ].sort((a, b) => ((a.order ?? 0) - (b.order ?? 0)) || (a.owner < b.owner ? -1 : a.owner > b.owner ? 1 : 0));

/** A copy of an element `owner` adds: its named descendants take owned names, so they never meet the template's. */
const ownCopy = (owner: string, element: TemplateElement): TemplateElement => ({
    ...structuredClone(element),
    ...(element.name !== undefined ? { name: ownedElementName(owner, element.name) } : {}),
    children: element.children.map(child => ownCopy(owner, child)),
});

/** The element an input describes, or the `like` it names that the template does not have. */
const toElement = (owner: string, input: TemplateElementInput, find: (key: string) => TemplateElement | undefined): TemplateElement | { missing: string } => {
    const { like, children, vars, ...fields } = input;
    let base: TemplateElement | undefined;

    if (like !== undefined) {
        base = find(like);

        if (!base) return { missing: like };
    } else if (!fields.tag) return { missing: '(an added element with neither tag nor like)' };

    const copy = base ? ownCopy(owner, base) : undefined;
    const ownChildren: TemplateElement[] = [];

    for (const child of children ?? []) {
        const element = toElement(owner, child, find);

        if ('missing' in element) return element;
        ownChildren.push(element);
    }

    return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        ...copy,
        ...fields,
        tag: fields.tag ?? copy!.tag,
        name: ownedElementName(owner, input.name),
        vars: { ...copy?.vars, ...vars },
        children: children ? ownChildren : (copy?.children ?? []),
    };
};

/** The list holding `target` (the window's roots or a parent's children), found by identity. */
const findContainer = (list: TemplateElement[], target: TemplateElement): TemplateElement[] | undefined => {
    if (list.includes(target)) return list;

    for (const child of list) {
        const found = findContainer(child.children, target);

        if (found) return found;
    }

    return undefined;
};

/** Whether `inner` is `outer` or inside it. */
const contains = (outer: TemplateElement, inner: TemplateElement): boolean => outer === inner || outer.children.some(child => contains(child, inner));

/** Puts `element` `position` the element `target`; false when `target` is in no list. */
const place = (elements: TemplateElement[], element: TemplateElement, position: TemplateInsertPosition, target: TemplateElement) => {
    const into = (position === 'first' || position === 'last') ? target.children : findContainer(elements, target);

    if (!into) return false;

    const at = position === 'first' ? 0 : position === 'last' ? into.length : into.indexOf(target) + (position === 'after' ? 1 : 0);

    into.splice(at, 0, element);

    return true;
};

/** An element key as the template has it: names an owner added are looked up by their owned name. */
const elementKey = (owner: string, key: string, owned: ReadonlySet<string>) => key.split('/').map(part => (owned.has(ownedElementName(owner, part)) ? ownedElementName(owner, part) : part)).join('/');

/**
 * The template with `patches` applied (those for other templates are skipped), and what happened.
 * A patch whose ops are a function is given `context`, the window's. The template passed in is never
 * changed: with any op to apply, a copy is made and changed.
 */
export const applyTemplatePatches = (template: Template, templateId: string, patches: readonly TemplatePatch[], context: TemplateContext = EMPTY_TEMPLATE_CONTEXT): { template: Template; report: TemplatePatchReport } => {
    const report: TemplatePatchReport = { applied: 0, ops: {}, conflicts: [], unmatched: [], errors: [] };
    const own = sortTemplatePatches(patches.filter(patch => patch.template === templateId))
        .map(patch => ({ owner: patch.owner, ops: opsOf(patch, context, report.errors) }))
        .filter(patch => patch.ops.length);

    for (const patch of own) report.ops[patch.owner] = (report.ops[patch.owner] ?? 0) + patch.ops.length;

    if (!own.length) return { template, report };

    const result = structuredClone(template);
    // Who set each property of each element, to report a second owner setting it.
    const setters = new Map<TemplateElement, Map<string, string[]>>();
    const owned = new Set<string>();

    for (const patch of own) {
        for (const op of patch.ops) {
            const key = elementKey(patch.owner, op.element, owned);
            const target = resolveTemplateNames(result.elements, [ key ]).targets.get(key);

            if (!target) {
                report.unmatched.push({ template: templateId, owner: patch.owner, element: op.element });

                continue;
            }

            if ('set' in op) {
                let byProperty = setters.get(target);

                if (!byProperty) setters.set(target, (byProperty = new Map()));

                for (const [ property, value ] of Object.entries(op.set) as [ keyof TemplateElementChanges, unknown ][]) {
                    if (value === undefined) continue;

                    if (property === 'vars') {
                        for (const [ name, varValue ] of Object.entries(value as Record<string, TemplateValue>)) {
                            const owners = byProperty.get(`vars.${name}`) ?? [];

                            byProperty.set(`vars.${name}`, [ ...owners, patch.owner ]);
                            target.vars[name] = varValue;
                        }

                        continue;
                    }

                    // Merged by key as `vars` are: a patch that pins `scale` keeps the layout's `align`.
                    if (property === 'params') {
                        const params: Record<string, unknown> = { ...target.params };

                        for (const [ name, paramValue ] of Object.entries(value as Partial<TemplateParams>)) {
                            if (paramValue === undefined) continue;

                            byProperty.set(`params.${name}`, [ ...(byProperty.get(`params.${name}`) ?? []), patch.owner ]);
                            params[name] = structuredClone(paramValue);
                        }

                        target.params = params;

                        continue;
                    }

                    byProperty.set(property, [ ...(byProperty.get(property) ?? []), patch.owner ]);

                    // The window's size is its layout's: resizing the window itself (`''`, its one root)
                    // resizes the layout by as much, or it would be drawn and hit-tested at the old size.
                    if (target === result.elements[0] && result.elements.length === 1 && (property === 'width' || property === 'height')) result[property] += (value as number) - target[property];

                    (target as unknown as Record<string, unknown>)[property] = value;
                }
            } else if ('remove' in op) {
                const container = findContainer(result.elements, target);

                container?.splice(container.indexOf(target), 1);
            } else if ('wrap' in op) {
                const from = findContainer(result.elements, target);
                const wrapper = toElement(patch.owner, op.wrap, like => resolveTemplateNames(result.elements, [ elementKey(patch.owner, like, owned) ]).targets.get(elementKey(patch.owner, like, owned)));

                if ('missing' in wrapper) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: wrapper.missing });

                    continue;
                }

                if (!from || (from === result.elements && result.elements.length === 1)) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: op.element });

                    continue;
                }

                for (const axis of [ 'x', 'y', 'width', 'height' ] as const) {
                    if (op.wrap[axis] === undefined) wrapper[axis] = target[axis];
                }

                from.splice(from.indexOf(target), 1, wrapper);
                wrapper.children.push(target);
                target.x = 0;
                target.y = 0;

                const own = (added: TemplateElement) => {
                    if (added === target) return;

                    owned.add(added.name ?? '');
                    added.children.forEach(own);
                };

                own(wrapper);
            } else if ('move' in op) {
                const toKey = elementKey(patch.owner, op.to, owned);
                const destination = resolveTemplateNames(result.elements, [ toKey ]).targets.get(toKey);
                const from = findContainer(result.elements, target);

                // Into itself or its own children, or the window's one root out of its place: nowhere to go.
                if (!destination || contains(target, destination) || !from || (from === result.elements && result.elements.length === 1)) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: op.to });

                    continue;
                }

                from.splice(from.indexOf(target), 1);
                place(result.elements, target, op.move, destination);
            } else {
                const element = toElement(patch.owner, op.add, like => resolveTemplateNames(result.elements, [ elementKey(patch.owner, like, owned) ]).targets.get(elementKey(patch.owner, like, owned)));

                if ('missing' in element) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: element.missing });

                    continue;
                }

                if (!place(result.elements, element, op.insert, target)) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: op.element });

                    continue;
                }

                const own = (added: TemplateElement) => {
                    owned.add(added.name ?? '');
                    added.children.forEach(own);
                };

                own(element);
            }

            report.applied++;
        }
    }

    for (const [ element, byProperty ] of setters) {
        for (const [ property, owners ] of byProperty) {
            if (new Set(owners).size > 1) report.conflicts.push({ template: templateId, element: element.name ?? '', property, owners });
        }
    }

    return { template: result, report };
};

/** Who the window's own code is, in a conflict an override binding reports. */
export const WINDOW_CODE_OWNER = '(window)';

/** A binding an extension gives the elements of a template's windows (`api.templates.bind`). */
export interface TemplateBindingEntry {
    owner: string;
    /** The element's owned name, `<owner>:<name>`; with `override`, the name as the window's code has it. */
    element: string;
    /** Laid over the window's own binding of the element, for the fields it sets. */
    override: boolean;
}

/**
 * The bindings a window is drawn with: the window's `own`, the extensions' for elements they added
 * under them (an owned name never meets one of the window's), and their overrides over them - for
 * each field an override sets, its value is used, and every field the window's code or an earlier
 * override sets too is a conflict, the window's code named `WINDOW_CODE_OWNER`. `resolve` gives an
 * entry's binding as it is for the window (a function of its context made, or `undefined` when it
 * threw); `own` itself is returned while no extension binds the template.
 */
export const mergeTemplateBindings = <T extends TemplateBindingEntry>(templateId: string, own: TemplateBindings | undefined, entries: readonly T[], resolve: (entry: T) => TemplateBinding | undefined): { bindings: TemplateBindings | undefined; conflicts: TemplatePatchConflict[] } => {
    if (!entries.length) return { bindings: own, conflicts: [] };

    const added: TemplateBindings = {};

    for (const entry of entries) {
        if (entry.override) continue;

        const binding = resolve(entry);

        if (binding) added[entry.element] = { ...added[entry.element], ...binding };
    }

    const merged: TemplateBindings = { ...added, ...own };
    const setters = new Map<string, Map<string, string[]>>();

    for (const entry of entries) {
        if (!entry.override) continue;

        const binding = resolve(entry);

        if (!binding) continue;

        const base = merged[entry.element];

        for (const field of Object.keys(binding) as (keyof TemplateBinding)[]) {
            if (binding[field] === undefined) continue;

            const byField = setters.get(entry.element) ?? new Map<string, string[]>();

            byField.set(field, [ ...(byField.get(field) ?? ((base?.[field] !== undefined) ? [ WINDOW_CODE_OWNER ] : [])), entry.owner ]);
            setters.set(entry.element, byField);
        }

        merged[entry.element] = { ...base, ...binding };
    }

    const conflicts: TemplatePatchConflict[] = [];

    for (const [ element, byField ] of setters) {
        for (const [ field, owners ] of byField) {
            if (owners.length > 1) conflicts.push({ template: templateId, element, property: `binding.${field}`, owners });
        }
    }

    return { bindings: merged, conflicts };
};

/** What an extension runs after a window's own `arrange`: the window's model, and its context. */
export type TemplateExtensionArrange = (windows: TemplateWindows, context: TemplateContext) => void;

/**
 * The window's `arrange` with the extensions' `hooks` run after it in the order given, each with the
 * window's model and `context`; one that throws is passed to `onError` and the others still run. The
 * window's own as it is while there is none.
 */
export const chainTemplateArranges = <T extends { owner: string; arrange: TemplateExtensionArrange }>(own: ((windows: TemplateWindows) => void) | undefined, hooks: readonly T[], context: TemplateContext, onError: (hook: T, error: unknown) => void): ((windows: TemplateWindows) => void) | undefined => {
    if (!hooks.length) return own;

    return (windows: TemplateWindows) => {
        own?.(windows);

        for (const hook of hooks) {
            try {
                hook.arrange(windows, context);
            } catch (error) {
                onError(hook, error);
            }
        }
    };
};
