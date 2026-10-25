import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomEventData } from './Data/IRoomEventData';
import { RoomEventDataParser } from './Data/RoomEventDataParser';

export type RoomEventMessageType = {
    data: IRoomEventData;
};

export class RoomEventMessage implements IIncomingPacket<RoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomEventMessageType {
        const data = RoomEventDataParser(wrapper);
        return { data };
    }
}
