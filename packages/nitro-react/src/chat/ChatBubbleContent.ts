/**
 * What goes into a chat bubble, as the Flash `ChatBubbleFactory` and `PooledChatBubble.recreate`
 * worked it out: the text of the special chat types, the html the text field is given, and the
 * size and placement of every part (background, emblem, pointer, face, text, clip).
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { IChatLink } from '@nitrodevco/nitro-packets';
import { Texture } from 'pixi.js';

import { ChatBubbleData } from './ChatBubbleData';
import { chatColorToCss, escapeChatMarkup } from './ChatBubbleText';
import { applyChatColourToChat, applyChatMarkupToElements } from './ChatMarkup';
import { IChatStyle } from './ChatStyle';

export type ChatLocalizer = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/** `_Str_1488` - a non-system bubble never grows taller than this; longer text is clipped. */
export const CHAT_BUBBLE_MAX_TEXT_HEIGHT = 108;
/** `PooledChatBubble`'s pointer margins - how far inside the bubble's left / right edge the pointer stays, unless the style's `pointerXMargins` says otherwise. */
export const CHAT_BUBBLE_POINTER_DEFAULT_MARGIN_LEFT = 28;
export const CHAT_BUBBLE_POINTER_DEFAULT_MARGIN_RIGHT = 15;

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
    /** Italic (respects, hand items ...) text is drawn at 60% alpha. */
    alpha: number;
}

/**
 * `HabboFreeFlowChat.fixHtml` then `PooledChatBubble.recreate`'s html: angle brackets and
 * numeric entities escaped unless the style allows html, `[b]`/`[red]` markup for notification
 * styles, the `@colour@` prefix, then the `<b>name: </b>` prefix, bold shouts, italic system
 * lines and links in place of `{n}`.
 */
export const buildChatBubbleMarkup = (text: string, userName: string, chatType: RoomChatTypeEnum, style: IChatStyle, links: IChatLink[]): ChatBubbleMarkup => {
    if (!style.allowHTML) {
        text = escapeChatMarkup(text);
        // Flash's second pattern is `&#x[0-9]+;` - hex digits past 9 survive it.
        text = text.replace(/&#[0-9]+;/g, '').replace(/&#x[0-9]+;/g, '');
    }

    if (style.isNotification) text = applyChatMarkupToElements(text, style.textColor);

    text = applyChatColourToChat(text, style.textColor);

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

    return { markup, alpha: isItalic ? 0.6 : 1 };
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
    /** `getPointerLeftMargin(28)` / `getPointerRightMargin(15)` - the pointer's x is clamped to `[left, width - right]`. */
    pointerMarginLeft: number;
    pointerMarginRight: number;
    face: { x: number; y: number; width: number; height: number; cropTop: number } | undefined;
    /** The style's emblem - its multi-line variant once the text wraps - drawn over the background. */
    emblem: { texture: Texture; x: number; y: number } | undefined;
}

export interface ChatBubbleLayoutInput {
    style: IChatStyle;
    textWidth: number;
    textHeight: number;
    /** `TextField.numLines`: more than one picks the style's multi-line emblem. */
    lineCount: number;
    /** The wrap width the room's bubble-width setting maps to. */
    maxWidth: number;
    minHeight?: number;
    pointerHeight: number;
    faceWidth?: number;
    faceHeight?: number;
}

/** The size arithmetic of `PooledChatBubble.recreate` - pure, so a bubble can lay itself out in a memo. */
export const computeChatBubbleLayout = ({ style, textWidth, textHeight, lineCount, maxWidth, minHeight = -1, pointerHeight, faceWidth, faceHeight }: ChatBubbleLayoutInput): ChatBubbleLayout => {
    const margins = style.textFieldMargins;
    const base = style.getBackgroundTexture();

    let width = Math.min(maxWidth, (textWidth + margins.x) + margins.width);
    let height = (textHeight + margins.y) + margins.height;

    if (!style.isSystemStyle) height = Math.min(CHAT_BUBBLE_MAX_TEXT_HEIGHT, height);

    if (minHeight !== -1) height = Math.max(minHeight, height);

    width = Math.max(width, base.width);
    height = Math.max(height, base.height);

    if (style.usePixelPerfectNineSlice) {
        // `ManualNineSliceSprite.width/height`: whole pixels, never narrower than the fixed borders.
        const borders = style.nineSliceBorders;

        width = Math.max(borders.leftWidth + borders.rightWidth, Math.round(width));
        height = Math.max(borders.topHeight + borders.bottomHeight, Math.round(height));
    }

    // Everything but the face, which a notification style re-centres on this extent afterwards.
    let bubbleWidth = width;
    let bubbleHeight = height;

    const multiline = (lineCount > 1);
    const emblemTexture = style.getEmblem(multiline);
    const emblemOffset = style.getEmblemOffset(multiline);
    const emblem = (emblemTexture && emblemOffset) ? { texture: emblemTexture, x: emblemOffset.x, y: emblemOffset.y } : undefined;

    if (emblem) {
        bubbleWidth = Math.max(bubbleWidth, emblem.x + emblem.texture.width);
        bubbleHeight = Math.max(bubbleHeight, emblem.y + emblem.texture.height);
    }

    let pointerY: number | undefined;

    if (!style.isAnonymous && style.pointerTexture) {
        pointerY = height - style.pointerOffsetY;
        bubbleHeight = Math.max(bubbleHeight, pointerY + pointerHeight);
    }

    const textX = margins.x;
    const textY = margins.y;

    bubbleHeight = Math.max(bubbleHeight, textY + textHeight + margins.height);

    let face: ChatBubbleLayout['face'];

    if (style.faceOffset && faceWidth && faceHeight) {
        // Flash kept the bottom `height` rows of an over-tall head.
        const cropTop = (faceHeight > height) ? (faceHeight - height) : 0;
        const shownHeight = faceHeight - cropTop;
        let x = style.faceOffset.x - (faceWidth / 2);
        let y = Math.max(1, style.faceOffset.y - (shownHeight / 2));

        if (style.isNotification) {
            // Centred on the whole sprite as it stands, face included; half a pixel left; and
            // lifted by half the pointer when there is one (`bot_rentable`).
            const spriteHeight = Math.max(bubbleHeight, y + shownHeight);

            y = Math.max(1, (spriteHeight / 2) - (shownHeight / 2));
            x -= 0.5;

            if (!style.isAnonymous) y -= (pointerHeight / 2) - 1;
        }

        face = { x, y, width: faceWidth, height: shownHeight, cropTop };
        bubbleWidth = Math.max(bubbleWidth, x + faceWidth);
        bubbleHeight = Math.max(bubbleHeight, y + shownHeight);
    }

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
        pointerMarginLeft: style.getPointerLeftMargin(CHAT_BUBBLE_POINTER_DEFAULT_MARGIN_LEFT),
        pointerMarginRight: style.getPointerRightMargin(CHAT_BUBBLE_POINTER_DEFAULT_MARGIN_RIGHT),
        face,
        emblem,
    };
};
