import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomEventCancelMessageType = object;

export class RoomEventCancelMessage implements IIncomingPacket<RoomEventCancelMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomEventCancelMessageType {
        const packet: RoomEventCancelMessageType = {
        };

        return packet;
    }
}
