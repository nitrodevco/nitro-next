/**
 * The help store - what Flash's `HabboHelp` keeps for the call-for-help flow:
 *
 * - `chatItems` (`ChatRegistry`): every chat line of another user heard in a room, fed by
 *   `ChatEventHandler.onRoomChat`. `addChatItem` purges (`purgeRegistry`) unless `holdPurges` is on:
 *   lines older than 16 x 65.5 s go (`int(age / 65500) <= 15` stay), and past 120 lines only the
 *   last 100 stay. `selected` is the line's checkbox in the report flow.
 * - `users` (`UserRegistry`): the users seen in rooms (`HabboHelp.onUsers`), newest last, at most
 *   80 (`purgeUserIndex` drops the oldest); each with the room it was seen in. A user seen before
 *   the room's name is known gets it when `registerRoom` brings one (`addRoomNameForMissing`).
 * - `imItems` (`InstantMessageRegistry`): each conversation's messages from the other side
 *   (`InstantMessageEventHandler`: new messages, the history's, room invites), by conversation, the
 *   conversation last written to last. Every third message purges (`purgeRegistry`, unless held):
 *   the same 16 x 65.5 s age, and past 20 messages a conversation keeps its last 15.
 * - `callForHelpCategories` (`onCfhTopics`): the report reasons and their topics.
 * - `reportedUserId` / `reportedRoomId` / `reportedRoomName` / `reportedUserName` and, for a photo,
 *   `reportedRoomObjectId` / `reportedExtraDataId` (`CallForHelpManager`'s): who, where and what is
 *   being reported.
 */
import type { ICallForHelpCategory } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** `ChatRegistry.MAX_ITEMS_TO_STORE` / `ITEMS_TO_PURGE`. */
const MAX_CHAT_ITEMS = 120;
const CHAT_ITEMS_TO_PURGE = 20;
/** `purgeRegistry`: a line stays while `int(age / 65500) <= 15`. */
const CHAT_AGE_UNIT_MS = 65500;
const CHAT_MAX_AGE_UNITS = 15;
/** `UserRegistry.MAX_USERS_TO_STORE`. */
const MAX_USERS = 80;
/** `InstantMessageRegistry.MAX_MESSAGES_TO_STORE` / `ITEMS_TO_PURGE`, and the adds between two purges. */
const MAX_IM_ITEMS = 20;
const IM_ITEMS_TO_PURGE = 5;
const IM_PURGE_EVERY = 3;

/** `ChatRegistryItem`. */
export interface HelpChatItem {
    index: number;
    roomId: number;
    roomName: string;
    userId: number;
    userName: string;
    text: string;
    selected: boolean;
    chatTime: number;
}

/** `InstantMessageRegistryItem`: `userId` is the conversation's id (negative for a group chat). */
export interface HelpImItem {
    index: number;
    userId: number;
    userName: string;
    text: string;
    selected: boolean;
    chatTime: number;
}

/** `UserRegistryItem`. */
export interface HelpUserItem {
    userId: number;
    userName: string;
    figure: string;
    roomId: number;
    roomName: string;
}

type State = {
    chatItems: HelpChatItem[];
    /** `_-s13`: the next line's index. */
    nextChatIndex: number;
    holdPurges: boolean;
    users: HelpUserItem[];
    /** `UserRegistry.roomId` / `roomName`: the room the next users are seen in. */
    userRoomId: number;
    userRoomName: string;
    /** `_-22V`: users registered while the room had no name yet. */
    usersMissingRoomName: number[];
    /** Conversation id against its messages; the conversation last written to is last. */
    imItems: [ number, HelpImItem[] ][];
    /** `MAX_MESSAGES_TO_STORE` (an instance counter in the AS3): the next message's index. */
    nextImIndex: number;
    /** `_-M2k`: messages added, for the purge every third. */
    imAddCount: number;
    imHoldPurges: boolean;
    callForHelpCategories: ICallForHelpCategory[];
    reportedUserId: number;
    reportedRoomId: number;
    reportedRoomName: string;
    reportedUserName: string;
    reportedRoomObjectId: number;
    reportedExtraDataId: string;
    /** `CallForHelpManager.reportedGroupId` / `reportedThreadId` / `reportedMessageId`: the forum post being reported. */
    reportedGroupId: number;
    reportedThreadId: number;
    reportedMessageId: number;
};

type Actions = {
    /** `ChatRegistry.addItem`. */
    addChatItem: (roomId: number, roomName: string, userId: number, userName: string, text: string) => void;
    setChatItemSelected: (index: number, selected: boolean) => void;
    setHoldPurges: (holdPurges: boolean) => void;
    /** `TopicsFlowHelpController.deselectChatEntries`: both registries' ticks. */
    deselectChatItems: () => void;
    /** `InstantMessageRegistry.addItem`. */
    addImItem: (chatId: number, userName: string, text: string) => void;
    setImItemSelected: (chatId: number, index: number, selected: boolean) => void;
    setImHoldPurges: (imHoldPurges: boolean) => void;
    /** `UserRegistry.registerRoom`. */
    registerRoom: (roomId: number, roomName: string) => void;
    /** `UserRegistry.registerUser`. */
    registerUser: (userId: number, userName: string, figure: string) => void;
    setCallForHelpCategories: (categories: ICallForHelpCategory[]) => void;
    setReportedUserId: (reportedUserId: number) => void;
    setReportedRoomId: (reportedRoomId: number) => void;
    setReportedRoomName: (reportedRoomName: string) => void;
    /** `HabboHelp.startPhotoReportingInNewCfhFlow`'s fields. */
    setReportedPhoto: (reportedUserName: string, reportedRoomObjectId: number, reportedExtraDataId: string) => void;
    /** `HabboHelp.reportThread` / `reportMessage`'s fields. */
    setReportedForumPost: (reportedGroupId: number, reportedThreadId: number, reportedMessageId: number) => void;
};

export type HelpStore = State & Actions;

const INITIAL: State = {
    chatItems: [],
    nextChatIndex: 0,
    holdPurges: false,
    users: [],
    userRoomId: 0,
    userRoomName: '',
    usersMissingRoomName: [],
    imItems: [],
    nextImIndex: 0,
    imAddCount: 0,
    imHoldPurges: false,
    callForHelpCategories: [],
    reportedUserId: -1,
    reportedRoomId: -1,
    reportedRoomName: '',
    reportedUserName: '',
    reportedRoomObjectId: -1,
    reportedExtraDataId: '',
    reportedGroupId: -1,
    reportedThreadId: -1,
    reportedMessageId: -1,
};

/** `ChatRegistry.purgeRegistry`. */
const purgeChatItems = (items: HelpChatItem[], now: number): HelpChatItem[] => {
    const kept = items.filter(item => Math.trunc((now - item.chatTime) / CHAT_AGE_UNIT_MS) <= CHAT_MAX_AGE_UNITS);

    return (kept.length > MAX_CHAT_ITEMS) ? kept.slice(kept.length - (MAX_CHAT_ITEMS - CHAT_ITEMS_TO_PURGE)) : kept;
};

/** `InstantMessageRegistry.purgeRegistry`: each conversation keeps its recent messages, at most the last 15 past 20. */
const purgeImItems = (conversations: [ number, HelpImItem[] ][], now: number): [ number, HelpImItem[] ][] => conversations.map(([ chatId, items ]) => {
    const kept = items.filter(item => Math.trunc((now - item.chatTime) / CHAT_AGE_UNIT_MS) <= CHAT_MAX_AGE_UNITS);

    return [ chatId, (kept.length > MAX_IM_ITEMS) ? kept.slice(kept.length - (MAX_IM_ITEMS - IM_ITEMS_TO_PURGE)) : kept ];
});

export const createHelpStore = () => createStore<HelpStore>()(set => ({
    ...INITIAL,
    addChatItem: (roomId, roomName, userId, userName, text) => set((x) => {
        const now = Date.now();
        const chatItems = [ ...x.chatItems, { index: x.nextChatIndex, roomId, roomName, userId, userName, text, selected: false, chatTime: now } ];

        return { chatItems: x.holdPurges ? chatItems : purgeChatItems(chatItems, now), nextChatIndex: x.nextChatIndex + 1 };
    }),
    setChatItemSelected: (index, selected) => set(x => ({ chatItems: x.chatItems.map(item => ((item.index === index) ? { ...item, selected } : item)) })),
    setHoldPurges: holdPurges => set({ holdPurges }),
    deselectChatItems: () => set(x => ({
        chatItems: x.chatItems.map(item => (item.selected ? { ...item, selected: false } : item)),
        imItems: x.imItems.map(([ chatId, items ]) => [ chatId, items.map(item => (item.selected ? { ...item, selected: false } : item)) ]),
    })),
    addImItem: (chatId, userName, text) => set((x) => {
        const now = Date.now();
        const item: HelpImItem = { index: x.nextImIndex, userId: chatId, userName, text, selected: false, chatTime: now };
        const existing = x.imItems.find(([ id ]) => id === chatId)?.[1] ?? [];
        // The conversation written to moves to the end (`remove` then `add`).
        const imItems: [ number, HelpImItem[] ][] = [ ...x.imItems.filter(([ id ]) => id !== chatId), [ chatId, [ ...existing, item ] ] ];
        const imAddCount = x.imAddCount + 1;

        return {
            imItems: ((imAddCount % IM_PURGE_EVERY) === 0 && !x.imHoldPurges) ? purgeImItems(imItems, now) : imItems,
            nextImIndex: x.nextImIndex + 1,
            imAddCount,
        };
    }),
    setImItemSelected: (chatId, index, selected) => set(x => ({ imItems: x.imItems.map(([ id, items ]) => [ id, (id === chatId) ? items.map(item => ((item.index === index) ? { ...item, selected } : item)) : items ]) })),
    setImHoldPurges: imHoldPurges => set({ imHoldPurges }),
    registerRoom: (roomId, roomName) => set((x) => {
        if (roomName === '') return { userRoomId: roomId, userRoomName: roomName };

        const missing = new Set(x.usersMissingRoomName);
        const users = x.users.map(user => ((missing.has(user.userId) && (user.roomId === roomId)) ? { ...user, roomName } : user));

        return { userRoomId: roomId, userRoomName: roomName, users, usersMissingRoomName: [] };
    }),
    registerUser: (userId, userName, figure) => set((x) => {
        const users = [ ...x.users.filter(user => user.userId !== userId), { userId, userName, figure, roomId: x.userRoomId, roomName: x.userRoomName } ];

        return {
            users: users.slice(Math.max(0, users.length - MAX_USERS)),
            usersMissingRoomName: (x.userRoomName === '') ? [ ...x.usersMissingRoomName, userId ] : x.usersMissingRoomName,
        };
    }),
    setCallForHelpCategories: callForHelpCategories => set({ callForHelpCategories }),
    setReportedUserId: reportedUserId => set({ reportedUserId }),
    setReportedRoomId: reportedRoomId => set({ reportedRoomId }),
    setReportedRoomName: reportedRoomName => set({ reportedRoomName }),
    setReportedPhoto: (reportedUserName, reportedRoomObjectId, reportedExtraDataId) => set({ reportedUserName, reportedRoomObjectId, reportedExtraDataId }),
    setReportedForumPost: (reportedGroupId, reportedThreadId, reportedMessageId) => set({ reportedGroupId, reportedThreadId, reportedMessageId }),
}));

export const helpStore = createHelpStore();
