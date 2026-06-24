import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemDataUpdateMessageType = {
    objectId: number;
    state: string;
};

export class ItemDataUpdateMessage implements IIncomingPacket<ItemDataUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemDataUpdateMessageType {
        const packet: ItemDataUpdateMessageType = {
            objectId: parseInt(wrapper.readString()),
            state: wrapper.readString(),
        };

        return packet;
    }
}
