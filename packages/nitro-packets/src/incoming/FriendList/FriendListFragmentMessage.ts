import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMessengerFriend } from './Data/IMessengerFriend';
import { MessengerFriendParser } from './Data/MessengerFriendParser';

export type FriendListFragmentMessageType = {
    totalFragments: number;
    fragmentIndex: number;
    fragment: IMessengerFriend[];
};

export class FriendListFragmentMessage implements IIncomingPacket<FriendListFragmentMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendListFragmentMessageType {
        const packet: FriendListFragmentMessageType = {
            totalFragments: wrapper.readInt(),
            fragmentIndex: wrapper.readInt(),
            fragment: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.fragment.push(MessengerFriendParser(wrapper));

            count--;
        }

        return packet;
    }
}
