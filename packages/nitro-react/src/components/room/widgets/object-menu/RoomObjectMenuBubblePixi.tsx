import { ISimpleRoomObjectData, RoomObjectUserType, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, PointData, Rectangle } from 'pixi.js';
import { ReactNode, useEffect, useRef } from 'react';

import { useRoomSelector } from '#base/context';
import { useRoomEventDispatcher } from '#base/hooks';
import { Box } from '#base/theme-pixi';
import { FixedSizeStack } from '#base/utils';

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;
const SPACE_AROUND_EDGES = 10;

let FIXED_STACK: FixedSizeStack | undefined = undefined;
let MAX_STACK = -1000000;

type RoomObjectInfoBubblePixiProps = {
    objectData: ISimpleRoomObjectData;
    userType: RoomObjectUserType;
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
 * theme-pixi/utils/useFrameDrag.ts/useFrameResize.ts. `room.getRoomObjectScreenLocation()`/
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
    const room = useRoomSelector();
    const isFading = useRef<boolean>(false);
    const fadeTime = useRef<number>(1);
    const bubbleRef = useRef<PixiContainer>(null);

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
        if (!bounds || !location || !FIXED_STACK || !bubbleRef?.current) return;

        const node = bubbleRef.current;
        const nodeWidth = node.layout?.computedLayout.width ?? node.width;
        const nodeHeight = node.layout?.computedLayout.height ?? node.height;

        let offset = -(nodeHeight ?? 0);

        if (userType === RoomObjectUserType.User || userType === RoomObjectUserType.Bot || userType === RoomObjectUserType.RentableBot) offset = (offset + ((bounds.height > 50) ? 15 : 0));
        else offset = (offset - 14);

        FIXED_STACK.addValue((location.y - bounds.top));

        let maxStack = FIXED_STACK.getMax();

        if (maxStack < (MAX_STACK - BUBBLE_DROP_SPEED)) maxStack = (MAX_STACK - BUBBLE_DROP_SPEED);

        MAX_STACK = maxStack;

        const deltaY = (location.y - maxStack);

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

    useEffect(() => {
        FIXED_STACK = new FixedSizeStack(LOCATION_STACK_SIZE);
        MAX_STACK = -1000000;
        fadeTime.current = 1;
    }, []);

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
