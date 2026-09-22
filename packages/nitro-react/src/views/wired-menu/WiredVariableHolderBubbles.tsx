/**
 * The value bubbles of the variable overview's "highlight holders" mode - `VariableInfoBubbleView`
 * on `variable_value_info_bubble_xml`, one per lit holder whose variable has a value, placed over
 * the object every frame. The placement is Flash's `update`: the object's screen location minus
 * the highest of its last 18 heights above that point (so the bubble rises at once but sinks at
 * most 3px a frame), the bubble's own height and a gap (10 over an avatar, 4 over a furni or pet),
 * but never more than 5% of the object's height above its top. A holder that leaves the room
 * loses its bubble with it (`onRoomObjectRemoved`): no location, nothing drawn.
 *
 * Flash puts the bubbles on the desktop, under the windows; they are drawn over the room here.
 */
import { RoomObjectCategoryEnum, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { useLayoutEffect, useRef, useState } from 'react';

import { useRoom } from '#base/context/room';
import { useWiredStore } from '#base/context/wired';
import { useRoomEventDispatcher } from '#base/hooks';
import { Box, Bubble, ThemeText, useLayoutSize } from '#base/theme';
import { FixedSizeStack } from '#base/utils';

/** `VariableInfoBubbleView._-zV` / `_-Qf`. */
const LOCATION_STACK_SIZE = 18;
const BUBBLE_DROP_SPEED = 3;
/** `getMaximumVerticalLead`. */
const MAX_VERTICAL_LEAD_RATIO = 0.05;
/**
 * The layout's `border` bubble and its `value` text. The text grows with `auto_size` left and
 * carries `reflect_horizontal_resize_to_parent`, so the bubble grows by as much as the text does.
 * Style 5 is not a bubble style of the skin, which falls back to style 0; the layout's empty
 * style 100 `static_bitmap` draws nothing and is left out.
 */
const BUBBLE_WIDTH = 60;
const BUBBLE_HEIGHT = 39;
const VALUE_WIDTH = 22;

interface ValueBubbleProps {
    objectId: number;
    category: RoomObjectCategoryEnum;
    value: string;
    /** `_-l17` - an avatar: the bubble clears the head by more. */
    isAvatar: boolean;
}

const ValueBubble = ({ objectId, category, value, isAvatar }: ValueBubbleProps) => {
    const room = useRoom();
    const bubbleRef = useRef<PixiContainer>(null);
    const stack = useRef(new FixedSizeStack(LOCATION_STACK_SIZE));
    const lastMax = useRef(0);
    const [ textNode, setTextNode ] = useState<PixiContainer | null>(null);
    const textSize = useLayoutSize(textNode);

    // `setActive` after `setInactive`: a bubble given to another object starts over, out of sight until placed.
    useLayoutEffect(() => {
        stack.current = new FixedSizeStack(LOCATION_STACK_SIZE);
        lastMax.current = 0;

        if (bubbleRef.current) bubbleRef.current.alpha = 0;
    }, [ objectId, category ]);

    useRoomEventDispatcher<RoomRenderedEvent>(RoomRenderedEvent.ROOM_RENDERED, () => {
        const node = bubbleRef.current;

        if (!room || !node) return;

        const bounds = room.getRoomObjectBoundingRectangle(objectId, category);
        const location = room.getRoomObjectScreenLocation(objectId, category);
        const width = node.layout?.computedLayout.width ?? 0;
        const height = node.layout?.computedLayout.height ?? 0;

        if (!bounds || !location || !width || !height) {
            node.alpha = 0;

            return;
        }

        // `getOffset`.
        const offset = -height - (isAvatar ? 10 : 4);

        stack.current.addValue(location.y - bounds.top);

        let max = stack.current.getMax();

        if (max < (lastMax.current - BUBBLE_DROP_SPEED)) max = lastMax.current - BUBBLE_DROP_SPEED;

        lastMax.current = max;

        const lowest = (bounds.top + offset) - Math.trunc(bounds.height * MAX_VERTICAL_LEAD_RATIO);

        node.x = Math.trunc(location.x - (width / 2));
        node.y = Math.trunc(Math.max((location.y - max) + offset, lowest));
        node.alpha = 1;
    });

    return (
        <Box
            ref={bubbleRef}
            zIndex={500}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0 }}
        >
            <Bubble
                variant="5"
                tintColor="#ade6ff"
                margins={[ 8, 8, 8, 8 ]}
                layout={{ width: BUBBLE_WIDTH + (textSize.width || VALUE_WIDTH) - VALUE_WIDTH, height: BUBBLE_HEIGHT }}
            >
                <Box
                    ref={setTextNode}
                    layout={{ position: 'absolute', left: 11, top: 3, height: 16 }}
                >
                    <ThemeText
                        text={value}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        verticalAlign="top"
                    />
                </Box>
            </Bubble>
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
