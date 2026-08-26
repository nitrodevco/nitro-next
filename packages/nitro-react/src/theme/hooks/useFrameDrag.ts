import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useWindowActions, useWindowZIndex } from '#base/context';
import { getStoredFramePosition, setStoredFramePosition } from '#base/utils';

import { getGlobalRect } from '../utils';

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
 * Pixi port of hooks/ui/useFrameDrag.ts, extended to also drive Frame's DOM render target
 * through the same hook (see getGlobalRect.ts for the one place that actually differs per
 * target). In Pixi mode the drag offset is applied as the container's own `.x`/`.y` -
 * @pixi/layout's ContainerMixin ADDS the yoga-computed position on top of the container's
 * existing `.position` (see updateLocalTransformWithLayout in node_modules/@pixi/layout), the
 * same layering CSS `transform: translate()` gives the DOM version (see Box.tsx's own `x`/`y`
 * handling). Global window pointermove/pointerup listeners (not element-scoped events) drive
 * the drag either way - browser pointer events work the same regardless of which element
 * started them, and Pixi's FederatedPointerEvent mirrors the native PointerEvent fields this
 * hook actually reads (`button`/`pointerId`/`clientX`/`clientY`), so one handler covers both.
 */
export const useFrameDrag = (id: string | undefined) => {
    const generatedId = useId();
    const stackId = id ?? generatedId;

    const frameRef = useRef<PixiContainer | HTMLElement | null>(null);
    const dragStateRef = useRef<DragState | null>(null);
    const activeListenersRef = useRef<ActiveListeners | null>(null);

    const [ offset, setOffset ] = useState(() => (id && getStoredFramePosition(id)) || { dx: 0, dy: 0 });

    const zIndex = useWindowZIndex(stackId);
    const { bringWindowToFront } = useWindowActions();

    useEffect(() => {
        bringWindowToFront(stackId);
    }, [ stackId, bringWindowToFront ]);

    const stopDragging = useCallback(() => {
        const listeners = activeListenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }

        dragStateRef.current = null;
    }, []);

    useEffect(() => stopDragging, [ stopDragging ]);

    const handleHeaderPointerDown = (event: FederatedPointerEvent | PointerEvent) => {
        if (event.button !== 0) return;

        const node = frameRef.current;

        if (!node) return;

        const rect = getGlobalRect(node);

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startGlobalX: rect.x,
            startGlobalY: rect.y,
            width: rect.width,
            origDx: offset.dx,
            origDy: offset.dy,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const dragState = dragStateRef.current;

            if (!dragState || moveEvent.pointerId !== dragState.pointerId) return;

            const dx = Math.floor(moveEvent.clientX - dragState.startX);
            const dy = Math.floor(moveEvent.clientY - dragState.startY);

            const newLeft = Math.floor(clamp(dragState.startGlobalX + dx, MIN_VISIBLE - dragState.width, window.innerWidth - MIN_VISIBLE));
            const newTop = Math.floor(clamp(dragState.startGlobalY + dy, 0, window.innerHeight - MIN_VISIBLE));

            setOffset({
                dx: dragState.origDx + (newLeft - dragState.startGlobalX),
                dy: dragState.origDy + (newTop - dragState.startGlobalY),
            });
        };

        const handleUp = (upEvent: PointerEvent) => {
            if (dragStateRef.current?.pointerId !== upEvent.pointerId) return;

            stopDragging();

            if (!id) return;

            setOffset((current) => {
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
