import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ItemsStateUpdateMessageType = {
    updates: { objectId: number, data: string, state: number }[];
};

export class ItemsStateUpdateMessage implements IIncomingPacket<ItemsStateUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemsStateUpdateMessageType {
        const packet: ItemsStateUpdateMessageType = {
            updates: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const update = { objectId: wrapper.readInt(), data: wrapper.readString(), state: 0 };
            const state = parseFloat(update.data);

            if (!isNaN(state)) update.state = state;

            packet.updates.push(update);

            count--;
        }

        return packet;
    }
}
