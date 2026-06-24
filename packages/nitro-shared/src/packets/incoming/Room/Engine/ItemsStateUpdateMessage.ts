import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemsStateUpdateMessageType = {
    objectStates: { objectId: number, state: string }[];
};

export class ItemsStateUpdateMessage implements IIncomingPacket<ItemsStateUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemsStateUpdateMessageType {
        const packet: ItemsStateUpdateMessageType = {
            objectStates: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.objectStates.push({ objectId: wrapper.readInt(), state: wrapper.readString() });
            count--;
        }

        return packet;
    }
}
