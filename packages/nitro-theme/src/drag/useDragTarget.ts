import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useRef, useState } from 'react';

import { useWindowPointerDrag } from '../hooks/useWindowPointerDrag';
import { ClientToStage, GetDesktopSize } from '../utils/GetPixelRatio';
import { findDragCutOff } from './dragCutOff';
import { DragTargetController } from './DragTargetContext';

export interface DragTargetOptions {
    /**
     * The target's `bound_to_parent_rect` flag (32): `WindowController.setRectangle` keeps a moved
     * window inside its parent - left/top at least 0, then pulled back by whatever it overhangs
     * the parent's right/bottom edge (so one wider than its parent ends up at a negative x).
     */
    boundToParentRect?: boolean;
    /**
     * The move goes at the release: the code lays the target out where it belongs from then on (a
     * slider's button, put where its value says), so no move is left on top for that to allow for.
     */
    dropToLayout?: boolean;
    /**
     * The auto-arranging item list the target is an item of, by its direction: the move relocates the
     * item, and the list puts it straight back on its own axis (`ItemListController` re-arranges on
     * `WE_CHILD_RELOCATED`; `auto_arrange_items` is on by default). An item of a vertical list keeps
     * only its sideways move, one of a horizontal list only its move up or down.
     */
    arrangedIn?: 'vertical' | 'horizontal';
}

export interface DragTarget {
    /** Where the drags have moved the target to, on top of its laid-out position. */
    offset: { x: number; y: number };
    /** The target's own container - the window `WindowMouseDragger` moves. */
    attach: (node: PixiContainer | null) => void;
    /** What the target's triggers call; `null` while the window is not a drag target. */
    controller: DragTargetController | null;
}

type Point = { x: number; y: number };

const ZERO: Point = { x: 0, y: 0 };

const warnedCutOff = new WeakSet<PixiContainer>();

/**
 * Development builds: says so, once a window, when a box over a window that drags anywhere would cut
 * it off from the pointer as it leaves the box (`findDragCutOff`).
 */
const warnDragCutOff = (node: PixiContainer) => {
    if (warnedCutOff.has(node)) return;

    warnedCutOff.add(node);

    const cutOff = findDragCutOff(node, GetDesktopSize());
    const box = cutOff?.layout?.computedLayout;

    if (!cutOff || !box) return;

    const { tx, ty } = cutOff.getGlobalTransform(undefined, false);

    console.warn(`[Theme] a drag target sits in a box with a hit area of its own (${box.width}x${box.height} at ${tx}, ${ty}): every part of it dragged out of that box stops taking the pointer, and the press goes to whatever lies under it. Make the box that places the window \`pointerTransparent\` (docs/porting-gotchas.md, "A dragged window leaves its box").`, cutOff);
};

/**
 * A window with Flash's `mouse_dragging_target` flag: `services/WindowMouseDragger.as`. On
 * `begin` it records where the pointer is relative to the window (`getMousePositionRelativeTo`,
 * the grab offset); on every pointer move until the button comes up it `offset`s the window by
 * however far the pointer has drifted from that grab point, so the grabbed pixel stays under the
 * pointer. Positions are whole pixels, as `setRectangle` takes `int`s.
 *
 * The move is an offset on top of the layout (the container's own `x`/`y`, which @pixi/layout
 * adds to the Yoga position - the same layering `useFrameDrag` relies on), and is measured in
 * the parent's space so a scaled parent drags one to one. Screen pixels are taken as the stage's,
 * as `useFrameDrag` takes them.
 */
export const useDragTarget = (enabled: boolean, { boundToParentRect = false, dropToLayout = false, arrangedIn }: DragTargetOptions = {}): DragTarget => {
    const nodeRef = useRef<PixiContainer | null>(null);
    const offsetRef = useRef<Point>(ZERO);
    const pointerDrag = useWindowPointerDrag();
    const [ offset, setOffset ] = useState<Point>(ZERO);

    const attach = (node: PixiContainer | null) => {
        nodeRef.current = node;
    };

    // `setRectangle`'s `bound_to_parent_rect` branch for a move, on one axis.
    const bound = (position: number, size: number, parentSize: number): number => {
        let bounded = Math.max(0, position);

        if ((bounded + size) > parentSize) bounded -= (bounded + size) - parentSize;

        return bounded;
    };

    const begin = (event: FederatedPointerEvent) => {
        const node = nodeRef.current;
        const parent = node?.parent;

        if (!node || !parent) return;

        // A move kept inside the parent, or put back at the release, never leaves it.
        if (import.meta.env.DEV && !boundToParentRect && !dropToLayout) warnDragCutOff(node);

        const pointerId = event.pointerId;
        const startClient = { x: event.clientX, y: event.clientY };
        const startGlobal = { x: event.global.x, y: event.global.y };
        const grab = parent.toLocal(startGlobal);
        const startOffset = offsetRef.current;

        const move = (moveEvent: PointerEvent) => {
            const pointer = parent.toLocal({ x: startGlobal.x + ClientToStage(moveEvent.clientX - startClient.x), y: startGlobal.y + ClientToStage(moveEvent.clientY - startClient.y) });
            let next = {
                x: startOffset.x + Math.trunc(pointer.x - grab.x),
                y: startOffset.y + Math.trunc(pointer.y - grab.y),
            };

            const own = node.layout?.computedLayout;
            const parentBox = parent.layout?.computedLayout;

            if (boundToParentRect && own && parentBox) {
                next = {
                    x: bound(own.left + next.x, own.width, parentBox.width) - own.left,
                    y: bound(own.top + next.y, own.height, parentBox.height) - own.top,
                };
            }

            // The list puts its item back in its slot on the list's axis (`updateScrollAreaRegion`).
            if (arrangedIn === 'vertical') next = { x: next.x, y: 0 };
            else if (arrangedIn === 'horizontal') next = { x: 0, y: next.y };

            if (next.x === offsetRef.current.x && next.y === offsetRef.current.y) return;

            offsetRef.current = next;

            setOffset(next);
        };

        // `WindowMouseOperator.handler`: a `mouseUp` anywhere ends it.
        const up = () => {
            if (dropToLayout) {
                offsetRef.current = ZERO;

                setOffset(ZERO);
            }
        };

        pointerDrag.start(pointerId, { onMove: move, onEnd: up });
    };

    return { offset, attach, controller: enabled ? { begin } : null };
};
