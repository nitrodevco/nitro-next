/**
 * One chat bubble - the visual half of the Flash `PooledChatBubble`, composed from hooks: the
 * style's bitmaps (`useChatStyle`), the speaker's head or the pet's face, the rasterised
 * text (`useChatBubbleText`) and the size arithmetic (`computeChatBubbleLayout`). The children
 * stack as Flash added them: background, emblem, pointer, face, text. The chat font size setting
 * (`HabboFreeFlowChat.chatFontSizeScale`) scales the text size and the height cap the way
 * `recreate` applied it - once, when the bubble is built, so a bubble already on screen keeps its
 * size when the setting changes; only `displayedHeight`, which reads the scale each time, follows
 * the new one. Once laid out it registers a `ChatBubbleMotion` with the flow provider, which then
 * drives the container's position and pointer by ref every frame - the one part of a bubble that
 * can't be declarative.
 *
 * A click on a link's glyphs is the text field's `TextEvent.LINK` (`onTextLinkEvent`), which Flash
 * raises for an `event:` link only: `highlight/<key>` points the hint arrow at the element registered
 * under `<KEY>`, flying in from where the click was; any other is an in-client link. The click selects
 * the speaker as well, as Flash's bubble takes it too. A link to a web address, which Flash's text
 * field opens in the browser, is not followed.
 */
import { Container as PixiContainer, FederatedPointerEvent, Rectangle, Sprite } from 'pixi.js';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { ChatBubbleData, ChatBubbleMotion } from '#base/chat';
import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useHintActions } from '#base/context/hints';
import { useRoomChatActions } from '#base/context/room';
import { useChatBubbleVisual, useChatFlow } from '#base/hooks';
import { ChatBubbleBody } from '#base/views/room-widgets/chat/ChatBubbleBody';

/** A `TextField` raises `TextEvent.LINK` only for an `event:` link, with the text after it. */
const EVENT_LINK_PREFIX = 'event:';
const HIGHLIGHT_LINK = 'highlight/';

interface ChatBubbleProps {
    data: ChatBubbleData;
}

export const ChatBubble = ({ data }: ChatBubbleProps) => {
    const { host, addBubble, removeBubble, maxBubbleWidth: maxWidth, selectBubbleUser } = useChatFlow();
    const { removeChatBubble } = useRoomChatActions();
    const { hideHint, showHint } = useHintActions();
    const { send } = useWebSocketContext();
    const { style, layout, backgroundTexture, shownFaceTexture, render, content } = useChatBubbleVisual(data, maxWidth);

    const hitArea = useMemo(() => (layout ? new Rectangle(0, 0, layout.width, layout.height) : null), [ layout ]);

    const containerRef = useRef<PixiContainer | null>(null);
    const pointerRef = useRef<Sprite | null>(null);

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

    /** `onTextLinkEvent`. */
    const followLink = (event: FederatedPointerEvent) => {
        const container = containerRef.current;

        if (!render || !container) return;

        const point = event.getLocalPosition(container);
        const href = render.linkAt(point.x - layout.textX, point.y - layout.textY);

        if (!href?.startsWith(EVENT_LINK_PREFIX)) return;

        const link = href.substring(EVENT_LINK_PREFIX.length);
        const highlight = link.indexOf(HIGHLIGHT_LINK);

        if (highlight > -1) {
            hideHint();
            showHint(link.substring(highlight + HIGHLIGHT_LINK.length).toLocaleUpperCase(), { x: event.global.x, y: event.global.y, width: 0, height: 0 });
        } else {
            openClientLink(send, link);
        }
    };

    const onPointerTap = (event: FederatedPointerEvent) => {
        followLink(event);

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
            <ChatBubbleBody
                style={style}
                layout={layout}
                backgroundTexture={backgroundTexture}
                shownFaceTexture={shownFaceTexture}
                render={render}
                textAlpha={content?.alpha}
                pointerRef={pointerRef}
            />
        </pixiContainer>
    );
};
