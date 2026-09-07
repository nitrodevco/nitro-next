import { RoomChatBubbleWidthType } from '@nitrodevco/nitro-api';

/** `ChatFlowStage._Str_7698`: how many pixels every bubble scrolls up per cycle. */
export const CHAT_FLOW_SCROLL_UP_STEP = 19;

/** `ChatBubbleSimulationEntity._Str_13872`: the slack taken off a bubble's height for collision purposes. */
export const CHAT_BUBBLE_HEIGHT_PADDING = 10;

/** `ChatBubbleWidth.NORMAL / WIDE / SMALL` - the wrap width the room's bubble-width setting maps to. */
export const CHAT_BUBBLE_WIDTH_NORMAL = 350;
export const CHAT_BUBBLE_WIDTH_WIDE = 240;
export const CHAT_BUBBLE_WIDTH_SMALL = 2000;

/** `ChatBubbleWidth.fromValue`: note the naming inversion the Flash client had - the "wide" room setting means no wrapping at all. */
export const chatBubbleWidthFromSetting = (setting: RoomChatBubbleWidthType): number => {
    switch (setting) {
        case RoomChatBubbleWidthType.Normal:
            return CHAT_BUBBLE_WIDTH_NORMAL;
        case RoomChatBubbleWidthType.Thin:
            return CHAT_BUBBLE_WIDTH_WIDE;
        case RoomChatBubbleWidthType.Wide:
            return CHAT_BUBBLE_WIDTH_SMALL;
    }

    return CHAT_BUBBLE_WIDTH_NORMAL;
};

/** `ChatColours.COLOUR_ARRAY`: a message starting with one of these prefixes is drawn in that colour, prefix stripped. */
export const CHAT_COLOUR_PREFIXES: [string, number][] = [
    [ '@red@', 9115929 ],
    [ '@cyan@', 0x7f7f ],
    [ '@blue@', 19609 ],
    [ '@green@', 0x8000 ],
    [ '@purple@', 0x4c004c ],
];

/** Strips a `@colour@` prefix off `text`, returning the colour it asked for (or `undefined` when there was none). */
export const applyChatColourPrefix = (text: string): { text: string; color: number | undefined } => {
    let color: number | undefined;

    for (const [ prefix, value ] of CHAT_COLOUR_PREFIXES) {
        if (text.indexOf(prefix) === 0) {
            color = value;
            text = text.substring(prefix.length);
        }
    }

    return { text, color };
};
