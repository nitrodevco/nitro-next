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
import { resolveTemplateNames } from './templateBindings';
import type { Template, TemplateElement, TemplateValue } from './templateData';

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
        | { element: string; insert: TemplateInsertPosition; add: TemplateElementInput };

export interface TemplatePatch {
    /** Who made it: a plugin's key. Elements it adds are named `<owner>:<name>`. */
    owner: string;
    /** The template's id, `<library>/<asset>` (`habbo-friend-list-com/friend_list_xml`). */
    template: string;
    ops: readonly TemplatePatchOp[];
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

export interface TemplatePatchReport {
    applied: number;
    conflicts: TemplatePatchConflict[];
    unmatched: TemplatePatchUnmatched[];
}

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

/** An element key as the template has it: names an owner added are looked up by their owned name. */
const elementKey = (owner: string, key: string, owned: ReadonlySet<string>) => key.split('/').map(part => (owned.has(ownedElementName(owner, part)) ? ownedElementName(owner, part) : part)).join('/');

/**
 * The template with `patches` applied (those for other templates are skipped), and what happened.
 * The template passed in is never changed: with any op to apply, a copy is made and changed.
 */
export const applyTemplatePatches = (template: Template, templateId: string, patches: readonly TemplatePatch[]): { template: Template; report: TemplatePatchReport } => {
    const report: TemplatePatchReport = { applied: 0, conflicts: [], unmatched: [] };
    const own = sortTemplatePatches(patches.filter(patch => patch.template === templateId && patch.ops.length));

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

                    byProperty.set(property, [ ...(byProperty.get(property) ?? []), patch.owner ]);

                    // The window's size is its layout's: resizing the window itself (`''`, its one root)
                    // resizes the layout by as much, or it would be drawn and hit-tested at the old size.
                    if (target === result.elements[0] && result.elements.length === 1 && (property === 'width' || property === 'height')) result[property] += (value as number) - target[property];

                    (target as unknown as Record<string, unknown>)[property] = value;
                }
            } else if ('remove' in op) {
                const container = findContainer(result.elements, target);

                container?.splice(container.indexOf(target), 1);
            } else {
                const element = toElement(patch.owner, op.add, like => resolveTemplateNames(result.elements, [ elementKey(patch.owner, like, owned) ]).targets.get(elementKey(patch.owner, like, owned)));

                if ('missing' in element) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: element.missing });

                    continue;
                }

                const into = (op.insert === 'first' || op.insert === 'last') ? target.children : findContainer(result.elements, target);

                if (!into) {
                    report.unmatched.push({ template: templateId, owner: patch.owner, element: op.element });

                    continue;
                }

                const at = op.insert === 'first' ? 0 : op.insert === 'last' ? into.length : into.indexOf(target) + (op.insert === 'after' ? 1 : 0);

                into.splice(at, 0, element);

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
