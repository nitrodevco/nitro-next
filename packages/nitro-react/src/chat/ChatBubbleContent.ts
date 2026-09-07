import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { IChatLink } from '@nitrodevco/nitro-packets';

import { ChatBubbleData } from './ChatBubbleData';
import { chatColorToCss, escapeChatMarkup } from './ChatBubbleText';
import { applyChatColourPrefix } from './ChatConstants';
import { IChatStyle } from './ChatStyle';

export type ChatLocalizer = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/** `_Str_1488` - a non-system bubble never grows taller than this; longer text is clipped. */
export const CHAT_BUBBLE_MAX_TEXT_HEIGHT = 108;
/** `_Str_10539` / `_Str_11116` - the pointer stays this far inside the bubble's edges. */
export const CHAT_BUBBLE_POINTER_MIN_X = 28;
export const CHAT_BUBBLE_POINTER_RIGHT_MARGIN = 15;

/** The Flash factory's text rewrites: the special chat types become a localised sentence about the speaker. */
export const resolveChatBubbleText = (data: ChatBubbleData, userName: string, localize: ChatLocalizer): string => {
    switch (data.chatType) {
        case RoomChatTypeEnum.Respect:
            return localize('widgets.chatbubble.respect', '', { username: userName });
        case RoomChatTypeEnum.PetRespect:
            return localize('widget.chatbubble.petrespect', '', { petname: userName });
        case RoomChatTypeEnum.PetTreat:
            return localize('widget.chatbubble.pettreat', '', { petname: userName });
        case RoomChatTypeEnum.HandItem: {
            const handItem = localize(`handitem${data.extraParam}`, `handitem${data.extraParam}`);

            return localize('widget.chatbubble.handitem', '', { username: userName, handitem: handItem });
        }
        case RoomChatTypeEnum.MuteRemaining: {
            const total = data.extraParam;
            const seconds = String(total % 60);
            const minutes = String((total > 0) ? Math.floor((total % 3600) / 60) : 0);
            const hours = String((total > 0) ? Math.floor(total / 3600) : 0);

            return localize('widget.chatbubble.mutetime', '', { hours, minutes, seconds });
        }
    }

    return data.text;
};

export interface ChatBubbleMarkup {
    markup: string;
    /** A `@colour@` prefix asked for this text colour. */
    textColor: number | undefined;
    /** Italic (respects, hand items ...) text is drawn at 60% alpha. */
    alpha: number;
}

/** `PooledChatBubble.build`'s html: `<b>name: </b>` prefix, bold shouts, italic system lines, links in place of `{n}`. */
export const buildChatBubbleMarkup = (text: string, userName: string, chatType: RoomChatTypeEnum, style: IChatStyle, links: IChatLink[]): ChatBubbleMarkup => {
    if (!style.allowHTML) {
        text = escapeChatMarkup(text);
        text = text.replace(/&#[0-9]+;/g, '').replace(/&#x[0-9a-fA-F]+;/g, '');
    }

    const colourPrefix = applyChatColourPrefix(text);

    text = colourPrefix.text;

    const isSpeak = (chatType === RoomChatTypeEnum.Speak);
    const isShout = (chatType === RoomChatTypeEnum.Shout);
    const isItalic = (!isSpeak && !isShout && !style.isAnonymous);

    let markup = (isItalic ? '<i>' : '') + (style.isAnonymous ? '' : `<b>${userName}: </b>`);

    markup += (isShout ? '<b>' : '') + text + (isShout ? '</b>' : '');
    markup += (isItalic ? '</i>' : '');

    for (let i = 0; i < links.length; i++) {
        const anchor = `<font color="${chatColorToCss(style.linkColor)}"><u>${links[i].url}</u></font>`;

        markup = markup.replace(`{${i}}`, anchor);
    }

    return { markup, textColor: colourPrefix.color, alpha: isItalic ? 0.6 : 1 };
};

export interface ChatBubbleLayout {
    /** The nine-sliced background's size. */
    width: number;
    height: number;
    /** The art's full extent, pointer and face included (Flash `Sprite.width/height`). */
    bubbleWidth: number;
    bubbleHeight: number;
    /** `_Str_22234` */
    limitedHeight: number;
    textX: number;
    textY: number;
    /** Text taller than 108px is clipped to this box (at `textX`/`textY`). */
    clip: { width: number; height: number } | undefined;
    pointerY: number | undefined;
    face: { x: number; y: number; width: number; height: number; cropTop: number } | undefined;
}

export interface ChatBubbleLayoutInput {
    style: IChatStyle;
    textWidth: number;
    textHeight: number;
    /** The wrap width the room's bubble-width setting maps to. */
    maxWidth: number;
    minHeight?: number;
    pointerHeight: number;
    faceWidth?: number;
    faceHeight?: number;
}

/** The size arithmetic of `PooledChatBubble.build` - pure, so a bubble can lay itself out in a memo. */
export const computeChatBubbleLayout = ({ style, textWidth, textHeight, maxWidth, minHeight = -1, pointerHeight, faceWidth, faceHeight }: ChatBubbleLayoutInput): ChatBubbleLayout => {
    const margins = style.textFieldMargins;
    const base = style.getBackgroundTexture();

    let width = Math.min(maxWidth, (textWidth + margins.x) + margins.width);
    let height = (textHeight + margins.y) + margins.height;

    if (!style.isSystemStyle) height = Math.min(CHAT_BUBBLE_MAX_TEXT_HEIGHT, height);

    if (minHeight !== -1) height = Math.max(minHeight, height);

    width = Math.max(width, base.width);
    height = Math.max(height, base.height);

    let bubbleWidth = width;
    let bubbleHeight = height;
    let pointerY: number | undefined;

    if (!style.isAnonymous && style.pointerTexture) {
        pointerY = height - style.pointerOffsetY;
        bubbleHeight = Math.max(bubbleHeight, pointerY + pointerHeight);
    }

    let face: ChatBubbleLayout['face'];

    if (style.faceOffset && faceWidth && faceHeight) {
        // Flash kept the bottom `height` rows of an over-tall head.
        const cropTop = (faceHeight > height) ? (faceHeight - height) : 0;
        const shownHeight = faceHeight - cropTop;
        const x = style.faceOffset.x - (faceWidth / 2);
        const y = Math.max(1, style.faceOffset.y - (shownHeight / 2));

        face = { x, y, width: faceWidth, height: shownHeight, cropTop };
        bubbleWidth = Math.max(bubbleWidth, x + faceWidth);
        bubbleHeight = Math.max(bubbleHeight, y + shownHeight);
    }

    const textX = margins.x;
    const textY = margins.y;

    bubbleHeight = Math.max(bubbleHeight, textY + textHeight + margins.height);

    const clip = (!style.isSystemStyle && (textHeight > CHAT_BUBBLE_MAX_TEXT_HEIGHT))
        ? { width: textWidth + 5, height: CHAT_BUBBLE_MAX_TEXT_HEIGHT - margins.height }
        : undefined;

    return {
        width,
        height,
        bubbleWidth,
        bubbleHeight,
        limitedHeight: style.isSystemStyle ? bubbleHeight : Math.min(CHAT_BUBBLE_MAX_TEXT_HEIGHT, bubbleHeight),
        textX,
        textY,
        clip,
        pointerY,
        face,
    };
};
