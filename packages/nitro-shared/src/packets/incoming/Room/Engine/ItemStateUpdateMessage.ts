import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemStateUpdateMessageType = {
    objectId: number;
    state: string;
};

export class ItemStateUpdateMessage implements IIncomingPacket<ItemStateUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemStateUpdateMessageType {

        const packet: ItemStateUpdateMessageType = {
            objectId: wrapper.readInt(),
            state: wrapper.readString(),
        };

        return packet;
    }
}
