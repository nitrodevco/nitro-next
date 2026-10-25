/**
 * The messenger's conversations - the state Flash's `com.sulake.habbo.messenger.MainView` keeps:
 * the open conversations in the order they were started (`avatar_list`), each conversation's
 * `ChatEntry` list (`_chatEntries`), the selected one, the own messages still awaiting the
 * server's confirmation, the message ids already shown, and when each conversation's history was
 * last asked for.
 *
 * It lives for the whole session, as `MainView` does from `MessengerInitMessage` on: a message
 * that arrives while the window is closed is kept and flags its conversation unread. The rules -
 * starting, recording, combining, confirming, closing - are `commands/user/messengerCommands.ts`, which
 * is `MainView`'s controller half; this store only holds what they decide.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

/** `ChatEntry` types: an own message, a friend's, a notification, an info line, a room invitation. */
export const MESSENGER_ENTRY_OWN = 1;
export const MESSENGER_ENTRY_OTHER = 2;
export const MESSENGER_ENTRY_NOTIFICATION = 3;
export const MESSENGER_ENTRY_INFO = 4;
export const MESSENGER_ENTRY_INVITATION = 5;

/** `MainView.NO_CONVERSATION`. */
export const MESSENGER_NO_CONVERSATION = -1;
/** `MainView.COMBINE_MESSAGING_THRESHOLD`: messages this close together share one bubble. */
export const MESSENGER_COMBINE_THRESHOLD_MS = 600000;
/** `MainView.requestHistory`: the same history request is not repeated within this time. */
export const MESSENGER_HISTORY_REFETCH_MS = 4000;
/** `MainView.conversationItemWidth`: the conversation list's items are the frame's width less this. */
export const MESSENGER_ITEM_WIDTH_INSET = 27;
/** `MainView.NOTIFICATION_ICON_WIDTH`: a notification's text sits right of its 55px icon. */
export const MESSENGER_NOTIFICATION_ICON_WIDTH = 55;

/**
 * `MainView.ERROR_MESSAGES`: the text an `InstantMessageErrorMessage` code is recorded with.
 * Checked against Flash by `scripts/drift/tables.py`.
 */
export const MESSENGER_ERROR_MESSAGES: Readonly<Record<number, string>> = {
    3: 'messenger.error.receivermuted',
    4: 'messenger.error.sendermuted',
    5: 'messenger.error.offline',
    6: 'messenger.error.notfriend',
    7: 'messenger.error.busy',
    8: 'messenger.error.receiverhasnochat',
    9: 'messenger.error.senderhasnochat',
    10: 'messenger.error.offline_failed',
    11: 'messenger.error.not_group_member',
    12: 'messenger.error.not_group_admin',
    13: 'messenger.error.sender_im_unavailable',
    14: 'messenger.error.recipient_im_unavailable',
};

/**
 * A bubble's content (the September client's `_SafeStr_25`): text, or a habbicon. A text is shown
 * as written unless `localized`, which marks the `${key}` texts `MainView` records itself
 * (notifications, info lines) - a friend's message is never looked up as a key.
 */
export interface MessengerMessage {
    text: string;
    habbiconId: number;
    localized?: boolean;
}

export interface MessengerChatEntry {
    type: number;
    chatId: number;
    message: MessengerMessage;
    /** `ChatEntry.sentTimeStamp()`, as a `performance.now()` time: when the message was sent. */
    sentAt: number;
    senderId: number;
    senderName: string;
    senderFigure: string;
    messageId: string;
    /** Above zero while an own message waits for the server's copy (`awaitConfirmationId`). */
    awaitConfirmationId: number;
}

/** One `avatar_list` entry: a conversation the user has had, shown while `visible`. */
export interface MessengerConversation {
    chatId: number;
    /** Flash's `HIDDEN` tag inverted: a closed conversation keeps its history and its place. */
    visible: boolean;
    /** `chat_indicator`: a message arrived that the user has not looked at. */
    unread: boolean;
    name: string;
    /** A friend's figure, or a group's badge code for a group chat (`chatId < 0`). */
    figure: string;
    gender: AvatarGenderType;
}

interface State {
    conversations: MessengerConversation[];
    entries: Record<number, MessengerChatEntry[]>;
    selectedChatId: number;
    /** `_SafeStr_8769`: the moderation notice is recorded once, into the first conversation. */
    moderationInfoShown: boolean;
    /** `_SafeStr_8770`: the confirmation id the next own message is sent with. */
    nextConfirmationId: number;
    /** `_SafeStr_8772`: message ids already recorded, so a history fetch does not repeat them. */
    seenMessageIds: Record<string, true>;
    /** `_historyFetchesTimestamps`. */
    historyFetches: Record<number, { messageId: string; time: number }>;
    /** `_SafeStr_8760`: how many visible avatars `avatars_scroll_left` has scrolled past. */
    avatarScrollOffset: number;
    /** `HabboMessenger.followingToGroupRoom`: a group chat's follow is waiting for the group's details, for its room. */
    followingToGroupRoom: boolean;
    /**
     * `HabboMessenger._SafeStr_8752` (`getUnseenMiniMailMessageCount`): mail waiting on the web
     * mini mail, counted only while `client.minimail.embed.enabled` is on.
     */
    miniMailUnreadCount: number;
}

interface Actions {
    setConversations: (conversations: MessengerConversation[]) => void;
    setEntries: (chatId: number, entries: MessengerChatEntry[]) => void;
    setSelectedChatId: (chatId: number) => void;
    setModerationInfoShown: () => void;
    takeConfirmationId: () => number;
    markMessageSeen: (messageId: string) => void;
    setHistoryFetch: (chatId: number, messageId: string, time: number) => void;
    setAvatarScrollOffset: (offset: number) => void;
    setFollowingToGroupRoom: (following: boolean) => void;
    /** `HabboMessenger.onMiniMailUnreadCount`. */
    setMiniMailUnreadCount: (count: number) => void;
    /** `HabboMessenger.onMiniMailMessage`: one more unread. */
    addMiniMailUnread: () => void;
    resetMessenger: () => void;
}

export type MessengerStore = State & Actions;

const initialState: State = {
    conversations: [],
    entries: {},
    selectedChatId: MESSENGER_NO_CONVERSATION,
    moderationInfoShown: false,
    nextConfirmationId: 1,
    seenMessageIds: {},
    historyFetches: {},
    avatarScrollOffset: 0,
    followingToGroupRoom: false,
    miniMailUnreadCount: 0,
};

export const createMessengerStore = () => createStore<MessengerStore>()((set, get) => ({
    ...initialState,
    setConversations: conversations => set({ conversations }),
    setEntries: (chatId, list) => set(state => ({ entries: { ...state.entries, [chatId]: list } })),
    setSelectedChatId: selectedChatId => set({ selectedChatId }),
    setModerationInfoShown: () => set({ moderationInfoShown: true }),
    takeConfirmationId: () => {
        const id = get().nextConfirmationId;

        set({ nextConfirmationId: id + 1 });

        return id;
    },
    markMessageSeen: messageId => set(state => ({ seenMessageIds: { ...state.seenMessageIds, [messageId]: true } })),
    setHistoryFetch: (chatId, messageId, time) => set(state => ({ historyFetches: { ...state.historyFetches, [chatId]: { messageId, time } } })),
    setAvatarScrollOffset: avatarScrollOffset => set({ avatarScrollOffset }),
    setFollowingToGroupRoom: followingToGroupRoom => set({ followingToGroupRoom }),
    setMiniMailUnreadCount: miniMailUnreadCount => set({ miniMailUnreadCount }),
    addMiniMailUnread: () => set(state => ({ miniMailUnreadCount: state.miniMailUnreadCount + 1 })),
    resetMessenger: () => set(initialState),
}));

export const messengerStore = createMessengerStore();
