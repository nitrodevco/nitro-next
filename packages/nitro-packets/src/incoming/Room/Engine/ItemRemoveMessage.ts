import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemRemoveMessageType = {
    objectId: number;
    pickerId: number;
    /** Taken away by an area hider (the "invisible furni manager"), to be sent again. */
    byInvisibleFurniManager: boolean;
};

export class ItemRemoveMessage implements IIncomingPacket<ItemRemoveMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemRemoveMessageType {
        const packet: ItemRemoveMessageType = {
            objectId: parseInt(wrapper.readString()),
            pickerId: wrapper.readInt(),
            // WIN63-202610121624 reads it without a bytes-available check; an older server ends before it.
            byInvisibleFurniManager: wrapper.bytesAvailable ? wrapper.readBoolean() : false,
        };

        return packet;
    }
}
