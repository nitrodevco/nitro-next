/**
 * `HabboHelp`'s listeners:
 * - the help window's status links: `onMySanctionStatusMessageEvent` (`SanctionInfo.openWindow`) and
 *   `onMyCfhReportStatusMessageEvent` (`MyReportStatus.openWindow`), each answer opening its window
 *   anew (`openWindow` disposes the one already up first);
 * - `onCfhTopics`: the report reasons and topics;
 * - the user registry: `onUsers` registers every other user (`userType` 1) a room shows, in the
 *   room `onRoomReady` (its id, no name yet) and `onGuestRoomResult` (its id and name) registered;
 * - the chat registry: `ChatEventHandler.onRoomChat` keeps each line a user says, shouts or
 *   whispers in a room the navigator has entered, unless the speaker is blocked or the line's style
 *   is a notification's;
 * - the instant message registry (`InstantMessageEventHandler`): each new message by its
 *   conversation, a history's messages from the other side, and room invites by their sender.
 */
import { RoomObjectUserType } from '@nitrodevco/nitro-api';
import { CfhTopicsInitMessage, ChatMessage, ConsoleMessageHistoryMessage, GetGuestRoomResultMessage, MyCfhReportStatusMessage, NewConsoleMessageMessage, RoomInviteMessage, RoomReadyMessage, SanctionStatusEventMessage, ShoutMessage, UsersMessage, WhisperMessage } from '@nitrodevco/nitro-packets';

import { GetChatStyleLibrary } from '#base/chat';
import { WebSocketConnection } from '#base/context/communication';
import { helpStore } from '#base/context/help';
import { navigatorStore } from '#base/context/navigator';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/** `ChatEventHandler.onRoomChat`. */
const onRoomChat = (objectId: number, text: string, styleId: number) => {
    const room = roomStore.getState().room;
    const userData = roomStore.getState().getUserByRoomObjectId(objectId);
    const enteredRoom = navigatorStore.getState().enteredRoom;

    if (!room || !userData || (userData.userType !== RoomObjectUserType.User) || !enteredRoom) return;

    if (userStore.getState().blockedUserIds.includes(userData.webID)) return;

    if (GetChatStyleLibrary().getStyle(styleId)?.isNotification) return;

    helpStore.getState().addChatItem(room.roomId, enteredRoom.info.name, userData.webID, userData.name, text);
};

export const registerHelpHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(SanctionStatusEventMessage, data => systemStore.getState().showWindow('help_sanction_info', { sanctions: data.sanctions, openedAt: performance.now() })),
    on(MyCfhReportStatusMessage, data => systemStore.getState().showWindow('help_my_reports', { reports: data.reports, openedAt: performance.now() })),
    on(CfhTopicsInitMessage, data => helpStore.getState().setCallForHelpCategories(data.callForHelpCategories)),
    on(UsersMessage, (data) => {
        const ownUserId = userStore.getState().userId;

        for (const avatar of data.avatars) {
            if ((avatar.webId !== ownUserId) && (avatar.avatarType === RoomObjectUserType.User)) helpStore.getState().registerUser(avatar.webId, avatar.name, avatar.figure);
        }
    }),
    on(RoomReadyMessage, data => helpStore.getState().registerRoom(data.roomId, '')),
    on(GetGuestRoomResultMessage, data => helpStore.getState().registerRoom(data.roomInfo.roomId, data.roomInfo.name)),
    on(ChatMessage, data => onRoomChat(data.objectId, data.text, data.styleId)),
    on(ShoutMessage, data => onRoomChat(data.objectId, data.text, data.styleId)),
    on(WhisperMessage, data => onRoomChat(data.objectId, data.text, data.styleId)),
    // `onConsoleHistory`: only the other side's messages.
    on(ConsoleMessageHistoryMessage, (data) => {
        for (const message of data.messages) {
            if (message.senderId === data.chatId) helpStore.getState().addImItem(data.chatId, message.senderName, message.message);
        }
    }),
    on(NewConsoleMessageMessage, data => helpStore.getState().addImItem(data.chatId, data.senderName, data.message)),
    on(RoomInviteMessage, data => helpStore.getState().addImItem(data.senderId, '', data.message)),
]);
