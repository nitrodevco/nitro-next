import { StateCreator } from 'zustand';

import type { ChatBubbleData } from '#base/chat';

export type RoomChatInputMode = 'whisper' | 'shout';

/** The Flash `RoomWidgetUpdateChatInputContentEvent`: something (the avatar menu's "whisper") wants text put into the chat input. */
export interface RoomChatInputContent {
    mode: RoomChatInputMode;
    userName: string;
    /** Changes on every request so the same user can be whispered twice in a row. */
    stamp: number;
}

type State = {
    /** The bubbles currently in the flow - `RoomChatBubbles` renders one `ChatBubbleView` per entry. */
    chatBubbles: ChatBubbleData[];
    /** Seconds the server told us to stop talking for (flood control), with when it said so. */
    floodBlockSeconds: number;
    floodBlockStamp: number;
    chatInputContent: RoomChatInputContent | undefined;
};

type Actions = {
    addChatBubble: (bubble: ChatBubbleData) => void;
    removeChatBubble: (id: number) => void;
    clearChatBubbles: () => void;
    setFloodBlock: (seconds: number) => void;
    setChatInputContent: (mode: RoomChatInputMode, userName: string) => void;
    clearChatInputContent: () => void;
};

export const RoomChatSliceInitialState: State = {
    chatBubbles: [],
    floodBlockSeconds: 0,
    floodBlockStamp: 0,
    chatInputContent: undefined,
};

export type RoomChatSlice = State & Actions;

export const createRoomChatSlice: StateCreator<RoomChatSlice, [], [], RoomChatSlice> = set => ({
    ...RoomChatSliceInitialState,
    addChatBubble: (bubble: ChatBubbleData) => set(x => ({ chatBubbles: [ ...x.chatBubbles, bubble ] })),
    removeChatBubble: (id: number) => set(x => (x.chatBubbles.some(bubble => bubble.id === id) ? { chatBubbles: x.chatBubbles.filter(bubble => bubble.id !== id) } : {})),
    clearChatBubbles: () => set({ chatBubbles: [] }),
    setFloodBlock: (seconds: number) => set({ floodBlockSeconds: seconds, floodBlockStamp: Date.now() }),
    setChatInputContent: (mode: RoomChatInputMode, userName: string) => set({ chatInputContent: { mode, userName, stamp: Date.now() } }),
    clearChatInputContent: () => set({ chatInputContent: undefined }),
});
