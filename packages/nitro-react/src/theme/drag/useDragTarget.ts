import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { DragTargetController } from './DragTargetContext';

export interface DragTargetOptions {
    /**
     * The target's `bound_to_parent_rect` flag (32): `WindowController.setRectangle` keeps a moved
     * window inside its parent - left/top at least 0, then pulled back by whatever it overhangs
     * the parent's right/bottom edge (so one wider than its parent ends up at a negative x).
     */
    boundToParentRect?: boolean;
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
export const useDragTarget = (enabled: boolean, { boundToParentRect = false }: DragTargetOptions = {}): DragTarget => {
    const nodeRef = useRef<PixiContainer | null>(null);
    const offsetRef = useRef<Point>(ZERO);
    const stopRef = useRef<(() => void) | null>(null);
    const [ offset, setOffset ] = useState<Point>(ZERO);

    useEffect(() => () => stopRef.current?.(), []);

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

        stopRef.current?.();

        const pointerId = event.pointerId;
        const startClient = { x: event.clientX, y: event.clientY };
        const startGlobal = { x: event.global.x, y: event.global.y };
        const grab = parent.toLocal(startGlobal);
        const startOffset = offsetRef.current;

        const move = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== pointerId) return;

            const pointer = parent.toLocal({ x: startGlobal.x + (moveEvent.clientX - startClient.x), y: startGlobal.y + (moveEvent.clientY - startClient.y) });
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

            if (next.x === offsetRef.current.x && next.y === offsetRef.current.y) return;

            offsetRef.current = next;

            setOffset(next);
        };

        const stop = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);

            stopRef.current = null;
        };

        // `WindowMouseOperator.handler`: a `mouseUp` anywhere ends it.
        const up = (upEvent: PointerEvent) => {
            if (upEvent.pointerId === pointerId) stop();
        };

        stopRef.current = stop;

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
    };

    return { offset, attach, controller: enabled ? { begin } : null };
};
