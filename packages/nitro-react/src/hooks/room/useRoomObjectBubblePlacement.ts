import { RoomObjectCategoryEnum, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useLayoutEffect, useRef } from 'react';

import { useRoom } from '#base/context/room';
import { FixedSizeStack } from '#base/utils';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

const BUBBLE_DROP_SPEED = 3;
/** `getMaximumVerticalLead`: the smoothed top may not lag the real one by more than this share of the object's height. */
const MAX_VERTICAL_LEAD_RATIO = 0.05;
const SPACE_AROUND_EDGES = 10;

/** `AvatarContextInfoView.getOffset`: a bubble over a person clears the head by this much... */
const AVATAR_GAP = 10;
/** ...and one over anything else (`ContextInfoView.getOffset`) by this. */
const OBJECT_GAP = 4;

/** Where the drop smoothing starts from, before any real height has been seen. */
const INITIAL_MAX_STACK = -1000000;

export interface RoomObjectBubblePlacementOptions {
    objectId: number;
    category: RoomObjectCategoryEnum;
    /** Humanoid units get the taller gap above the head. */
    isAvatar: boolean;
    /** How many recent heights the drop smoothing takes its maximum over. */
    stackSize: number;
    /** Keep the bubble `SPACE_AROUND_EDGES` inside the window. */
    keepOnScreen?: boolean;
    /** Called after every room frame, with whether the bubble could be placed. */
    onRendered?: (placed: boolean, time: number) => void;
}

/**
 * Places a bubble over a room object on every `RoomRenderedEvent` - Flash's `ContextInfoView.update`.
 * The bubble is moved straight on its Pixi container: the room's screen location and bounding
 * rectangle are already in the canvas pixels a `position: 'absolute', top: 0, left: 0` node lives in.
 *
 * Its bottom edge sits the gap above the highest of the object's recent heights, so it rises as
 * fast as the object does but falls at most a few pixels a frame, and never more than
 * `MAX_VERTICAL_LEAD_RATIO` of the object's height above its top. A bubble with no measured size
 * yet is not placed: placing a zero-sized node would put it somewhere else for a frame.
 *
 * Given another object, the bubble starts over, hidden until placed. Showing it again is the
 * caller's, from `onRendered`.
 */
export const useRoomObjectBubblePlacement = (bubbleRef: RefObject<PixiContainer | null>, options: RoomObjectBubblePlacementOptions) => {
    const { objectId, category, isAvatar, stackSize, keepOnScreen = false, onRendered = undefined } = options;
    const room = useRoom();
    const locationStack = useRef(new FixedSizeStack(stackSize));
    const maxStack = useRef(INITIAL_MAX_STACK);

    const place = (): boolean => {
        const node = bubbleRef.current;

        if (!room || !node) return false;

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);
        const nodeWidth = node.layout?.computedLayout.width ?? 0;
        const nodeHeight = node.layout?.computedLayout.height ?? 0;

        if (!bounds || !location || !nodeWidth || !nodeHeight) return false;

        // `getOffset`.
        const offset = -nodeHeight - (isAvatar ? AVATAR_GAP : OBJECT_GAP);

        locationStack.current.addValue(location.y - bounds.top);

        const highest = Math.max(locationStack.current.getMax(), (maxStack.current - BUBBLE_DROP_SPEED));

        maxStack.current = highest;

        const lowest = (bounds.top + offset) - Math.trunc(bounds.height * MAX_VERTICAL_LEAD_RATIO);

        let x = (location.x - (nodeWidth / 2));
        let y = Math.max((location.y - highest) + offset, lowest);

        if (keepOnScreen) {
            const maxLeft = ((window.innerWidth - nodeWidth) - SPACE_AROUND_EDGES);
            const maxTop = ((window.innerHeight - nodeHeight) - SPACE_AROUND_EDGES);

            if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
            else if (x > maxLeft) x = maxLeft;

            if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
            else if (y > maxTop) y = maxTop;
        }

        node.x = Math.trunc(x);
        node.y = Math.trunc(y);

        return true;
    };

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, (event) => {
        const placed = place();

        onRendered?.(placed, event.time);
    });

    // A layout effect, so the ticker cannot draw the bubble at its old place before this runs.
    useLayoutEffect(() => {
        locationStack.current = new FixedSizeStack(stackSize);
        maxStack.current = INITIAL_MAX_STACK;

        if (bubbleRef.current) bubbleRef.current.alpha = 0;
    }, [ objectId, category, stackSize ]);
};
