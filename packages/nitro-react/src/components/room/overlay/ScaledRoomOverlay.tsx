/**
 * A window drawn over the room at the room's zoom - Flash `ScaledWindow` as of WIN63-202610131318
 * (`com/sulake/habbo/window/utils/ScaledWindow.as`, class `core.window.utils.ScaledWindow`), which the
 * WIRED leaderboard panel and, since that build, the furniture labels are drawn in.
 *
 * Flash draws the content's graphic context into a sprite scaled by `scale` and puts a region of
 * `ceil(content * scale)` in the window tree that forwards the pointer to the content at
 * `local / scale` (`updateSize` 144-151, `onWindowEvent` 153-215). Here the content is a Pixi
 * container scaled the same way: Pixi hit-tests and routes the pointer through the scale itself, so
 * only what Flash adds on top is kept:
 * - `scale` follows the room on every room frame: `geometry.scale / 64 * |canvas scale|`
 *   (`VariableLeaderboardLocationProjector.getScale` 164-168; `FurnitureLabelView.updatePosition` 169).
 * - `draggable` (118-132): while set, the whole window is dragged and its content takes no input
 *   (`findTarget` is skipped, 168); every move is reported as `WE_RELOCATED` is (`onDragged`).
 * - A scrollbar lift dragged inside it follows the pointer in the content's own pixels (1318,
 *   `beginScrollbarDrag` 217-249): the theme's scroll controller converts the pointer by the lift's
 *   world scale.
 *
 * Users mount it among the room widgets before the others, as Flash puts the leaderboard and the
 * labels in the desktop's `background_widgets` container under the rest of the room UI
 * (`DesktopLayoutManager.as` 95).
 */
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

import { getLayoutSize, useRoomFramePlacement, useWindowPointerDrag } from '#base/hooks';
import { Box, ClientToStage, useLatest } from '#base/theme';

import { getRoomOverlayScale } from './getRoomOverlayScale';

export type ScaledRoomOverlayProps = {
    /**
     * Where the window's top-left goes, given its size on screen (content size times `scale`)
     * and the scale; null hides it. Called after every room frame. Flash rounds the result
     * (`VariableLeaderboardView.setAnchor` 435-436, `FurnitureLabelView.updatePosition`), and so
     * does this.
     */
    place: (width: number, height: number, scale: number) => { x: number; y: number } | null;
    /** `ScaledWindow.draggable`: drag the whole window; its content takes no input meanwhile. */
    draggable?: boolean;
    /** Each drag step's new top-left and on-screen size, as `WE_RELOCATED` reports it. */
    onDragged?: (x: number, y: number, width: number, height: number) => void;
    /** `blend`, e.g. 0.35 for a leaderboard that is not the one being edited. */
    alpha?: number;
    children?: ReactNode;
};

export const ScaledRoomOverlay = ({ place, draggable = false, onDragged, alpha = 1, children }: ScaledRoomOverlayProps) => {
    const nodeRef = useRef<PixiContainer>(null);
    const placedRef = useRef(false);
    const dragRef = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);

    const onDraggedRef = useLatest(onDragged);

    /** Scales the window to the room and puts it where `place` says; a drag holds it where the pointer put it. */
    const placeNode = (node: PixiContainer): boolean => {
        if (dragRef.current) return placedRef.current;

        const scale = getRoomOverlayScale();
        const { width, height } = getLayoutSize(node);

        node.scale.set(scale);

        // A window with no measured size yet is not placed: it would show somewhere else for a frame.
        const position = (width && height) ? place(Math.ceil(width * scale), Math.ceil(height * scale), scale) : null;

        if (!position) return false;

        node.x = Math.round(position.x);
        node.y = Math.round(position.y);

        return true;
    };

    useRoomFramePlacement(nodeRef, {
        place: placeNode,
        onPlaced: (placed) => {
            placedRef.current = placed;

            if (nodeRef.current) nodeRef.current.alpha = placed ? alpha : 0;
        },
    });

    // Drawn transparent until the first frame places it.
    useLayoutEffect(() => {
        if (nodeRef.current && !placedRef.current) nodeRef.current.alpha = 0;
    }, []);

    useEffect(() => {
        if (nodeRef.current && placedRef.current) nodeRef.current.alpha = alpha;
    }, [ alpha ]);

    const pointerDrag = useWindowPointerDrag();
    const { stop: stopPointerDrag } = pointerDrag;

    // `draggable = false` ends a drag under way (`ScaledWindow.draggable` 118-132).
    useEffect(() => {
        if (draggable) return;

        dragRef.current = null;
        stopPointerDrag();
    }, [ draggable, stopPointerDrag ]);

    const onPointerDown = (event: FederatedPointerEvent) => {
        const node = nodeRef.current;

        if (!draggable || !node) return;

        event.stopPropagation();
        dragRef.current = { pointerX: event.clientX, pointerY: event.clientY, x: node.x, y: node.y };

        const move = (moveEvent: PointerEvent) => {
            const drag = dragRef.current;

            if (!drag || !nodeRef.current) return;

            const x = Math.round(drag.x + ClientToStage(moveEvent.clientX - drag.pointerX));
            const y = Math.round(drag.y + ClientToStage(moveEvent.clientY - drag.pointerY));
            const { width, height } = getLayoutSize(nodeRef.current);
            const scale = nodeRef.current.scale.x;

            nodeRef.current.x = x;
            nodeRef.current.y = y;
            onDraggedRef.current?.(x, y, Math.ceil(width * scale), Math.ceil(height * scale));
        };

        pointerDrag.start(event.pointerId, {
            onMove: move,
            onEnd: () => {
                dragRef.current = null;
            },
        });
    };

    return (
        <Box
            ref={nodeRef}
            layout={{ position: 'absolute', top: 0, left: 0 }}
            eventMode={draggable ? 'static' : 'passive'}
            interactiveChildren={!draggable}
            cursor={draggable ? 'move' : undefined}
            onPointerDown={onPointerDown}
        >
            {children}
        </Box>
    );
};
