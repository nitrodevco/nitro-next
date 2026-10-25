import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { themeHost, useThemeWindowZIndex } from '../host';
import { clamp, ClientToStage, GetDesktopSize, getGlobalRect } from '../utils';
import { getStoredFramePosition, setStoredFramePosition } from '../utils/frameStorage';
import { useLayoutEvent } from './useLayoutEvent';
import { useRevealWhenSettled } from './useRevealWhenSettled';
import { useWindowPointerDrag } from './useWindowPointerDrag';

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

const MIN_VISIBLE = 40;

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

/**
 * A frame's place on the desktop: its drag by the header (Flash's `WindowMouseDragger`), its stack
 * order (raised on mount and on a press), `window.center()`, and the position it reopens at, kept
 * per frame `id` (`frameStorage`). The offset is applied as the container's own `x`/`y`,
 * which @pixi/layout adds on top of the position Yoga computes. The drag runs on window-level
 * `pointermove` / `pointerup` listeners: Pixi's `FederatedPointerEvent` has no pointer capture.
 */
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
    const pointerDrag = useWindowPointerDrag();

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
    const zIndex = useThemeWindowZIndex(stackId);
    const { bringWindowToFront, releaseWindow } = themeHost();

    useEffect(() => {
        bringWindowToFront(stackId);

        // A generated id is never seen again once the frame unmounts: without this, every such
        // frame opened left an entry in the stack for the rest of the session.
        if (!id) return () => releaseWindow(stackId);
    }, [ id, stackId, bringWindowToFront, releaseWindow ]);

    const { start: startPointerDrag, stop: stopPointerDrag } = pointerDrag;
    const stopDragging = useCallback(() => {
        stopPointerDrag();
        dragStateRef.current = null;
    }, [ stopPointerDrag ]);

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

        // `WindowController.center`: `parent.width / 2 - width / 2` into the int `x`, so a frame wider or
        // taller than the desktop hangs over both edges (a frame is not `bound_to_parent_rect`).
        const desktop = GetDesktopSize();
        const next = {
            dx: Math.trunc((desktop.width - rect.width) / 2),
            dy: Math.trunc((desktop.height - rect.height) / 2),
        };

        const last = latestOffsetRef.current;

        if (last && (last.dx === next.dx) && (last.dy === next.dy)) return;

        latestOffsetRef.current = next;

        setOffset(next);
        onPositionChange?.({ x: next.dx, y: next.dy });
    });

    // `WindowMouseDragger.begin` for this frame: the press that grabs it, wherever it landed.
    const startDrag = (event: FederatedPointerEvent | PointerEvent) => {
        if (event.button !== 0) return;

        const node = frameRef.current;

        if (!node) return;

        const rect = getGlobalRect(node);

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: ClientToStage(event.clientX),
            startY: ClientToStage(event.clientY),
            startGlobalX: rect.x,
            startGlobalY: rect.y,
            width: rect.width,
            origDx: offset.dx,
            origDy: offset.dy,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const dragState = dragStateRef.current;

            if (!dragState || moveEvent.pointerId !== dragState.pointerId) return;

            const dx = Math.floor(ClientToStage(moveEvent.clientX) - dragState.startX);
            const dy = Math.floor(ClientToStage(moveEvent.clientY) - dragState.startY);
            const desktop = GetDesktopSize();

            const newLeft = Math.floor(clamp(dragState.startGlobalX + dx, MIN_VISIBLE - dragState.width, desktop.width - MIN_VISIBLE));
            const newTop = Math.floor(clamp(dragState.startGlobalY + dy, 0, desktop.height - MIN_VISIBLE));

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

        startPointerDrag(event.pointerId, { onMove: handleMove, onEnd: handleUp });
    };

    const handleHeaderPointerDown = (event: FederatedPointerEvent | PointerEvent) => {
        // Only a press on the header itself drags: one on a button in it (help, menu) is that
        // button's, as `MouseEventProcessor` gives a press to the window under the pointer.
        if (event instanceof FederatedPointerEvent && event.target !== event.currentTarget) return;

        startDrag(event);
    };

    // A press anywhere in the window raises it, before whatever it lands on handles it - in the
    // capture phase, so a child that stops the press (a close button, a scrollbar) still raises it.
    useEffect(() => {
        if (!frameNode) return;

        const activate = () => {
            centeringRef.current = false;

            bringWindowToFront(stackId);
        };

        frameNode.on('pointerdowncapture', activate);

        return () => {
            frameNode.off('pointerdowncapture', activate);
        };
    }, [ frameNode, stackId, bringWindowToFront ]);

    return { frameRef, attachFrame, offset, zIndex, revealed, onHeaderPointerDown: handleHeaderPointerDown, startDrag };
};
