import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { RoomObjectUserType } from "@nitrodevco/nitro-api";

import { IRoomAvatar } from "./IRoomAvatar";
import { IRoomAvatarUser } from "./IRoomAvatarUser";
import { IRoomAvatarUpdate } from "./IRoomAvatarUpdate";
import { IRoomAvatarBot } from "./IRoomAvatarBot";
import { IRoomAvatarRentableBot } from "./IRoomAvatarRentableBot";

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

export const UserUpdateParser = (wrapper: IMessageDataWrapper): IRoomAvatarUpdate => {
    return {
        objectId: wrapper.readInt(),
        x: wrapper.readInt(),
        y: wrapper.readInt(),
        z: parseFloat(wrapper.readString()),
        headRotation: wrapper.readInt(),
        bodyRotation: wrapper.readInt(),
        status: wrapper.readString()
    }
}

const SWIM_COLOR_PALETTE = [
    '238,238,238', '250,56,49', '253,146,160', '42,199,210', '53,51,44',
    '239,255,146', '198,255,152', '255,146,90', '157,89,126', '182,243,255',
    '109,255,51', '51,120,201', '255,182,49', '223,161,233', '249,251,50',
    '202,175,143', '197,198,197', '71,98,61', '138,131,97', '255,140,51',
    '84,198,39', '30,108,153', '152,79,136', '119,200,255', '255,192,142',
    '60,75,135', '124,44,71', '215,255,227', '143,63,28', '255,99,147',
    '31,155,121', '253,255,51',
];

const COLOR_ID_OFFSET = 10000;
const GENDER_ID_FEMALE = 10010;
const GENDER_ID_MALE = 10011;

interface SwimFigureConfig {
    headSize: number;
    colorId: number;
    genderId: number;
}

const convertSwimFigure = (
    colorString: string,
    sizeString: string,
    gender: string
): string => {
    const config = parseSwimFigureConfig(colorString, sizeString, gender);

    return (
        `${sizeString}.bds-10001-${config.headSize}.ss-` +
        `${config.genderId}-${config.colorId}`
    );
};

const parseSwimFigureConfig = (
    colorString: string,
    sizeString: string,
    gender: string
): SwimFigureConfig => {
    const headSize = extractHeadSize(sizeString);
    const genderId = gender === 'F' ? GENDER_ID_FEMALE : GENDER_ID_MALE;
    const colorId = extractColorId(colorString);

    return { headSize, colorId, genderId };
};

const extractHeadSize = (sizeString: string): number => {
    const sizeParts = sizeString.split('.');

    for (const sizePart of sizeParts) {
        const [type, , value] = sizePart.split('-');
        if (type === 'hd' && value) {
            return parseInt(value, 10);
        }
    }

    return 1; // Default if not found
};

const extractColorId = (colorString: string): number => {
    const parts = colorString.split('=');

    if (parts.length <= 1) return 1;

    const [, colorData] = parts;
    const [, colorValue] = colorData.split('/');

    const colorIndex = SWIM_COLOR_PALETTE.indexOf(colorValue);
    if (colorIndex === -1) return 1; // Default if color not found

    return COLOR_ID_OFFSET + colorIndex + 1;
};