import { Container as PixiContainer, FederatedPointerEvent, Graphics, Rectangle, Sprite } from 'pixi.js';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { ChatBubbleData, ChatBubbleMotion } from '#base/chat';
import { useRoomChatActions } from '#base/context/room';
import { useChatBubbleVisual, useChatFlow } from '#base/hooks';

interface ChatBubbleViewProps {
    data: ChatBubbleData;
}

/**
 * One chat bubble - the visual half of the Flash `PooledChatBubble`, composed from hooks: the
 * style's bitmaps (`useChatStyle`), the speaker's head or the pet's face, the rasterised
 * text (`useChatBubbleText`) and the size arithmetic (`computeChatBubbleLayout`). The children
 * stack as Flash added them: background, emblem, pointer, face, text. The chat font size setting
 * (`HabboFreeFlowChat.chatFontSizeScale`) scales the text size and the height cap the way
 * `recreate` applied it - once, when the bubble is built, so a bubble already on screen keeps its
 * size when the setting changes; only `displayedHeight`, which reads the scale each time, follows
 * the new one. Once laid out
 * it registers a `ChatBubbleMotion` with the flow provider, which then drives the container's
 * position and pointer by ref every frame - the one part of a bubble that can't be declarative.
 */
export const ChatBubbleView = ({ data }: ChatBubbleViewProps) => {
    const { host, addBubble, removeBubble, maxBubbleWidth: maxWidth, selectBubbleUser } = useChatFlow();
    const { removeChatBubble } = useRoomChatActions();
    const { style, layout, backgroundTexture, shownFaceTexture, render, content } = useChatBubbleVisual(data, maxWidth);

    const hitArea = useMemo(() => (layout ? new Rectangle(0, 0, layout.width, layout.height) : null), [ layout ]);

    const containerRef = useRef<PixiContainer | null>(null);
    const pointerRef = useRef<Sprite | null>(null);
    const [ clipMask, setClipMask ] = useState<Graphics | null>(null);

    const motion = useMemo(() => new ChatBubbleMotion({
        data,
        host,
        container: containerRef,
        pointer: pointerRef,
        onRecycle: () => removeChatBubble(data.id),
    }), [ data, host, removeChatBubble ]);

    // Metrics first (the flow reads them the moment the bubble joins), then registration.
    useLayoutEffect(() => {
        if (!style || !layout) return;

        motion.setMetrics({ layout, overlap: style.overlap, pointerOffsetY: style.pointerOffsetY, useDesktopMargins: host.isLineByLineMode });
        motion.syncContainer();
    }, [ motion, style, layout, host ]);

    // No style to draw it with (no chat style bundle served): it would never join the flow, so nothing
    // would ever recycle it - every such message stayed mounted until the room was left.
    useEffect(() => {
        if (!style) removeChatBubble(data.id);
    }, [ style, data.id, removeChatBubble ]);

    useEffect(() => {
        if (!style || !layout) return;

        addBubble(motion);

        return () => removeBubble(motion);
        // Registration happens once per motion - a later layout change only updates the metrics above.
    }, [ motion, addBubble, removeBubble ]);

    if (!style || !layout || !backgroundTexture) return null;

    const onPointerTap = (event: FederatedPointerEvent) => {
        if (style.isAnonymous || motion.readyToRecycle) return;

        selectBubbleUser(data.objectId);
        event.stopPropagation();
    };

    return (
        <pixiContainer
            ref={containerRef}
            label={`chat-bubble-${data.id}`}
            visible={false}
            eventMode="static"
            cursor="pointer"
            hitArea={hitArea}
            onPointerTap={onPointerTap}
        >
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
            {(layout.pointerY !== undefined) && style.pointerTexture && (
                // Positioned by the motion handle (`updatePointerPosition`), never through props.
                <pixiSprite
                    ref={pointerRef}
                    texture={style.pointerTexture}
                    roundPixels
                    eventMode="none"
                />
            )}
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
                    alpha={content?.alpha ?? 1}
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
        </pixiContainer>
    );
};
