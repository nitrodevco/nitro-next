/**
 * The value bubbles of the variable overview's "highlight holders" mode - `VariableInfoBubbleView`
 * on `variable_value_info_bubble_xml`, one per lit holder whose variable has a value, placed over
 * the object every frame. The placement is Flash's `update`: the object's screen location minus
 * the highest of its last 18 heights above that point (so the bubble rises at once but sinks at
 * most 3px a frame), the bubble's own height and a gap (10 over an avatar, 4 over a furni or pet),
 * but never more than 5% of the object's height above its top. A holder that leaves the room
 * loses its bubble with it (`onRoomObjectRemoved`): no location, nothing drawn.
 *
 * The bubble is the Flash template itself, its `value` text set to the holder's value.
 *
 * Flash puts the bubbles on the desktop, under the windows; they are drawn over the room here.
 */
import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { useRef } from 'react';

import { useWiredStore } from '#base/context/wired';
import { useRoomObjectBubblePlacement } from '#base/hooks';
import { Box, TemplateWindow } from '#base/theme';

/** `VariableInfoBubbleView._-zV`. */
const LOCATION_STACK_SIZE = 18;

interface ValueBubbleProps {
    objectId: number;
    category: RoomObjectCategoryEnum;
    value: string;
    /** `_-l17` - an avatar: the bubble clears the head by more. */
    isAvatar: boolean;
}

const ValueBubble = ({ objectId, category, value, isAvatar }: ValueBubbleProps) => {
    const bubbleRef = useRef<PixiContainer>(null);

    // `setActive` after `setInactive`: a bubble given to another object starts over, out of sight until placed.
    useRoomObjectBubblePlacement(bubbleRef, {
        objectId,
        category,
        isAvatar,
        stackSize: LOCATION_STACK_SIZE,
        onRendered: (placed) => {
            if (bubbleRef.current) bubbleRef.current.alpha = placed ? 1 : 0;
        },
    });

    return (
        <Box
            ref={bubbleRef}
            // No `zIndex`: in the window layer anything at 100 or more is a window, and these sit under all of them.
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0 }}
        >
            {/* `updateValue`: the layout's `value` text; it grows with the value and the bubble with it. */}
            <TemplateWindow
                id="habbo-user-defined-room-events-com/variable_value_info_bubble_xml"
                bindings={{ value: { caption: value } }}
            />
        </Box>
    );
};

export const WiredVariableHolderBubbles = () => {
    const heldFurni = useWiredStore(x => x.overviewHeldFurni);
    const heldUsers = useWiredStore(x => x.overviewHeldUsers);

    return (
        <>
            {Object.entries(heldFurni).map(([ key, value ]) => {
                const furniId = Number(key);

                if (value === null) return null;

                return (
                    <ValueBubble
                        key={`furni-${furniId}`}
                        objectId={Math.abs(furniId)}
                        category={(furniId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor}
                        value={value}
                        isAvatar={false}
                    />
                );
            })}
            {Object.entries(heldUsers).map(([ key, user ]) => {
                if (user.value === null) return null;

                return (
                    <ValueBubble
                        key={`user-${key}`}
                        objectId={Number(key)}
                        category={RoomObjectCategoryEnum.Unit}
                        value={user.value}
                        isAvatar={!user.isPet}
                    />
                );
            })}
        </>
    );
};
