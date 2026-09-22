/**
 * `CollectiblesController.createChatItemPreview` (and `§_-Sg§.createChatItemPreview` for the
 * `product_image` widget): a `PooledChatBubble` of the chat style, recreated for a chat item with
 * no text, headed with a name (the user's own, or an easter egg's), and drawn into a bitmap -
 * which the previewer then centres, unstretched, in its `product_preview` bitmap.
 *
 * Built from the same pieces the room's bubbles are (`useChatStyle`, `buildChatBubbleMarkup`,
 * `useChatBubbleText`, `computeChatBubbleLayout`), drawn once with no motion. The item has no
 * face (`face = null`), so only a style's own icon is shown; its pointer sits at the left margin,
 * where `recreate` clamps it for a bubble that follows no user on the screen.
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { useMemo } from 'react';

import { buildChatBubbleMarkup, CHAT_BUBBLE_WIDTH_NORMAL, computeChatBubbleLayout, scaleChatFontSize } from '#base/chat';
import { useChatBubbleText, useChatStyle } from '#base/hooks';
import { Box, BoxLayout } from '#base/theme';

/** The background colour of a bubble no avatar's chest colour tints. */
const BUBBLE_COLOR = 0xffffff;
/** `PooledChatBubble`'s pointer margins when the style names none. */
const POINTER_MARGIN_LEFT = 28;

export interface CollectiblesChatBubblePreviewProps {
    styleId: number;
    userName: string;
    /** The previewer's `product_preview` box; the bubble is centred in it. */
    layout: BoxLayout & { width: number; height: number };
}

export const CollectiblesChatBubblePreview = ({ styleId, userName, layout }: CollectiblesChatBubblePreviewProps) => {
    const style = useChatStyle(styleId);
    const content = useMemo(() => (style ? buildChatBubbleMarkup('', userName, RoomChatTypeEnum.Speak, style, []) : undefined), [ style, userName ]);
    const margins = style?.textFieldMargins;
    const wrapWidth = margins ? ((CHAT_BUBBLE_WIDTH_NORMAL - margins.x) - margins.width) : CHAT_BUBBLE_WIDTH_NORMAL;
    const render = useChatBubbleText(content?.markup ?? '', style?.fontFace ?? 'Ubuntu', scaleChatFontSize(style?.fontSize, 1), style?.textColor ?? 0, wrapWidth);
    const faceTexture = style?.iconTexture;

    const bubble = useMemo(() => (style
        ? computeChatBubbleLayout({
                style,
                textWidth: render?.textWidth ?? 0,
                textHeight: render?.textHeight ?? 0,
                lineCount: render?.lineCount ?? 1,
                maxWidth: CHAT_BUBBLE_WIDTH_NORMAL,
                pointerHeight: style.pointerTexture?.height ?? 0,
                faceWidth: faceTexture?.width,
                faceHeight: faceTexture?.height,
                fontSizeScale: 1,
                displayFontSizeScale: 1,
            })
        : undefined), [ style, render, faceTexture ]);

    const background = useMemo(() => style?.getBackgroundTexture(BUBBLE_COLOR), [ style ]);

    if (!style || !bubble || !background) return null;

    // The bitmap is centred in the box at its own size (`pivot_point` center, unstretched).
    const x = Math.trunc((layout.width - bubble.bubbleWidth) / 2);
    const y = Math.trunc((layout.height - bubble.bubbleHeight) / 2);

    return (
        <Box layout={{ position: 'absolute', ...layout }}>
            <pixiContainer
                x={x}
                y={y}
                eventMode="none"
            >
                <pixiNineSliceSprite
                    texture={background}
                    leftWidth={style.nineSliceBorders.leftWidth}
                    topHeight={style.nineSliceBorders.topHeight}
                    rightWidth={style.nineSliceBorders.rightWidth}
                    bottomHeight={style.nineSliceBorders.bottomHeight}
                    width={bubble.width}
                    height={bubble.height}
                    roundPixels
                />
                {bubble.emblem && (
                    <pixiSprite
                        texture={bubble.emblem.texture}
                        x={bubble.emblem.x}
                        y={bubble.emblem.y}
                        roundPixels
                    />
                )}
                {(bubble.pointerY !== undefined) && style.pointerTexture && (
                    <pixiSprite
                        texture={style.pointerTexture}
                        x={style.getPointerLeftMargin(POINTER_MARGIN_LEFT)}
                        y={bubble.pointerY}
                        roundPixels
                    />
                )}
                {bubble.face && faceTexture && (
                    <pixiSprite
                        texture={faceTexture}
                        x={bubble.face.x}
                        y={bubble.face.y}
                        roundPixels
                    />
                )}
                {render && (
                    <pixiSprite
                        texture={render.texture}
                        x={bubble.textX}
                        y={bubble.textY}
                        alpha={content?.alpha ?? 1}
                        roundPixels
                    />
                )}
            </pixiContainer>
        </Box>
    );
};
