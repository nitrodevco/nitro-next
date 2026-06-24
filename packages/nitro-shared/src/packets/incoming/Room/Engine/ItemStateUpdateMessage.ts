import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemStateUpdateMessageType = {
    objectId: number;
    data: string;
    state: number;
};

export class ItemStateUpdateMessage implements IIncomingPacket<ItemStateUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemStateUpdateMessageType {

        const packet: ItemStateUpdateMessageType = {
            objectId: wrapper.readInt(),
            data: wrapper.readString(),
            state: 0
        };

        const state = parseFloat(packet.data);

        if (!isNaN(state)) packet.state = state;

        return packet;
    }
}
