
import type { IRoomUserData, IVector3D } from "@nitrodevco/nitro-api";
import { AvatarGenderType } from "@nitrodevco/nitro-api";
import { AvatarActionStateType, AvatarFigurePartType, PetType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import type { IRoomAvatar, IRoomAvatarBot, IRoomAvatarPet, IRoomAvatarRentableBot, IRoomAvatarUser } from "@nitrodevco/nitro-shared";
import { AvatarEffectMessage, CarryObjectMessage, DanceMessage, ExpressionMessage, SleepMessage, UseObjectMessage, UserChangeMessage, UserRemoveMessage, UsersMessage, UserTypingMessage, UserUpdateMessage } from "@nitrodevco/nitro-shared";

import { useOwnUserId, useRoomSelector, useRoomSessionActions, useRoomUsersActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomUserHandler = () => {
    const room = useRoomSelector();
    const ownUserId = useOwnUserId();
    const { setOwnRoomIndex } = useRoomSessionActions();
    const { updateUsers, updateUserPartial, removeUser } = useRoomUsersActions();

    useMessageListener(UsersMessage, data => {
        if (!room) return;

        const datas: IRoomUserData[] = [];

        for (const avatar of data.avatars) {
            const location = new Vector3d(avatar.x, avatar.y, avatar.z);
            const direction = new Vector3d(avatar.bodyRotation);

            room.addRoomObjectUser(avatar.objectId, location, direction, avatar.bodyRotation, avatar.avatarType, avatar.figure);

            if (avatar.webId === ownUserId) {
                setOwnRoomIndex(avatar.objectId);
                room.updateRoomObjectUserOwn(avatar.objectId);
            }

            switch (avatar.avatarType) {
                case RoomObjectUserType.User: {
                    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
                    const avatarUser = avatar as IRoomAvatar & IRoomAvatarUser;

                    datas.push({
                        id: avatarUser.objectId,
                        objectId: avatarUser.objectId,
                        name: avatarUser.name,
                        type: avatarUser.avatarType,
                        gender: avatarUser.gender.toUpperCase() as AvatarGenderType,
                        figure: avatarUser.figure,
                        custom: avatarUser.motto,
                        webID: avatarUser.webId,
                        activityPoints: avatarUser.activityPoints,
                        groupId: avatarUser.groupId,
                        groupName: avatarUser.groupName,
                        groupStatus: avatarUser.groupStatus,
                        isModerator: avatarUser.isModerator,
                        ownerId: -1,
                        ownerName: '',
                        rarityLevel: -1,
                        hasSaddle: false,
                        isRiding: false,
                        canBreed: false,
                        canHarvest: false,
                        canRevive: false,
                        hasBreedingPermission: false,
                        petLevel: -1,
                        petPosture: '',
                        botSkills: []
                    });

                    room.updateRoomObjectUserFigure(avatarUser.objectId, avatarUser.figure, avatarUser.gender);

                    break;
                }
                case RoomObjectUserType.Bot: {
                    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
                    const avatarBot = avatar as IRoomAvatar & IRoomAvatarBot;

                    datas.push({
                        id: avatarBot.objectId,
                        objectId: avatarBot.objectId,
                        name: avatarBot.name,
                        type: avatarBot.avatarType,
                        gender: avatarBot.gender.toUpperCase() as AvatarGenderType,
                        figure: avatarBot.figure,
                        custom: avatarBot.motto,
                        webID: avatarBot.webId,
                        activityPoints: 0,
                        groupId: -1,
                        groupName: '',
                        groupStatus: -1,
                        isModerator: false,
                        ownerId: -1,
                        ownerName: '',
                        rarityLevel: -1,
                        hasSaddle: false,
                        isRiding: false,
                        canBreed: false,
                        canHarvest: false,
                        canRevive: false,
                        hasBreedingPermission: false,
                        petLevel: -1,
                        petPosture: '',
                        botSkills: []
                    });

                    room.updateRoomObjectUserFigure(avatarBot.objectId, avatarBot.figure, avatarBot.gender);

                    break;
                }
                case RoomObjectUserType.RentableBot: {
                    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
                    const avatarRentableBot = avatar as IRoomAvatar & IRoomAvatarRentableBot;

                    datas.push({
                        id: avatarRentableBot.objectId,
                        objectId: avatarRentableBot.objectId,
                        name: avatarRentableBot.name,
                        type: avatarRentableBot.avatarType,
                        gender: avatarRentableBot.gender.toUpperCase() as AvatarGenderType,
                        figure: avatarRentableBot.figure,
                        custom: avatarRentableBot.motto,
                        webID: avatarRentableBot.webId,
                        activityPoints: 0,
                        groupId: -1,
                        groupName: '',
                        groupStatus: -1,
                        isModerator: false,
                        ownerId: avatarRentableBot.ownerId,
                        ownerName: avatarRentableBot.ownerName,
                        rarityLevel: -1,
                        hasSaddle: false,
                        isRiding: false,
                        canBreed: false,
                        canHarvest: false,
                        canRevive: false,
                        hasBreedingPermission: false,
                        petLevel: -1,
                        petPosture: '',
                        botSkills: avatarRentableBot.skills
                    });

                    room.updateRoomObjectUserFigure(avatarRentableBot.objectId, avatarRentableBot.figure, avatarRentableBot.gender);

                    break;
                }
                case RoomObjectUserType.Pet: {
                    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
                    const avatarPet = avatar as IRoomAvatar & IRoomAvatarPet;

                    datas.push({
                        id: avatarPet.objectId,
                        objectId: avatarPet.objectId,
                        name: avatarPet.name,
                        type: avatarPet.avatarType,
                        gender: AvatarGenderType.Unisex,
                        figure: avatarPet.figure,
                        custom: avatarPet.motto,
                        webID: avatarPet.webId,
                        activityPoints: 0,
                        groupId: -1,
                        groupName: '',
                        groupStatus: -1,
                        isModerator: false,
                        ownerId: avatarPet.ownerId,
                        ownerName: avatarPet.ownerName,
                        rarityLevel: avatarPet.rarityLevel,
                        hasSaddle: avatarPet.hasSaddle,
                        isRiding: avatarPet.isRiding,
                        canBreed: avatarPet.canBreed,
                        canHarvest: avatarPet.canHarvest,
                        canRevive: avatarPet.canRevive,
                        hasBreedingPermission: avatarPet.hasBreedingPermission,
                        petLevel: avatarPet.petLevel,
                        petPosture: avatarPet.petPosture,
                        botSkills: []
                    });

                    room.updateRoomObjectUserFigure(avatarPet.objectId, avatarPet.figure, 'm', avatarPet.subType, avatarPet.isRiding);

                    if (room.getPetTypeId(avatarPet.figure) === PetType.MONSTERPLANT) room.updateRoomObjectUserPosture(avatarPet.objectId, avatarPet.petPosture);

                    break;
                }
            }
        }

        updateUsers(datas);
    });

    useMessageListener(UserUpdateMessage, data => {
        if (!room) return;

        const zScale = room.getRoomValue<number>(RoomObjectVariableEnum.RoomZScale) || 1;

        for (const update of data.updates) {
            const height = (update.height / zScale);

            const location = new Vector3d(update.sourceX, update.sourceY, (update.sourceZ + height));
            const direction = new Vector3d(update.bodyRotation);

            let target: IVector3D | undefined = undefined;

            if (update.didMove) target = new Vector3d(update.targetX, update.targetY, update.targetZ);

            room.updateRoomObjectUser(update.objectId, location, target, update.canStandUp, height, direction, update.headRotation);
            room.updateRoomObjectUserFlatControl(update.objectId, '');

            let isPosture = true;
            let postureUpdate = false;
            let postureType: string = AvatarFigurePartType.Standard;
            let something = false;
            let somethingElse = false;
            let parameter = '';

            for (const action of update.actions) {
                switch (action.key) {
                    case 'flatctrl': {
                        room.updateRoomObjectUserFlatControl(update.objectId, action.value);
                        break;
                    }
                    case 'sign': {
                        if (update.actions.length === 1) isPosture = false;

                        room.updateRoomObjectUserAction(update.objectId, RoomObjectVariableEnum.FigureSign, parseInt(action.value));
                        break;
                    }
                    case 'gst': {
                        if (update.actions.length === 1) isPosture = false;

                        room.updateRoomObjectUserPetGesture(update.objectId, action.value);
                        break;
                    }
                    case 'wav':
                    case 'mv': {
                        something = true;
                        postureUpdate = true;
                        break;
                    }
                    case 'swim': {
                        somethingElse = true;
                        postureUpdate = true;
                        break;
                    }
                    case 'wf': {
                        break;
                    }
                    case 'trd': {
                        break;
                    }
                    default: {
                        postureUpdate = true;
                        break;
                    }
                }

                postureType = action.key;
                parameter = action.value;
            }

            if (!something && somethingElse) {
                postureUpdate = true;
                postureType = AvatarActionStateType.Float;
            }

            if (postureUpdate) room.updateRoomObjectUserPosture(update.objectId, postureType, parameter);
            else if (isPosture) room.updateRoomObjectUserPosture(update.objectId, AvatarFigurePartType.Standard);
        }
    });

    useMessageListener(UserRemoveMessage, data => {
        if (!room) return;

        room.removeRoomObject(data.objectId, RoomObjectCategoryEnum.Unit);

        removeUser(data.objectId);
    });

    useMessageListener(UserChangeMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserFigure(data.objectId, data.figure, data.gender);

        updateUserPartial(data.objectId, {
            figure: data.figure,
            gender: data.gender.toUpperCase() as AvatarGenderType,
            custom: data.customInfo,
            activityPoints: data.achievementScore,
            hasSaddle: false,
            isRiding: false
        });
    });

    useMessageListener(ExpressionMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureExpression, data.expressionType);
    });

    useMessageListener(DanceMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureDance, data.danceStyle);
    });

    useMessageListener(AvatarEffectMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserEffect(data.objectId, data.effectId, data.delayMilliseconds);
    });

    useMessageListener(SleepMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureSleep, data.isSleeping ? 1 : 0);
    });

    useMessageListener(CarryObjectMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureCarryObject, data.itemType);
    });

    useMessageListener(UseObjectMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureUseObject, data.itemType);
    });

    useMessageListener(UserTypingMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureIsTyping, data.isTyping ? 1 : 0);
    });
}