/**
 * The free-flow chat's numeric constants: the flow stage's scroll step and collision slack,
 * `ChatBubbleWidth` - the wrap widths the bubble-width setting chooses between - and the chat
 * font size setting (`HabboFreeFlowChat.chatFontSizeMode` / `chatFontSizeScale`, and
 * `ChatStyleSelector.FONT_SIZE_LABELS`). The font size tables are held to Flash by
 * `drift/constants.py`.
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

/** `HabboFreeFlowChat.clampChatFontSizeMode` / `ChatStyleSelector.clampFontSize`: the modes run 0 (S) to 4 (XXL). */
export const CHAT_FONT_SIZE_MODE_MIN = 0;
export const CHAT_FONT_SIZE_MODE_MAX = 4;

/** `ChatStyleSelector.FONT_SIZE_LABELS` - the captions of the style menu's `font_size_list`, one per mode. */
export const CHAT_FONT_SIZE_LABELS = [ 'S', 'M', 'L', 'XL', 'XXL' ];

/** `HabboFreeFlowChat.chatFontSizeScale`, indexed by mode: 1 -> 1.15, 2 -> 1.3, 3 -> 1.5, 4 -> 1.75, anything else 1. */
export const CHAT_FONT_SIZE_SCALES = [ 1, 1.15, 1.3, 1.5, 1.75 ];

/** `HabboFreeFlowChat.clampChatFontSizeMode`: below 0 is 0, above 4 is 4. */
export const clampChatFontSizeMode = (mode: number): number => {
    if (mode < CHAT_FONT_SIZE_MODE_MIN) return CHAT_FONT_SIZE_MODE_MIN;

    if (mode > CHAT_FONT_SIZE_MODE_MAX) return CHAT_FONT_SIZE_MODE_MAX;

    return mode;
};

/** `HabboFreeFlowChat.chatFontSizeScale` - what a bubble's font size and height cap are multiplied by. */
export const chatFontSizeScale = (mode: number): number => CHAT_FONT_SIZE_SCALES[mode] ?? 1;
