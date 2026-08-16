import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomEntryTileMessageType = {
    x: number;
    y: number;
    rotation: number;
};

export class RoomEntryTileMessage implements IIncomingPacket<RoomEntryTileMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomEntryTileMessageType {

        const packet: RoomEntryTileMessageType = {
            x: wrapper.readInt(),
            y: wrapper.readInt(),
            rotation: wrapper.readInt()
        }

        return packet;
    }
}
