/**
 * What `WiredChatMessagePreview` draws: the bubble of `createChatMessagePreviewBitmap` and how it
 * fits the preview area (`MessageEditorPreviewPreset.setBitmap`).
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { chatBubbleWidthFromSetting } from '@nitrodevco/nitro-theme/chat';
import { useMemo } from 'react';

import { buildChatBubbleMarkup, computeChatBubbleLayout, scaleChatFontSize } from '#base/chat';
import { useUserStore } from '#base/context/user';
import { useChatBackgroundTexture, useChatBubbleText, useChatStyle } from '#base/hooks';
import { messageEditorPreviewFit } from '#base/wired';

/** The colour of a bubble no avatar's chest colour tints. */
const BUBBLE_COLOR = 0xffffff;

export interface WiredChatMessagePreviewSettings {
    text: string;
    styleId: number;
    /** 0 talk, 1 whisper, 2 shout - `previewChatType`. */
    chatType: RoomChatTypeEnum;
    /** The box's width param: -1 leaves it to the room setting. */
    bubbleWidth: number;
    /** The preview area's width and the height it keeps at least. */
    areaWidth: number;
    minHeight: number;
}

export const useWiredChatMessagePreview = ({ text, styleId, chatType, bubbleWidth, areaWidth, minHeight }: WiredChatMessagePreviewSettings) => {
    const style = useChatStyle(styleId);
    const roomBubbleWidth = useUserStore(x => x.chatBubbleWidth);
    const maxWidth = chatBubbleWidthFromSetting((bubbleWidth === -1) ? roomBubbleWidth : bubbleWidth);
    const content = useMemo(() => (style ? buildChatBubbleMarkup(text, '', chatType, style, [], true) : undefined), [ style, text, chatType ]);
    const margins = style?.textFieldMargins;
    const wrapWidth = margins ? ((maxWidth - margins.x) - margins.width) : maxWidth;
    const render = useChatBubbleText(content?.markup ?? '', style?.fontFace ?? 'Ubuntu', scaleChatFontSize(style?.fontSize, 1), style?.textColor ?? 0, wrapWidth, content?.tableTabs);
    const faceTexture = style?.iconTexture;
    const background = useChatBackgroundTexture(style, BUBBLE_COLOR);

    const bubble = useMemo(() => (style
        ? computeChatBubbleLayout({
                style,
                textWidth: render?.textWidth ?? 0,
                textHeight: render?.textHeight ?? 0,
                lineCount: render?.lineCount ?? 1,
                maxWidth,
                pointerHeight: style.pointerTexture?.height ?? 0,
                faceWidth: faceTexture?.width,
                faceHeight: faceTexture?.height,
                fontSizeScale: 1,
                displayFontSizeScale: 1,
            })
        : undefined), [ style, render, maxWidth, faceTexture ]);

    const fit = bubble ? messageEditorPreviewFit(bubble.bubbleWidth, bubble.bubbleHeight, areaWidth, minHeight) : { scale: 1, areaHeight: minHeight, bottomPadding: 0 };

    return { style, content, render, faceTexture, background, bubble, fit };
};

export type WiredChatMessagePreviewState = ReturnType<typeof useWiredChatMessagePreview>;
