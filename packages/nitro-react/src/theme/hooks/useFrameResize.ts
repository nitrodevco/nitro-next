import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { RefObject, useEffect, useRef, useState } from 'react';

import { clearStoredFrameSize, FrameSize, getStoredFrameSize, setStoredFrameSize } from '#base/utils';

import { getGlobalRect } from '../utils';

export type FrameResizeDirection = 'x' | 'y' | 'all' | 'none';

type ResizeState = {
    pointerId: number;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    moved: boolean;
};

type TapState = {
    time: number;
    x: number;
    y: number;
};

type ActiveListeners = {
    move: (event: PointerEvent) => void;
    up: (event: PointerEvent) => void;
};

const MIN_SIZE = 50;
const DRAG_THRESHOLD = 4;
const DOUBLE_TAP_DELAY = 300;
const DOUBLE_TAP_DISTANCE = 24;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const distance = (x: number, y: number, toX: number, toY: number) => Math.hypot(x - toX, y - toY);

/**
 * Pixi port of hooks/ui/useFrameResize.ts, extended to also drive Frame's DOM render target
 * through the same hook (see getGlobalRect.ts for the one place that actually differs per
 * target). Pixi's FederatedPointerEvent has no setPointerCapture (confirmed absent from
 * pixi.js's FederatedEvent types), so unlike the original DOM hook this drives the whole
 * gesture off window-level pointermove/pointerup listeners (the same technique
 * useFrameDrag.ts uses) instead of per-element pointer capture, in both render targets - kept
 * that way here for consistency even though DOM's `setPointerCapture` would work fine on its
 * own. There's also no CSS `min-width`/`min-height` to read via getComputedStyle, so the
 * minimum size is passed in explicitly by the caller (Frame, per variant) instead.
 */
export const useFrameResize = (
    id: string | undefined,
    frameRef: RefObject<PixiContainer | HTMLElement | null>,
    direction: FrameResizeDirection = 'all',
    minSize: { width: number; height: number } = { width: MIN_SIZE, height: MIN_SIZE },
) => {
    const resizeStateRef = useRef<ResizeState | null>(null);
    const latestSizeRef = useRef<FrameSize | null>(null);
    const lastTapRef = useRef<TapState | null>(null);
    const activeListenersRef = useRef<ActiveListeners | null>(null);

    const [ size, setSize ] = useState<FrameSize | null>(() => (id && getStoredFrameSize(id)) || null);

    const stopResizing = () => {
        const listeners = activeListenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }

        resizeStateRef.current = null;
    };

    useEffect(() => stopResizing, [ stopResizing ]);

    const resetSize = () => {
        latestSizeRef.current = null;

        setSize(null);

        if (id) clearStoredFrameSize(id);
    };

    const handlePointerDown = (event: FederatedPointerEvent | PointerEvent) => {
        if (event.button !== 0 || direction === 'none') return;
        if (resizeStateRef.current) return;

        const node = frameRef.current;

        if (!node) return;

        const rect = getGlobalRect(node);
        const startWidth = rect.width;
        const startHeight = rect.height;

        latestSizeRef.current = null;

        resizeStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startWidth,
            startHeight,
            minWidth: Math.max(minSize.width, MIN_SIZE),
            minHeight: Math.max(minSize.height, MIN_SIZE),
            maxWidth: Math.max(startWidth, window.innerWidth - rect.x),
            maxHeight: Math.max(startHeight, window.innerHeight - rect.y),
            moved: false,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const resizeState = resizeStateRef.current;

            if (!resizeState || moveEvent.pointerId !== resizeState.pointerId) return;

            if (!resizeState.moved) {
                if (distance(moveEvent.clientX, moveEvent.clientY, resizeState.startX, resizeState.startY) < DRAG_THRESHOLD) return;

                resizeState.moved = true;
            }

            const width = direction === 'y'
                ? resizeState.startWidth
                : clamp(resizeState.startWidth + (moveEvent.clientX - resizeState.startX), resizeState.minWidth, resizeState.maxWidth);

            const height = direction === 'x'
                ? resizeState.startHeight
                : clamp(resizeState.startHeight + (moveEvent.clientY - resizeState.startY), resizeState.minHeight, resizeState.maxHeight);

            const next: FrameSize = { width: Math.round(width), height: Math.round(height) };

            latestSizeRef.current = next;

            setSize(current => (current && current.width === next.width && current.height === next.height ? current : next));
        };

        const handleUp = (upEvent: PointerEvent) => {
            const resizeState = resizeStateRef.current;

            if (!resizeState || upEvent.pointerId !== resizeState.pointerId) return;

            stopResizing();

            if (id && latestSizeRef.current) setStoredFrameSize(id, latestSizeRef.current);

            if (resizeState.moved) {
                lastTapRef.current = null;

                return;
            }

            const lastTap = lastTapRef.current;
            const now = upEvent.timeStamp;

            if (lastTap
                && (now - lastTap.time) <= DOUBLE_TAP_DELAY
                && distance(upEvent.clientX, upEvent.clientY, lastTap.x, lastTap.y) <= DOUBLE_TAP_DISTANCE) {
                lastTapRef.current = null;

                resetSize();

                return;
            }

            lastTapRef.current = { time: now, x: upEvent.clientX, y: upEvent.clientY };
        };

        activeListenersRef.current = { move: handleMove, up: handleUp };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    return { size, onScalerPointerDown: handlePointerDown };
};
