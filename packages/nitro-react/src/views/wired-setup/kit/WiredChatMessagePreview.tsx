/**
 * `HabboFreeFlowChat.createChatMessagePreviewBitmap` (WIN63-202610121624), drawn where
 * `MessageEditorPreviewPreset.setBitmap` puts it: a `PooledChatBubble` of the chat style for a
 * chat item that follows no avatar, centred in the preview area and scaled down (never up) to fit
 * its width, the area growing for a taller bubble.
 *
 * The item is made for user id -1, and `ChatItem` hides the name of any item whose user id is
 * below 0, so the preview never shows a name, whatever the box passes as its preview username.
 * Built from the same pieces as the room's bubbles (`buildChatBubbleMarkup`, `useChatBubbleText`,
 * `computeChatBubbleLayout`), with no face (the style's own icon only) and a white bubble.
 */
import { Box } from '#base/theme';

import { WiredChatMessagePreviewState } from './useWiredChatMessagePreview';

/** `PooledChatBubble`'s pointer margin when the style names none. */
const POINTER_MARGIN_LEFT = 28;

/** The bubble itself, centred in an area `areaWidth` x `fit.areaHeight`. */
export const WiredChatMessagePreview = ({ preview, areaWidth }: { preview: WiredChatMessagePreviewState; areaWidth: number }) => {
    const { style, content, render, faceTexture, background, bubble, fit } = preview;

    if (!style || !bubble || !background) return null;

    const width = Math.max(1, Math.trunc(bubble.bubbleWidth * fit.scale));
    const height = Math.max(1, Math.trunc(bubble.bubbleHeight * fit.scale));

    // `positionBitmap`: centred, whole pixels.
    const x = Math.trunc((areaWidth - width) / 2);
    const y = Math.trunc((fit.areaHeight - height) / 2);

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: areaWidth, height: fit.areaHeight }}>
            <pixiContainer
                x={x}
                y={y}
                scale={fit.scale}
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
