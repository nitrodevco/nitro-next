import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ObjectRemoveMessageType = {
    objectId: number;
    isExpired: boolean;
    pickerId: number;
    delay: number;
    /** Taken away by an area hider (the "invisible furni manager"), to be sent again. */
    byInvisibleFurniManager: boolean;
};

export class ObjectRemoveMessage implements IIncomingPacket<ObjectRemoveMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveMessageType {
        const packet: ObjectRemoveMessageType = {
            objectId: parseInt(wrapper.readString()),
            isExpired: wrapper.readBoolean(),
            pickerId: wrapper.readInt(),
            delay: wrapper.readInt(),
            // WIN63-202610121624 reads it without a bytes-available check; an older server ends before it.
            byInvisibleFurniManager: wrapper.bytesAvailable ? wrapper.readBoolean() : false,
        };

        return packet;
    }
}
