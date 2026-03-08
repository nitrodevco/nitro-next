import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomInfoUpdatedMessageType = {
    roomId: number;
};

export class RoomInfoUpdatedMessage implements IIncomingPacket<RoomInfoUpdatedMessageType>
{
    public parse(wrapper: IMessageDataWrapper): RoomInfoUpdatedMessageType
    {
        const packet: RoomInfoUpdatedMessageType = {
            roomId: wrapper.readInt(),
        };

        return packet;
    }
}
