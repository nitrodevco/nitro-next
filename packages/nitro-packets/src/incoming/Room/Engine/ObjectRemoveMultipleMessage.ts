import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { NumbersParser } from './Data/NumbersParser';

export type ObjectRemoveMultipleMessageType = {
    objectIds: number[];
    pickerId: number;
    /** Taken away by an area hider (the "invisible furni manager"), to be sent again. */
    byInvisibleFurniManager: boolean;
};

export class ObjectRemoveMultipleMessage implements IIncomingPacket<ObjectRemoveMultipleMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveMultipleMessageType {
        const packet: ObjectRemoveMultipleMessageType = {
            objectIds: NumbersParser(wrapper),
            pickerId: wrapper.readInt(),
            // WIN63-202610121624 reads it without a bytes-available check; an older server ends before it.
            byInvisibleFurniManager: wrapper.bytesAvailable ? wrapper.readBoolean() : false,
        };

        return packet;
    }
}
