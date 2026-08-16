import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomAdErrorEventMessageType = {
    // no fields
};

export class RoomAdErrorEventMessage implements IIncomingPacket<RoomAdErrorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomAdErrorEventMessageType {
        const packet: RoomAdErrorEventMessageType = {};

        return packet;
    }
}
