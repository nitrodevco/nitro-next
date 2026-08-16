import { ISimpleRoomObjectData, RoomObjectUserType, RoomRenderedEvent } from "@nitrodevco/nitro-api";
import { PointData, Rectangle } from "pixi.js";
import { ReactNode, useEffect, useRef } from "react";

import { useRoomSelector } from "#base/context";
import { useRoomEventDispatcher } from "#base/hooks";
import { FixedSizeStack } from "#base/utils";

const LOCATION_STACK_SIZE: number = 25;
const BUBBLE_DROP_SPEED: number = 3;
const FADE_DELAY = 5000;
const FADE_LENGTH = 75;
const SPACE_AROUND_EDGES = 10;

let FIXED_STACK: FixedSizeStack | undefined = undefined;
let MAX_STACK = -1000000;

type RoomObjectInfoBubbleProps = {
    objectData: ISimpleRoomObjectData;
    userType: RoomObjectUserType;
    fades?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

export const RoomObjectMenuBubble = (props: RoomObjectInfoBubbleProps) => {
    const { objectData, userType, fades = false, children, onClose = undefined } = props;
    const { objectId, category } = objectData;
    const room = useRoomSelector();
    const isFading = useRef<boolean>(false);
    const fadeTime = useRef<number>(1);
    const elementRef = useRef<HTMLDivElement>(null);

    const updateFade = (time: number) => {
        if (!onClose || !isFading.current || !elementRef?.current) return;

        fadeTime.current += time;

        const newOpacity = ((1 - (fadeTime.current / FADE_LENGTH)) * 1);

        if (newOpacity <= 0) {
            if (onClose) onClose();

            return;
        }

        elementRef.current.style.opacity = `${newOpacity ?? 0}`;
    }

    const updatePosition = (bounds: Rectangle, location: PointData) => {
        if (!bounds || !location || !FIXED_STACK || !elementRef?.current) return;

        let offset = -(elementRef.current.offsetHeight ?? 0);

        if (userType === RoomObjectUserType.User || userType === RoomObjectUserType.Bot || userType === RoomObjectUserType.RentableBot) offset = (offset + ((bounds.height > 50) ? 15 : 0));
        else offset = (offset - 14);

        FIXED_STACK.addValue((location.y - bounds.top));

        let maxStack = FIXED_STACK.getMax();

        if (maxStack < (MAX_STACK - BUBBLE_DROP_SPEED)) maxStack = (MAX_STACK - BUBBLE_DROP_SPEED);

        MAX_STACK = maxStack;

        const deltaY = (location.y - maxStack);

        let x = (location.x - (elementRef.current.offsetWidth / 2));
        let y = (deltaY + offset);

        const maxLeft = ((window.innerWidth - elementRef.current.offsetWidth) - SPACE_AROUND_EDGES);
        const maxTop = ((window.innerHeight - elementRef.current.offsetHeight) - SPACE_AROUND_EDGES);

        if (x < SPACE_AROUND_EDGES) x = SPACE_AROUND_EDGES;
        else if (x > maxLeft) x = maxLeft;

        if (y < SPACE_AROUND_EDGES) y = SPACE_AROUND_EDGES;
        else if (y > maxTop) y = maxTop;

        elementRef.current.style.left = `${~~x}px`;
        elementRef.current.style.top = `${~~y}px`;
    }

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, event => {
        if (!room || !elementRef.current || !objectData) return;

        updateFade(event.time);

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);

        if (!bounds || !location) return;

        updatePosition(bounds, location);

        elementRef.current.style.visibility = 'visible';
    });

    useEffect(() => {
        if (!fades) return;

        const timeout = setTimeout(() => isFading.current = true, FADE_DELAY);

        return () => clearTimeout(timeout);
    }, [fades]);

    useEffect(() => {
        FIXED_STACK = new FixedSizeStack(LOCATION_STACK_SIZE);
        MAX_STACK = -1000000;
        fadeTime.current = 1;
    }, []);

    return <div ref={elementRef} className="absolute z-50 invisible">{children}</div>
}