import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UseObjectMessageType = {
    objectId: number;
    itemType: number;
};

export class UseObjectMessage implements IIncomingPacket<UseObjectMessageType> {
    public parse(wrapper: IMessageDataWrapper): UseObjectMessageType {

        const packet: UseObjectMessageType = {
            objectId: wrapper.readInt(),
            itemType: wrapper.readInt(),
        };

        return packet;
    }
}
