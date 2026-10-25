import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMessengerCategory } from './Data/IMessengerCategory';
import { IMessengerUpdate } from './Data/IMessengerUpdate';
import { MessengerCategoryParser } from './Data/MessengerCategoryParser';
import { MessengerUpdateParser } from './Data/MessengerUpdateParser';

export type FriendListUpdateMessageType = {
    friendCategories: IMessengerCategory[];
    updates: IMessengerUpdate[];
};

export class FriendListUpdateMessage implements IIncomingPacket<FriendListUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendListUpdateMessageType {
        const packet: FriendListUpdateMessageType = {
            friendCategories: [],
            updates: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.friendCategories.push(MessengerCategoryParser(wrapper));

            count--;
        }

        count = wrapper.readInt();

        while (count > 0) {
            packet.updates.push(MessengerUpdateParser(wrapper));

            count--;
        }

        return packet;
    }
}
