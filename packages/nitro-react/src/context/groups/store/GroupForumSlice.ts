import type { IExtendedForumData, IForumData, IPostMessage, IThreadData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `ForumsListData`: a page of a forums list. `listCode` 0 active, 1 popular, 2 the user's groups. */
export interface GroupForumsList {
    listCode: number;
    totalAmount: number;
    startIndex: number;
    forums: IForumData[];
}

/** `ThreadsListData`: a page of a forum's threads. */
export interface GroupForumThreadsList {
    totalThreads: number;
    startIndex: number;
    threads: IThreadData[];
}

/** `MessagesListData`: a page of a thread's messages. */
export interface GroupForumMessagesList {
    threadId: number;
    totalMessages: number;
    startIndex: number;
    messages: IPostMessage[];
    /** `getThreadLastReadMessageIndex` as the page was built: the messages after it are drawn as unread. */
    lastReadIndex: number;
}

/**
 * What `GroupForumView` shows: a forums list (`openForumsList`), a forum's threads (`openThreadList`)
 * or a thread's messages (`openMessagesList`) - each with the lists it came through, which its back
 * button returns to.
 */
export type GroupForumView
    = | { kind: 'forums'; forums: GroupForumsList }
        | { kind: 'threads'; forums: GroupForumsList | undefined; forum: IExtendedForumData; threads: GroupForumThreadsList }
        | { kind: 'messages'; forums: GroupForumsList | undefined; forum: IExtendedForumData; threads: GroupForumThreadsList; messages: GroupForumMessagesList };

/**
 * `ComposeMessageView`: a new thread (no `thread`) or a reply to one, the message it quotes when it
 * came from a message's reply button. `key` is bumped each time the window is opened or focused on
 * another post (`focus` -> `initControls`), so its fields start again; `x` / `y` where it opens.
 */
export interface GroupForumCompose {
    key: number;
    forum: IExtendedForumData;
    thread: IThreadData | undefined;
    quote: IPostMessage | undefined;
    /** `_-pZ`: the post is sent and the window waits for its answer, its fields disabled. */
    posting: boolean;
    x: number;
    y: number;
}

/** `ForumSettingsView`: the forum whose permissions it changes, and where it opens. */
export interface GroupForumSettings {
    key: number;
    forum: IExtendedForumData;
    x: number;
    y: number;
}

/**
 * Flash's `GroupForumController`: the unread count the toolbar shows on the me menu's forums item and
 * adds to the me menu icon's count (`HabboToolbar.onUnseenForumsCountUpdate`), and what its window
 * (`GroupForumView`, `content`) shows while it is open.
 */
type State = {
    /** `GroupForumController.unreadForumsCount`. */
    unreadForumsCount: number;
    /** `content`: undefined while the window is closed. */
    forumView: GroupForumView | undefined;
    /** `composeMessageView` / `forumSettingsView`: undefined while closed; they outlive the main window. */
    forumCompose: GroupForumCompose | undefined;
    forumSettings: GroupForumSettings | undefined;
};

type Actions = {
    /** `updateUnreadForumsCount`. */
    setUnreadForumsCount: (count: number) => void;
    setForumView: (forumView: GroupForumView | undefined) => void;
    setForumCompose: (forumCompose: GroupForumCompose | undefined) => void;
    setForumSettings: (forumSettings: GroupForumSettings | undefined) => void;
};

export const GroupForumSliceInitialState: State = {
    unreadForumsCount: 0,
    forumView: undefined,
    forumCompose: undefined,
    forumSettings: undefined,
};

export type GroupForumSlice = State & Actions;

export const createGroupForumSlice: StateCreator<GroupForumSlice, [], [], GroupForumSlice> = set => ({
    ...GroupForumSliceInitialState,
    setUnreadForumsCount: unreadForumsCount => set({ unreadForumsCount }),
    setForumView: forumView => set({ forumView }),
    setForumCompose: forumCompose => set({ forumCompose }),
    setForumSettings: forumSettings => set({ forumSettings }),
});
