/**
 * Not Flash's: what the extension inspector needs to find a window element under the pointer. Each
 * template element a `TemplateView` draws provides its node (`TemplateInspectContext`, its parent's
 * node behind it), each window its template id (`TemplateInspectWindowContext`), and every `Box`
 * notes the node it was drawn in against its Pixi container (`noteInspectTarget`). Finding an element
 * is then a walk of the stage for the deepest noted container under a point (`inspectAt`), and its
 * key the name a patch or a binding gives it (`inspectKey`): no data is kept but a weak map, and
 * nothing is walked until someone asks.
 *
 * All of it only while the inspector is on (`setTemplateInspecting`): off - every player who is not
 * staff with it - an element provides nothing and a box reads no context (React 19's `use` is
 * read only when on), so the windows cost what they did before. Turning it on redraws the open
 * windows once (`TemplateWindow` keys its view on it), so they provide their nodes from then on.
 */
import { Container, PointData } from 'pixi.js';
import { createContext } from 'react';

import type { TemplateElement } from './template/templateData';
import { templateElementKey } from './template/templateElementKey';
import { templateIdOf, templatePartOf, templatePrototypeOf } from './template/templateParts';
import type { TemplateContext } from './template/templatePatch';

/** One drawn element, and the element it is drawn in (none for a window's root). */
export interface TemplateInspectNode {
    element: TemplateElement;
    parent: TemplateInspectNode | undefined;
}

/** The template a window draws: its id (`<library>/<asset>`) and, for one window of it drawn alone, that window's name. */
export interface TemplateInspectWindow {
    id: string;
    part?: string;
    /** What the window tells patches about what it shows (`TemplateWindow`'s `context`): the ops of a patch that reads it are listed as made for it. */
    context?: TemplateContext;
}

export const TemplateInspectContext = createContext<TemplateInspectNode | undefined>(undefined);

let inspecting = false;
const inspectingListeners = new Set<() => void>();

/** Whether the inspector is on: read in render, so a module flag, not a hook. */
export const isTemplateInspecting = () => inspecting;

/** Turns the inspector on or off; the open windows redraw once to follow. */
export const setTemplateInspecting = (on: boolean) => {
    if (inspecting === on) return;

    inspecting = on;
    inspectingListeners.forEach(listener => listener());
};

export const subscribeTemplateInspecting = (listener: () => void) => {
    inspectingListeners.add(listener);

    return () => {
        inspectingListeners.delete(listener);
    };
};

export const TemplateInspectWindowContext = createContext<TemplateInspectWindow | undefined>(undefined);

/** What a container was drawn for. */
export interface TemplateInspectHolder {
    node: TemplateInspectNode | undefined;
    window: TemplateInspectWindow | undefined;
}

const targets = new WeakMap<Container, TemplateInspectHolder>();

/** Notes that `container` draws (part of) the element in `holder`. */
export const noteInspectTarget = (container: Container, holder: TemplateInspectHolder) => {
    targets.set(container, holder);
};

export interface TemplateInspectHit {
    node: TemplateInspectNode;
    window: TemplateInspectWindow;
    container: Container;
}

/**
 * The window element drawn under `point` (stage coordinates): the deepest noted container whose
 * bounds hold it, the last drawn of siblings first - what is on top. A subtree whose bounds miss
 * the point is not entered.
 */
export const inspectAt = (stage: Container, point: PointData): TemplateInspectHit | undefined => {
    const visit = (container: Container): TemplateInspectHit | undefined => {
        if (!container.visible || !container.renderable || (container.alpha <= 0)) return undefined;

        if (!container.getBounds().containsPoint(point.x, point.y)) return undefined;

        for (let index = container.children.length - 1; index >= 0; index--) {
            const hit = visit(container.children[index]);

            if (hit) return hit;
        }

        const holder = targets.get(container);

        return (holder?.node && holder.window) ? { node: holder.node, window: holder.window, container } : undefined;
    };

    return visit(stage);
};

/** The elements from the window's root down to `node`'s. */
export const inspectChain = (node: TemplateInspectNode): TemplateElement[] => {
    const chain: TemplateElement[] = [];

    for (let at: TemplateInspectNode | undefined = node; at; at = at.parent) chain.unshift(at.element);

    return chain;
};

/**
 * The key that names `node`'s element in its window's template, as a patch's `element` or a
 * binding's key does (`''` the window itself, `'name'`, `'panel/@2'`, `'@0/@1'`) - `templateElementKey`.
 * `undefined` for an element the template does not have - a clone a list's code made.
 */
export const inspectKey = (node: TemplateInspectNode): string | undefined => templateElementKey(inspectChain(node));

/** `inspectKey` in the template the window draws: a window drawn alone (`part`) is that window of it. */
export const inspectTemplateKey = (node: TemplateInspectNode, window: TemplateInspectWindow): string | undefined => {
    const own = inspectKey(node);

    return ((own === undefined) || !window.part) ? own : own ? `${window.part}/${own}` : window.part;
};

/**
 * The containers drawing the element `key` names (`inspectTemplateKey`) in the windows of template
 * `id`: the outermost of each drawing, not the boxes inside it. What a preview outlines.
 */
export const inspectFind = (stage: Container, id: string, key: string): Container[] => {
    const found: Container[] = [];

    const visit = (container: Container) => {
        const holder = targets.get(container);

        // A part built inside the window (a grid item cloned from its template) is found by the part's id and key, a row by its prototype's.
        const named = (holder?.node && holder.window) ? ((holder.window.id === id) ? inspectTemplateKey(holder.node, holder.window) : undefined) : undefined;
        const inPart = (holder?.node && holder.window && (named !== key)) ? inspectPart(holder.node, holder.window) : undefined;

        if ((holder?.window?.id === id && named === key && !inPart?.part) || ((inPart?.part || (inPart?.row !== undefined)) && (inPart.template === id) && (inPart.key === key))) {
            found.push(container);

            return;
        }

        for (const child of container.children) visit(child);
    };

    visit(stage);

    return found;
};

/** Where a pressed element is: the template it is drawn from and its key there, crossing into a part built from another template. */
export interface TemplateInspectPart {
    /** The template the element's key names it in: a part's (`badgeGridItem`) inside a clone of it, else the window's. */
    template: string;
    /** Its key in that template; `undefined` for a clone no key reaches. */
    key: string | undefined;
    /** Whether the template is a part built inside the window (a list's clone of another template's root). */
    part: boolean;
    /** Inside a clone of one of the window's own elements (a list row): that element's key - what a patch on every row names. */
    row?: string;
    /** From the window's root down to the element: each step's template, key (null for a clone), tag and name. */
    path: { template: string; key: string | null; tag: string; name: string | null }[];
}

/**
 * `node` named in the template it was built from: inside a clone of another template's root
 * (`templatePartOf`, a library's template noted with its id) the part's own id and key, as a patch of
 * that template names the element; else the window's (`inspectTemplateKey`).
 */
export const inspectPart = (node: TemplateInspectNode, window: TemplateInspectWindow): TemplateInspectPart => {
    const nodes: TemplateInspectNode[] = [];

    for (let at: TemplateInspectNode | undefined = node; at; at = at.parent) nodes.unshift(at);

    const path: TemplateInspectPart['path'] = [];
    let template = window.id;
    let from = 0;
    let part = false;
    /** Inside a clone of one of the window's own elements (a row): that element's key, the clone's keys scoped under it. */
    let prototype: string | undefined;

    nodes.forEach((each, index) => {
        const made = templatePartOf(each.element);
        const id = made && templateIdOf(made);
        const row = templatePrototypeOf(each.element);

        if (id) {
            template = id;
            from = index;
            part = true;
            prototype = undefined;
        } else if (row !== undefined) {
            from = index;
            prototype = (part || !window.part) ? row : `${window.part}/${row}`;
        }

        const chain = nodes.slice(from, index + 1).map(step => step.element);
        const inner = (part || (prototype !== undefined)) ? templateElementKey(chain) : undefined;
        const key = (prototype !== undefined) ? ((inner === undefined) ? undefined : inner ? `${prototype}/${inner}` : prototype) : part ? inner : inspectTemplateKey(each, window);

        path.push({ template, key: key ?? null, tag: each.element.tag, name: each.element.name ?? null });
    });

    const last = path[path.length - 1];

    return { template, key: last?.key ?? undefined, part, ...((prototype !== undefined) ? { row: prototype } : {}), path };
};

/** One element of a window as drawn: where a patch names it, and the containers drawing it (a list's rows each). */
export interface TemplateInspectElement {
    template: string;
    key: string;
    element: TemplateElement;
    containers: Container[];
}

/**
 * Every element a key reaches drawn in the windows of template `id` and in what is drawn inside them
 * (the parts built from other templates, a template window such as a catalogue page), each named in
 * its own template, with the outermost containers drawing it - an editor's outlines of the whole
 * window at once, in one walk; with no `id`, of every window on the stage. A clone no key reaches is left
 * out; a hidden element is not drawn.
 */
export const inspectElements = (stage: Container, id: string | undefined): TemplateInspectElement[] => {
    const found = new Map<string, TemplateInspectElement>();

    const visit = (container: Container, drawing: TemplateInspectNode | undefined, inside: boolean) => {
        if (!container.visible || !container.renderable) return;

        const holder = targets.get(container);
        let node = drawing;
        // No id: every window on the stage (a screen of many, the room screen's HUD).
        const within = inside || (holder?.window !== undefined && ((id === undefined) || (holder.window.id === id)));

        if (within && holder?.node && holder.window && (holder.node !== drawing)) {
            node = holder.node;

            const part = inspectPart(node, holder.window);

            if (part.key !== undefined) {
                const entry = `${part.template}|${part.key}`;
                const known = found.get(entry);

                if (known) known.containers.push(container);
                else found.set(entry, { template: part.template, key: part.key, element: node.element, containers: [ container ] });
            }
        }

        for (const child of container.children) visit(child, node, within);
    };

    visit(stage, undefined, false);

    return [ ...found.values() ];
};

/** Every template drawn on the stage now: the windows' and the parts built inside them, each once. */
export const inspectTemplates = (stage: Container): string[] => {
    const found = new Set<string>();
    const seen = new Set<TemplateInspectNode>();

    const visit = (container: Container) => {
        const holder = targets.get(container);

        if (holder?.window) found.add(holder.window.id);

        for (let at = holder?.node; at && !seen.has(at); at = at.parent) {
            seen.add(at);

            const made = templatePartOf(at.element);
            const id = made && templateIdOf(made);

            if (id) found.add(id);
        }

        for (const child of container.children) visit(child);
    };

    visit(stage);

    return [ ...found ].sort();
};
