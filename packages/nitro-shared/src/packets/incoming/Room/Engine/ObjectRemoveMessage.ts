import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ObjectRemoveMessageType = {
    objectId: number;
    isExpired: boolean;
    pickerId: number;
    delay: number;
};

export class ObjectRemoveMessage implements IIncomingPacket<ObjectRemoveMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveMessageType {
        const packet: ObjectRemoveMessageType = {
            objectId: parseInt(wrapper.readString()),
            isExpired: wrapper.readBoolean(),
            pickerId: wrapper.readInt(),
            delay: wrapper.readInt(),
        };

        return packet;
    }
}
