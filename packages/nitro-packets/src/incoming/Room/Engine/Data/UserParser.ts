import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { RoomObjectUserType } from "@nitrodevco/nitro-api";

import { IRoomAvatar } from "./IRoomAvatar";
import { IRoomAvatarUser } from "./IRoomAvatarUser";
import { IRoomAvatarBot } from "./IRoomAvatarBot";
import { IRoomAvatarRentableBot } from "./IRoomAvatarRentableBot";
import { convertSwimFigure } from "./SwimFigureUtils";

export const UserParser = (wrapper: IMessageDataWrapper): IRoomAvatar => {
    let avatar = {
        webId: wrapper.readInt(),
        name: wrapper.readString(),
        motto: wrapper.readString(),
        figure: wrapper.readString(),
        objectId: wrapper.readInt(),
        x: wrapper.readInt(),
        y: wrapper.readInt(),
        z: parseFloat(wrapper.readString()),
        bodyRotation: wrapper.readInt(),
        avatarType: wrapper.readInt()
    } as IRoomAvatar;

    switch (avatar.avatarType) {
        case RoomObjectUserType.User: {
            const data = {
                gender: wrapper.readString(),
                groupId: wrapper.readInt(),
                groupStatus: wrapper.readInt(),
                groupName: wrapper.readString(),
                swimFigure: wrapper.readString(),
                activityPoints: wrapper.readInt(),
                isModerator: wrapper.readBoolean()
            } as IRoomAvatarUser;

            if (data.swimFigure !== '') avatar.figure = convertSwimFigure(data.swimFigure, avatar.figure, data.gender);

            avatar = { ...avatar, ...data };
            break;
        }
        case RoomObjectUserType.Pet: {
            break;
        }
        case RoomObjectUserType.Bot: {
            const data = {} as IRoomAvatarBot;

            avatar = { ...avatar, ...data };
            break;
        }
        case RoomObjectUserType.RentableBot: {
            const data = {
                gender: wrapper.readString(),
                ownerId: wrapper.readInt(),
                ownerName: wrapper.readString(),
                skills: []
            } as IRoomAvatarRentableBot;

            let count = wrapper.readInt();

            while (count > 0) {
                data.skills.push(wrapper.readShort());

                count--;
            }

            avatar = { ...avatar, ...data };
            break;
        }
    }

    return avatar;
}