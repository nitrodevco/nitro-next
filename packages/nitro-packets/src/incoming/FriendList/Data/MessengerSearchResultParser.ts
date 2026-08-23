import { AvatarGenderTypeUtilities, type IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMessengerSearchResult } from './IMessengerSearchResult';

export const MessengerSearchResultParser = (wrapper: IMessageDataWrapper): IMessengerSearchResult => {
    return {
        playerId: wrapper.readInt(),
        name: wrapper.readString(),
        motto: wrapper.readString(),
        isOnline: wrapper.readBoolean(),
        canFollow: wrapper.readBoolean(),
        unknownString: wrapper.readString(),
        gender: AvatarGenderTypeUtilities.numberToGender(wrapper.readInt()),
        figure: wrapper.readString(),
        realName: wrapper.readString(),
    };
};
