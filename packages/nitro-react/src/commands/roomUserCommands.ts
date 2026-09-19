import { AmbassadorAlertComposer, AssignRightsComposer, BanUserWithDurationComposer, DropCarryItemComposer, GetExtendedProfileComposer, GetRelationshipStatusInfoComposer, GetSelectedBadgesComposer, IgnoreUserComposer, KickUserComposer, MuteUserComposer, OpenTradingComposer, PassCarryItemComposer, RemoveRightsComposer, ReplenishRespectComposer, RequestFriendComposer, RespectUserComposer, SetRelationshipStatusComposer, UnignoreUserComposer, UnmuteUserComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `RoomWidgetUserActionMessage` ban types, sent to the server as they are. */
export type RoomBanType = 'RWUAM_BAN_USER_HOUR' | 'RWUAM_BAN_USER_DAY' | 'RWUAM_BAN_USER_PERM';

/** `RelationshipStatusEnum`: what a friend is to you. */
export const RELATIONSHIP_NONE = 0;
export const RELATIONSHIP_HEART = 1;
export const RELATIONSHIP_SMILE = 2;
export const RELATIONSHIP_BOBBA = 3;

/** `respect.replenish_cost_duckets`'s default. */
const DEFAULT_REPLENISH_COST = 50;

/** The activity point type duckets are counted in. */
const DUCKETS = 0;

const roomId = () => roomStore.getState().room?.roomId ?? 0;

/*
 * What `InfoStandWidgetHandler.processWidgetMessage` did with each `RWUAM_*` message: the avatar
 * menus and the infostand both act on people through these, so a button does the same thing
 * wherever it sits. Each takes the user's server id unless it says otherwise.
 */

/** Everything the infostand shows about a user that the room does not already carry. */
export const requestUserDetails = (send: Send, webId: number) => {
    send(new GetSelectedBadgesComposer({ userId: webId }));
    send(new GetRelationshipStatusInfoComposer({ userId: webId }));
};

export const sendFriendRequest = (send: Send, webId: number, name: string) => {
    send(new RequestFriendComposer({ playerName: name }));
    userStore.getState().markFriendRequestSent(webId);
};

/** `SessionDataManager.giveRespect`: only while there is respect left, counted down as it goes. */
export const respectUser = (send: Send, webId: number) => {
    if ((webId < 0) || (userStore.getState().respectLeft <= 0)) return;

    send(new RespectUserComposer({ userId: webId }));
    userStore.getState().spendRespect();
};

/**
 * Buying the day's respects back costs duckets, and is only offered once they have run out.
 * Short of the price it says so; otherwise it asks first.
 */
export const replenishRespect = (send: Send, translate: (key: string, fallback?: string, params?: Record<string, string>) => string, cost: number = DEFAULT_REPLENISH_COST) => {
    const { activityPoints } = userStore.getState();
    const { showAlert, showConfirm } = systemStore.getState();
    const params = { amount: cost.toString() };

    if ((activityPoints[DUCKETS] ?? 0) < cost) {
        showAlert(translate('respect.replenish.not_enough_duckets.title'), translate('respect.replenish.not_enough_duckets.title', '', params));

        return;
    }

    showConfirm(translate('respect.replenish.title'), translate('respect.replenish.desc', '', params), () => send(new ReplenishRespectComposer({})));
};

export const whisperUser = (name: string) => roomStore.getState().setChatInputContent('whisper', name);

export const ignoreUser = (send: Send, webId: number) => send(new IgnoreUserComposer({ userId: webId }));

export const unignoreUser = (send: Send, webId: number) => send(new UnignoreUserComposer({ userId: webId }));

export const kickUser = (send: Send, webId: number) => send(new KickUserComposer({ userId: webId }));

export const banUser = (send: Send, webId: number, banType: RoomBanType) => send(new BanUserWithDurationComposer({ userId: webId, roomId: roomId(), banType }));

export const muteUser = (send: Send, webId: number, minutes: number) => send(new MuteUserComposer({ userId: webId, roomId: roomId(), durationInMinutes: minutes }));

export const unmuteUser = (send: Send, webId: number) => send(new UnmuteUserComposer({ userId: webId, roomId: roomId() }));

export const giveRights = (send: Send, webId: number) => send(new AssignRightsComposer({ userId: webId }));

export const takeRights = (send: Send, webId: number) => send(new RemoveRightsComposer({ userIds: [ webId ] }));

/** Trading is opened on the room object, not the account: `HabboInventory.setupTrading(roomObjectId)`. */
export const startTrading = (send: Send, roomObjectId: number) => send(new OpenTradingComposer({ objectId: roomObjectId }));

export const openProfile = (send: Send, webId: number) => send(new GetExtendedProfileComposer({ userId: webId, openProfile: true }));

export const passCarryItem = (send: Send, webId: number) => send(new PassCarryItemComposer({ userId: webId }));

export const dropCarryItem = (send: Send) => send(new DropCarryItemComposer({}));

export const setRelationship = (send: Send, webId: number, relationship: number) => send(new SetRelationshipStatusComposer({ playerId: webId, relationshipType: relationship }));

export const ambassadorAlert = (send: Send, webId: number) => send(new AmbassadorAlertComposer({ userId: webId }));
