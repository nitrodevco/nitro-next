import { AvatarGenderType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, FederatedPointerEvent, Graphics, Rectangle, Sprite, Texture } from 'pixi.js';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { buildChatBubbleMarkup, ChatBubbleData, ChatBubbleMotion, computeChatBubbleLayout, resolveChatBubbleText } from '#base/chat';
import { useRoom, useRoomChatActions, useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useChatAvatarHead, useChatBubbleText, useChatFlow, useChatPetFace, useChatStyle } from '#base/hooks';

interface ChatBubbleViewProps {
    data: ChatBubbleData;
}

const EMPTY_LINKS: never[] = [];

/**
 * One chat bubble - the visual half of the Flash `PooledChatBubble`, composed from hooks: the
 * style's bitmaps (`useChatStyle`), the speaker's head or the pet's face, the truffle-rasterised
 * text (`useChatBubbleText`) and the size arithmetic (`computeChatBubbleLayout`). Once laid out
 * it registers a `ChatBubbleMotion` with the flow provider, which then drives the container's
 * position and pointer by ref every frame - the one part of a bubble that can't be declarative.
 */
export const ChatBubbleView = ({ data }: ChatBubbleViewProps) => {
    const { host, addBubble, removeBubble, maxBubbleWidth: maxWidth, selectBubbleUser } = useChatFlow();
    const { removeChatBubble } = useRoomChatActions();
    const t = useTranslation();
    const room = useRoom();
    const style = useChatStyle(data.styleId);
    const userData = useRoomStore(x => x.usersByRoomObjectId[data.objectId]);

    const isPet = (userData?.userType === RoomObjectUserType.Pet);
    const userName = data.forcedUserName ?? userData?.name ?? '';
    const figure = data.forcedFigure ?? (isPet ? undefined : userData?.figure);
    const petPosture = isPet ? (room?.getRoomObject(data.objectId, RoomObjectCategoryEnum.Unit)?.model.getValue<string>(RoomObjectVariableEnum.FigurePosture) ?? undefined) : undefined;

    const head = useChatAvatarHead(figure, userData?.gender ?? AvatarGenderType.Male);
    const pet = useChatPetFace(isPet ? userData?.figure : undefined, petPosture);
    const faceTexture = style?.iconTexture ?? (isPet ? pet.texture : head.texture);
    const color = data.forcedColor ?? (isPet ? pet.color : head.chestColor) ?? 0xffffff;

    const text = useMemo(() => resolveChatBubbleText(data, userName, t), [ data, userName, t ]);
    const content = useMemo(() => (style ? buildChatBubbleMarkup(text, userName, data.chatType, style, data.links ?? EMPTY_LINKS) : undefined), [ style, text, userName, data.chatType, data.links ]);

    const margins = style?.textFieldMargins;
    const wrapWidth = margins ? ((maxWidth - margins.x) - margins.width) : maxWidth;
    const render = useChatBubbleText(content?.markup ?? '', style?.fontFace ?? 'Ubuntu', style?.fontSize ?? 12, content?.textColor ?? style?.textColor ?? 0, wrapWidth);

    const layout = useMemo(() => (style
        ? computeChatBubbleLayout({
                style,
                textWidth: render?.textWidth ?? 0,
                textHeight: render?.textHeight ?? 0,
                maxWidth,
                pointerHeight: style.pointerTexture?.height ?? 0,
                faceWidth: faceTexture?.width,
                faceHeight: faceTexture?.height,
            })
        : undefined), [ style, render, maxWidth, faceTexture ]);

    const backgroundTexture = useMemo(() => style?.getBackgroundTexture(color), [ style, color ]);

    // Flash kept the bottom rows of an over-tall head: a sub-frame of the head texture, owned here.
    const shownFaceTexture = useMemo(() => {
        if (!faceTexture || !layout?.face) return undefined;

        if (layout.face.cropTop <= 0) return faceTexture;

        return new Texture({
            source: faceTexture.source,
            frame: new Rectangle(faceTexture.frame.x, faceTexture.frame.y + layout.face.cropTop, faceTexture.width, layout.face.height),
        });
    }, [ faceTexture, layout ]);

    useEffect(() => () => {
        if (shownFaceTexture && (shownFaceTexture !== faceTexture)) shownFaceTexture.destroy(false);
    }, [ shownFaceTexture, faceTexture ]);

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
