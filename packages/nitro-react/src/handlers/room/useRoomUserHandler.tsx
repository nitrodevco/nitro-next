
import { PetType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { AvatarEffectMessage, CarryObjectMessage, DanceMessage, ExpressionMessage, SleepMessage, UseObjectMessage, UserChangeMessage, UserRemoveMessage, UsersMessage, UserTypingMessage, UserUpdateMessage } from "@nitrodevco/nitro-shared";

import { useOwnUserId, useRoomSelector, useRoomSessionActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

import type { IRoomAvatar } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomAvatar";
import type { IRoomAvatarBot } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomAvatarBot";
import type { IRoomAvatarPet } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomAvatarPet";
import type { IRoomAvatarRentableBot } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomAvatarRentableBot";
import type { IRoomAvatarUser } from "../../../../nitro-shared/src/packets/incoming/Room/Engine/Data/IRoomAvatarUser";

export const useRoomUserHandler = () => {
    const room = useRoomSelector();
    const ownUserId = useOwnUserId();
    const { setOwnRoomIndex } = useRoomSessionActions();

    useMessageListener(UsersMessage, data => {
        if (!room) return;

        for (const avatar of data.avatars) {
            const location = new Vector3d(avatar.x, avatar.y, avatar.z);
            const direction = new Vector3d(avatar.bodyRotation);

            room.addRoomObjectUser(avatar.objectId, location, direction, avatar.bodyRotation, avatar.avatarType, avatar.figure);

            if (avatar.webId === ownUserId) {
                setOwnRoomIndex(avatar.objectId);
                room.updateRoomObjectUserOwn(avatar.objectId);
            }

            if (avatar.avatarType === RoomObjectUserType.Pet) {
                const avatarPet = avatar as unknown as IRoomAvatar & IRoomAvatarPet;

                room.updateRoomObjectUserFigure(avatarPet.objectId, avatarPet.figure, 'm', avatarPet.subType, avatarPet.isRiding);

                if (room.getPetTypeId(avatarPet.figure) === PetType.MONSTERPLANT) room.updateRoomObjectUserPosture(avatarPet.objectId, avatarPet.petPosture);
            } else {
                const avatarUser = avatar as unknown as IRoomAvatar & (IRoomAvatarUser | IRoomAvatarBot | IRoomAvatarRentableBot);

                room.updateRoomObjectUserFigure(avatarUser.objectId, avatarUser.figure, avatarUser.gender);
            }
        }
    });

    useMessageListener(UserUpdateMessage, data => {
        if (!room) return;

        const zScale = room.getRoomValue<number>(RoomObjectVariableEnum.RoomZScale) || 1;
    });

    useMessageListener(UserRemoveMessage, data => {
        if (!room) return;

        room.removeRoomObject(data.objectId, RoomObjectCategoryEnum.Unit);
    });

    useMessageListener(UserChangeMessage, data => {
        if (!room) return;

        room.updateRoomObjectUserFigure(data.objectId, data.figure, data.gender);
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