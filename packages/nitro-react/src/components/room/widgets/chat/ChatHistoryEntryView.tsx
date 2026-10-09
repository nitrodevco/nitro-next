import { Graphics, Rectangle } from 'pixi.js';
import { memo, useLayoutEffect, useState } from 'react';

import { CHAT_BUBBLE_WIDTH_NORMAL } from '#base/chat';
import { ChatHistoryEntry } from '#base/context/chat-history';
import { useChatBubbleText, useChatBubbleVisual } from '#base/hooks';

import { useChatHistoryTexture } from './chatHistoryAssets';

/** `_SafeStr_174.LEFT_MARGIN` / `TIMESTAMP_FIXED_WIDTH`: an entry sits 3 in, its bubble 62 right of that. */
export const CHAT_HISTORY_LEFT_MARGIN = 3;
export const CHAT_HISTORY_TIMESTAMP_WIDTH = 62;
/** `ChatHistoryRoomChangeEntry.TOP_MARGIN_HEIGHT`. */
const ROOM_CHANGE_TOP_MARGIN = 4;
/** `TEXT_FORMAT_TIMESTAMP` (Ubuntu 12, italic, 0xa0a0a0) and `TEXT_FORMAT` (Ubuntu 12, 0xff0000). */
const TIMESTAMP_COLOR = 0xa0a0a0;
const ROOM_NAME_COLOR = 0xff0000;
const FONT_SIZE = 12;
const WIDE = 1000;

export interface ChatHistoryEntryMeasure {
    /** The entry's bitmap height. */
    height: number;
    /** `IChatHistoryEntryBitmap.overlap.y`. */
    overlapY: number;
    /** A chat line's bitmap width (`62 + bubble.width`), which its ignore icon goes 5 right of. */
    width?: number;
}

interface ChatHistoryEntryViewProps {
    entry: ChatHistoryEntry;
    /** Where the entry's bitmap starts, from the history's top. */
    y: number;
    onMeasure: (id: number, measure: ChatHistoryEntryMeasure) => void;
    onTap: (entry: ChatHistoryEntry) => void;
}

/** `getTimeStampNow` as the bitmap draws it: italic grey. */
const useTimestamp = (time: string) => useChatBubbleText(`<i>${time}</i>`, 'Ubuntu', FONT_SIZE, TIMESTAMP_COLOR, WIDE);

const ChatLineEntry = ({ entry, y, onMeasure, onTap }: ChatHistoryEntryViewProps & { entry: Extract<ChatHistoryEntry, { kind: 'chat' }> }) => {
    const { style, layout, backgroundTexture, shownFaceTexture, render } = useChatBubbleVisual(entry.data, CHAT_BUBBLE_WIDTH_NORMAL);
    const timestamp = useTimestamp(entry.time);
    const [ clipMask, setClipMask ] = useState<Graphics | null>(null);

    // `new BitmapData(62 + bubble.width, bubble.height)`, stacked by `height - overlap.y - 8`.
    useLayoutEffect(() => {
        if (style && layout) onMeasure(entry.id, { height: Math.round(layout.bubbleHeight), overlapY: style.overlap.y, width: CHAT_HISTORY_TIMESTAMP_WIDTH + Math.round(layout.bubbleWidth) });
    }, [ entry.id, style, layout, onMeasure ]);

    if (!style || !layout || !backgroundTexture) return null;

    // `Math.max(3, 3 + overlap.top)`: the stamp is drawn 3 down, or at the bubble's own top.
    const stampY = Math.max(3, 3 + style.overlap.y);

    return (
        <pixiContainer
            x={CHAT_HISTORY_LEFT_MARGIN}
            y={y}
            eventMode="static"
            cursor="pointer"
            hitArea={new Rectangle(0, 0, CHAT_HISTORY_TIMESTAMP_WIDTH + layout.bubbleWidth, layout.bubbleHeight)}
            onPointerTap={() => onTap(entry)}
        >
            {timestamp && (
                <pixiSprite
                    texture={timestamp.texture}
                    y={stampY}
                    roundPixels
                    eventMode="none"
                />
            )}
            <pixiContainer
                x={CHAT_HISTORY_TIMESTAMP_WIDTH}
                eventMode="none"
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
                    // `ChatBubble`: the pointer's x is `max(getPointerLeftMargin(28), min(15, ...))`, so always the left margin.
                    <pixiSprite
                        texture={style.pointerTexture}
                        x={layout.pointerMarginLeft}
                        y={layout.pointerY}
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
        </pixiContainer>
    );
};

const RoomChangeEntry = ({ entry, y, onMeasure }: ChatHistoryEntryViewProps & { entry: Extract<ChatHistoryEntry, { kind: 'roomChange' }> }) => {
    const timestamp = useTimestamp(entry.time);
    const name = useChatBubbleText(entry.roomName, 'Ubuntu', FONT_SIZE, ROOM_NAME_COLOR, WIDE);
    const icon = useChatHistoryTexture('room_change');

    // `new BitmapData(415, textHeight + 5 + 8 + 4)`; no overlap.
    useLayoutEffect(() => {
        if (name) onMeasure(entry.id, { height: name.textHeight + 5 + 8 + ROOM_CHANGE_TOP_MARGIN, overlapY: 0 });
    }, [ entry.id, name, onMeasure ]);

    if (!name) return null;

    return (
        <pixiContainer
            x={CHAT_HISTORY_LEFT_MARGIN}
            y={y}
            eventMode="none"
        >
            {timestamp && (
                <pixiSprite
                    texture={timestamp.texture}
                    y={ROOM_CHANGE_TOP_MARGIN}
                    roundPixels
                    eventMode="none"
                />
            )}
            {icon && (
                <pixiSprite
                    texture={icon}
                    x={CHAT_HISTORY_TIMESTAMP_WIDTH}
                    y={1 + ROOM_CHANGE_TOP_MARGIN}
                    roundPixels
                    eventMode="none"
                />
            )}
            <pixiSprite
                texture={name.texture}
                x={CHAT_HISTORY_TIMESTAMP_WIDTH + 20}
                y={ROOM_CHANGE_TOP_MARGIN}
                roundPixels
                eventMode="none"
            />
        </pixiContainer>
    );
};

/** One line of the chat history: a bubble with its timestamp, or the room it moved to. */
export const ChatHistoryEntryView = memo((props: ChatHistoryEntryViewProps) => (
    (props.entry.kind === 'chat')
        ? (
                <ChatLineEntry
                    {...props}
                    entry={props.entry}
                />
            )
        : (
                <RoomChangeEntry
                    {...props}
                    entry={props.entry}
                />
            )
));
