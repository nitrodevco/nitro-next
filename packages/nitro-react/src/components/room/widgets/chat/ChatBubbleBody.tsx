import { Graphics, Sprite, Texture } from 'pixi.js';
import { Ref, useState } from 'react';

import { useChatBubbleVisual } from '#base/hooks';

type ChatBubbleVisual = ReturnType<typeof useChatBubbleVisual>;

interface ChatBubbleBodyProps {
    style: NonNullable<ChatBubbleVisual['style']>;
    layout: NonNullable<ChatBubbleVisual['layout']>;
    backgroundTexture: Texture;
    shownFaceTexture: ChatBubbleVisual['shownFaceTexture'];
    render: ChatBubbleVisual['render'];
    /** The text's alpha - a live bubble's markup can fade it; the history draws it opaque. */
    textAlpha?: number;
    /**
     * A live bubble's pointer moves every frame (`ChatBubbleMotion.updatePointerPosition`), so it
     * is placed by this ref; without one the pointer sits where the layout puts it.
     */
    pointerRef?: Ref<Sprite | null>;
}

/**
 * What a chat bubble draws, in the order `PooledChatBubble` added it: background, emblem,
 * pointer, face, text. Shared by the live bubble (`ChatBubbleView`) and the chat history's
 * copy of it (`ChatHistoryEntryView`, Flash's `ChatBubbleFactory.getHistoryLineEntry`), which
 * each wrap it in their own container.
 */
export const ChatBubbleBody = ({ style, layout, backgroundTexture, shownFaceTexture, render, textAlpha = 1, pointerRef }: ChatBubbleBodyProps) => {
    const [ clipMask, setClipMask ] = useState<Graphics | null>(null);

    return (
        <>
            <pixiNineSliceSprite
                texture={backgroundTexture}
                leftWidth={style.nineSliceBorders.leftWidth}
                topHeight={style.nineSliceBorders.topHeight}
                rightWidth={style.nineSliceBorders.rightWidth}
                bottomHeight={style.nineSliceBorders.bottomHeight}
                width={layout.width}
                height={layout.height}
                roundPixels
                eventMode="none"
            />
            {layout.emblem && (
                <pixiSprite
                    texture={layout.emblem.texture}
                    x={layout.emblem.x}
                    y={layout.emblem.y}
                    roundPixels
                    eventMode="none"
                />
            )}
            {(layout.pointerY !== undefined) && style.pointerTexture && (pointerRef
                ? (
                        <pixiSprite
                            ref={pointerRef}
                            texture={style.pointerTexture}
                            roundPixels
                            eventMode="none"
                        />
                    )
                : (
                        // `ChatBubble`: the pointer's x is `max(getPointerLeftMargin(28), min(15, ...))`, so always the left margin.
                        <pixiSprite
                            texture={style.pointerTexture}
                            x={layout.pointerMarginLeft}
                            y={layout.pointerY}
                            roundPixels
                            eventMode="none"
                        />
                    ))}
            {layout.face && shownFaceTexture && (
                <pixiSprite
                    texture={shownFaceTexture}
                    x={layout.face.x}
                    y={layout.face.y}
                    roundPixels
                    eventMode="none"
                />
            )}
            {render && (
                <pixiSprite
                    texture={render.texture}
                    x={layout.textX}
                    y={layout.textY}
                    alpha={textAlpha}
                    mask={layout.clip ? clipMask : null}
                    roundPixels
                    eventMode="none"
                />
            )}
            {layout.clip && (
                <pixiGraphics
                    ref={setClipMask}
                    x={layout.textX}
                    y={layout.textY}
                    eventMode="none"
                    draw={(graphics: Graphics) => {
                        graphics.clear();
                        graphics.rect(0, 0, layout.clip?.width ?? 0, layout.clip?.height ?? 0).fill(0xffffff);
                    }}
                />
            )}
        </>
    );
};
