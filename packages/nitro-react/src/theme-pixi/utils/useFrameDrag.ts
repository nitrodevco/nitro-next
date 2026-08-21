import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useId, useRef, useState } from 'react';

import { useWindowActions, useWindowZIndex } from '#base/context';
import { getStoredFramePosition, setStoredFramePosition } from '#base/utils';

type DragState = {
    pointerId: number;
    startX: number;
    startY: number;
    startGlobalX: number;
    startGlobalY: number;
    width: number;
    origDx: number;
    origDy: number;
};

type ActiveListeners = {
    move: (event: PointerEvent) => void;
    up: (event: PointerEvent) => void;
};

const MIN_VISIBLE = 40;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Pixi port of hooks/ui/useFrameDrag.ts. Pixi has no getBoundingClientRect/CSS transform, so
 * this reads the frame's screen position via Container.getGlobalPosition() and its yoga box
 * size via `.layout.computedLayout`, and applies the drag offset as the container's own
 * `.x`/`.y` - @pixi/layout's ContainerMixin ADDS the yoga-computed position on top of the
 * container's existing `.position` (see updateLocalTransformWithLayout in
 * node_modules/@pixi/layout), the same layering CSS `transform: translate()` gives the DOM
 * version. Global window pointermove/pointerup listeners (not Pixi events) drive the drag,
 * identically to the DOM hook - browser pointer events work the same regardless of which
 * element started them.
 */
export const useFrameDrag = (id: string | undefined) => {
    const generatedId = useId();
    const stackId = id ?? generatedId;

    const frameRef = useRef<PixiContainer | null>(null);
    const dragStateRef = useRef<DragState | null>(null);
    const activeListenersRef = useRef<ActiveListeners | null>(null);

    const [offset, setOffset] = useState(() => (id && getStoredFramePosition(id)) || { dx: 0, dy: 0 });

    const zIndex = useWindowZIndex(stackId);
    const { bringWindowToFront } = useWindowActions();

    useEffect(() => {
        bringWindowToFront(stackId);
    }, [stackId, bringWindowToFront]);

    const stopDragging = () => {
        const listeners = activeListenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }

        dragStateRef.current = null;
    };

    useEffect(() => stopDragging, [stopDragging]);

    const handleHeaderPointerDown = (event: FederatedPointerEvent) => {
        if (event.button !== 0) return;

        const node = frameRef.current;

        if (!node) return;

        const global = node.getGlobalPosition();
        const width = node.layout?.computedLayout.width ?? node.width;

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startGlobalX: global.x,
            startGlobalY: global.y,
            width,
            origDx: offset.dx,
            origDy: offset.dy,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const dragState = dragStateRef.current;

            if (!dragState || moveEvent.pointerId !== dragState.pointerId) return;

            const dx = moveEvent.clientX - dragState.startX;
            const dy = moveEvent.clientY - dragState.startY;

            const newLeft = clamp(dragState.startGlobalX + dx, MIN_VISIBLE - dragState.width, window.innerWidth - MIN_VISIBLE);
            const newTop = clamp(dragState.startGlobalY + dy, 0, window.innerHeight - MIN_VISIBLE);

            setOffset({
                dx: dragState.origDx + (newLeft - dragState.startGlobalX),
                dy: dragState.origDy + (newTop - dragState.startGlobalY),
            });
        };

        const handleUp = (upEvent: PointerEvent) => {
            if (dragStateRef.current?.pointerId !== upEvent.pointerId) return;

            stopDragging();

            if (!id) return;

            setOffset(current => {
                setStoredFramePosition(id, current);

                return current;
            });
        };

        activeListenersRef.current = { move: handleMove, up: handleUp };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    const handleActivate = () => {
        bringWindowToFront(stackId);
    };

    return { frameRef, offset, zIndex, onPointerDown: handleActivate, onHeaderPointerDown: handleHeaderPointerDown };
};
