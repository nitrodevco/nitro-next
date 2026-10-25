import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomChatlogData } from './Data/IRoomChatlogData';
import { RoomChatlogDataParser } from './Data/RoomChatlogDataParser';

export type RoomChatlogMessageType = {
    data: IRoomChatlogData;
};

export class RoomChatlogMessage implements IIncomingPacket<RoomChatlogMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomChatlogMessageType {
        const data = RoomChatlogDataParser(wrapper);
        return { data };
    }
}
