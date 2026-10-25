/**
 * `GroupForumController` - the group forums: `groupforum/list/<active|popular|my>` (Me menu >
 * Forums sends `my`), `groupforum/<groupId>` and `groupforum/<groupId>/<threadId>[/<messageIndex>]`.
 *
 * - A forums list is asked for 20 at a time (`GetForumsList(code, start, 20)`); its answer opens the
 *   window on it only when it is the list asked for last. The "my forums" list's unread forums are
 *   the me menu's count.
 * - Opening a forum (`initForum`) asks for its stats (`ForumData`, which carries the user's
 *   permissions: a forum the user may not read closes the window with the "access denied"
 *   notification) and its first 20 threads; a thread's messages come 20 at a time, and the last one
 *   shown moves the read marker (`updateUnreadMessageCounts`).
 * - Leaving a forum (`markForumAsRead`) sends its new read marker when it moved; "mark as read" on a
 *   forum or the forums list marks everything read.
 * - Posting (`postNewThread` / `postNewMessage`, `PostMessage`: thread 0 starts one) and the forum settings
 *   (`updateForumSettings`) each have a window of their own that outlives the forum window; a posted
 *   thread or message closes the compose window (`onPostThreadMessage` / `onPostMessageMessage`).
 * - The unread count is polled every `groupforum.poll.period` seconds: with `GetForumsList(2, 0, 20)`
 *   while the window is open, `GetUnreadForumsCount` otherwise.
 */
import type { IExtendedForumData, IForumData, IPostMessage, IThreadData } from '@nitrodevco/nitro-packets';
import { GetForumsListComposer, GetForumStatsComposer, GetMessagesComposer, GetThreadComposer, GetThreadsComposer, GetUnreadForumsCountComposer, IForumReadMarker, ModerateMessageComposer, ModerateThreadComposer, PostMessageComposer, UpdateForumReadMarkerComposer, UpdateForumSettingsComposer, UpdateThreadComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { GroupForumSession, GroupForumsList, GroupForumView, groupStore } from '#base/context/groups';
import { translate as t } from '#base/context/system';

import { showNotification } from '../notifications/notificationCommands';

/** `pageSize` / `ThreadsListData.PAGE_SIZE`. */
export const GROUP_FORUM_PAGE_SIZE = 20;

/** `FORUMS_LIST_CODE_*`, by the link's word. */
const LIST_CODES: Record<string, number> = { active: 0, popular: 1, my: 2 };
export const GROUP_FORUM_LIST_MY = 2;

/** `ComposeMessageView`'s limits: the subject (`SUBJECT_MAX_LENGTH`) and the message; the wait between two posts is the store's (`GROUP_FORUM_POST_COOLDOWN_MS`). */
export const GROUP_FORUM_SUBJECT_MAX_LENGTH = 120;
export const GROUP_FORUM_MESSAGE_MAX_LENGTH = 4000;

/** `ModerateThread` / `ModerateMessage` states: shown again, hidden by the group, hidden by staff. */
export const GROUP_FORUM_STATE_SHOWN = 1;
export const GROUP_FORUM_STATE_HIDDEN_BY_ADMIN = 10;
export const GROUP_FORUM_STATE_HIDDEN_BY_STAFF = 20;

const groups = () => groupStore.getState();

/** `GroupForumController`'s fields (`GroupForumSession`), as the store holds them now. */
const session = (): GroupForumSession => groups().forumSession;

const patch = (changes: Partial<GroupForumSession>) => groups().patchForumSession(changes);

const isWindowOpen = () => !!groups().forumView;

/** `ForumData.lastReadMessageId`. */
const forumLastReadMessageId = (forum: IForumData) => forum.totalMessages - forum.unreadMessages;

/** `ForumsListData.unreadForumsCount`. */
const unreadForumsOf = (list: GroupForumsList) => list.forums.filter(forum => forum.unreadMessages > 0).length;

/** `ForumsListData.updateUnreadMessages`: the listed forum takes the open forum's counts, read up to `messageId`. */
const updateListUnreadMessages = (list: GroupForumsList, forum: IForumData, messageId: number): GroupForumsList => ({
    ...list,
    forums: list.forums.map(listed => ((listed.groupId !== forum.groupId)
        ? listed
        : {
                ...listed,
                totalThreads: forum.totalThreads,
                totalMessages: forum.totalMessages,
                lastMessageAuthorId: forum.lastMessageAuthorId,
                lastMessageAuthorName: forum.lastMessageAuthorName,
                lastMessageId: forum.lastMessageId,
                lastMessageTimeAsSecondsAgo: forum.lastMessageTimeAsSecondsAgo,
                unreadMessages: Math.max(0, forum.totalMessages - messageId),
            })),
});

/** `updateUnreadForumsCount`. */
const setUnreadForumsCount = (count: number) => {
    if (groups().unreadForumsCount !== count) groups().setUnreadForumsCount(count);
};

const showView = (view: GroupForumView) => groups().setForumView(view);

/** The view's forums list follows the controller's (`_-li`), which unread updates replace. */
const refreshViewForumsList = () => {
    const view = groups().forumView;
    const { forumsList } = session();

    if (!view || !forumsList) return;

    showView({ ...view, forums: forumsList });
};

/** `markForumAsRead`: the open forum's read marker, when it moved or `all` marks it read. */
export const markGroupForumAsRead = (send: Send, all: boolean = false) => {
    const { forumData, lastReadMessageId } = session();

    if (forumData && (all || (lastReadMessageId > forumLastReadMessageId(forumData)))) {
        const marker: IForumReadMarker = all
            ? { groupId: forumData.groupId, lastReadMessageId: Math.max(forumData.totalMessages, lastReadMessageId), markAll: lastReadMessageId === 0 }
            : { groupId: forumData.groupId, lastReadMessageId, markAll: false };

        send(new UpdateForumReadMarkerComposer({ markers: [ marker ] }));
    }

    patch({ lastReadMessageId: 0, lastReadMessageIndexByThread: new Map() });
};

/** `markForumsAsRead`: every listed forum with unread messages. */
export const markGroupForumsListAsRead = (send: Send) => {
    const { forumsList } = session();

    if (!forumsList) return;

    const markers = forumsList.forums.filter(forum => forum.unreadMessages > 0).map(forum => ({ groupId: forum.groupId, lastReadMessageId: forum.totalMessages, markAll: true }));

    if (!markers.length) return;

    send(new UpdateForumReadMarkerComposer({ markers }));
    setUnreadForumsCount(0);
};

/** `openForumsList`. */
export const openGroupForumsList = (send: Send, listCode: number, startIndex: number = 0) => {
    markGroupForumAsRead(send);
    patch({ requestedForumsListCode: listCode, requestedGroupId: -1 });
    send(new GetForumsListComposer({ listCode, startIndex, amount: GROUP_FORUM_PAGE_SIZE }));
};

/** `onForumsList`. */
export const onGroupForumsList = (incoming: GroupForumsList) => {
    const { forumData, lastReadMessageId, requestedForumsListCode } = session();
    let list = incoming;

    if (forumData && (lastReadMessageId > 0)) list = updateListUnreadMessages(list, forumData, lastReadMessageId);

    if (list.listCode === GROUP_FORUM_LIST_MY) setUnreadForumsCount(unreadForumsOf(list));

    if (requestedForumsListCode !== list.listCode) return;

    patch({ forumsList: list });
    showView({ kind: 'forums', forums: list });
};

/** `initForum`. */
const initForum = (send: Send, groupId: number) => {
    markGroupForumAsRead(send);
    patch({ requestedForumsListCode: -1, requestedGroupId: groupId, lastReadMessageId: 0 });
    send(new GetForumStatsComposer({ groupId }));
};

/** `requestThreadList`. */
export const requestGroupForumThreads = (send: Send, groupId: number, startIndex: number) => send(new GetThreadsComposer({ groupId, startIndex, amount: GROUP_FORUM_PAGE_SIZE }));

/** `requestThreadMessageList`. */
export const requestGroupForumMessages = (send: Send, groupId: number, thread: number, startIndex: number) => send(new GetMessagesComposer({ groupId, threadId: thread, startIndex, amount: GROUP_FORUM_PAGE_SIZE }));

/** `openGroupForum`. */
export const openGroupForumWindow = (send: Send, groupId: number) => {
    initForum(send, groupId);
    requestGroupForumThreads(send, groupId, 0);
};

/** `goToMessageIndex`: the page holding the message. */
export const goToGroupForumMessage = (send: Send, groupId: number, thread: number, messageIndex: number) => {
    patch({ goToThreadId: thread, goToMessageIndex: messageIndex % GROUP_FORUM_PAGE_SIZE });
    requestGroupForumMessages(send, groupId, thread, Math.floor(messageIndex / GROUP_FORUM_PAGE_SIZE) * GROUP_FORUM_PAGE_SIZE);
};

/** `linkReceived`. */
export const openGroupForumLink = (send: Send, parts: string[]) => {
    if (parts.length < 2) return;

    if (parts[1] === 'list') {
        if (parts.length !== 3) return;

        const code = LIST_CODES[parts[2]];

        if (code !== undefined) openGroupForumsList(send, code);

        return;
    }

    const groupId = parseInt(parts[1], 10) || 0;

    if (groupId === 0) return;

    patch({ forumsList: undefined });

    if (parts.length === 2) {
        openGroupForumWindow(send, groupId);

        return;
    }

    // `groupforum/<group>/<thread>[/<index>]`: the thread, then the page with the message.
    const thread = parseInt(parts[2], 10) || 0;
    const messageIndex = (parts.length > 3) ? (parseInt(parts[3], 10) || 0) : 0;

    initForum(send, groupId);
    send(new GetThreadComposer({ groupId, threadId: thread }));
    goToGroupForumMessage(send, groupId, thread, messageIndex);
};

/** `onForumData`. */
export const onGroupForumData = (forum: IExtendedForumData) => {
    if (session().requestedGroupId !== forum.groupId) return;

    if (forum.readPermissionError.length > 0) {
        closeGroupForumView();
        patch({ requestedGroupId: 0 });

        const operation = t('groupforum.view.error.operation_read');

        showNotification('forums.error.access_denied', { message: t(`groupforum.view.error.${forum.readPermissionError}`, '', { operation }) });

        return;
    }

    patch({ forumData: forum, lastReadMessageId: forumLastReadMessageId(forum) });
};

/** `onThreadList`. */
export const onGroupForumThreads = (groupId: number, startIndex: number, threads: IThreadData[]) => {
    const { forumData, forumsList } = session();

    if (!forumData || (forumData.groupId !== groupId)) return;

    const threadsList = { totalThreads: forumData.totalThreads, startIndex, threads };

    patch({ threadsList });
    showView({ kind: 'threads', forums: forumsList, forum: forumData, threads: threadsList });
};

/** `getThreadLastReadMessageIndex`. */
export const getGroupForumThreadLastReadIndex = (thread: number) => session().lastReadMessageIndexByThread.get(thread) ?? -1;

/** `updateUnreadMessageCounts`. */
const updateUnreadMessageCounts = (messageId: number, thread: number, messageIndex: number) => {
    const { forumData, forumsList, lastReadMessageId, lastReadMessageIndexByThread } = session();

    if (messageId > lastReadMessageId) {
        patch({ lastReadMessageId: messageId });

        if (forumsList && forumData) {
            const updated = updateListUnreadMessages(forumsList, forumData, messageId);

            patch({ forumsList: updated });

            if (updated.listCode === GROUP_FORUM_LIST_MY) setUnreadForumsCount(unreadForumsOf(updated));
        }
    }

    patch({ lastReadMessageIndexByThread: new Map(lastReadMessageIndexByThread).set(thread, messageIndex) });
};

/** `onThreadMessageList`. */
export const onGroupForumMessages = (groupId: number, thread: number, startIndex: number, messages: IPostMessage[]) => {
    const { forumData, forumsList, threadsList } = session();

    if (!forumData || (forumData.groupId !== groupId) || !threadsList) return;

    patch({ threadId: thread });

    const threadData = threadsList.threads.find(entry => entry.threadId === thread);

    if (!threadData) return;

    showView({ kind: 'messages', forums: forumsList, forum: forumData, threads: threadsList, messages: { threadId: thread, totalMessages: threadData.nMessages, startIndex, messages, lastReadIndex: getGroupForumThreadLastReadIndex(thread) } });

    const last = messages[messages.length - 1];

    if (last) {
        updateUnreadMessageCounts(last.messageId, thread, last.messageIndex);
        refreshViewForumsList();
    }
};

/** `onUpdateThread`: a thread changed (or `GetThread`'s answer, which starts a one-thread list). */
export const onGroupForumThreadUpdated = (groupId: number, thread: IThreadData) => {
    const { forumData, threadsList } = session();

    if (!forumData || (forumData.groupId !== groupId)) return;

    const view = groups().forumView;

    if (threadsList && view && threadsList.threads.some(entry => entry.threadId === thread.threadId)) {
        const updated = { ...threadsList, threads: threadsList.threads.map(entry => ((entry.threadId === thread.threadId) ? thread : entry)) };

        patch({ threadsList: updated });

        if ((view.kind === 'threads') || (view.kind === 'messages')) showView({ ...view, threads: updated });

        return;
    }

    patch({ threadsList: { totalThreads: 1, startIndex: 0, threads: [ thread ] } });
};

/** `onUpdateMessage`: a message of the open thread changed. */
export const onGroupForumMessageUpdated = (groupId: number, thread: number, message: IPostMessage) => {
    const view = groups().forumView;
    const { forumData, threadId } = session();

    if (!forumData || (forumData.groupId !== groupId) || (threadId !== thread) || (view?.kind !== 'messages')) return;

    if (!view.messages.messages.some(entry => entry.messageId === message.messageId)) return;

    showView({ ...view, messages: { ...view.messages, messages: view.messages.messages.map(entry => ((entry.messageId === message.messageId) ? message : entry)) } });
};

/** `onPostThreadMessage`: a thread was started. */
export const onGroupForumThreadPosted = (send: Send, groupId: number, thread: IThreadData) => {
    closeGroupForumCompose();

    const { forumData } = session();

    if (forumData && (forumData.groupId === groupId)) updateUnreadMessageCounts(thread.lastMessageId, thread.threadId, thread.nMessages - 1);

    // Read again: `updateUnreadMessageCounts` may have moved the list's counts.
    const { forumsList } = session();

    if (forumsList) {
        // `ForumData.addNewThread`.
        patch({ forumsList: { ...forumsList, forums: forumsList.forums.map(forum => ((forum.groupId !== groupId) ? forum : { ...forum, lastMessageAuthorId: thread.lastMessageAuthorId, lastMessageAuthorName: thread.lastMessageAuthorName, lastMessageId: thread.lastMessageId, lastMessageTimeAsSecondsAgo: thread.lastMessageTimeAsSecondsAgo, totalThreads: forum.totalThreads + 1, totalMessages: forum.totalMessages + 1, unreadMessages: 0 })) } });
    }

    if (!isWindowOpen() || !forumData || (forumData.groupId !== groupId)) return;

    requestGroupForumThreads(send, groupId, 0);
};

/** `onPostMessageMessage`: a message was posted to the open thread - its page is asked for again. */
export const onGroupForumMessagePosted = (send: Send, groupId: number, thread: number, message: IPostMessage) => {
    closeGroupForumCompose();

    const { forumData, threadId } = session();

    if (!isWindowOpen() || !forumData || (forumData.groupId !== groupId) || (thread !== threadId)) return;

    requestGroupForumMessages(send, groupId, threadId, message.messageIndex - (message.messageIndex % GROUP_FORUM_PAGE_SIZE));
};

/**
 * `getGoToMessageIndex` / `getGoToThreadId` / `resetGoTo`: the message a
 * `groupforum/<group>/<thread>/<index>` link named, once - `GroupForumView.openMessagesList`
 * scrolls its page to it (`scrollToSpecificElement(index, true)`) for an index above 0 in that thread.
 */
export const takeGroupForumGoTo = (thread: number): number => {
    const { goToMessageIndex, goToThreadId } = session();

    if ((goToMessageIndex <= 0) || (goToThreadId !== thread)) return -1;

    patch({ goToThreadId: -1, goToMessageIndex: -1 });

    return goToMessageIndex;
};

/** `closeMainView`, without the read marker (`closeGroupForum` sends it). */
const closeGroupForumView = () => {
    groups().setForumView(undefined);
    patch({ forumData: undefined, requestedForumsListCode: -1, requestedGroupId: -1 });
};

/** `GroupForumView.dispose` -> `closeMainView`. */
export const closeGroupForum = (send: Send) => {
    markGroupForumAsRead(send);
    closeGroupForumView();
};

/** `onUnreadForumsCountUpdateTimerEvent`. */
export const pollGroupForumsUnreadCount = (send: Send) => {
    if (isWindowOpen()) send(new GetForumsListComposer({ listCode: GROUP_FORUM_LIST_MY, startIndex: 0, amount: GROUP_FORUM_PAGE_SIZE }));
    else send(new GetUnreadForumsCountComposer({}));
};

/** `onUnreadForumsCountMessage`. */
export const onGroupForumsUnreadCount = (count: number) => setUnreadForumsCount(count);

/** `deleteThread`: hidden by the group, or by staff for staff. */
export const deleteGroupForumThread = (send: Send, forum: IExtendedForumData, thread: number) => {
    let state = 0;

    if (forum.moderatePermissionError.length === 0) state = GROUP_FORUM_STATE_HIDDEN_BY_ADMIN;
    if (forum.isStaff) state = GROUP_FORUM_STATE_HIDDEN_BY_STAFF;

    send(new ModerateThreadComposer({ groupId: forum.groupId, threadId: thread, state }));
};

/** `unDeleteThread`. */
export const undeleteGroupForumThread = (send: Send, forum: IForumData, thread: number) => send(new ModerateThreadComposer({ groupId: forum.groupId, threadId: thread, state: GROUP_FORUM_STATE_SHOWN }));

/** `lockThread` / `stickThread`. */
export const updateGroupForumThread = (send: Send, forum: IForumData, thread: number, isLocked: boolean, isSticky: boolean) => send(new UpdateThreadComposer({ groupId: forum.groupId, threadId: thread, isLocked, isSticky }));

/** `deleteMessage`. */
export const deleteGroupForumMessage = (send: Send, forum: IExtendedForumData, thread: number, messageId: number) => send(new ModerateMessageComposer({ groupId: forum.groupId, threadId: thread, messageId, state: forum.isStaff ? GROUP_FORUM_STATE_HIDDEN_BY_STAFF : GROUP_FORUM_STATE_HIDDEN_BY_ADMIN }));

/** `unDeleteMessage`. */
export const undeleteGroupForumMessage = (send: Send, forum: IForumData, thread: number, messageId: number) => send(new ModerateMessageComposer({ groupId: forum.groupId, threadId: thread, messageId, state: GROUP_FORUM_STATE_SHOWN }));

/** `GroupForumView._window`: where it is, so the windows it opens go beside it. Unchanged, nothing is written. */
export const setGroupForumWindowRect = (rect: Partial<GroupForumSession['forumWindowRect']>) => {
    const current = session().forumWindowRect;
    const next = { ...current, ...rect };

    if ((next.x === current.x) && (next.y === current.y) && (next.width === current.width)) return;

    patch({ forumWindowRect: next });
};

/** `ComposeMessageView.dispose`. */
export const closeGroupForumCompose = () => groups().setForumCompose(undefined);

/**
 * `GroupForumView.openComposeMessageView`: a new window beside the forum's, or the open one taken to
 * this post (`focus`, which leaves a window that is posting as it is).
 */
export const openGroupForumCompose = (forum: IExtendedForumData, thread: IThreadData | undefined, quote?: IPostMessage) => {
    const open = groups().forumCompose;

    if (open?.posting) return;

    const { forumWindowRect, composeKey } = session();

    patch({ composeKey: composeKey + 1 });
    groups().setForumCompose({
        key: composeKey + 1,
        forum,
        thread,
        quote,
        posting: false,
        x: open?.x ?? (forumWindowRect.x + forumWindowRect.width),
        y: open?.y ?? forumWindowRect.y,
    });
};

/** `ForumSettingsView`'s window: opened beside the forum's, or the open one taken to this forum's settings. */
export const openGroupForumSettings = (forum: IExtendedForumData) => {
    const open = groups().forumSettings;
    const { forumWindowRect, composeKey } = session();
    let key = composeKey + 1;

    if (open?.forum === forum) key = open.key;
    else patch({ composeKey: key });

    groups().setForumSettings({ key, forum, x: open?.x ?? (forumWindowRect.x + forumWindowRect.width), y: open?.y ?? forumWindowRect.y });
};

export const closeGroupForumSettings = () => groups().setForumSettings(undefined);

/** `getTimer() - lastPostTime`: how long ago the last post was sent. */
export const getGroupForumSinceLastPost = () => performance.now() - session().lastPostTime;

/** A text field's lines are separated by a carriage return in Flash, which is what the hotel stores. */
const toFlashLines = (text: string) => text.replace(/\r?\n/g, '\r');

/** `postNewThread`. */
export const postGroupForumThread = (send: Send, groupId: number, subject: string, message: string) => {
    send(new PostMessageComposer({ groupId, threadId: 0, subject, message: toFlashLines(message) }));
    patch({ lastPostTime: performance.now() });
};

/** `postNewMessage`. */
export const postGroupForumMessage = (send: Send, groupId: number, thread: number, message: string) => {
    send(new PostMessageComposer({ groupId, threadId: thread, subject: '', message: toFlashLines(message) }));
    patch({ lastPostTime: performance.now() });
};

/** `updateForumSettings`. */
export const updateGroupForumSettings = (send: Send, groupId: number, readPermissions: number, postMessagePermissions: number, postThreadPermissions: number, moderatePermissions: number) => send(new UpdateForumSettingsComposer({ groupId, readPermissions, postMessagePermissions, postThreadPermissions, moderatePermissions }));
