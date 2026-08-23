import {  CSSProperties, type PointerEvent as ReactPointerEvent, type RefObject, useRef, useState } from 'react';

import { clearStoredFrameSize, type FrameSize, getStoredFrameSize, setStoredFrameSize } from '#base/utils';

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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const distance = (x: number, y: number, toX: number, toY: number) => Math.hypot(x - toX, y - toY);

export const useFrameResize = (id: string | undefined, frameRef: RefObject<HTMLElement | null>, direction: FrameResizeDirection = 'all') => {
    const resizeStateRef = useRef<ResizeState | null>(null);
    const latestSizeRef = useRef<FrameSize | null>(null);
    const lastTapRef = useRef<TapState | null>(null);

    const [ size, setSize ] = useState<FrameSize | null>(() => (id && getStoredFrameSize(id)) || null);

    const endGesture = (event: ReactPointerEvent<HTMLElement>) => {
        resizeStateRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (id && latestSizeRef.current) setStoredFrameSize(id, latestSizeRef.current);
    };

    const resetSize = () => {
        latestSizeRef.current = null;

        setSize(null);

        if (id) clearStoredFrameSize(id);
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0 || direction === 'none') return;

        if (resizeStateRef.current) return;

        const node = frameRef.current;

        if (!node) return;

        if (event.cancelable) event.preventDefault();

        const rect = node.getBoundingClientRect();
        const computed = window.getComputedStyle(node);

        latestSizeRef.current = null;

        resizeStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startWidth: rect.width,
            startHeight: rect.height,
            minWidth: Math.max(parseFloat(computed.minWidth) || 0, MIN_SIZE),
            minHeight: Math.max(parseFloat(computed.minHeight) || 0, MIN_SIZE),
            maxWidth: Math.max(rect.width, window.innerWidth - rect.left),
            maxHeight: Math.max(rect.height, window.innerHeight - rect.top),
            moved: false,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        if (!resizeState.moved) {
            if (distance(event.clientX, event.clientY, resizeState.startX, resizeState.startY) < DRAG_THRESHOLD) return;

            resizeState.moved = true;
        }

        const width = direction === 'y'
            ? resizeState.startWidth
            : clamp(resizeState.startWidth + (event.clientX - resizeState.startX), resizeState.minWidth, resizeState.maxWidth);

        const height = direction === 'x'
            ? resizeState.startHeight
            : clamp(resizeState.startHeight + (event.clientY - resizeState.startY), resizeState.minHeight, resizeState.maxHeight);

        const next: FrameSize = { width: Math.round(width), height: Math.round(height) };

        latestSizeRef.current = next;

        setSize(current => (current && current.width === next.width && current.height === next.height ? current : next));
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        endGesture(event);

        if (resizeState.moved) {
            lastTapRef.current = null;

            return;
        }

        const lastTap = lastTapRef.current;

        if (lastTap
            && (event.timeStamp - lastTap.time) <= DOUBLE_TAP_DELAY
            && distance(event.clientX, event.clientY, lastTap.x, lastTap.y) <= DOUBLE_TAP_DISTANCE) {
            lastTapRef.current = null;

            resetSize();

            return;
        }

        lastTapRef.current = { time: event.timeStamp, x: event.clientX, y: event.clientY };
    };

    const handlePointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        endGesture(event);

        lastTapRef.current = null;
    };

    // only pin the axis the frame can actually resize — a 'y' frame that emits a width
    // freezes it at whatever it was when the user first dragged, so the className (and
    // anything driving it, e.g. the navigator's left pane collapsing) can never change it
    const style: CSSProperties = size
        ? {
                ...(direction === 'y' ? {} : { width: size.width }),
                ...(direction === 'x' ? {} : { height: size.height }),
            }
        : {};

    return {
        style,
        onScalerPointerDown: handlePointerDown,
        onScalerPointerMove: handlePointerMove,
        onScalerPointerUp: handlePointerUp,
        onScalerPointerCancel: handlePointerCancel,
    };
};
