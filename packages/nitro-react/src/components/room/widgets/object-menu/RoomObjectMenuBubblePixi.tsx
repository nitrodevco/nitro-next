import { ISimpleRoomObjectData, RoomObjectUserType, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, PointData, Rectangle } from 'pixi.js';
import { ReactNode, useEffect, useRef } from 'react';

import { useRoom } from '#base/context/room';
import { useRoomEventDispatcher } from '#base/hooks';
import { Box } from '#base/theme';
import { FixedSizeStack } from '#base/utils';

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;
const SPACE_AROUND_EDGES = 10;

/** Where the drop smoothing starts from, before any real height has been seen. */
const INITIAL_MAX_STACK = -1000000;

type RoomObjectInfoBubblePixiProps = {
    objectData: ISimpleRoomObjectData;
    /** Only humanoid units nudge the bubble's offset, so furniture simply leaves this out. */
    userType?: RoomObjectUserType;
    fades?: boolean;
    children?: ReactNode;
    onClose?: () => void;
};

/**
 * Pixi port of components/room/widgets/object-menu/RoomObjectMenuBubble.tsx. DOM mutated an
 * absolutely-positioned div's `style.left`/`style.top`/`style.opacity`/`style.visibility`
 * directly on every RoomRenderedEvent tick for perf (bypassing React re-renders); this does the
 * same thing to a Pixi container ref's `.x`/`.y`/`.alpha`/`.visible`, following the same
 * imperative-ref-driven-by-external-event-source pattern established by
 * theme/utils/useFrameDrag.ts/useFrameResize.ts. `room.getRoomObjectScreenLocation()`/
 * `getRoomObjectBoundingRectangle()` already return coordinates in the shared renderer's own
 * canvas-pixel space (see RoomSpriteCanvas's screen-point math), the same space
 * Container.x/y/getGlobalPosition() operate in for a top-level child of app.stage - so, exactly
 * like Frame.tsx's drag offset, this writes a `position: 'absolute', top: 0, left: 0` yoga base
 * and then adds its own x/y on top of that (@pixi/layout's ContainerMixin ADDS the
 * yoga-computed position to the container's own `.position`), landing the container at the raw
 * computed screen position. `elementRef.current.offsetWidth`/`offsetHeight` become
 * `.layout?.computedLayout.width`/`.height`, mirroring useFrameDrag.ts's own substitution.
 */
export const RoomObjectMenuBubblePixi = (props: RoomObjectInfoBubblePixiProps) => {
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

    const updatePosition = (bounds: Rectangle, location: PointData) => {
        if (!bounds || !location || !bubbleRef?.current) return;

        const node = bubbleRef.current;
        const nodeWidth = node.layout?.computedLayout.width ?? node.width;
        const nodeHeight = node.layout?.computedLayout.height ?? node.height;

        let offset = -(nodeHeight ?? 0);

        if (userType === RoomObjectUserType.User || userType === RoomObjectUserType.Bot || userType === RoomObjectUserType.RentableBot) offset = (offset + ((bounds.height > 50) ? 15 : 0));
        else offset = (offset - 14);

        locationStack.current.addValue((location.y - bounds.top));

        // The bubble may rise as fast as the object does, but it only falls a few pixels a frame.
        const highest = Math.max(locationStack.current.getMax(), (maxStack.current - BUBBLE_DROP_SPEED));

        maxStack.current = highest;

        const deltaY = (location.y - highest);

        let x = (location.x - (nodeWidth / 2));
        let y = (deltaY + offset);

        const maxLeft = ((window.innerWidth - nodeWidth) - SPACE_AROUND_EDGES);
        const maxTop = ((window.innerHeight - nodeHeight) - SPACE_AROUND_EDGES);

        if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
        else if (x > maxLeft) x = maxLeft;

        if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
        else if (y > maxTop) y = maxTop;

        node.x = ~~x;
        node.y = ~~y;
    };

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, (event) => {
        if (!room || !bubbleRef.current || !objectData) return;

        updateFade(event.time);

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);

        if (!bounds || !location) return;

        updatePosition(bounds, location);

        bubbleRef.current.visible = true;
    });

    useEffect(() => {
        if (!fades) return;

        const timeout = setTimeout(() => isFading.current = true, FADE_DELAY);

        return () => clearTimeout(timeout);
    }, [ fades ]);

    // A bubble moved to another object starts following it from scratch.
    useEffect(() => {
        locationStack.current = new FixedSizeStack(LOCATION_STACK_SIZE);
        maxStack.current = INITIAL_MAX_STACK;
        fadeTime.current = 1;
    }, [ objectId, category ]);

    return (
        <Box
            ref={bubbleRef}
            visible={false}
            zIndex={500}
            layout={{ position: 'absolute', top: 0, left: 0 }}
        >
            {children}
        </Box>
    );
};
