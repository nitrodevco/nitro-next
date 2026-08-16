import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { IMessengerSearchResult } from './Data/IMessengerSearchResult';
import { MessengerSearchResultParser } from './Data/MessengerSearchResultParser';

export type HabboSearchResultMessageType = {
    friends: IMessengerSearchResult[];
    others: IMessengerSearchResult[];
};

export class HabboSearchResultMessage implements IIncomingPacket<HabboSearchResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboSearchResultMessageType {
        const packet: HabboSearchResultMessageType = {
            friends: [],
            others: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.friends.push(MessengerSearchResultParser(wrapper));

            count--;
        }

        count = wrapper.readInt();

        while (count > 0) {
            packet.others.push(MessengerSearchResultParser(wrapper));

            count--;
        }

        return packet;
    }
}
