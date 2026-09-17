import { IVector3D, RoomChatModeType, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { GetRenderer, GetTicker } from '@nitrodevco/nitro-renderer';
import { Point, PointData, Ticker } from 'pixi.js';
import { ReactNode, useEffect, useMemo, useRef } from 'react';

import { ChatBubbleMotion, chatBubbleWidthFromSetting, ChatFlowStage, IChatFlowHost, IChatFlowSettings } from '#base/chat';
import { useRoom, useRoomChatActions } from '#base/context/room';
import { useUserStore } from '#base/context/user';
import { ChatFlowContext, ChatFlowContextValue, useRoomObjectSelect } from '#base/hooks';

/** `ChatFlowViewer._Str_22565` / `_chatAreaVsScreenSize` - new bubbles appear a quarter of the way down the screen. */
const DEFAULT_CHAT_AREA_HEIGHT = 230;
const CHAT_AREA_VS_SCREEN_SIZE = 0.25;

interface ChatFlowProviderProps {
    children?: ReactNode;
}

/**
 * The Flash `HabboFreeFlowChat` + `ChatFlowViewer` as a provider: owns the FreeFlow simulation
 * (`ChatFlowStage`) for the current room, advances it and every registered bubble's motion
 * from the shared ticker, keeps the flow glued to the room horizontally as the canvas pans,
 * and projects room locations to the screen for the bubbles. Bubbles register themselves once
 * laid out (`useChatFlow().addBubble`) and are dropped from the store when the simulation is
 * done with them.
 */
export const ChatFlowProvider = ({ children }: ChatFlowProviderProps) => {
    const room = useRoom();
    const chatMode = useUserStore(x => x.chatMode);
    const chatBubbleWidth = useUserStore(x => x.chatBubbleWidth);
    const chatScrollSpeed = useUserStore(x => x.chatScrollSpeed);
    const { removeChatBubble } = useRoomChatActions();
    const { selectObject } = useRoomObjectSelect();
    const selectObjectRef = useRef(selectObject);
    const settings = useMemo<IChatFlowSettings>(() => ({ mode: chatMode, bubbleWidth: chatBubbleWidth, scrollSpeed: chatScrollSpeed }), [ chatMode, chatBubbleWidth, chatScrollSpeed ]);
    const settingsRef = useRef(settings);
    const stageRef = useRef<ChatFlowStage | null>(null);
    const bubblesRef = useRef<Set<ChatBubbleMotion>>(new Set());
    const lastCanvasOffsetXRef = useRef(0);
    const lastAddedRoomIdRef = useRef(-1);

    const host = useMemo<IChatFlowHost>(() => ({
        get chatSettings() {
            return settingsRef.current;
        },
        get isLineByLineMode() {
            return settingsRef.current.mode === RoomChatModeType.Old;
        },
        get chatAreaHeight() {
            const height = GetRenderer().screen.height;

            return (height > 0) ? (height * CHAT_AREA_VS_SCREEN_SIZE) : DEFAULT_CHAT_AREA_HEIGHT;
        },
        get stageWidth() {
            return GetRenderer().screen.width;
        },
        get stageHeight() {
            return GetRenderer().screen.height;
        },
        getCanvasOffset: (roomId: number): PointData | undefined => {
            if (!room || (room.roomId !== roomId)) return undefined;

            return room.getRoomInstanceRenderingCanvasOffset();
        },
        // `_Str_21534` - the same projection `Room.getRoomObjectScreenLocation` does, for a remembered location.
        getUserScreenLocation: (roomId: number, location: IVector3D | undefined): Point => {
            const canvas = room?.canvas;

            if (!room || !canvas) return new Point(0, 0);

            let x = ((canvas.width >> 1) * canvas.scale);
            let y = ((canvas.height >> 1) * canvas.scale);

            if (location) {
                const screenPoint = canvas.geometry.getScreenPoint(location);
                const offset = room.getRoomInstanceRenderingCanvasOffset();

                x += (screenPoint.x * canvas.scale) + offset.x;
                y += (screenPoint.y * canvas.scale) + offset.y;
            }

            return new Point(x, y);
        },
        onBubbleRemoved: bubble => removeChatBubble(bubble.id),
    }), [ room, removeChatBubble ]);

    useEffect(() => {
        selectObjectRef.current = selectObject;
    });

    useEffect(() => {
        settingsRef.current = settings;
        stageRef.current?.updateSettings();
    }, [ settings ]);

    useEffect(() => {
        const stage = new ChatFlowStage(host);
        const bubbles = bubblesRef.current;

        stageRef.current = stage;

        const tick = (ticker: Ticker) => {
            const elapsedMs = ticker.deltaMS;

            stage.update(elapsedMs);

            // `ChatFlowViewer.update`: when the room canvas pans, every bubble's pan offset follows.
            const offset = host.getCanvasOffset(lastAddedRoomIdRef.current);

            if (offset) {
                if ((offset.x !== lastCanvasOffsetXRef.current) && bubbles.size) {
                    for (const bubble of bubbles) bubble.roomPanOffsetX = offset.x;
                }

                lastCanvasOffsetXRef.current = offset.x;
            }

            for (const bubble of bubbles) bubble.update(elapsedMs);
        };

        const onResize = () => stage.resize();

        GetTicker().add(tick);
        GetRenderer().on('resize', onResize);

        return () => {
            GetTicker().remove(tick);
            GetRenderer().off('resize', onResize);

            stage.dispose();

            if (stageRef.current === stage) stageRef.current = null;

            bubbles.clear();
        };
    }, [ host ]);

    const value = useMemo<ChatFlowContextValue>(() => ({
        host,
        maxBubbleWidth: chatBubbleWidthFromSetting(chatBubbleWidth),
        selectBubbleUser: (objectId: number) => selectObjectRef.current(objectId, RoomObjectCategoryEnum.Unit),
        addBubble: (bubble: ChatBubbleMotion) => {
            const stage = stageRef.current;

            if (!stage || bubblesRef.current.has(bubble)) return;

            const position = stage.addBubble(bubble);

            bubblesRef.current.add(bubble);
            bubble.roomPanOffsetX = lastCanvasOffsetXRef.current;
            bubble.setPosition(position.x, position.y);
            bubble.updatePointerPosition();

            lastAddedRoomIdRef.current = bubble.roomId;
        },
        removeBubble: (bubble: ChatBubbleMotion) => {
            bubblesRef.current.delete(bubble);
            stageRef.current?.removeBubble(bubble);
        },
    }), [ host, chatBubbleWidth ]);

    return (
        <ChatFlowContext value={value}>
            {children}
        </ChatFlowContext>
    );
};
