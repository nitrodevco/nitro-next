import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMessengerCategory } from './Data/IMessengerCategory';
import { MessengerCategoryParser } from './Data/MessengerCategoryParser';

export type MessengerInitMessageType = {
    userFriendLimit: number;
    normalFriendLimit: number;
    extendedFriendLimit: number;
    friendCategories: IMessengerCategory[];
};

export class MessengerInitMessage implements IIncomingPacket<MessengerInitMessageType> {
    public parse(wrapper: IMessageDataWrapper): MessengerInitMessageType {
        const packet: MessengerInitMessageType = {
            userFriendLimit: wrapper.readInt(),
            normalFriendLimit: wrapper.readInt(),
            extendedFriendLimit: wrapper.readInt(),
            friendCategories: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.friendCategories.push(MessengerCategoryParser(wrapper));

            count--;
        }

        return packet;
    }
}
