import { AvatarActionStateType, IAvatarUserInfo, RoomControllerLevelEnum, RoomModerationType, RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomTradeModeEnum } from '@nitrodevco/nitro-api';

import { useIsSystemShutdown, useOwnControllerLevel, useOwnUserId, useRoomContext, useRoomSelector, useRoomSettingsSelector } from '#base/context';

const canModerate = (
    action: RoomModerationType,
    targetControllerLevel: RoomControllerLevelEnum,
    ownControllerLevel: RoomControllerLevelEnum,
    isGuildRoom: boolean,
): boolean => {
    const hasGuildOrOwnerRights = isGuildRoom
        ? ownControllerLevel >= RoomControllerLevelEnum.GuildAdmin
        : ownControllerLevel >= RoomControllerLevelEnum.Guest;

    const allowed = action === RoomModerationType.All
        ? true
        : action === RoomModerationType.Rights
            ? hasGuildOrOwnerRights
            : ownControllerLevel >= RoomControllerLevelEnum.RoomOwner;

    return allowed && targetControllerLevel < RoomControllerLevelEnum.RoomOwner;
};

export const useRoomUserData = (objectId: number) => {
    const room = useRoomSelector();
    const ownUserId = useOwnUserId();
    const userData = useRoomContext(x => x.usersByRoomObjectId[objectId]);
    const ownControllerLevel = useOwnControllerLevel();
    const { tradeMode, isGuildRoom, moderation } = useRoomSettingsSelector();
    const isSystemShutdown = useIsSystemShutdown();

    if (!room || !userData) return undefined;

    const roomObject = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

    if (!roomObject) return undefined;

    const isOwnUser = userData.webID === ownUserId;
    const controllerLevel = roomObject.model.getValue<RoomControllerLevelEnum>(RoomObjectVariableEnum.FigureFlatControl);
    const isIgnored = false;

    const userInfo: IAvatarUserInfo = {
        objectId: userData.objectId,
        name: userData.name,
        motto: userData.custom,
        figure: userData.figure,
        gender: userData.gender,
        achievementScore: userData.activityPoints,
        webId: userData.webID,
        userType: userData.userType,
        carryItem: roomObject.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0,
        effectId: roomObject.model.getValue<number>(RoomObjectVariableEnum.FigureEffect) ?? 0,
        posture: roomObject.model.getValue<AvatarActionStateType>(RoomObjectVariableEnum.FigurePosture) ?? AvatarActionStateType.Stand,
        canStandUp: roomObject.model.getValue<boolean>(RoomObjectVariableEnum.FigureCanStandUp) ?? false,
        controllerLevel,
        canBeMuted: false,
        canBeKicked: false,
        canBeBanned: false,
        canTrade: false,
        isOwnUser,
        isIgnored,
    };

    if (!isOwnUser) {
        userInfo.canBeMuted = canModerate(moderation.whoCanMute, controllerLevel, ownControllerLevel, isGuildRoom);
        userInfo.canBeKicked = canModerate(moderation.whoCanKick, controllerLevel, ownControllerLevel, isGuildRoom);
        userInfo.canBeBanned = canModerate(moderation.whoCanBan, controllerLevel, ownControllerLevel, isGuildRoom);
    }

    if (!isSystemShutdown) {
        if (tradeMode === RoomTradeModeEnum.Everyone) {
            userInfo.canTrade = true;
        } else if (tradeMode === RoomTradeModeEnum.RoomOwnerAndRights) {
            const hasRights = (level: RoomControllerLevelEnum) =>
                level !== RoomControllerLevelEnum.None && level !== RoomControllerLevelEnum.GuildMember;

            userInfo.canTrade = hasRights(ownControllerLevel) && hasRights(controllerLevel);
        }
    }

    return userInfo;
};
