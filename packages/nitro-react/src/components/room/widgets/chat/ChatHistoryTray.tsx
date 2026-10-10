import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { GetRenderer, GetTicker } from '@nitrodevco/nitro-renderer';
import { FederatedPointerEvent, FederatedWheelEvent, Graphics, Rectangle, Ticker } from 'pixi.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ignoreUser } from '#base/commands';
import { ChatHistoryEntry, useChatHistoryActions, useChatHistoryStore } from '#base/context/chat-history';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { easeOutCubic, useRoomObjectSelect, useTween } from '#base/hooks';

import { useChatHistoryTexture } from './chatHistoryAssets';
import { CHAT_HISTORY_LEFT_MARGIN, ChatHistoryEntryMeasure, ChatHistoryEntryView } from './ChatHistoryEntryView';

/** `ChatHistoryTray._openedWidth`: `350 + 62 + 1`. */
const OPENED_WIDTH = 413;
/** `ChatHistoryTray.ANIMATION_DURATION_MS`. */
const ANIMATION_DURATION_MS = 140;
/** `TRAY_TOOLBAR_BOTTOM_MARGIN` / `TRAY_HANDLE_OFFSET_FROM_BOTTOM`. */
const TOOLBAR_BOTTOM_MARGIN = 50;
const HANDLE_OFFSET_FROM_BOTTOM = 215;
/** `moveIgnore`: the ignore icon goes this far right of its line. */
const IGNORE_ICON_GAP = 5;
/** `ENTRY_DEFAULT_BOTTOM_PADDING`: the latest line rests this far above the view's bottom. */
const DEFAULT_BOTTOM_PADDING = 300;
/** `ChatHistoryScrollView.MOST_RECENT_HISTORY_BOTTOM_PADDING_THRESHOLD`. */
const MOST_RECENT_PADDING_THRESHOLD = 100;
/** `SPRINGBACK_DURATION_MS` / `AUTO_SCROLL_TO_LATEST_DURATION_MS`; the wheel's own run is shorter than either. */
const SPRINGBACK_DURATION_MS = 180;
const AUTO_SCROLL_DURATION_MS = 140;
const WHEEL_DURATION_MS = 120;
/** How far one notch of the wheel moves the history. */
const WHEEL_STEP = 60;
/** `getSpringbackTargetTopY`: at most this much of the history may leave the view at either end. */
const OVERSCROLL = 200;
/** A drag shorter than this is a tap on a line, not a scroll. */
const TAP_SLOP = 3;
/** `ChatHistoryEntry` stacking: `height - overlap.y - 8`. */
const ENTRY_GAP = 8;
/** `tray_bg`: `new BitmapData(1, 1, true, 0xa224231e)`. */
const BACKGROUND_COLOR = 0x24231e;
const BACKGROUND_ALPHA = 0xa2 / 255;

interface Anim {
    from: number;
    to: number;
    duration: number;
    elapsed: number;
    /** A springback follows a run that ends out of bounds. */
    springback: boolean;
}

/** The renderer's screen, which `ChatHistoryTray.resize` reads off the stage. */
const useScreenSize = () => {
    const [ size, setSize ] = useState(() => ({ width: GetRenderer().screen.width, height: GetRenderer().screen.height }));

    useEffect(() => {
        const onResize = () => setSize({ width: GetRenderer().screen.width, height: GetRenderer().screen.height });

        GetRenderer().on('resize', onResize);

        return () => {
            GetRenderer().off('resize', onResize);
        };
    }, []);

    return size;
};

/**
 * The chat history tray - Flash's `freeflowchat/history/visualization/ChatHistoryTray` around its
 * `ChatHistoryScrollView` and `ChatHistoryScrollBar`: a dark panel that slides in from the left edge
 * (413 wide, 140 ms), its `tray_bar` and a handle on the right to close it, and in it every line of the
 * `ChatHistoryBuffer` - a bubble with its timestamp, or the room it moved to. The lines stack
 * `height - overlap.y - 8` apart, newest at the bottom, with the view scrolled so the latest rests 300
 * above the bottom (`scrollToBottom`); the wheel, a drag or the scroll bar's thumb scroll it, a
 * history pulled past either end springs back (`startSpringbackIfNeeded`), and a new line scrolls
 * to the latest while the view is at the most recent chats. A tap on a line selects its speaker
 * and puts the `close_x` ignore icon beside it (`moveIgnore`), when its speaker can be ignored and
 * is not yet; a tap on the icon asks to ignore them (`hitIgnore`).
 *
 * Not carried: the room engine's `mouseEventsDisabledLeftToX` - the panel and its handle take the
 * pointer themselves.
 */
export const ChatHistoryTray = () => {
    const room = useRoom();
    const entries = useChatHistoryStore(x => x.entries);
    const open = useChatHistoryStore(x => x.open);
    const { setOpen, toggleOpen } = useChatHistoryActions();
    const screen = useScreenSize();
    const { selectObject } = useRoomObjectSelect();
    const selectObjectRef = useRef(selectObject);
    const trayWidth = Math.round(useTween(open ? OPENED_WIDTH : 0, ANIMATION_DURATION_MS, easeOutCubic));
    // `activateView` / `deactivateView`: the lines exist only while the tray shows.
    const active = open || (trayWidth > 0);
    const viewHeight = screen.height - TOOLBAR_BOTTOM_MARGIN;

    const [ measures, setMeasures ] = useState<ReadonlyMap<number, ChatHistoryEntryMeasure>>(new Map());
    const pendingMeasures = useRef(new Map<number, ChatHistoryEntryMeasure>());
    const [ topY, setTopYState ] = useState(0);
    const topYRef = useRef(0);
    const anim = useRef<Anim | undefined>(undefined);
    // `_-31h`, `_-HU`, `_hasOpenedInRoom`, `_-41J`.
    const mostRecent = useRef(false);
    const bottomPadding = useRef(DEFAULT_BOTTOM_PADDING);
    const hasOpenedInRoom = useRef(false);
    const wasMostRecentOnClose = useRef(false);
    const scrollToBottomPending = useRef(false);
    const lastEntryCount = useRef(entries.length);
    const [ clipMask, setClipMask ] = useState<Graphics | null>(null);
    // `_-21L`: the line the ignore icon is beside.
    const [ ignoreEntryId, setIgnoreEntryId ] = useState<number | undefined>(undefined);
    const ignoredUserIds = useUserStore(x => x.ignoredUserIds);
    const showConfirm = useSystemStore(x => x.showConfirm);
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useEffect(() => {
        selectObjectRef.current = selectObject;
    });

    // The history is the room's: leaving takes the tray with it.
    useEffect(() => () => {
        setOpen(false);
    }, [ setOpen ]);

    const onMeasure = useCallback((id: number, measure: ChatHistoryEntryMeasure) => {
        const pending = pendingMeasures.current;
        const wasEmpty = pending.size === 0;

        pending.set(id, measure);

        if (!wasEmpty) return;

        // One state update for every line that measured itself in this pass.
        queueMicrotask(() => {
            const batch = pendingMeasures.current;

            pendingMeasures.current = new Map();
            setMeasures((previous) => {
                let changed = false;

                for (const [ key, value ] of batch) {
                    const known = previous.get(key);

                    if (!known || (known.height !== value.height) || (known.overlapY !== value.overlapY) || (known.width !== value.width)) changed = true;
                }

                if (!changed) return previous;

                const next = new Map(previous);

                for (const [ key, value ] of batch) next.set(key, value);

                return next;
            });
        });
    }, []);

    // `ChatHistoryScrollView.topY` / `bufferHeight`: where each line starts and how far the history runs.
    const { positions, bufferHeight } = useMemo(() => {
        const result = new Map<number, number>();
        let cursor = 0;

        for (const entry of entries) {
            const measure = measures.get(entry.id);

            if (!measure) continue;

            cursor -= measure.overlapY;
            result.set(entry.id, cursor);
            cursor += measure.height - ENTRY_GAP;
        }

        return { positions: result, bufferHeight: cursor };
    }, [ entries, measures ]);
    const bufferHeightRef = useRef(bufferHeight);
    const viewHeightRef = useRef(viewHeight);

    useEffect(() => {
        bufferHeightRef.current = bufferHeight;
        viewHeightRef.current = viewHeight;
    });

    const setTopY = useCallback((value: number) => {
        topYRef.current = value;
        setTopYState(value);
    }, []);

    /** `getSpringbackTargetTopY`. */
    const springbackTarget = () => {
        const buffer = bufferHeightRef.current;

        if (buffer <= 0) return undefined;

        const overscroll = Math.min(OVERSCROLL, buffer);
        const min = overscroll - viewHeightRef.current;
        const max = buffer - overscroll;

        if (topYRef.current < min) return min;

        if (topYRef.current > max) return max;

        return undefined;
    };

    /** `isViewingMostRecentChatsWithBuffer`. */
    const isViewingMostRecent = () => ((topYRef.current - bufferHeightRef.current + viewHeightRef.current) >= MOST_RECENT_PADDING_THRESHOLD);

    /** `startSpringbackIfNeeded`. */
    const startSpringback = () => {
        if (isViewingMostRecent()) {
            mostRecent.current = true;
            bottomPadding.current = topYRef.current - bufferHeightRef.current + viewHeightRef.current;
        } else mostRecent.current = false;

        anim.current = undefined;

        const target = springbackTarget();

        if (target !== undefined) anim.current = { from: topYRef.current, to: Math.round(target), duration: SPRINGBACK_DURATION_MS, elapsed: 0, springback: true };
    };

    /** `beginUserScrollInteraction`. */
    const beginUserScroll = () => {
        mostRecent.current = false;
        anim.current = undefined;
    };

    // `update`: the springback, auto scroll and wheel runs share the ticker while the tray shows.
    useEffect(() => {
        if (!active) return;

        const tick = (ticker: Ticker) => {
            const run = anim.current;

            if (!run) return;

            run.elapsed += ticker.deltaMS;

            const progress = Math.min(1, run.elapsed / run.duration);

            setTopY(Math.round(run.from + ((run.to - run.from) * easeOutCubic(progress))));

            if (progress < 1) return;

            setTopY(run.to);
            anim.current = undefined;

            // `onWheelScrollCompleted`.
            if (!run.springback) startSpringback();
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
        // `startSpringback` reads refs only.
    }, [ active, setTopY ]);

    // `startOpening` / `startClosing`.
    const wasOpen = useRef(false);

    useEffect(() => {
        if (open === wasOpen.current) return;

        wasOpen.current = open;

        if (open) {
            if (!hasOpenedInRoom.current || wasMostRecentOnClose.current) {
                scrollToBottomPending.current = true;
                mostRecent.current = true;
                bottomPadding.current = DEFAULT_BOTTOM_PADDING;
            }

            hasOpenedInRoom.current = true;
        } else {
            wasMostRecentOnClose.current = mostRecent.current || isViewingMostRecent();
            anim.current = undefined;
        }
    }, [ open ]);

    // `scrollToBottom`, once the lines have measured themselves; and the auto scroll a new line starts.
    useEffect(() => {
        if (!active) return;

        if (scrollToBottomPending.current) {
            scrollToBottomPending.current = false;
            anim.current = undefined;
            setTopY(bufferHeight - viewHeight + DEFAULT_BOTTOM_PADDING);
            lastEntryCount.current = entries.length;

            return;
        }

        if (entries.length !== lastEntryCount.current) {
            lastEntryCount.current = entries.length;

            if (mostRecent.current) {
                const target = bufferHeight - viewHeight + bottomPadding.current;

                if (target !== topYRef.current) anim.current = { from: topYRef.current, to: target, duration: AUTO_SCROLL_DURATION_MS, elapsed: 0, springback: true };
            }
        } else if (mostRecent.current && !anim.current) {
            // A line that measured itself after it came in keeps the view on the latest.
            setTopY(bufferHeight - viewHeight + bottomPadding.current);
        }
    }, [ active, bufferHeight, viewHeight, entries.length, setTopY ]);

    // The wheel.
    const onWheel = (event: FederatedWheelEvent) => {
        event.stopPropagation();
        beginUserScroll();

        const from = topYRef.current;
        const to = from + (Math.sign(event.deltaY) * WHEEL_STEP);

        anim.current = { from, to, duration: WHEEL_DURATION_MS, elapsed: 0, springback: false };
    };

    // `mouseDragEventHandler`: pull the history with the pointer, then let it spring back.
    const dragged = useRef(false);

    const beginDrag = (startClientY: number) => {
        beginUserScroll();
        dragged.current = false;

        const startTop = topYRef.current;
        const onMove = (event: PointerEvent) => {
            const delta = event.clientY - startClientY;

            if (Math.abs(delta) > TAP_SLOP) dragged.current = true;

            setTopY(startTop - delta);
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            startSpringback();
            // The tap that ends a drag arrives right after; let it see the flag first.
            setTimeout(() => {
                dragged.current = false;
            }, 0);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const onSurfacePointerDown = (event: FederatedPointerEvent) => beginDrag(event.clientY);

    /** `ChatHistoryScrollBar.mouseDownEventHandler`. */
    const onThumbPointerDown = (event: FederatedPointerEvent) => {
        event.stopPropagation();
        beginUserScroll();

        const startClientY = event.clientY;
        const startTop = topYRef.current;
        const onMove = (move: PointerEvent) => {
            const ratio = bufferHeightRef.current / Math.max(1, viewHeightRef.current);

            setTopY(startTop + ((move.clientY - startClientY) * ratio));
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            startSpringback();
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const onEntryTap = useCallback((entry: ChatHistoryEntry) => {
        if (dragged.current || (entry.kind !== 'chat')) return;

        // `moveIgnore`: beside a line whose speaker can be ignored and is not yet, else nowhere.
        setIgnoreEntryId((entry.ignore && !ignoredUserIds.includes(entry.ignore.webId)) ? entry.id : undefined);

        // `selectAvatar(roomId, userIndex)`: only a speaker of the room that is up can be selected.
        if (entry.data.roomId === room?.roomId) selectObjectRef.current(entry.data.objectId, RoomObjectCategoryEnum.Unit);
    }, [ room, ignoredUserIds ]);

    const closeIcon = useChatHistoryTexture('close_x');
    // `deactivateView` takes the icon down with the lines.
    const ignoreEntry = active ? entries.find(entry => entry.id === ignoreEntryId) : undefined;
    const ignoreTarget = (ignoreEntry?.kind === 'chat') ? ignoreEntry.ignore : undefined;
    const ignoreMeasure = ignoreEntry && measures.get(ignoreEntry.id);
    const ignoreY = ignoreEntry && positions.get(ignoreEntry.id);

    /** `hitIgnore`: confirms with a modal, and ignores the speaker on OK; the icon goes either way. */
    const onIgnoreTap = (event: FederatedPointerEvent) => {
        event.stopPropagation();

        if (!ignoreTarget) return;

        const done = () => setIgnoreEntryId(undefined);

        showConfirm(t('chat.ignore_user.confirm.title'), t('chat.ignore_user.confirm.info', '', { username: ignoreTarget.userName }), () => {
            ignoreUser(send, ignoreTarget.webId);
            done();
        }, { modal: true, onCancel: done });
    };

    // `ChatHistoryScrollBar.updateThumbTrack`.
    const barTexture = useChatHistoryTexture('scrollbar_back');
    const thumbTexture = useChatHistoryTexture('scrollbar_thumb');
    const trackHeight = viewHeight;
    const thumbHeight = (bufferHeight <= 0)
        ? Math.max(5, trackHeight - 4)
        : Math.min(trackHeight - 4, Math.max(5, Math.trunc((trackHeight - 4) * (trackHeight / bufferHeight))));
    const thumbY = (bufferHeight <= 0)
        ? 2
        : Math.min(trackHeight - 2 - thumbHeight, Math.max(2, Math.trunc(((trackHeight - 4) * (Math.max(1, topY + (viewHeight - trackHeight)) / bufferHeight)) - (thumbHeight / 2))));

    const trayBar = useChatHistoryTexture('tray_bar');
    const handle = useChatHistoryTexture('tray_handle_close');

    const hitArea = useMemo(() => new Rectangle(0, 0, trayWidth, viewHeight), [ trayWidth, viewHeight ]);

    if (trayWidth <= 0 && !open) return null;

    const barWidth = trayBar?.width ?? 33;
    const scrollBarWidth = barTexture?.width ?? 9;

    return (
        <pixiContainer
            label="chat-history"
            eventMode="passive"
            layout={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}
        >
            <pixiGraphics
                eventMode="static"
                hitArea={hitArea}
                onWheel={onWheel}
                onPointerDown={onSurfacePointerDown}
                draw={(graphics: Graphics) => {
                    graphics.clear();
                    graphics.rect(0, 0, trayWidth, viewHeight).fill({ color: BACKGROUND_COLOR, alpha: BACKGROUND_ALPHA });
                }}
            />
            {active && (
                <pixiContainer
                    eventMode="passive"
                    mask={clipMask}
                >
                    <pixiContainer
                        y={-topY}
                        eventMode="passive"
                    >
                        {entries.map(entry => (
                            <ChatHistoryEntryView
                                key={entry.id}
                                entry={entry}
                                y={positions.get(entry.id) ?? 0}
                                onMeasure={onMeasure}
                                onTap={onEntryTap}
                            />
                        ))}
                        {closeIcon && ignoreTarget && ignoreMeasure?.width !== undefined && (ignoreY !== undefined) && (
                            <pixiSprite
                                texture={closeIcon}
                                x={CHAT_HISTORY_LEFT_MARGIN + ignoreMeasure.width + IGNORE_ICON_GAP}
                                y={Math.round(ignoreY + ((ignoreMeasure.height - closeIcon.height) / 2))}
                                eventMode="static"
                                cursor="pointer"
                                onPointerDown={(event: FederatedPointerEvent) => event.stopPropagation()}
                                onPointerTap={onIgnoreTap}
                            />
                        )}
                    </pixiContainer>
                </pixiContainer>
            )}
            <pixiGraphics
                ref={setClipMask}
                eventMode="none"
                draw={(graphics: Graphics) => {
                    graphics.clear();
                    graphics.rect(0, 0, Math.max(1, trayWidth), viewHeight).fill(0xffffff);
                }}
            />
            {trayWidth > 0 && trayBar && (
                <pixiSprite
                    texture={trayBar}
                    x={trayWidth}
                    width={barWidth}
                    height={viewHeight}
                    eventMode="none"
                />
            )}
            {trayWidth > 0 && barTexture && thumbTexture && (
                <pixiContainer
                    x={Math.max(0, trayWidth - scrollBarWidth)}
                    eventMode="static"
                >
                    <pixiNineSliceSprite
                        texture={barTexture}
                        leftWidth={2}
                        topHeight={2}
                        rightWidth={barTexture.width - 7}
                        bottomHeight={barTexture.height - 7}
                        width={scrollBarWidth}
                        height={trackHeight}
                        eventMode="none"
                    />
                    <pixiNineSliceSprite
                        texture={thumbTexture}
                        x={2}
                        y={thumbY}
                        leftWidth={2}
                        topHeight={2}
                        rightWidth={thumbTexture.width - 3}
                        bottomHeight={thumbTexture.height - 3}
                        width={thumbTexture.width}
                        height={thumbHeight}
                        eventMode="static"
                        cursor="pointer"
                        onPointerDown={onThumbPointerDown}
                    />
                </pixiContainer>
            )}
            {trayWidth > 0 && handle && (
                <pixiSprite
                    texture={handle}
                    x={trayWidth + barWidth}
                    y={screen.height - HANDLE_OFFSET_FROM_BOTTOM}
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={toggleOpen}
                />
            )}
        </pixiContainer>
    );
};
