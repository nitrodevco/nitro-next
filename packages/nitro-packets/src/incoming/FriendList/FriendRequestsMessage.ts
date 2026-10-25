import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendRequestParser } from './Data/FriendRequestParser';
import { IFriendRequest } from './Data/IFriendRequest';

export type FriendRequestsMessageType = {
    requests: IFriendRequest[];
};

export class FriendRequestsMessage implements IIncomingPacket<FriendRequestsMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendRequestsMessageType {
        const packet: FriendRequestsMessageType = {
            requests: [],
        };

        wrapper.readInt();

        let count = wrapper.readInt();

        while (count > 0) {
            packet.requests.push(FriendRequestParser(wrapper));

            count--;
        }

        return packet;
    }
}
