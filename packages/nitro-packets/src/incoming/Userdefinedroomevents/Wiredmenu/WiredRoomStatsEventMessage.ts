import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRoomStatsEventMessageType = object;

export class WiredRoomStatsEventMessage implements IIncomingPacket<WiredRoomStatsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredRoomStatsEventMessageType {
        const packet: WiredRoomStatsEventMessageType = {
        };

        return packet;
    }
}
