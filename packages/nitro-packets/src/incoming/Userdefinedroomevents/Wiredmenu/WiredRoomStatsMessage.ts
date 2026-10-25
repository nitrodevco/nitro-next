import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredRoomStatsData } from './Data/IWiredRoomStatsData';
import { WiredRoomStatsDataParser } from './Data/WiredRoomStatsDataParser';

export type WiredRoomStatsMessageType = {
    roomStats: IWiredRoomStatsData;
};

export class WiredRoomStatsMessage implements IIncomingPacket<WiredRoomStatsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRoomStatsMessageType {
        const roomStats = WiredRoomStatsDataParser(wrapper);
        return { roomStats };
    }
}
