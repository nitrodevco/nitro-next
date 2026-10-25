/**
 * Keeps a node placed over the room: on every `RoomRenderedEvent`, and again whenever its own layout
 * changes - what a bubble over a room object (`useRoomObjectBubblePlacement`) and a window drawn at
 * the room's zoom (`ScaledRoomOverlay`) share.
 *
 * The room frame comes before Pixi lays the stage out, so a node whose content has just changed (a
 * menu swapped for another, minimised, a label edited) still has its old size then; placed by it,
 * the new content would show a frame out of place - pinned to the window's edge when it shrinks -
 * before jumping. The `layout` event comes from that layout pass, before the frame is drawn, so the
 * node is placed again there by the size it will be drawn at.
 */
import { RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useLayoutEffect } from 'react';

import { useLatest } from '#base/theme';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

export interface RoomFramePlacement {
    /** Each room frame, before the node is placed: read what the frame moved (an object's location). */
    sample?: (event: RoomRenderedEvent) => void;
    /** Puts the node where it goes at its current size; false when it cannot be placed yet. */
    place: (node: PixiContainer) => boolean;
    /** After every placement, whether the node could be placed; `time` is the frame's, 0 after a resize. */
    onPlaced?: (placed: boolean, time: number) => void;
}

/** The node's laid-out size - zero until the layout pass has measured it. */
export const getLayoutSize = (node: PixiContainer): { width: number; height: number } => ({
    width: node.layout?.computedLayout.width ?? 0,
    height: node.layout?.computedLayout.height ?? 0,
});

export const useRoomFramePlacement = (nodeRef: RefObject<PixiContainer | null>, placement: RoomFramePlacement): void => {
    const placementRef = useLatest(placement);

    const placeNode = (time: number) => {
        const node = nodeRef.current;
        const { place, onPlaced } = placementRef.current;

        onPlaced?.(!!node && place(node), time);
    };

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, (event) => {
        placementRef.current.sample?.(event);
        placeNode(event.time);
    });

    const placeNodeRef = useLatest(placeNode);

    useLayoutEffect(() => {
        const node = nodeRef.current;

        if (!node) return;

        const onLayout = () => placeNodeRef.current(0);

        node.on('layout', onLayout);

        return () => {
            node.off('layout', onLayout);
        };
    }, [ nodeRef, placeNodeRef ]);
};
