/**
 * The messenger's controller - `com.sulake.habbo.messenger.MainView`'s methods, and the parts of
 * `HabboMessenger` that forward to it, over `messengerStore`: starting and closing conversations,
 * recording messages (a friend's, an own one awaiting the server's copy, notices), merging a
 * fetched history, and sending. The view reads the store; the packet listeners and the entry
 * points (the friend list's chat button, `messenger/` and `friendlist/openchat` links, the
 * friend bar's icon) call these.
 *
 * The sounds are `HabboMessenger`'s: `HBST_message_received` for a message or a room invite that
 * arrives while the window is closed (and for every mini mail), `HBST_message_sent` for the first
 * message sent into a conversation that holds nothing but notices.
 *
 * `reportUser` is `helpCommands.reportUserFromIM`. Not carried: `MainView`'s incremental rendering (`scrollBack` renders the
 * newest 21 entries and more as the list is scrolled up) - every entry is rendered, and a scroll
 * to the top asks for older history instead, the one effect of it the user sees.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { EventLogComposer, FollowFriendComposer, GetExtendedProfileComposer, GetHabboGroupDetailsComposer, GetMessengerHistoryComposer, IHistoricConsoleMessage, SendMsgComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import {
    MESSENGER_ENTRY_INFO, MESSENGER_ENTRY_INVITATION, MESSENGER_ENTRY_NOTIFICATION, MESSENGER_ENTRY_OTHER, MESSENGER_ENTRY_OWN, MESSENGER_ERROR_MESSAGES,
    MESSENGER_HISTORY_REFETCH_MS, MESSENGER_NO_CONVERSATION, MessengerChatEntry, MessengerConversation, MessengerMessage, messengerStore,
} from '#base/context/messenger';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';

type Send = WebSocketConnection['send'];

/** `MainView.scrollBack`: with fewer than this many entries rendered, older history is asked for. */
const HISTORY_REQUEST_BELOW = 40;

/** `IFriend` as `HabboMessenger.getFriend` answers it: the friend list's entry, or a `DummyFriend` built from a message. */
interface MessengerFriendInfo {
    id: number;
    name: string;
    figure: string;
    gender: AvatarGenderType;
    online: boolean;
    persistedMessageUser: boolean;
    pocketHabboUser: boolean;
}

const text = (value: string): MessengerMessage => ({ text: value, habbiconId: 0 });
const localizedText = (key: string): MessengerMessage => ({ text: key, habbiconId: 0, localized: true });

/** `MainView.createBubbleMessage`: a habbicon when the message carries one, else its text. */
export const messengerMessageOf = (message: string, habbiconId: number): MessengerMessage => ((habbiconId > 0) ? { text: '', habbiconId } : text(message));

/** `MainView.escapeExternalKeys`: a typed `${...}` is not looked up as a text key. */
const escapeExternalKeys = (value: string) => (value.startsWith('${') ? ` ${value}` : value);

/** `HabboMessenger.getFriend`. */
export const getMessengerFriend = (chatId: number, entry?: MessengerChatEntry | null): MessengerFriendInfo | null => {
    const friend = userStore.getState().friends[chatId];

    if (friend) {
        return { id: friend.playerId, name: friend.name, figure: friend.figure, gender: friend.gender, online: friend.isOnline, persistedMessageUser: friend.persistedUser, pocketHabboUser: friend.pocketHabboUser };
    }

    // `DummyFriend`: someone who messaged the user without being on the friend list (a group chat's member).
    if (entry) return { id: entry.senderId, name: entry.senderName, figure: entry.senderFigure, gender: AvatarGenderType.Male, online: true, persistedMessageUser: false, pocketHabboUser: false };

    return null;
};

export const isMessengerOpen = () => !!systemStore.getState().visibleWindows.messenger;

/** `HabboMessenger.playMessageReceivedSound`. */
export const playMessengerMessageReceivedSound = () => GetSoundManager().playSound(HabboSoundTypesEnum.SOUND_MESSAGE_RECEIVED);

/** `HabboMessenger.playSendSound`. */
const playMessengerSendSound = () => GetSoundManager().playSound(HabboSoundTypesEnum.SOUND_MESSAGE_SENT);

const visibleConversations = () => messengerStore.getState().conversations.filter(conversation => conversation.visible);

const updateConversation = (chatId: number, change: Partial<MessengerConversation>) => {
    const { conversations, setConversations } = messengerStore.getState();

    setConversations(conversations.map(conversation => ((conversation.chatId === chatId) ? { ...conversation, ...change } : conversation)));
};

/** `MainView.requestHistory`: older messages than the oldest recorded, not twice within four seconds. */
export const requestMessengerHistory = (send: Send, chatId: number) => {
    const { entries, historyFetches, setHistoryFetch } = messengerStore.getState();
    const list = entries[chatId];

    if (!list) return;

    const messageId = list[0]?.messageId ?? '';
    const now = performance.now();
    const last = historyFetches[chatId];

    if (last && (last.messageId === messageId) && ((last.time + MESSENGER_HISTORY_REFETCH_MS) > now)) return;

    setHistoryFetch(chatId, messageId, now);
    send(new GetMessengerHistoryComposer({ chatId, message: messageId }));
};

/** `MainView.selectConversation`: the conversation shown, its unread mark cleared, its history asked for. */
export const selectMessengerConversation = (send: Send, chatId: number) => {
    messengerStore.getState().setSelectedChatId(chatId);

    if (chatId === MESSENGER_NO_CONVERSATION) return;

    updateConversation(chatId, { visible: true, unread: false });

    // `refreshConversationList` -> `scrollBack`: few entries shown means older ones are wanted.
    if ((messengerStore.getState().entries[chatId]?.length ?? 0) < HISTORY_REQUEST_BELOW) requestMessengerHistory(send, chatId);
};

/** `MainView.show`: opens when there is a conversation to show (or `force`), and marks the shown one read. */
export const showMessenger = (force: boolean = false) => {
    const { selectedChatId } = messengerStore.getState();

    if (force || (visibleConversations().length > 0)) systemStore.getState().showWindow('messenger');

    if (selectedChatId !== MESSENGER_NO_CONVERSATION) updateConversation(selectedChatId, { unread: false });
};

export const hideMessenger = () => systemStore.getState().hideWindow('messenger');

/** `MainView.toggle` - the friend bar's messenger icon. */
export const toggleMessenger = () => (isMessengerOpen() ? hideMessenger() : showMessenger());

/**
 * `MainView.recordChatEntry`: records the entry into its conversation (starting the conversation
 * for a message from someone new), marks it unread when `unread` and it is not being looked at,
 * and shows it when it is the only conversation.
 */
const recordChatEntry = (send: Send, chatId: number, entry: MessengerChatEntry, unread: boolean = false) => {
    const store = messengerStore.getState();

    if (entry.messageId) {
        if (store.seenMessageIds[entry.messageId]) return;

        store.markMessageSeen(entry.messageId);
    }

    if (!messengerStore.getState().entries[chatId]) {
        if (chatId <= 0) return;

        startMessengerConversation(send, chatId, false, (entry.type === MESSENGER_ENTRY_OTHER) ? entry : null);

        // `startConversation` returns early for someone who is neither a friend nor a message sender.
        if (!messengerStore.getState().entries[chatId]) return;
    }

    const { entries, setEntries } = messengerStore.getState();

    setEntries(chatId, [ ...entries[chatId], entry ]);
    updateConversation(chatId, { visible: true });

    const { selectedChatId } = messengerStore.getState();

    if (chatId === selectedChatId) {
        if (!isMessengerOpen() && unread) updateConversation(chatId, { unread: true });
    } else {
        if (unread) updateConversation(chatId, { unread: true });
        if (visibleConversations().length === 1) selectMessengerConversation(send, chatId);
    }
};

const noticeEntry = (type: number, message: MessengerMessage): MessengerChatEntry => ({
    type, chatId: 0, message, sentAt: performance.now(), senderId: 0, senderName: '', senderFigure: '', messageId: '', awaitConfirmationId: 0,
});

/** `MainView.recordNotificationMessage`. */
const recordNotification = (send: Send, chatId: number, message: MessengerMessage) => recordChatEntry(send, chatId, noticeEntry(MESSENGER_ENTRY_NOTIFICATION, message));

/**
 * `MainView.startConversation` (and `HabboMessenger.startConversation`, which also shows the
 * window): the conversation's tab, the moderation notice the first time, a note that an offline
 * friend reads it later; selected when asked for or while the window is closed.
 */
export const startMessengerConversation = (send: Send, chatId: number, select: boolean = true, entry: MessengerChatEntry | null = null) => {
    const store = messengerStore.getState();

    if (!store.entries[chatId]) {
        store.setEntries(chatId, []);

        if (!store.moderationInfoShown) {
            store.setModerationInfoShown();
            recordNotification(send, chatId, localizedText('messenger.moderationinfo'));
        }

        const friend = getMessengerFriend(chatId, entry);

        if (!friend) {
            // Flash leaves the empty list in place, so the conversation is never started again.
            return;
        }

        if (!friend.online) recordNotification(send, chatId, localizedText('messenger.notification.persisted_messages'));

        const { conversations, setConversations } = messengerStore.getState();

        if (!conversations.some(conversation => conversation.chatId === chatId)) {
            setConversations([ ...conversations, { chatId, visible: true, unread: false, name: friend.name, figure: friend.figure, gender: friend.gender } ]);
        }
    }

    if (select || !isMessengerOpen()) selectMessengerConversation(send, chatId);
};

/** `HabboMessenger.startConversation`: from the friend list, a link or a profile - opens the window on it. */
export const openMessengerConversation = (send: Send, chatId: number) => {
    startMessengerConversation(send, chatId);
    showMessenger(true);
};

/** `MainView.onConfirmOwnChatMessage`: the server's copy of an own message replaces the pending one. */
const confirmOwnMessage = (messageId: string, message: MessengerMessage, confirmationId: number) => {
    const { entries, setEntries, markMessageSeen } = messengerStore.getState();

    for (const [ chatId, list ] of Object.entries(entries)) {
        const index = list.findIndex(entry => entry.awaitConfirmationId === confirmationId);

        if (index < 0) continue;

        markMessageSeen(messageId);
        setEntries(Number(chatId), list.map((entry, at) => ((at === index) ? { ...entry, message, messageId, awaitConfirmationId: 0 } : entry)));

        return;
    }
};

/** `HabboMessenger.onNewConsoleMessage` -> `MainView.addConsoleMessage`. */
export const addMessengerConsoleMessage = (send: Send, data: { chatId: number; message: string; habbiconId: number; secondsSinceSent: number; messageId: string; confirmationId: number; senderId: number; senderName: string; senderFigure: string }) => {
    const message = messengerMessageOf(data.message, data.habbiconId);

    if (data.confirmationId > 0) {
        confirmOwnMessage(data.messageId, message, data.confirmationId);
    } else {
        recordChatEntry(send, data.chatId, {
            type: MESSENGER_ENTRY_OTHER,
            chatId: data.chatId,
            message,
            sentAt: performance.now() - (data.secondsSinceSent * 1000),
            senderId: data.senderId,
            senderName: data.senderName,
            senderFigure: data.senderFigure,
            messageId: data.messageId,
            awaitConfirmationId: 0,
        }, true);
    }

    // `HabboMessenger.onNewConsoleMessage`: a message is heard when the window is not there to show it.
    if (!isMessengerOpen()) playMessengerMessageReceivedSound();
};

/** `MainView.addRoomInvite`: the invitation text after `messenger.invitation`. */
export const addMessengerRoomInvite = (send: Send, senderId: number, message: string) => {
    const intro = systemStore.getState().getLocalizationValue('messenger.invitation');

    recordChatEntry(send, senderId, noticeEntry(MESSENGER_ENTRY_INVITATION, text(`${intro} ${message}`)), true);

    // `HabboMessenger.onRoomInvite`: heard like a message, while the window is closed.
    if (!isMessengerOpen()) playMessengerMessageReceivedSound();
};

/** `MainView.onInstantMessageError`: a known code is a notice in the conversation, with the server's text after it. */
export const addMessengerInstantMessageError = (send: Send, chatId: number, errorCode: number, message: string) => {
    const key = MESSENGER_ERROR_MESSAGES[errorCode];

    if (!key) return;

    if (message.length > 0) recordNotification(send, chatId, text(`${systemStore.getState().getLocalizationValue(key)}: ${message}`));
    else recordNotification(send, chatId, localizedText(key));
};

/** `MainView.setOnlineStatus`: a friend with a conversation came online or went offline. */
export const setMessengerOnlineStatus = (send: Send, chatId: number, online: boolean) => {
    if (!messengerStore.getState().entries[chatId]) return;

    recordChatEntry(send, chatId, noticeEntry(MESSENGER_ENTRY_INFO, localizedText(online ? 'messenger.notification.online' : 'messenger.notification.offline')));
};

/** `MainView.hideConversation`: the tab goes; the window closes with the last one, or shows the first one left. */
export const hideMessengerConversation = (send: Send, chatId: number) => {
    updateConversation(chatId, { visible: false });

    const remaining = visibleConversations();

    if (!remaining.length) {
        selectMessengerConversation(send, MESSENGER_NO_CONVERSATION);
        hideMessenger();

        return;
    }

    messengerStore.getState().setAvatarScrollOffset(0);
    selectMessengerConversation(send, remaining[0].chatId);
};

/** `MainView.loadMessageHistory`: older messages go before the ones recorded, each once. */
export const loadMessengerHistory = (chatId: number, history: readonly IHistoricConsoleMessage[]) => {
    const { seenMessageIds, entries, setEntries, markMessageSeen } = messengerStore.getState();
    const ownId = userStore.getState().userId;
    const now = performance.now();
    const older: MessengerChatEntry[] = [];

    for (const item of history) {
        if (seenMessageIds[item.messageId]) continue;

        older.push({
            type: (item.senderId === ownId) ? MESSENGER_ENTRY_OWN : MESSENGER_ENTRY_OTHER,
            chatId,
            message: messengerMessageOf(item.message, item.habbiconId),
            sentAt: now - (item.secondsSinceSent * 1000),
            senderId: item.senderId,
            senderName: item.senderName,
            senderFigure: item.senderFigure,
            messageId: item.messageId,
            awaitConfirmationId: 0,
        });
    }

    if (!older.length) return;

    // Flash marks them seen only as they are rendered; recording them here keeps a later copy out.
    for (const entry of older) markMessageSeen(entry.messageId);

    setEntries(chatId, [ ...older, ...(entries[chatId] ?? []) ]);
};

/** `MainView.onInput`: sends the text and records it, pending, until the server's copy confirms it. */
export const sendMessengerMessage = (send: Send, message: string) => {
    const { selectedChatId, takeConfirmationId } = messengerStore.getState();

    if (!message || (selectedChatId === MESSENGER_NO_CONVERSATION)) return;

    const confirmationId = takeConfirmationId();
    const { userId, name, figure } = userStore.getState();

    send(new SendMsgComposer({ chatId: selectedChatId, message, confirmationId }));

    // `MainView.onInput`: the first message into a conversation that holds nothing, or only the one
    // notice every conversation starts with, makes the sent sound.
    const held = messengerStore.getState().entries[selectedChatId] ?? [];

    if ((held.length === 0) || ((held.length === 1) && (held[0].type === MESSENGER_ENTRY_NOTIFICATION))) playMessengerSendSound();

    recordChatEntry(send, selectedChatId, {
        type: MESSENGER_ENTRY_OWN,
        chatId: selectedChatId,
        message: text(escapeExternalKeys(message)),
        sentAt: performance.now(),
        senderId: userId,
        senderName: name,
        senderFigure: figure,
        messageId: '',
        awaitConfirmationId: confirmationId,
    });
};

/** `messengerWindowProcedure`'s `follow_button`: to the friend's room, or a group chat's group room. */
export const followMessengerConversation = (send: Send, chatId: number) => {
    if (chatId > 0) {
        send(new FollowFriendComposer({ playerId: chatId }));
        send(new EventLogComposer({ event: 'Navigation', data: 'IM', action: 'go.im', extraString: '', extraInt: 0 }));

        return;
    }

    messengerStore.getState().setFollowingToGroupRoom(true);
    send(new GetHabboGroupDetailsComposer({ groupId: Math.abs(chatId), openDetails: false }));
};

/** `messengerWindowProcedure`'s `profile_button`: the friend's profile, or a group chat's group. */
export const openMessengerConversationProfile = (send: Send, chatId: number) => {
    if (chatId > 0) send(new GetExtendedProfileComposer({ userId: chatId }));
    else send(new GetHabboGroupDetailsComposer({ groupId: Math.abs(chatId), openDetails: true }));
};
