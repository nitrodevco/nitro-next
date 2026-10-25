import { AvatarGenderTypeUtilities, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMessengerFriend } from './IMessengerFriend';

export const MessengerFriendParser = (wrapper: IMessageDataWrapper): IMessengerFriend => {
    return {
        playerId: wrapper.readInt(),
        name: wrapper.readString(),
        gender: AvatarGenderTypeUtilities.numberToGender(wrapper.readInt()),
        isOnline: wrapper.readBoolean(),
        canFollow: wrapper.readBoolean(),
        figure: wrapper.readString(),
        categoryId: wrapper.readInt(),
        motto: wrapper.readString(),
        realName: wrapper.readString(),
        facebookId: wrapper.readString(),
        persistedUser: wrapper.readBoolean(),
        vipMember: wrapper.readBoolean(),
        pocketHabboUser: wrapper.readBoolean(),
        relationshipType: wrapper.readShort(),
    };
};
