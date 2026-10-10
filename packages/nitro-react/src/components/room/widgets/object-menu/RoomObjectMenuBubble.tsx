import { ISimpleRoomObjectData, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

import { useRoomObjectBubblePlacement } from '#base/hooks';
import { Box } from '#base/theme';

const LOCATION_STACK_SIZE: number = 25;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;

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
 * A bubble that follows a room object - Flash's `ContextInfoView`, placed by
 * `useRoomObjectBubblePlacement` and kept inside the window.
 *
 * The bubble is drawn fully transparent until its own layout has been measured: positioning a
 * bubble whose width and height are still zero would put it somewhere else for a frame, and
 * that is the flicker on first open. Transparent rather than invisible, because yoga does not
 * measure an invisible node at all.
 *
 * It takes no `zIndex`: a non-zero one makes its parent sort, which lifts the bubble over the
 * window layer that follows the room in the tree. Room UI stays under every window.
 */
export const RoomObjectMenuBubble = (props: RoomObjectInfoBubbleProps) => {
    const { objectData, userType, fades = false, children, onClose = undefined } = props;
    const { objectId, category } = objectData;
    const isFading = useRef<boolean>(false);
    const fadeTime = useRef<number>(1);
    const bubbleRef = useRef<PixiContainer>(null);

    const updateFade = (time: number) => {
        if (!isFading.current || !bubbleRef?.current) return;

        fadeTime.current += time;

        const newOpacity = (1 - (fadeTime.current / FADE_LENGTH));

        if (newOpacity <= 0) {
            bubbleRef.current.alpha = 0;

            if (onClose) onClose();

            return;
        }

        bubbleRef.current.alpha = newOpacity;
    };

    /*
     * The smoothing is this bubble's own: several of them can be up at once - a furniture menu,
     * a scoreboard, a guild menu - and one sharing its stack with another would be dragged
     * about by whatever that one is following.
     */
    useRoomObjectBubblePlacement(bubbleRef, {
        objectId,
        category,
        isAvatar: isAvatar(userType),
        stackSize: LOCATION_STACK_SIZE,
        keepOnScreen: true,
        onRendered: (placed, time) => {
            updateFade(time);

            if (placed && !isFading.current && bubbleRef.current) bubbleRef.current.alpha = 1;
        },
    });

    // The fade counts down afresh for every object the bubble follows.
    useEffect(() => {
        isFading.current = false;

        if (!fades) return;

        const timeout = setTimeout(() => isFading.current = true, FADE_DELAY);

        return () => clearTimeout(timeout);
    }, [ fades, objectId, category ]);

    useLayoutEffect(() => {
        fadeTime.current = 1;
    }, [ objectId, category ]);

    return (
        <Box
            ref={bubbleRef}
            layout={{ position: 'absolute', top: 0, left: 0 }}
        >
            {children}
        </Box>
    );
};
