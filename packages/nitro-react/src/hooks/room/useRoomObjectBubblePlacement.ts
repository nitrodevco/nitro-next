/**
 * Places a bubble over a room object on every `RoomRenderedEvent` - Flash's `ContextInfoView.update`.
 * The bubble is moved straight on its Pixi container: the room's screen location and bounding
 * rectangle are already in canvas pixels, the same space as a `position: 'absolute', top: 0, left: 0` node.
 *
 * Its bottom edge sits the gap above the highest of the object's recent heights, so it rises as
 * fast as the object does but falls at most a few pixels a frame, and never more than
 * `MAX_VERTICAL_LEAD_RATIO` of the object's height above its top. A bubble with no measured size
 * yet is not placed: placing a zero-sized node would put it somewhere else for a frame.
 *
 * A bubble whose content changes (another object's menu, a sub-menu, the minimised view) is placed
 * again from the same room frame by its new size (`useRoomFramePlacement`).
 *
 * Given another object, the bubble starts over, hidden until placed. Showing it again is the
 * caller's, from `onRendered`.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, PointData, Rectangle } from 'pixi.js';
import { RefObject, useLayoutEffect, useRef } from 'react';

import { useRoom } from '#base/context/room';
import { GetDesktopSize, useLatest } from '#base/theme';
import { FixedSizeStack } from '#base/utils';

import { getLayoutSize, useRoomFramePlacement } from './useRoomFramePlacement';

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
    /**
     * Called after every room frame with whether the bubble could be placed, and again, with no
     * time passed, after a change of its size.
     */
    onRendered?: (placed: boolean, time: number) => void;
}

/** The object as the last room frame saw it, with the smoothed height above its location. */
interface ObjectSample {
    bounds: Rectangle;
    location: PointData;
    highest: number;
}

export const useRoomObjectBubblePlacement = (bubbleRef: RefObject<PixiContainer | null>, options: RoomObjectBubblePlacementOptions) => {
    const { objectId, category, stackSize } = options;
    const room = useRoom();
    const locationStack = useRef(new FixedSizeStack(stackSize));
    const maxStack = useRef(INITIAL_MAX_STACK);
    const sample = useRef<ObjectSample | undefined>(undefined);
    const optionsRef = useLatest(options);

    /** Reads the object from the room and moves the drop smoothing on by one frame. */
    const takeSample = (): ObjectSample | undefined => {
        const { objectId, category } = optionsRef.current;

        if (!room) return undefined;

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);

        if (!bounds || !location) return undefined;

        locationStack.current.addValue(location.y - bounds.top);

        const highest = Math.max(locationStack.current.getMax(), (maxStack.current - BUBBLE_DROP_SPEED));

        maxStack.current = highest;

        return { bounds, location, highest };
    };

    /** Puts the bubble over the last sample by its current size. */
    const place = (node: PixiContainer): boolean => {
        const { isAvatar, keepOnScreen = false } = optionsRef.current;

        if (!sample.current) return false;

        const { bounds, location, highest } = sample.current;
        const { width: nodeWidth, height: nodeHeight } = getLayoutSize(node);

        if (!nodeWidth || !nodeHeight) return false;

        // `getOffset`.
        const offset = -nodeHeight - (isAvatar ? AVATAR_GAP : OBJECT_GAP);
        const lowest = (bounds.top + offset) - Math.trunc(bounds.height * MAX_VERTICAL_LEAD_RATIO);

        let x = (location.x - (nodeWidth / 2));
        let y = Math.max((location.y - highest) + offset, lowest);

        if (keepOnScreen) {
            const desktop = GetDesktopSize();
            const maxLeft = ((desktop.width - nodeWidth) - SPACE_AROUND_EDGES);
            const maxTop = ((desktop.height - nodeHeight) - SPACE_AROUND_EDGES);

            if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
            else if (x > maxLeft) x = maxLeft;

            if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
            else if (y > maxTop) y = maxTop;
        }

        node.x = Math.trunc(x);
        node.y = Math.trunc(y);

        return true;
    };

    useRoomFramePlacement(bubbleRef, {
        sample: () => {
            sample.current = takeSample();
        },
        place,
        onPlaced: (placed, time) => optionsRef.current.onRendered?.(placed, time),
    });

    // A layout effect, so the ticker cannot draw the bubble at its old place before this runs.
    useLayoutEffect(() => {
        locationStack.current = new FixedSizeStack(stackSize);
        maxStack.current = INITIAL_MAX_STACK;
        sample.current = undefined;

        if (bubbleRef.current) bubbleRef.current.alpha = 0;
    }, [ objectId, category, stackSize ]);
};
