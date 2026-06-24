import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemRemoveMessageType = {
    objectId: number;
    pickerId: number;
};

export class ItemRemoveMessage implements IIncomingPacket<ItemRemoveMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemRemoveMessageType {
        const packet: ItemRemoveMessageType = {
            objectId: parseInt(wrapper.readString()),
            pickerId: wrapper.readInt(),
        };

        return packet;
    }
}
