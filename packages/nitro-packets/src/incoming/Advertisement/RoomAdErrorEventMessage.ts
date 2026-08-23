import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomAdErrorEventMessageType = {
    errorCode: number;
    filteredText: string;
};

export class RoomAdErrorEventMessage implements IIncomingPacket<RoomAdErrorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomAdErrorEventMessageType {
        const packet: RoomAdErrorEventMessageType = {
            errorCode: wrapper.readInt(),
            filteredText: wrapper.readString(),
        };

        return packet;
    }
}
