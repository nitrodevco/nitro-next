import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomPropertyMessageType = {
    key: string;
    value: string;
};

export class RoomPropertyMessage implements IIncomingPacket<RoomPropertyMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomPropertyMessageType {
        const packet: RoomPropertyMessageType = {
            key: wrapper.readString(),
            value: wrapper.readString()
        };

        return packet;
    }
}
