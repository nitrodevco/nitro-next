import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useWindowActions, useWindowZIndex } from '#base/context/system';
import { getStoredFramePosition, setStoredFramePosition } from '#base/utils';

import { getGlobalRect } from '../utils';
import { useLayoutEvent } from './useLayoutEvent';
import { useRevealWhenSettled } from './useRevealWhenSettled';

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
 * Pixi port of hooks/ui/useFrameDrag.ts. The drag offset is applied as the container's own `.x`/`.y` -
 * @pixi/layout's ContainerMixin ADDS the yoga-computed position on top of the container's
 * existing `.position` (see updateLocalTransformWithLayout in node_modules/@pixi/layout), the
 * same layering CSS `transform: translate()` gives the DOM version (see Box.tsx's own `x`/`y`
 * handling). Global window pointermove/pointerup listeners (not element-scoped events) drive
 * the drag either way - browser pointer events work the same regardless of which element
 * started them, and Pixi's FederatedPointerEvent mirrors the native PointerEvent fields this
 * hook actually reads (`button`/`pointerId`/`clientX`/`clientY`), so one handler covers both.
 */
export interface FrameDragOptions {
    /**
     * Where the frame opens, in screen pixels. This is the drag offset's starting value rather
     * than a layout position: the offset is what is remembered and handed back, so a frame placed
     * through `top`/`left` would reopen at that layout position plus wherever it was dragged to.
     */
    defaultPosition?: { x: number; y: number };
    /**
     * Whether a window that has been dragged reopens where it was left. Windows a user works in
     * keep their place; a dialog that belongs to a piece of furniture does not - it should open
     * against the furni every time, not wherever a different one was dragged last.
     */
    remember?: boolean;
    /**
     * Opens the frame centered in the viewport - the Flash `window.center()`. A frame whose
     * height follows its content is not its final size on the first layout, so it is centered
     * again on every resize while it is still hidden (`useRevealWhenSettled`); once it shows, or
     * is pressed, it stays where it is.
     */
    centered?: boolean;
    /**
     * Told where the frame is each time it has been centered or dragged, for a caller that
     * keeps the position itself (and hands it back as `defaultPosition`) rather than through
     * `remember`.
     */
    onPositionChange?: (position: { x: number; y: number }) => void;
}

export const useFrameDrag = (id: string | undefined, { defaultPosition, remember = true, centered = false, onPositionChange }: FrameDragOptions = {}) => {
    const generatedId = useId();
    const stackId = id ?? generatedId;

    const frameRef = useRef<PixiContainer | null>(null);
    // The node as state as well: `useLayoutEvent` subscribes to a node, and a ref cannot be read while rendering.
    const [ frameNode, setFrameNode ] = useState<PixiContainer | null>(null);
    const centeringRef = useRef(centered);
    // Where the frame was last put by a drag or by centering, for the callbacks that report it.
    const latestOffsetRef = useRef<{ dx: number; dy: number } | null>(null);
    const dragStateRef = useRef<DragState | null>(null);
    const activeListenersRef = useRef<ActiveListeners | null>(null);

    const [ offset, setOffset ] = useState(() => {
        const opened = { dx: defaultPosition?.x ?? 0, dy: defaultPosition?.y ?? 0 };

        if (!id || !remember) return opened;

        return getStoredFramePosition(id) ?? opened;
    });

    // Unrendered until it has been laid out and put at its offset - see `useRevealWhenSettled`.
    const revealed = useRevealWhenSettled(frameNode, () => {
        const latest = latestOffsetRef.current;

        return !latest || !(frameNode instanceof PixiContainer) || ((frameNode.x === latest.dx) && (frameNode.y === latest.dy));
    });
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

    const attachFrame = useCallback((node: PixiContainer | null) => {
        frameRef.current = node;

        setFrameNode(node);
    }, []);

    useLayoutEvent(frameNode, () => {
        // `window.center()` is a one-off: the frame follows its size into place while it is still
        // hidden, and once it is on screen a later change of size (content arriving, a section
        // opening) leaves it where it is, as `RoomInfoViewCtrl.layoutContent` resizes a window
        // it centred once.
        if (!centeringRef.current || !frameNode || revealed) return;

        const rect = getGlobalRect(frameNode);

        if (!rect.width || !rect.height) return;

        const next = {
            dx: Math.max(0, Math.floor((window.innerWidth - rect.width) / 2)),
            dy: Math.max(0, Math.floor((window.innerHeight - rect.height) / 2)),
        };

        const last = latestOffsetRef.current;

        if (last && (last.dx === next.dx) && (last.dy === next.dy)) return;

        latestOffsetRef.current = next;

        setOffset(next);
        onPositionChange?.({ x: next.dx, y: next.dy });
    });

    const handleHeaderPointerDown = (event: FederatedPointerEvent | PointerEvent) => {
        if (event.button !== 0) return;

        // Pixi's `onPointerDown` JSX prop maps straight onto the legacy `on<type>` property
        // idiom (see `EventBoundary.notifyTarget` in pixi.js), which fires for every ancestor
        // along the hit-tested path unconditionally during the capturing sweep - BEFORE the
        // actual target's own handler ever runs. That means a nested interactive descendant
        // (CloseButton, with `stopsPropagation`) calling `stopPropagation()` can never
        // retroactively stop this handler, since it already ran by the time the descendant's own
        // handler executes. Checking that this container is itself the real hit target is what
        // correctly excludes a press that landed on such a descendant instead.
        if (event instanceof FederatedPointerEvent && event.target !== event.currentTarget) return;

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

            const next = {
                dx: dragState.origDx + (newLeft - dragState.startGlobalX),
                dy: dragState.origDy + (newTop - dragState.startGlobalY),
            };

            latestOffsetRef.current = next;

            setOffset(next);
        };

        const handleUp = (upEvent: PointerEvent) => {
            if (dragStateRef.current?.pointerId !== upEvent.pointerId) return;

            stopDragging();

            const dropped = latestOffsetRef.current;

            if (!dropped) return;

            if (id && remember) setStoredFramePosition(id, dropped);

            onPositionChange?.({ x: dropped.dx, y: dropped.dy });
        };

        activeListenersRef.current = { move: handleMove, up: handleUp };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    const handleActivate = () => {
        centeringRef.current = false;

        bringWindowToFront(stackId);
    };

    return { frameRef, attachFrame, offset, zIndex, revealed, onPointerDown: handleActivate, onHeaderPointerDown: handleHeaderPointerDown };
};
