/**
 * What the help window sends - `HabboHelp`:
 * - `requestSanctionInfo` (`GetMySanctionStatusComposer`) and `requestReportsStatus`
 *   (`GetCfhMyReportStatusComposer`), both without a body; the answers open their own windows.
 * - The report entry points: `reportUser` (the avatar menu's report), `reportRoom` (the room info's
 *   report), `reportUserFromIM` (the messenger's report) and `reportPhoto` (a wall photo's report)
 *   set who or what is reported and open the help window on their step (`HelpReportEntry`).
 * - `TopicsFlowHelpController.submitCallForHelp`: first
 *   `ignoreAndUnfriendReportedUser` (ignore the reported user and, if they are a friend, remove
 *   them - except for topic 21, `TOPICS_WITHOUT_IGNORE_AND_UNFRIEND`), then a bullying report goes
 *   to the guardians (`ChatReviewSessionCreateComposer`) when `guides.enabled` and
 *   `guardians.enabled` are on, and anything else is a `CallForHelpComposer` with the chat lines
 *   ticked (`ChatReportController.collectSelectedEntries(1, -1)`: user id and text per line). A room
 *   report sends `CallForHelpComposer` with no user and no lines; a messenger report sends
 *   `CallForHelpFromIMComposer` with the conversation's ticked messages; a photo report sends
 *   `CallForHelpFromPhotoComposer`.
 */
import { GetConfigValue } from '@nitrodevco/nitro-api';
import { CallForHelpComposer, CallForHelpFromForumMessageComposer, CallForHelpFromForumThreadComposer, CallForHelpFromIMComposer, CallForHelpFromPhotoComposer, ChatReviewSessionCreateComposer, GetCfhMyReportStatusComposer, GetMySanctionStatusComposer, ICallForHelpTopic, IgnoreUserComposer, RemoveFriendComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { HelpReportEntry, helpStore } from '#base/context/help';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `HabboHelp.TOPICS_WITHOUT_IGNORE_AND_UNFRIEND`. */
const TOPICS_WITHOUT_IGNORE_AND_UNFRIEND = [ 21 ];

/** The topic `submitCallForHelp` hands to the guardians. */
const BULLYING_TOPIC_NAME = 'bullying';

/** `HabboHelp.reportUser`: the avatar menu's report (`RWUAM_REPORT_CFH_OTHER`). */
export const reportUser = (userId: number) => {
    helpStore.getState().setReportedUserId(userId);
    systemStore.getState().showWindow('help', { entry: 'user', openedAt: performance.now() });
};

/** `HabboHelp.reportRoom`: a room's report - no user. */
export const reportRoom = (roomId: number, roomName: string) => {
    helpStore.getState().setReportedRoomId(roomId);
    helpStore.getState().setReportedRoomName(roomName);
    helpStore.getState().setReportedUserId(-1);
    systemStore.getState().showWindow('help', { entry: 'room', openedAt: performance.now() });
};

/** `HabboHelp.reportUserFromIM`: the messenger's report of a conversation. */
export const reportUserFromIM = (userId: number) => {
    helpStore.getState().setReportedUserId(userId);
    systemStore.getState().showWindow('help', { entry: 'im', openedAt: performance.now() });
};

export const requestSanctionStatus = (send: Send) => send(new GetMySanctionStatusComposer({}));

export const requestCfhReportsStatus = (send: Send) => send(new GetCfhMyReportStatusComposer({}));

/** `ChatReportController.collectSelectedEntries(1, -1)`: the ticked lines, oldest first. */
export const collectSelectedChatEntries = (): (number | string)[] => helpStore.getState().chatItems
    .filter(item => item.selected)
    .flatMap(item => [ item.userId, item.text ]);

/**
 * `HabboHelp.startPhotoReportingInNewCfhFlow`: `ExternalImageWidget.openReportImage` - the photo's
 * sender, their name, the photo's extra data id and its wall item, in the room the user is in.
 */
export const reportPhoto = (senderId: number, senderName: string, extraDataId: string, roomObjectId: number) => {
    helpStore.getState().setReportedRoomId(roomStore.getState().room?.roomId ?? -1);
    helpStore.getState().setReportedUserId(senderId);
    helpStore.getState().setReportedPhoto(senderName, roomObjectId, extraDataId);
    systemStore.getState().showWindow('help', { entry: 'photo', openedAt: performance.now() });
};

/** `HabboHelp.reportThread`: a group forum's thread - which forum and which thread, no user. */
export const reportGroupForumThread = (groupId: number, threadId: number) => {
    helpStore.getState().setReportedForumPost(groupId, threadId, -1);
    systemStore.getState().showWindow('help', { entry: 'thread', openedAt: performance.now() });
};

/** `HabboHelp.reportMessage`: a group forum's message. */
export const reportGroupForumMessage = (groupId: number, threadId: number, messageId: number) => {
    helpStore.getState().setReportedForumPost(groupId, threadId, messageId);
    systemStore.getState().showWindow('help', { entry: 'message', openedAt: performance.now() });
};

/** `ChatReportController.collectSelectedEntries(3, user)`: the conversation's ticked messages; a group chat's sender id is the start of its name. */
export const collectSelectedImEntries = (userId: number): (number | string)[] => (helpStore.getState().imItems.find(([ chatId ]) => chatId === userId)?.[1] ?? [])
    .filter(item => item.selected)
    .flatMap(item => [ (item.userId < 0) ? Number(item.userName.split(':')[0]) : item.userId, item.text ]);

/**
 * `populateUsers`' side effect: a reported user who is not among `listedUserIds` is forgotten,
 * room and all. Returns whether anybody is listed.
 */
export const forgetUnlistedReportedUser = (listedUserIds: number[]): boolean => {
    const help = helpStore.getState();

    if (!listedUserIds.includes(help.reportedUserId)) {
        help.setReportedUserId(-1);
        help.setReportedRoomId(-1);
    }

    return listedUserIds.length > 0;
};

/**
 * `openWindow` (`deselectChatEntries`), then the report entry's own start: a user report needs a
 * listed user with chat lines (`userChatLinesAvailable`) and holds the chat purges; a photo report
 * needs its sender (`verifyUserSelected`); a messenger report holds the messenger purges and needs
 * the conversation to have messages (`populateInstantMessages`). Returns the alert to close the
 * window with when the report cannot go on.
 */
export const startHelpReport = (entry: HelpReportEntry | undefined, listedUserIds: number[]): string | undefined => {
    const help = helpStore.getState();

    help.deselectChatItems();

    if (entry === 'user') {
        if (!forgetUnlistedReportedUser(listedUserIds) || (helpStore.getState().reportedUserId <= 0)) return 'help.cfh.error.no_user_data';

        help.setHoldPurges(true);
    }

    if ((entry === 'photo') && (help.reportedUserId === -1)) return 'guide.bully.request.usermissing';

    if (entry === 'im') {
        help.setImHoldPurges(true);

        const { imItems, reportedUserId } = helpStore.getState();

        if (!(imItems.find(([ chatId ]) => chatId === reportedUserId)?.[1].length)) return 'help.cfh.error.no_user_data';
    }

    return undefined;
};

/** `selectUserToReport`. */
export const selectHelpReportedUser = (userId: number, roomId: number) => {
    helpStore.getState().setReportedUserId(userId);
    helpStore.getState().setReportedRoomId(roomId);
};

/**
 * `verifyUserSelected`, then `populateChatMessage`, which holds the purges - nothing lets them go
 * again. Returns whether a user is picked.
 */
export const confirmHelpReportedUser = (): boolean => {
    const help = helpStore.getState();

    if (help.reportedUserId === -1) return false;

    help.setHoldPurges(true);

    return true;
};

/** `onChatEntryEvent`: a line ticked or unticked; ticking one from another room reports that room. */
export const toggleHelpChatLine = (index: number) => {
    const help = helpStore.getState();
    const item = help.chatItems.find(entry => entry.index === index);

    if (!item) return;

    if (!item.selected && (item.roomId !== help.reportedRoomId)) help.setReportedRoomId(item.roomId);

    help.setChatItemSelected(index, !item.selected);
};

/** `onInstantMessageEntryEvent`: a message of the reported conversation ticked or unticked. */
export const toggleHelpImLine = (index: number) => {
    const { imItems, reportedUserId, setImItemSelected } = helpStore.getState();
    const item = imItems.find(([ chatId ]) => chatId === reportedUserId)?.[1].find(line => line.index === index);

    if (item) setImItemSelected(reportedUserId, index, !item.selected);
};

/** `verifySelectedChatLines`: whether `collectSelectedEntries` would send anything for this report. */
export const hasSelectedHelpLines = (entry: HelpReportEntry | undefined): boolean =>
    ((entry === 'im') ? collectSelectedImEntries(helpStore.getState().reportedUserId) : collectSelectedChatEntries()).length > 0;

/** `HabboHelp.ignoreAndUnfriendReportedUser`. */
const ignoreAndUnfriendReportedUser = (send: Send, topicId: number) => {
    const reportedUserId = helpStore.getState().reportedUserId;

    if ((reportedUserId <= 0) || TOPICS_WITHOUT_IGNORE_AND_UNFRIEND.includes(topicId)) return;

    send(new IgnoreUserComposer({ userId: reportedUserId }));

    if (userStore.getState().friends[reportedUserId]) send(new RemoveFriendComposer({ playerIds: [ reportedUserId ] }));
};

/** `TopicsFlowHelpController.submitCallForHelp`, by the reporting mode the window was opened in. */
export const submitCallForHelp = (send: Send, message: string, topic: ICallForHelpTopic, toGuardians: boolean, entry?: HelpReportEntry) => {
    const { reportedUserId, reportedRoomId } = helpStore.getState();

    ignoreAndUnfriendReportedUser(send, topic.id);

    if (entry === 'im') {
        send(new CallForHelpFromIMComposer({ message, topicId: topic.id, reportedUserId, chatEntries: collectSelectedImEntries(reportedUserId), name: '', email: '' }));

        return;
    }

    if (entry === 'photo') {
        const { reportedExtraDataId, reportedRoomObjectId } = helpStore.getState();

        send(new CallForHelpFromPhotoComposer({ extraDataId: reportedExtraDataId, roomId: reportedRoomId, reportedUserId, topicId: topic.id, roomObjectId: reportedRoomObjectId, name: '', email: '' }));

        return;
    }

    if (entry === 'thread') {
        const { reportedGroupId, reportedThreadId } = helpStore.getState();

        send(new CallForHelpFromForumThreadComposer({ groupId: reportedGroupId, threadId: reportedThreadId, topicId: topic.id, message, name: '', email: '' }));

        return;
    }

    if (entry === 'message') {
        const { reportedGroupId, reportedThreadId, reportedMessageId } = helpStore.getState();

        send(new CallForHelpFromForumMessageComposer({ groupId: reportedGroupId, threadId: reportedThreadId, messageId: reportedMessageId, topicId: topic.id, message, name: '', email: '' }));

        return;
    }

    if (entry === 'room') {
        send(new CallForHelpComposer({ message, topicId: topic.id, reportedUserId: -1, roomId: reportedRoomId, chatEntries: [], name: '', email: '' }));

        return;
    }

    if (toGuardians && (topic.name === BULLYING_TOPIC_NAME) && (GetConfigValue<boolean>('guides.enabled') === true) && (GetConfigValue<boolean>('guardians.enabled') === true)) {
        send(new ChatReviewSessionCreateComposer({ reportedUserId, roomId: reportedRoomId }));

        return;
    }

    send(new CallForHelpComposer({ message, topicId: topic.id, reportedUserId, roomId: reportedRoomId, chatEntries: collectSelectedChatEntries(), name: '', email: '' }));
};
