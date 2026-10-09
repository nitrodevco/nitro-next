/**
 * `GroupForumController.initComponent`: its packets, and the unread count asked for at once and again
 * every `groupforum.poll.period` seconds (300 when unset - `startPollingForUnreadForumsCount`) - with
 * the "my forums" list while the forums window is open, the count alone otherwise
 * (`onUnreadForumsCountUpdateTimerEvent`). What each answer does is in `groupForumCommands`.
 */
import { ForumDataMessage, ForumsListMessage, ForumThreadsMessage, PostMessage, PostThreadMessage, ThreadMessagesMessage, UnreadForumsCountMessage, UpdateMessage, UpdateThreadMessage } from '@nitrodevco/nitro-packets';

import { onGroupForumData, onGroupForumMessagePosted, onGroupForumMessages, onGroupForumMessageUpdated, onGroupForumsList, onGroupForumsUnreadCount, onGroupForumThreadPosted, onGroupForumThreads, onGroupForumThreadUpdated, pollGroupForumsUnreadCount } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `getInteger("groupforum.poll.period", 300)`. */
const DEFAULT_POLL_PERIOD = 300;

export const registerGroupForumHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const unsubscribe = subscribeAll(subscribe, [
        on(UnreadForumsCountMessage, data => onGroupForumsUnreadCount(data.unreadForumsCount)),
        on(ForumsListMessage, data => onGroupForumsList(data)),
        on(ForumDataMessage, data => onGroupForumData(data.forumData)),
        on(ForumThreadsMessage, data => onGroupForumThreads(data.groupId, data.startIndex, data.threads)),
        on(ThreadMessagesMessage, data => onGroupForumMessages(data.groupId, data.threadId, data.startIndex, data.messages)),
        on(UpdateThreadMessage, data => onGroupForumThreadUpdated(data.groupId, data.thread)),
        on(UpdateMessage, data => onGroupForumMessageUpdated(data.groupId, data.threadId, data.message)),
        on(PostThreadMessage, data => onGroupForumThreadPosted(send, data.groupId, data.thread)),
        on(PostMessage, data => onGroupForumMessagePosted(send, data.groupId, data.threadId, data.message)),
    ]);

    const period = Number(systemStore.getState().config['groupforum.poll.period'] ?? DEFAULT_POLL_PERIOD);
    const poll = () => pollGroupForumsUnreadCount(send);
    const timer = setInterval(poll, (Number.isFinite(period) ? period : DEFAULT_POLL_PERIOD) * 1000);

    poll();

    return () => {
        clearInterval(timer);
        unsubscribe();
    };
};
