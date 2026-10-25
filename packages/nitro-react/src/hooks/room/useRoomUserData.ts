/**
 * One user in the room as the avatar menu and the infostand see them - Flash's `AvatarInfoData`,
 * with the checks `InfoStandWidgetHandler` made: who they are, their badges and relationships,
 * and which actions (friend, kick, ban, mute, trade) you may take on them, from both sides' rights.
 */
import { AvatarActionStateType, AvatarGenderType, IRoomObjectModel, RoomControllerLevelEnum, RoomModerationType, RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { IHabboUserBadge, IRelationshipStatusInfo } from '@nitrodevco/nitro-packets';

import { countFriends } from '#base/commands';
import { useIsRoomOwner, useOwnControllerLevel, useRoom, useRoomStore, useRoomUserByObjectId } from '#base/context/room';
import { useConfigBoolean } from '#base/context/system';
import { useIsSystemShutdown, useOwnUserId, useUserStore } from '#base/context/user';

import { useRoomObjectModelVersion } from './useRoomObjectModelVersion';

const NO_BADGES: IHabboUserBadge[] = [];
const NO_RELATIONSHIPS: IRelationshipStatusInfo[] = [];

/** `canTradeReason`: why the trade button carries a tooltip. */
export const TRADE_REASON_NONE = 0;
export const TRADE_REASON_SHUTDOWN = 2;
export const TRADE_REASON_ROOM = 3;

/** Everything the avatar menu and the infostand know about one user in the room - Flash's `AvatarInfoData`. */
export interface AvatarInfo {
    objectId: number;
    webId: number;
    userType: number;
    name: string;
    motto: string;
    figure: string;
    gender: AvatarGenderType;
    achievementScore: number;
    isOwnUser: boolean;
    carryItem: number;
    effectId: number;
    posture: string;
    canStandUp: boolean;
    groupId: number;
    groupName: string;
    /** The group's badge code, once the room's group badges have arrived. */
    groupBadge: string;
    badges: IHabboUserBadge[];
    relationships: IRelationshipStatusInfo[];
    /** The target's rights in this room. */
    targetControllerLevel: RoomControllerLevelEnum;
    /** Your own rights in this room. */
    myControllerLevel: RoomControllerLevelEnum;
    amIOwner: boolean;
    isGuildRoom: boolean;
    isBlocked: boolean;
    isIgnored: boolean;
    isFriend: boolean;
    canBeAskedAsFriend: boolean;
    /** The friend's relationship to you, when they are one. */
    relationshipStatus: number;
    canBeKicked: boolean;
    canBeBanned: boolean;
    canBeMuted: boolean;
    canTrade: boolean;
    canTradeReason: number;
    /** Own user only: whether the name may still be changed. */
    allowNameChange: boolean;
    realName: string;
}

/**
 * `InfoStandWidgetHandler.checkUserWithRightsModerationLevel`: who a room's moderation setting lets act.
 * Rights holders are level 1 and owners and staff 4 and up; guild admins count only in a guild room.
 */
const settingAllows = (setting: RoomModerationType, myLevel: RoomControllerLevelEnum, isGuildRoom: boolean) => {
    const hasRights = (myLevel === RoomControllerLevelEnum.Guest) || (myLevel >= RoomControllerLevelEnum.RoomOwner);
    const isGuildAdmin = isGuildRoom && (myLevel >= RoomControllerLevelEnum.GuildAdmin);

    switch (setting) {
        case RoomModerationType.Rights:
            return hasRights;
        case RoomModerationType.GroupRights:
            return isGuildAdmin;
        case RoomModerationType.RightsOrGroup:
            return hasRights || isGuildAdmin;
        default:
            return myLevel >= RoomControllerLevelEnum.RoomOwner;
    }
};

/** What the avatar's model holds that changes while it is in the room, as of `_version` (`useRoomObjectModelVersion`). */
const readFigureModel = (model: IRoomObjectModel, _version: string) => ({
    targetControllerLevel: (model.getValue<RoomControllerLevelEnum>(RoomObjectVariableEnum.FigureFlatControl) ?? RoomControllerLevelEnum.None),
    carryItem: model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0,
    effectId: model.getValue<number>(RoomObjectVariableEnum.FigureEffect) ?? 0,
    posture: model.getValue<string>(RoomObjectVariableEnum.FigurePosture) ?? AvatarActionStateType.Stand,
    canStandUp: model.getValue<boolean>(RoomObjectVariableEnum.FigureCanStandUp),
});

export const useRoomUserData = (objectId: number): AvatarInfo | undefined => {
    const room = useRoom();
    const userData = useRoomUserByObjectId(objectId);
    const badges = useRoomStore(x => (userData ? x.userBadges[userData.webID] : undefined)) ?? NO_BADGES;
    const relationships = useRoomStore(x => (userData ? x.relationshipsByUserId[userData.webID] : undefined)) ?? NO_RELATIONSHIPS;
    const myControllerLevel = useOwnControllerLevel();
    const amIOwner = useIsRoomOwner();
    const tradeMode = useRoomStore(x => x.tradeMode);
    const isGuildRoom = useRoomStore(x => x.isGuildRoom);
    const moderation = useRoomStore(x => x.moderationSettings);
    const ownUserId = useOwnUserId();
    const systemShutdown = useIsSystemShutdown();
    const nameChangeAllowed = useUserStore(x => x.nameChangeAllowed);
    const ownRealName = useUserStore(x => x.realName);
    const isBlocked = useUserStore(x => !!userData && x.blockedUserIds.includes(userData.webID));
    const isIgnored = useUserStore(x => !!userData && x.ignoredUserIds.includes(userData.webID));
    const friend = useUserStore(x => (userData ? x.friends[userData.webID] : undefined));
    const requestSent = useUserStore(x => !!userData && x.sentFriendRequestIds.includes(userData.webID));
    const friendListFull = useUserStore(x => countFriends(x.friends) >= x.userFriendLimit);
    const groupBadge = useUserStore(x => (userData ? (x.groupBadges[userData.groupId] ?? '') : ''));
    // `InfoStandWidgetHandler.isActivityDisplayEnabled`: `getBoolean`, so off unless the hotel sets it.
    const activityDisplayEnabled = useConfigBoolean('activity.point.display.enabled');
    const modelVersion = useRoomObjectModelVersion(objectId, RoomObjectCategoryEnum.Unit);

    if (!room || !userData) return undefined;

    const roomObject = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

    if (!roomObject) return undefined;

    const isOwnUser = userData.webID === ownUserId;
    const { targetControllerLevel, carryItem, effectId, posture, canStandUp } = readFigureModel(roomObject.model, modelVersion);

    const info: AvatarInfo = {
        objectId: userData.objectId,
        webId: userData.webID,
        userType: userData.userType,
        name: userData.name,
        motto: userData.custom,
        figure: userData.figure,
        gender: userData.gender,
        achievementScore: activityDisplayEnabled ? userData.activityPoints : 0,
        isOwnUser,
        carryItem,
        effectId,
        posture,
        canStandUp,
        groupId: userData.groupId,
        groupName: userData.groupName,
        groupBadge,
        badges,
        relationships,
        targetControllerLevel,
        myControllerLevel,
        amIOwner,
        isGuildRoom,
        isBlocked: !isOwnUser && isBlocked,
        isIgnored: !isOwnUser && isIgnored,
        isFriend: !!friend,
        // `HabboFriendList.canBeAskedForAFriend`: not yourself, not already a friend, not already asked, and room on the friend list.
        canBeAskedAsFriend: !isOwnUser && !friend && !requestSent && !friendListFull,
        relationshipStatus: friend ? Number(friend.relationshipType) : 0,
        canBeKicked: false,
        canBeBanned: false,
        canBeMuted: false,
        canTrade: false,
        canTradeReason: TRADE_REASON_NONE,
        allowNameChange: isOwnUser && nameChangeAllowed,
        realName: isOwnUser ? ownRealName : (friend?.realName ?? ''),
    };

    if (!isOwnUser) {
        // `determineModerationLevel`: nobody at owner level or above can be acted on.
        const actable = targetControllerLevel < RoomControllerLevelEnum.RoomOwner;

        info.canBeMuted = actable && settingAllows(moderation.whoCanMute, myControllerLevel, isGuildRoom);
        info.canBeKicked = actable && ((moderation.whoCanKick === RoomModerationType.All) || settingAllows(moderation.whoCanKick, myControllerLevel, isGuildRoom));
        info.canBeBanned = actable && settingAllows(moderation.whoCanBan, myControllerLevel, isGuildRoom);

        // Guild members and people without rights count as "no rights" for a rights-only trading room.
        const hasTradeRights = (level: RoomControllerLevelEnum) => (level !== RoomControllerLevelEnum.None) && (level !== RoomControllerLevelEnum.GuildMember);

        if (!systemShutdown) {
            switch (tradeMode) {
                case RoomTradeModeEnum.RoomOwnerAndRights:
                    info.canTrade = hasTradeRights(myControllerLevel) || hasTradeRights(targetControllerLevel);
                    break;
                case RoomTradeModeEnum.Everyone:
                    info.canTrade = true;
                    break;
            }
        }

        if (systemShutdown) info.canTradeReason = TRADE_REASON_SHUTDOWN;
        if (tradeMode !== RoomTradeModeEnum.Everyone) info.canTradeReason = TRADE_REASON_ROOM;
    }

    return info;
};
