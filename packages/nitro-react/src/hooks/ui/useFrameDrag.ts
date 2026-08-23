import { CSSProperties, PointerEvent as ReactPointerEvent, useEffect, useId, useRef, useState } from 'react';

import { useWindowActions, useWindowZIndex } from '#base/context';
import { getStoredFramePosition, setStoredFramePosition } from '#base/utils';

type DragState = {
    pointerId: number;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
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

export const useFrameDrag = (id: string | undefined) => {
    const generatedId = useId();
    const stackId = id ?? generatedId;

    const frameRef = useRef<HTMLDivElement>(null);
    const dragStateRef = useRef<DragState | null>(null);
    const activeListenersRef = useRef<ActiveListeners | null>(null);

    const [ offset, setOffset ] = useState(() => (id && getStoredFramePosition(id)) || { dx: 0, dy: 0 });

    const zIndex = useWindowZIndex(stackId);
    const { bringWindowToFront } = useWindowActions();

    useEffect(() => {
        bringWindowToFront(stackId);
    }, [ stackId, bringWindowToFront ]);

    const stopDragging = () => {
        const listeners = activeListenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }

        dragStateRef.current = null;
    };

    useEffect(() => stopDragging, [ stopDragging ]);

    const handleHeaderPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0) return;
        if ((event.target as HTMLElement | null)?.closest('[data-no-drag]')) return;

        const node = frameRef.current;

        if (!node) return;

        const rect = node.getBoundingClientRect();

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startLeft: rect.left,
            startTop: rect.top,
            width: rect.width,
            origDx: offset.dx,
            origDy: offset.dy,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const dragState = dragStateRef.current;

            if (!dragState || moveEvent.pointerId !== dragState.pointerId) return;

            const dx = moveEvent.clientX - dragState.startX;
            const dy = moveEvent.clientY - dragState.startY;

            const newLeft = clamp(dragState.startLeft + dx, MIN_VISIBLE - dragState.width, window.innerWidth - MIN_VISIBLE);
            const newTop = clamp(dragState.startTop + dy, 0, window.innerHeight - MIN_VISIBLE);

            setOffset({
                dx: dragState.origDx + (newLeft - dragState.startLeft),
                dy: dragState.origDy + (newTop - dragState.startTop),
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

    const style: CSSProperties = {
        transform: offset.dx || offset.dy ? `translate(${~~offset.dx}px, ${~~offset.dy}px)` : undefined,
        transformOrigin: 'top left',
        zIndex,
    };

    return { frameRef, style, onPointerDown: handleActivate, onHeaderPointerDown: handleHeaderPointerDown };
};
