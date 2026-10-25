/**
 * Skips `@pixi/layout`'s per-frame layout walk over the stage while nothing in it changed.
 *
 * Before every render `LayoutSystem.updateLayout` walks the whole stage: it recalculates each layout
 * root marked dirty, then visits every node to copy a new layout onto it. Every way a layout gets
 * work funnels through `Layout.invalidateRoot` (a style that changed, a child added or removed - its
 * own visibility walk, `_updateSize`, included), `Layout.forceUpdate`, or `Layout.setStyle` setting
 * `_forceUpdate` for a tracked style key. Those raise a flag; the stage's walk runs only when it is
 * up, and lowers it first, so what the walk itself causes (a `layout` listener restyling a node)
 * still gets the next frame's.
 *
 * `_updateSize` - the throttled walk that notices a sprite or text whose own size changed, and a
 * node shown or hidden - still runs every time: it is what raises the flag for those. A render of
 * anything other than the stage (a render-to-texture of a laid-out container) walks as before.
 */
import { Layout } from '@pixi/layout';
import { Container } from 'pixi.js';

type LayoutWalker = { updateLayout: (this: LayoutWalker, container: Container) => void };

let pending = true;
let installed = false;

/** Wraps a `Layout` method so a call raises the flag, before or after the original runs. */
const raiseOn = <K extends 'invalidateRoot' | 'forceUpdate' | 'setStyle'>(name: K, after = false) => {
    const prototype = Layout.prototype as unknown as Record<K, (this: Layout, ...args: unknown[]) => unknown>;
    const original = prototype[name];

    prototype[name] = function (this: Layout, ...args: unknown[]) {
        if (!after) pending = true;

        const result = original.apply(this, args);

        if (after && (this as unknown as { _forceUpdate?: boolean })._forceUpdate) pending = true;

        return result;
    };
};

/** Whether a layout change is waiting for the stage's next walk (`renderGate` draws a frame for it). */
export const isLayoutWalkPending = (): boolean => pending;

/** Installs the gate on the renderer's layout system for `stage`; once per page. */
export const gateLayoutWalk = (renderer: unknown, stage: Container): void => {
    const system = (renderer as { layout?: LayoutWalker }).layout;

    if (installed || !system || (typeof system.updateLayout !== 'function')) return;

    installed = true;

    raiseOn('invalidateRoot');
    raiseOn('forceUpdate');
    raiseOn('setStyle', true);

    const updateLayout = system.updateLayout;

    system.updateLayout = function (this: LayoutWalker, container: Container) {
        if (container === stage) {
            if (!pending) return;

            pending = false;
        }

        updateLayout.call(this, container);
    };
};
