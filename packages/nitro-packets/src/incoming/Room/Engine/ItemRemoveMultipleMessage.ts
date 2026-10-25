import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { NumbersParser } from './Data/NumbersParser';

export type ItemRemoveMultipleMessageType = {
    objectIds: number[];
    pickerId: number;
    /** Taken away by an area hider (the "invisible furni manager"), to be sent again. */
    byInvisibleFurniManager: boolean;
};

/** Several wall items leaving the room at once: unlike ItemRemove, the ids are ints, not strings. */
export class ItemRemoveMultipleMessage implements IIncomingPacket<ItemRemoveMultipleMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemRemoveMultipleMessageType {
        const packet: ItemRemoveMultipleMessageType = {
            objectIds: NumbersParser(wrapper),
            pickerId: wrapper.readInt(),
            byInvisibleFurniManager: wrapper.readBoolean(),
        };

        return packet;
    }
}
