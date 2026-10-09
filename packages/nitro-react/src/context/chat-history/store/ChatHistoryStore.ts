/**
 * The chat history - Flash's `freeflowchat/history/ChatHistoryBuffer`: every chat line and every
 * room change the client saw, oldest first, kept past the room (`HabboFreeFlowChat` outlives its
 * `roomLeft`). An app-wide singleton, as the chat arrives whether the tray is open or not.
 */
import { createStore } from 'zustand';

import type { ChatBubbleData } from '#base/chat';

/** `ChatHistoryBuffer.MAX_CHAT_ITEMS`. */
export const CHAT_HISTORY_MAX_ENTRIES = 1000;

interface ChatHistoryEntryBase {
    id: number;
    /** `HabboFreeFlowChat.getTimeStampNow`: `HH:MM:SS` when it came in. */
    time: string;
}

export interface ChatHistoryChatEntry extends ChatHistoryEntryBase {
    kind: 'chat';
    data: ChatBubbleData;
}

export interface ChatHistoryRoomChangeEntry extends ChatHistoryEntryBase {
    kind: 'roomChange';
    roomName: string;
}

export type ChatHistoryEntry = ChatHistoryChatEntry | ChatHistoryRoomChangeEntry;

interface ChatHistoryState {
    entries: ChatHistoryEntry[];
    /** The tray is open (or opening). */
    open: boolean;
    /** `_-Qp`: the room's data has been put in as a room change already. */
    roomChangeInserted: boolean;
}

interface ChatHistoryActions {
    insertChat: (data: ChatBubbleData) => void;
    /** `onGuestRoomData`: the first room data of a room entry is its change line. */
    insertRoomChange: (roomName: string) => void;
    /** `onRoomEnter`. */
    resetRoomChange: () => void;
    toggleOpen: () => void;
    setOpen: (open: boolean) => void;
    reset: () => void;
}

export type ChatHistoryStore = ChatHistoryState & ChatHistoryActions;

/** `HabboFreeFlowChat.getTimeStampNow`. */
export const getChatTimeStampNow = () => {
    const now = new Date();
    const pad = (value: number) => ((value < 10) ? `0${value}` : String(value));

    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

let nextEntryId = 1;

const initialState: ChatHistoryState = { entries: [], open: false, roomChangeInserted: false };

const push = (entries: ChatHistoryEntry[], entry: ChatHistoryEntry) => {
    const next = [ ...entries, entry ];

    // `checkBufferOverflowAndSpliceTop`.
    return (next.length > CHAT_HISTORY_MAX_ENTRIES) ? next.slice(next.length - CHAT_HISTORY_MAX_ENTRIES) : next;
};

export const createChatHistoryStore = () => createStore<ChatHistoryStore>()(set => ({
    ...initialState,
    insertChat: data => set(x => ({ entries: push(x.entries, { kind: 'chat', id: nextEntryId++, time: getChatTimeStampNow(), data }) })),
    insertRoomChange: roomName => set((x) => {
        if (x.roomChangeInserted) return x;

        return { roomChangeInserted: true, entries: push(x.entries, { kind: 'roomChange', id: nextEntryId++, time: getChatTimeStampNow(), roomName }) };
    }),
    resetRoomChange: () => set({ roomChangeInserted: false }),
    toggleOpen: () => set(x => ({ open: !x.open })),
    setOpen: open => set({ open }),
    reset: () => set(initialState),
}));

export const chatHistoryStore = createChatHistoryStore();
