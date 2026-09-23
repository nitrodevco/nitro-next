import { AvatarActionStateType, AvatarFigurePartType, AvatarGenderType, IRoomUserData, IVector3D, PetType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { AvatarEffectMessage, BlockUserUpdateMessage, CarryObjectMessage, DanceMessage, ExpressionMessage, IRoomAvatar, IRoomAvatarBot, IRoomAvatarPet, IRoomAvatarRentableBot, IRoomAvatarUser, SleepMessage, UseObjectMessage, UserChangeMessage, UserObjectMessage, UserRemoveMessage, UsersMessage, UserTypingMessage, UserUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The user half of Flash's `RoomMessageHandler` and its `RoomUsersHandler`: avatars, pets and
 * bots arriving, moving, changing and leaving, plus the per-avatar state - dance, expression,
 * effect, sleep, hand item, typing. Each packet updates the room object (which draws it) and the
 * store's `usersByRoomObjectId` (which the widgets read).
 *
 * A blocked user is drawn as the generic blocked figure: `RoomEngine.addObjectUser` checked the
 * block list as the avatar arrived, and `RoomMessageHandler.onBlockUserUpdate` swapped it when
 * someone in the room was blocked or unblocked.
 */
export const registerRoomUserHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setOwnRoomIndex, setIsOwnDancing, updateUsers, updateUserPartial, removeUser } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(UsersMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            const datas: IRoomUserData[] = [];

            for (const avatar of data.avatars) {
                const location = new Vector3d(avatar.x, avatar.y, avatar.z);
                const direction = new Vector3d(avatar.bodyRotation);

                room.addRoomObjectUser(avatar.objectId, location, direction, avatar.bodyRotation, avatar.avatarType, avatar.figure);

                if ((avatar.avatarType === RoomObjectUserType.User) && userStore.getState().blockedUserIds.includes(avatar.webId)) room.updateRoomObjectUserBlocked(avatar.objectId, true);

                if (avatar.webId === userStore.getState().userId) {
                    setOwnRoomIndex(avatar.objectId);
                    room.updateRoomObjectUserOwn(avatar.objectId);
                }

                switch (avatar.avatarType) {
                    case RoomObjectUserType.User: {
                        const avatarUser = avatar as IRoomAvatar & IRoomAvatarUser;

                        datas.push({
                            id: avatarUser.objectId,
                            objectId: avatarUser.objectId,
                            category: RoomObjectCategoryEnum.Unit,
                            name: avatarUser.name,
                            userType: avatarUser.avatarType,
                            gender: avatarUser.gender.toUpperCase() as AvatarGenderType,
                            figure: avatarUser.figure,
                            custom: avatarUser.motto,
                            webID: avatarUser.webId,
                            activityPoints: avatarUser.activityPoints,
                            groupId: avatarUser.groupId,
                            groupName: avatarUser.groupName,
                            groupStatus: avatarUser.groupStatus,
                            isModerator: avatarUser.isModerator,
                            badgesRank: avatarUser.badgesRank,
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
                            botSkills: [],
                        });

                        room.updateRoomObjectUserFigure(avatarUser.objectId, avatarUser.figure, avatarUser.gender);

                        break;
                    }
                    case RoomObjectUserType.Bot: {
                        const avatarBot = avatar as IRoomAvatar & IRoomAvatarBot;

                        datas.push({
                            id: avatarBot.objectId,
                            objectId: avatarBot.objectId,
                            category: RoomObjectCategoryEnum.Unit,
                            name: avatarBot.name,
                            userType: avatarBot.avatarType,
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
                            botSkills: [],
                        });

                        room.updateRoomObjectUserFigure(avatarBot.objectId, avatarBot.figure, avatarBot.gender);

                        break;
                    }
                    case RoomObjectUserType.RentableBot: {
                        const avatarRentableBot = avatar as IRoomAvatar & IRoomAvatarRentableBot;

                        datas.push({
                            id: avatarRentableBot.objectId,
                            objectId: avatarRentableBot.objectId,
                            category: RoomObjectCategoryEnum.Unit,
                            name: avatarRentableBot.name,
                            userType: avatarRentableBot.avatarType,
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
                            botSkills: avatarRentableBot.skills,
                        });

                        room.updateRoomObjectUserFigure(avatarRentableBot.objectId, avatarRentableBot.figure, avatarRentableBot.gender);

                        break;
                    }
                    case RoomObjectUserType.Pet: {
                        const avatarPet = avatar as IRoomAvatar & IRoomAvatarPet;

                        datas.push({
                            id: avatarPet.objectId,
                            objectId: avatarPet.objectId,
                            category: RoomObjectCategoryEnum.Unit,
                            name: avatarPet.name,
                            userType: avatarPet.avatarType,
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
                            botSkills: [],
                        });

                        room.updateRoomObjectUserFigure(avatarPet.objectId, avatarPet.figure, 'm', avatarPet.subType, avatarPet.isRiding);

                        if (room.getPetTypeId(avatarPet.figure) === PetType.MONSTERPLANT) room.updateRoomObjectUserPosture(avatarPet.objectId, avatarPet.petPosture);

                        break;
                    }
                }
            }

            updateUsers(datas);
        }),

        on(UserUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            const zScale = room.getRoomValue<number>(RoomObjectVariableEnum.RoomZScale) || 1;

            for (const update of data.updates) {
                let height = update.height;

                if (zScale > 0) height = height / zScale;

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
                            postureType = action.key;
                            parameter = action.value;
                            break;
                        }
                        case 'swim': {
                            somethingElse = true;
                            postureUpdate = true;
                            postureType = action.key;
                            parameter = action.value;
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
                            postureType = action.key;
                            parameter = action.value;
                            break;
                        }
                    }
                }

                if (!something && somethingElse) {
                    postureUpdate = true;
                    postureType = AvatarActionStateType.Float;
                }

                if (postureUpdate) room.updateRoomObjectUserPosture(update.objectId, postureType, parameter);
                else if (isPosture) room.updateRoomObjectUserPosture(update.objectId, AvatarFigurePartType.Standard);
            }
        }),

        on(BlockUserUpdateMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            const user = Object.values(roomStore.getState().usersByRoomObjectId).find(x => (x.webID === data.userId) && (x.userType === RoomObjectUserType.User));

            if (user) room.updateRoomObjectUserBlocked(user.objectId, data.result === 1);
        }),

        /*
         * `RoomMessageHandler` keeps the own user id off `UserObjectEvent` (`§_-78b4fe§`) and
         * reads it in `onUsers`; here that id is `userStore.userId`. The user object is the answer
         * to the `InfoRetrieveComposer` `MainView` sends, and that send waits behind every packet
         * queued while the UI mounted - so a room whose `Users` sat in that queue is entered with
         * the id still -1, and `onUsers`' own-user branch is missed for the whole session. Adopting
         * the avatar when the user object lands keeps `ownRoomIndex` and the avatar's `own_user`
         * flag right whichever order the two arrive in.
         */
        on(UserObjectMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            const own = roomStore.getState().getUserByWebId(data.userInfo.userId, RoomObjectUserType.User);

            if (!own || (roomStore.getState().ownRoomIndex === own.objectId)) return;

            setOwnRoomIndex(own.objectId);
            room.updateRoomObjectUserOwn(own.objectId);
        }),

        on(UserRemoveMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.removeRoomObject(data.objectId, RoomObjectCategoryEnum.Unit);

            removeUser(data.objectId);
        }),

        on(UserChangeMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserFigure(data.objectId, data.figure, data.gender);

            updateUserPartial(data.objectId, {
                figure: data.figure,
                gender: data.gender.toUpperCase() as AvatarGenderType,
                custom: data.customInfo,
                activityPoints: data.achievementScore,
                hasSaddle: false,
                isRiding: false,
            });
        }),

        on(ExpressionMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureExpression, data.expressionType);
        }),

        on(DanceMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            if (data.objectId === roomStore.getState().ownRoomIndex) setIsOwnDancing(data.danceStyle > 0);

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureDance, data.danceStyle);
        }),

        on(AvatarEffectMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserEffect(data.objectId, data.effectId, data.delayMilliseconds);
        }),

        on(SleepMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureSleep, data.isSleeping ? 1 : 0);
        }),

        on(CarryObjectMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureCarryObject, data.itemType);
        }),

        on(UseObjectMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureUseObject, data.itemType);
        }),

        on(UserTypingMessage, (data) => {
            const room = getRoom();

            if (!room) return;

            room.updateRoomObjectUserAction(data.objectId, RoomObjectVariableEnum.FigureIsTyping, data.isTyping ? 1 : 0);
        }),
    ]);
};
