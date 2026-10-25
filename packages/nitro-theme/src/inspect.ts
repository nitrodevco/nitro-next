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

import { resolveTemplateNames } from './template/templateBindings';
import type { TemplateElement } from './template/templateData';
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
 * binding's key does (`''` the window itself, `'name'`, `'panel/@2'`, `'@0/@1'`): its own name when
 * that finds it, else the nearest named ancestor that does and the child indexes under it.
 * `undefined` for an element the template does not have - a clone a list's code made.
 */
export const inspectKey = (node: TemplateInspectNode): string | undefined => {
    const chain = inspectChain(node);
    const root = chain[0];
    const target = chain[chain.length - 1];
    const roots = [ root ];
    const finds = (key: string) => resolveTemplateNames(roots, [ key ]).targets.get(key) === target;

    if (target === root) return '';

    if (target.name && finds(target.name)) return target.name;

    // Index steps from `from` (a chain position) down to the target.
    const indexes = (from: number): string[] | undefined => {
        const steps: string[] = [];

        for (let at = from + 1; at < chain.length; at++) {
            const index = chain[at - 1].children.indexOf(chain[at]);

            if (index < 0) return undefined;

            steps.push(`@${index}`);
        }

        return steps;
    };

    for (let at = chain.length - 2; at >= 1; at--) {
        const name = chain[at].name;

        if (!name || resolveTemplateNames(roots, [ name ]).targets.get(name) !== chain[at]) continue;

        const steps = indexes(at);
        const key = steps && [ name, ...steps ].join('/');

        if (key && finds(key)) return key;
    }

    // From the window itself: a leading `@N` counts in its children.
    const steps = indexes(0);
    const key = steps?.join('/');

    return (key && finds(key)) ? key : undefined;
};
