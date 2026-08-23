import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomVisitsEventMessageType = object;

export class RoomVisitsEventMessage implements IIncomingPacket<RoomVisitsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomVisitsEventMessageType {
        const packet: RoomVisitsEventMessageType = {
        };

        return packet;
    }
}
