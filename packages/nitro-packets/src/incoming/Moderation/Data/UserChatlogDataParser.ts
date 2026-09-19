import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IUserChatlogData } from './IUserChatlogData';
import { RoomChatlogDataParser } from './RoomChatlogDataParser';

export const UserChatlogDataParser = (wrapper: IMessageDataWrapper): IUserChatlogData => {
    return {
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        rooms: ParseArray(wrapper, RoomChatlogDataParser),
    };
};
