import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomVisitsData } from './Data/IRoomVisitsData';
import { RoomVisitsDataParser } from './Data/RoomVisitsDataParser';

export type RoomVisitsMessageType = {
    data: IRoomVisitsData;
};

export class RoomVisitsMessage implements IIncomingPacket<RoomVisitsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomVisitsMessageType {
        const data = RoomVisitsDataParser(wrapper);
        return { data };
    }
}
