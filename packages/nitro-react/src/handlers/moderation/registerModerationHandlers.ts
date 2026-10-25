/**
 * `ModerationMessageHandler`'s listeners (1318 AS3 `moderation/ModerationMessageHandler.as`):
 * - `onModeratorInit` (:80-102): keeps the init, which shows the start panel;
 * - `onUserInfo` / `onRoomInfo` (:166-184): the answers the user info and room tool wait for;
 * - `onRoomChatlog` / `onUserChatlog` (:197-212): a chatlog's records and its caption;
 * - `onRoomEnter` / `onRoomExit` (:269-290): the guest room the tool's room buttons act on;
 * - `onModeratorActionResult` (:292-304): on success the player's info is asked again, else an alert;
 * - `onSanctions` -> `IssueManager.updateSanctionData` (:468-500): an account's default sanction, labelled
 *   for its mod action window (issue ones are the issue handler's);
 * - `onRoomUserClassification` (:234-253): a user classification window with the users, for anyone.
 */
import { CfhSanctionMessage, CloseConnectionMessage, GetModeratorUserInfoComposer, ModeratorActionResultMessage, ModeratorInitMessage, ModeratorRoomInfoMessage, ModeratorUserInfoMessage, RoomChatlogMessage, RoomEntryInfoMessage, UserChatlogMessage, UserClassificationMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { MOD_CHATLOG_ROOM, MOD_CHATLOG_USER, moderationStore } from '#base/context/moderation';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

const moderation = () => moderationStore.getState();

export const registerModerationHandlers = ({ subscribe, send }: WebSocketConnection) => subscribeAll(subscribe, [
    on(ModeratorInitMessage, data => moderation().setInit(data)),
    on(ModeratorUserInfoMessage, data => moderation().setUserInfo(data.data)),
    on(ModeratorRoomInfoMessage, data => moderation().setRoomInfo(data.data)),
    on(RoomChatlogMessage, (data) => {
        const roomId = Number(data.data.context.get('roomId') ?? 0);

        moderation().setChatlog(MOD_CHATLOG_ROOM, roomId, { caption: `Room Chatlog: ${String(data.data.context.get('roomName') ?? '')}`, records: [ data.data ] });
    }),
    on(UserChatlogMessage, data => moderation().setChatlog(MOD_CHATLOG_USER, data.data.userId, { caption: `User Chatlog: ${data.data.userName}`, records: data.data.rooms })),
    on(RoomEntryInfoMessage, data => moderation().setCurrentRoomId(data.roomId)),
    on(CloseConnectionMessage, () => moderation().setCurrentRoomId(0)),
    on(UserClassificationMessage, data => moderation().showClassification(data.users)),
    on(CfhSanctionMessage, (data) => {
        const { name, avatarOnly, sanctionLengthInHours, tradeLockInfo, machineBanInfo } = data.sanctionType;
        let label = name + (avatarOnly ? ' (avatar) ' : ' ');

        label += (sanctionLengthInHours > 24) ? `${sanctionLengthInHours / 24} days` : `${sanctionLengthInHours}h`;
        if (tradeLockInfo) label += ` & ${tradeLockInfo}`;
        if (machineBanInfo) label += ` & ${machineBanInfo}`;

        if (data.issueId <= 0) moderation().setDefaultSanction(data.accountId, label);
    }),
    on(ModeratorActionResultMessage, (data) => {
        if (data.success) {
            send(new GetModeratorUserInfoComposer({ userId: data.userId }));

            return;
        }

        systemStore.getState().showSimpleAlert({ caption: 'Alert', message: 'Moderation action failed. If you tried to ban a user, please check if the user is already banned.' });
    }),
]);
