import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendRequestParser } from './Data/FriendRequestParser';
import { IFriendRequest } from './Data/IFriendRequest';

export type NewFriendRequestMessageType = {
    request: IFriendRequest;
};

export class NewFriendRequestMessage implements IIncomingPacket<NewFriendRequestMessageType> {
    public parse(wrapper: IMessageDataWrapper): NewFriendRequestMessageType {
        const packet: NewFriendRequestMessageType = {
            request: FriendRequestParser(wrapper),
        };

        return packet;
    }
}
