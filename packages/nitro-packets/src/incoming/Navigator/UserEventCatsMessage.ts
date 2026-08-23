import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IEventCategory } from './Data/EventCategoryParser';
import { EventCategoryParser } from './Data/EventCategoryParser';

export type UserEventCatsMessageType = {
    eventCategories: IEventCategory[];
};

export class UserEventCatsMessage implements IIncomingPacket<UserEventCatsMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserEventCatsMessageType {
        const packet: UserEventCatsMessageType = {
            eventCategories: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.eventCategories.push(EventCategoryParser(wrapper));

            count--;
        }

        return packet;
    }
}
