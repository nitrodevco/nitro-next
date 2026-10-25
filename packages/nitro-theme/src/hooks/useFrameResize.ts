import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { RefObject, useCallback, useRef, useState } from 'react';

import { clamp, ClientToStage, GetDesktopSize, getGlobalRect } from '../utils';
import { clearStoredFrameSize, FrameSize, getStoredFrameSize, setStoredFrameSize } from '../utils/frameStorage';
import { useWindowPointerDrag } from './useWindowPointerDrag';

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

const MIN_SIZE = 50;
const DRAG_THRESHOLD = 4;
const DOUBLE_TAP_DELAY = 300;
const DOUBLE_TAP_DISTANCE = 24;

const distance = (x: number, y: number, toX: number, toY: number) => Math.hypot(x - toX, y - toY);

/**
 * A frame's scaler drag (Flash's `WindowMouseScaler`): the size the user gives the frame, kept per
 * frame `id` (`frameStorage`). Pixi's `FederatedPointerEvent` has no pointer capture, so the
 * gesture runs on window-level `pointermove` / `pointerup` listeners, as `useFrameDrag` does. The
 * limits are the caller's (`Frame`, from its layout and variant).
 */
export const useFrameResize = (
    id: string | undefined,
    frameRef: RefObject<PixiContainer | null>,
    direction: FrameResizeDirection = 'all',
    minSize: { width: number; height: number } = { width: MIN_SIZE, height: MIN_SIZE },
    maxSize: { width?: number; height?: number } = {},
) => {
    const resizeStateRef = useRef<ResizeState | null>(null);
    const latestSizeRef = useRef<FrameSize | null>(null);
    const lastTapRef = useRef<TapState | null>(null);
    const { start: startPointerDrag, stop: stopPointerDrag } = useWindowPointerDrag();

    const [ size, setSize ] = useState<FrameSize | null>(() => (id && getStoredFrameSize(id)) || null);

    const stopResizing = useCallback(() => {
        stopPointerDrag();
        resizeStateRef.current = null;
    }, [ stopPointerDrag ]);

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

        const desktop = GetDesktopSize();

        resizeStateRef.current = {
            pointerId: event.pointerId,
            startX: ClientToStage(event.clientX),
            startY: ClientToStage(event.clientY),
            startWidth,
            startHeight,
            minWidth: Math.max(minSize.width, MIN_SIZE),
            minHeight: Math.max(minSize.height, MIN_SIZE),
            // The caller's own limit (a layout's `width_max`) wins over the viewport edge.
            maxWidth: Math.min(maxSize.width ?? Infinity, Math.max(startWidth, desktop.width - rect.x)),
            maxHeight: Math.min(maxSize.height ?? Infinity, Math.max(startHeight, desktop.height - rect.y)),
            moved: false,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const resizeState = resizeStateRef.current;

            if (!resizeState || moveEvent.pointerId !== resizeState.pointerId) return;

            if (!resizeState.moved) {
                if (distance(ClientToStage(moveEvent.clientX), ClientToStage(moveEvent.clientY), resizeState.startX, resizeState.startY) < DRAG_THRESHOLD) return;

                resizeState.moved = true;
            }

            const width = direction === 'y'
                ? resizeState.startWidth
                : clamp(resizeState.startWidth + (ClientToStage(moveEvent.clientX) - resizeState.startX), resizeState.minWidth, resizeState.maxWidth);

            const height = direction === 'x'
                ? resizeState.startHeight
                : clamp(resizeState.startHeight + (ClientToStage(moveEvent.clientY) - resizeState.startY), resizeState.minHeight, resizeState.maxHeight);

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

        startPointerDrag(event.pointerId, { onMove: handleMove, onEnd: handleUp });
    };

    return { size, onScalerPointerDown: handlePointerDown };
};
