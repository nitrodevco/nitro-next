import { ISimpleRoomObjectData, RoomObjectUserType, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, PointData, Rectangle } from 'pixi.js';
import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

import { useRoom } from '#base/context/room';
import { useRoomEventDispatcher } from '#base/hooks';
import { Box } from '#base/theme';
import { FixedSizeStack } from '#base/utils';

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;
const SPACE_AROUND_EDGES = 10;

/** `AvatarContextInfoView.getOffset`: a bubble over a person clears the head by this much... */
const AVATAR_GAP = 10;
/** ...and one over anything else (`ContextInfoView.getOffset`) by this. */
const OBJECT_GAP = 4;

/** Where the drop smoothing starts from, before any real height has been seen. */
const INITIAL_MAX_STACK = -1000000;

type RoomObjectInfoBubbleProps = {
    objectData: ISimpleRoomObjectData;
    /** Humanoid units get the taller gap above the head; furniture and pets leave this out. */
    userType?: RoomObjectUserType;
    fades?: boolean;
    children?: ReactNode;
    onClose?: () => void;
};

const isAvatar = (userType: RoomObjectUserType | undefined) => (userType === RoomObjectUserType.User) || (userType === RoomObjectUserType.Bot) || (userType === RoomObjectUserType.RentableBot);

/**
 * A bubble that follows a room object - Flash's `ContextInfoView.update`. It is positioned
 * straight on the Pixi container from every `RoomRenderedEvent` rather than through React, the
 * way the theme's frame drag does: `room.getRoomObjectScreenLocation()` and
 * `getRoomObjectBoundingRectangle()` are already in the shared renderer's canvas pixels, the same
 * space a top-level stage child's `x`/`y` live in, so a `position: 'absolute', top: 0, left: 0`
 * yoga base plus the computed offset lands it exactly there.
 *
 * The bubble is drawn fully transparent until its own layout has been measured: positioning a
 * bubble whose width and height are still zero would put it somewhere else for a frame, and
 * that is the flicker on first open. Transparent rather than invisible, because yoga does not
 * measure an invisible node at all.
 */
export const RoomObjectMenuBubble = (props: RoomObjectInfoBubbleProps) => {
    const { objectData, userType, fades = false, children, onClose = undefined } = props;
    const { objectId, category } = objectData;
    const room = useRoom();
    const isFading = useRef<boolean>(false);
    const fadeTime = useRef<number>(1);
    const bubbleRef = useRef<PixiContainer>(null);
    /*
     * The smoothing is this bubble's own: several of them can be up at once - a furniture menu,
     * a scoreboard, a guild menu - and one sharing its stack with another would be dragged
     * about by whatever that one is following.
     */
    const locationStack = useRef<FixedSizeStack>(new FixedSizeStack(LOCATION_STACK_SIZE));
    const maxStack = useRef<number>(INITIAL_MAX_STACK);

    const updateFade = (time: number) => {
        if (!onClose || !isFading.current || !bubbleRef?.current) return;

        fadeTime.current += time;

        const newOpacity = ((1 - (fadeTime.current / FADE_LENGTH)) * 1);

        if (newOpacity <= 0) {
            if (onClose) onClose();

            return;
        }

        bubbleRef.current.alpha = newOpacity ?? 0;
    };

    /** Returns false while the bubble has no measured size yet. */
    const updatePosition = (bounds: Rectangle, location: PointData): boolean => {
        if (!bounds || !location || !bubbleRef?.current) return false;

        const node = bubbleRef.current;
        const nodeWidth = node.layout?.computedLayout.width ?? 0;
        const nodeHeight = node.layout?.computedLayout.height ?? 0;

        if (!nodeWidth || !nodeHeight) return false;

        // `getOffset`: the bubble's bottom edge sits this far above the top of the object.
        const offset = -nodeHeight - (isAvatar(userType) ? AVATAR_GAP : OBJECT_GAP);

        locationStack.current.addValue((location.y - bounds.top));

        // The bubble may rise as fast as the object does, but it only falls a few pixels a frame.
        const highest = Math.max(locationStack.current.getMax(), (maxStack.current - BUBBLE_DROP_SPEED));

        maxStack.current = highest;

        // `getMaximumVerticalLead`: the smoothed top may not lag the real one by more than a sliver.
        const lowest = (bounds.top + offset) - ~~(bounds.height * 0.05);

        let x = (location.x - (nodeWidth / 2));
        let y = Math.max((location.y - highest) + offset, lowest);

        const maxLeft = ((window.innerWidth - nodeWidth) - SPACE_AROUND_EDGES);
        const maxTop = ((window.innerHeight - nodeHeight) - SPACE_AROUND_EDGES);

        if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
        else if (x > maxLeft) x = maxLeft;

        if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
        else if (y > maxTop) y = maxTop;

        node.x = ~~x;
        node.y = ~~y;

        return true;
    };

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, (event) => {
        if (!room || !bubbleRef.current || !objectData) return;

        updateFade(event.time);

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);

        if (!bounds || !location) return;

        if (updatePosition(bounds, location) && !isFading.current) bubbleRef.current.alpha = 1;
    });

    useEffect(() => {
        if (!fades) return;

        const timeout = setTimeout(() => isFading.current = true, FADE_DELAY);

        return () => clearTimeout(timeout);
    }, [ fades ]);

    // A bubble moved to another object starts following it from scratch, out of sight until placed.
    // A layout effect, so the ticker cannot draw it at the origin before this runs.
    useLayoutEffect(() => {
        locationStack.current = new FixedSizeStack(LOCATION_STACK_SIZE);
        maxStack.current = INITIAL_MAX_STACK;
        fadeTime.current = 1;

        if (bubbleRef.current) bubbleRef.current.alpha = 0;
    }, [ objectId, category ]);

    return (
        <Box
            ref={bubbleRef}
            zIndex={500}
            layout={{ position: 'absolute', top: 0, left: 0 }}
        >
            {children}
        </Box>
    );
};
