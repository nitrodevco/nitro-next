import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { NumbersParser } from './Data/NumbersParser';

export type ObjectRemoveMultipleMessageType = {
    objectIds: number[];
    pickerId: number;
};

export class ObjectRemoveMultipleMessage implements IIncomingPacket<ObjectRemoveMultipleMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveMultipleMessageType {
        const packet: ObjectRemoveMultipleMessageType = {
            objectIds: NumbersParser(wrapper),
            pickerId: wrapper.readInt(),
        };

        return packet;
    }
}
