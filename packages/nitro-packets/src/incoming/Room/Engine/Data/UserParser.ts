import { IMessageDataWrapper, RoomObjectUserType } from '@nitrodevco/nitro-api';

import { IRoomAvatar } from './IRoomAvatar';
import { IRoomAvatarBot } from './IRoomAvatarBot';
import { IRoomAvatarRentableBot } from './IRoomAvatarRentableBot';
import { convertSwimFigure } from './SwimFigureUtils';

/** `UsersMessageParser`'s figure for a plain bot whose own has a `/` in it. */
const DEFAULT_BOT_FIGURE = 'hr-100-.hd-180-1.ch-876-66.lg-270-94.sh-300-64';

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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        avatarType: wrapper.readInt() as RoomObjectUserType,
    };

    switch (avatar.avatarType) {
        case RoomObjectUserType.User: {
            const data = {
                gender: wrapper.readString(),
                groupId: wrapper.readInt(),
                groupStatus: wrapper.readInt(),
                groupName: wrapper.readString(),
                swimFigure: wrapper.readString(),
                activityPoints: wrapper.readInt(),
                isModerator: wrapper.readBoolean(),
                badgesRank: wrapper.readInt(),
            };

            if (data.swimFigure !== '') avatar.figure = convertSwimFigure(data.swimFigure, avatar.figure, data.gender);

            avatar = { ...avatar, ...data };
            break;
        }
        case RoomObjectUserType.Pet: {
            // Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
            const data = {
                subType: String(wrapper.readInt()),
                ownerId: wrapper.readInt(),
                ownerName: wrapper.readString(),
                rarityLevel: wrapper.readInt(),
                hasSaddle: wrapper.readBoolean(),
                isRiding: wrapper.readBoolean(),
                canBreed: wrapper.readBoolean(),
                canHarvest: wrapper.readBoolean(),
                canRevive: wrapper.readBoolean(),
                hasBreedingPermission: wrapper.readBoolean(),
                petLevel: wrapper.readInt(),
                petPosture: wrapper.readString(),
            };

            avatar = { ...avatar, ...data };
            break;
        }
        case RoomObjectUserType.Bot: {
            // `UsersMessageParser`: a plain bot sends no sex - it is "M" - and a figure with a `/` in it is replaced by the default.
            const data: IRoomAvatarBot = { gender: 'M' };

            if (avatar.figure.indexOf('/') !== -1) avatar.figure = DEFAULT_BOT_FIGURE;

            avatar = { ...avatar, ...data };
            break;
        }
        case RoomObjectUserType.RentableBot: {
            const data = {
                gender: wrapper.readString(),
                ownerId: wrapper.readInt(),
                ownerName: wrapper.readString(),
                skills: [],
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
};
