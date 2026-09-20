/**
 * The free-flow chat's numeric constants: the flow stage's scroll step and collision slack, and
 * `ChatBubbleWidth` - the wrap widths the bubble-width setting chooses between.
 */
import { RoomChatBubbleWidthType } from '@nitrodevco/nitro-api';

/** `ChatFlowStage._Str_7698`: how many pixels every bubble scrolls up per cycle. */
export const CHAT_FLOW_SCROLL_UP_STEP = 19;

/** `ChatBubbleSimulationEntity._Str_13872`: the slack taken off a bubble's height for collision purposes. */
export const CHAT_BUBBLE_HEIGHT_PADDING = 10;

/** `ChatBubbleWidth.NORMAL / THIN / WIDE` - the wrap width the bubble-width setting maps to. */
export const CHAT_BUBBLE_WIDTH_NORMAL = 350;
export const CHAT_BUBBLE_WIDTH_THIN = 240;
export const CHAT_BUBBLE_WIDTH_WIDE = 2000;

/** `ChatBubbleWidth.accordingToRoomChatSetting`: 0 is wide, 1 normal, 2 thin; anything else normal. */
export const chatBubbleWidthFromSetting = (setting: RoomChatBubbleWidthType): number => {
    switch (setting) {
        case RoomChatBubbleWidthType.Wide:
            return CHAT_BUBBLE_WIDTH_WIDE;
        case RoomChatBubbleWidthType.Normal:
            return CHAT_BUBBLE_WIDTH_NORMAL;
        case RoomChatBubbleWidthType.Thin:
            return CHAT_BUBBLE_WIDTH_THIN;
    }

    return CHAT_BUBBLE_WIDTH_NORMAL;
};
