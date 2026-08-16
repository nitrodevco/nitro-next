import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CarryObjectMessageType = {
    objectId: number;
    itemType: number;
};

export class CarryObjectMessage implements IIncomingPacket<CarryObjectMessageType> {
    public parse(wrapper: IMessageDataWrapper): CarryObjectMessageType {
        const packet: CarryObjectMessageType = {
            objectId: wrapper.readInt(),
            itemType: wrapper.readInt(),
        };

        return packet;
    }
}
