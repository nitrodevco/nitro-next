/**
 * The moderation tool's requests (1318 AS3 `moderation/**`): what its windows ask the server for
 * and the actions they send - the user and room info, chatlogs and room visits, the mod actions and
 * sanctions (`ModActionCtrl`), the room tool's caution (`RoomToolCtrl`), messages (`SendMsgsCtrl`),
 * and the call for help queue's picks, releases and closes (`IssueManager`, `IssueHandler`).
 */
import type { ModeratorInitMessageType } from '@nitrodevco/nitro-packets';
import {
    CloseIssueDefaultActionComposer, CloseIssuesComposer, DefaultSanctionComposer, FollowFriendComposer, GetCfhChatlogComposer, GetGuestRoomComposer, GetModeratorRoomInfoComposer,
    GetModeratorUserInfoComposer, GetRoomChatlogComposer, GetRoomVisitsComposer, GetUserChatlogComposer, ModAlertComposer, ModBanComposer, ModerateRoomComposer, ModeratorActionComposer, ModKickComposer, ModMessageComposer, ModMuteComposer,
    ModToolPreferencesComposer, ModToolSanctionComposer, ModTradingLockComposer, PickIssuesComposer, ReleaseIssuesComposer,
} from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { MOD_CHATLOG_ROOM, ModerationIssueSends, moderationIssueStore } from '#base/context/moderation';
import { configString } from '#base/context/system';

/** Not taken from an issue (`getIssueId` with no issue): the composers then leave the issue id out. */
const NO_ISSUE = -1;

/** `SendMsgsCtrl`'s topic for a message not tied to a call-for-help topic. */
const NO_TOPIC = -999;

/** `ModActionDefinition(actionId, name, actionType, sanctionTypeId, actionLengthHours)`. */
export interface ModActionDefinition {
    actionId: number;
    name: string;
    actionType: number;
    sanctionTypeId: number;
    actionLengthHours: number;
}

/** `ModActionCtrl`'s twelve actions (`ModActionCtrl.as:64-75`), in its drop menu's order. */
export const MOD_ACTIONS: readonly ModActionDefinition[] = [
    { actionId: 1, name: 'Alert', actionType: 1, sanctionTypeId: 1, actionLengthHours: 0 },
    { actionId: 2, name: 'Mute 1h', actionType: 2, sanctionTypeId: 2, actionLengthHours: 0 },
    { actionId: 3, name: 'Ban 18h', actionType: 3, sanctionTypeId: 3, actionLengthHours: 0 },
    { actionId: 4, name: 'Ban 7 days', actionType: 3, sanctionTypeId: 4, actionLengthHours: 0 },
    { actionId: 5, name: 'Ban 30 days (step 1)', actionType: 3, sanctionTypeId: 5, actionLengthHours: 0 },
    { actionId: 7, name: 'Ban 30 days (step 2)', actionType: 3, sanctionTypeId: 7, actionLengthHours: 0 },
    { actionId: 6, name: 'Ban 100 years', actionType: 3, sanctionTypeId: 6, actionLengthHours: 0 },
    { actionId: 106, name: 'Ban avatar-only 100 years', actionType: 3, sanctionTypeId: 6, actionLengthHours: 0 },
    { actionId: 101, name: 'Kick', actionType: 4, sanctionTypeId: 0, actionLengthHours: 0 },
    { actionId: 102, name: 'Lock trade 1 week', actionType: 5, sanctionTypeId: 0, actionLengthHours: 168 },
    { actionId: 104, name: 'Lock trade permanent', actionType: 5, sanctionTypeId: 0, actionLengthHours: 876000 },
    { actionId: 105, name: 'Message', actionType: 6, sanctionTypeId: 0, actionLengthHours: 0 },
];

/** `RoomToolCtrl.determineAction`: 0 caution, 1 caution and kick, 3 message, 4 message and kick. */
const roomActionType = (caution: boolean, kick: boolean) => (kick ? (caution ? 1 : 4) : (caution ? 0 : 3));

/** The `IssueManager`'s requests, for the issue store's picks and releases. */
export const moderationIssueSends = (send: Send): ModerationIssueSends => ({
    pick: (issueIds, retryEnabled, retryCount, message) => send(new PickIssuesComposer({ issueIds, retryEnabled, retryCount, message })),
    release: issueIds => send(new ReleaseIssuesComposer({ issueIds })),
});

/** `ModeratorUserInfoMessage`'s request - a user info window's and an issue handler's players. */
export const requestModeratorUserInfo = (send: Send, userId: number) => send(new GetModeratorUserInfoComposer({ userId }));

/** `RoomToolCtrl.show`: the room's moderation info. */
export const requestModeratorRoomInfo = (send: Send, roomId: number) => send(new GetModeratorRoomInfoComposer({ roomId }));

/** `RoomVisitsCtrl.show`: a player's room visits. */
export const requestRoomVisits = (send: Send, userId: number) => send(new GetRoomVisitsComposer({ userId }));

/** `ChatlogCtrl.show`: a room's chatlog (`MOD_CHATLOG_ROOM`) or a user's. */
export const requestModerationChatlog = (send: Send, type: number, id: number) => send((type === MOD_CHATLOG_ROOM) ? new GetRoomChatlogComposer({ roomType: 0, roomId: id }) : new GetUserChatlogComposer({ userId: id }));

/** `IssueHandler`'s evidence: the issue's chatlog. */
export const requestCfhChatlog = (send: Send, issueId: number) => send(new GetCfhChatlogComposer({ issueId }));

/** A chatlog's or room visit's room link: forwarded to it without entering (`GetGuestRoom(id, false, true)`). */
export const forwardToModeratedRoom = (send: Send, roomId: number) => send(new GetGuestRoomComposer({ roomId, enterRoom: false, roomForward: true }));

/** The classification list's "visit room": follow the player. */
export const followModeratedUser = (send: Send, userId: number) => send(new FollowFriendComposer({ playerId: userId }));

/** `requestSanctionData`: the sanction an account (or an issue's reported player, `accountId` -1) would get for a topic. */
export const requestSanctionData = (send: Send, issueId: number, accountId: number, topicId: number) => send(new ModToolSanctionComposer({ issueId, accountId, topicId }));

/** `ModActionCtrl.selectTopic`: a user's default sanction for the topic. */
export const requestUserSanction = (send: Send, userId: number, topicId: number) => requestSanctionData(send, NO_ISSUE, userId, topicId);

/** `ModActionCtrl.onDefaultSanctionButton`, with the window's issue (`getIssueId`). */
export const giveDefaultSanction = (send: Send, userId: number, topicId: number, message: string, issueId = NO_ISSUE) => send(new DefaultSanctionComposer({ userId, topicId, message, issueId }));

/**
 * `ModActionCtrl.onCustomSanctionButton` (`:233-300`): the action's message - alert, ban and kick
 * held to the init's permissions, a message to text - with the window's issue (`getIssueId`, `:339`).
 * Returns the reason it was refused, or undefined once sent.
 */
export const sendModAction = (send: Send, init: ModeratorInitMessageType, action: ModActionDefinition, userId: number, topicId: number, message: string, issueId = NO_ISSUE): string | undefined => {
    const base = { userId, message, topicId, issueId };

    switch (action.actionType) {
        case 1:
            if (!init.alertPermission) return 'You have insufficient permissions.';
            send(new ModAlertComposer(base));
            break;
        case 2:
            send(new ModMuteComposer(base));
            break;
        case 3:
            if (!init.banPermission) return 'You have insufficient permissions.';
            send(new ModBanComposer({ ...base, sanctionTypeId: action.sanctionTypeId, avatarOnly: action.actionId === 106 }));
            break;
        case 4:
            if (!init.kickPermission) return 'You have insufficient permissions.';
            send(new ModKickComposer(base));
            break;
        case 5:
            send(new ModTradingLockComposer({ userId, message, lengthMinutes: action.actionLengthHours * 60, topicId, issueId }));
            break;
        case 6:
            if (!message) return 'Please write a message to user.';
            send(new ModMessageComposer(base));
            break;
    }

    return undefined;
};

/** `SendMsgsCtrl.onSendButton`: `ModMessageMessageComposer(userId, text, -999, issueId)`, the window's issue or -1 (`:112`). */
export const sendModMessage = (send: Send, userId: number, message: string, issueId = NO_ISSUE) => send(new ModMessageComposer({ userId, message, topicId: NO_TOPIC, issueId }));

/** `RoomToolCtrl.onSendCaution` / `onSendMessage`: the action, and the room's lock, rename and kick when any is ticked. */
export const sendRoomModeration = (send: Send, flatId: number, caution: boolean, message: string, checks: { kick: boolean; lock: boolean; changeName: boolean }) => {
    send(new ModeratorActionComposer({ actionType: roomActionType(caution, checks.kick), message, extra: '' }));

    if (checks.lock || checks.changeName || checks.kick) send(new ModerateRoomComposer({ roomId: flatId, lockDoor: checks.lock, changeName: checks.changeName, kickUsers: checks.kick }));
};

/** `ModerationManager.openHkPage`'s window: one tab every housekeeping link reuses. */
const HOUSEKEEPING_WINDOW = 'housekeeping';

/**
 * `ModerationManager.openHkPage(urlKey, param)`: the hotel's housekeeping page, the configured URL with
 * the name or id appended - `habboinfotool.url` (a user), `moderatoractionlog.url` (their sanctions),
 * `identityinformationtool.url` (their identity) and `roomadmin.url` (a room). Flash appends to the
 * key's value even when the hotel has none, opening the bare name as a relative address; with no
 * page configured nothing opens here.
 */
export const openHousekeepingPage = (urlKey: string, param: string) => {
    const url = configString(urlKey);

    if (url.length) window.open(url + param, HOUSEKEEPING_WINDOW);
};

/** `IssueHandler.closeIssue`: every issue of the bundle closed with a resolution. */
export const closeModerationIssues = (send: Send, issueIds: number[], closeReason: number) => send(new CloseIssuesComposer({ issueIds, closeReason }));

/** `IssueHandler.onCloseSanction`: the issue closed with its default sanction, the bundle's others with it. */
export const closeModerationIssueWithDefaultAction = (send: Send, issueId: number, issueIds: number[]) => send(new CloseIssueDefaultActionComposer({ issueId, otherIssueIds: issueIds.filter(x => x !== issueId), topicId: -1 }));

/** `ModerationManager.storeWindowPreferences`: the issue handler's place, kept and sent. */
export const saveModerationToolPreferences = (send: Send, preferences: { x: number; y: number; width: number; height: number }) => {
    moderationIssueStore.getState().setPreferences(preferences);
    send(new ModToolPreferencesComposer({ windowX: preferences.x, windowY: preferences.y, windowWidth: preferences.width, windowHeight: preferences.height }));
};

/** `IssueManager.pickBundle`. */
export const pickModerationBundle = (send: Send, bundleId: number, message: string) => moderationIssueStore.getState().pickBundle(bundleId, message, moderationIssueSends(send));

/** `IssueManager.autoPick`: the next bundle in line. */
export const autoPickModerationBundle = (send: Send, message: string) => moderationIssueStore.getState().autoPick(message, moderationIssueSends(send));

/** `IssueManager.releaseBundle`. */
export const releaseModerationBundle = (send: Send, bundleId: number) => moderationIssueStore.getState().releaseBundle(bundleId, moderationIssueSends(send));

/** `IssueManager.releaseAll`: every bundle the moderator holds. */
export const releaseAllModerationBundles = (send: Send, userId: number) => moderationIssueStore.getState().releaseAll(userId, moderationIssueSends(send));
