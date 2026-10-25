import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IUserChatlogData } from './Data/IUserChatlogData';
import { UserChatlogDataParser } from './Data/UserChatlogDataParser';

export type UserChatlogMessageType = {
    data: IUserChatlogData;
};

export class UserChatlogMessage implements IIncomingPacket<UserChatlogMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserChatlogMessageType {
        const data = UserChatlogDataParser(wrapper);
        return { data };
    }
}
