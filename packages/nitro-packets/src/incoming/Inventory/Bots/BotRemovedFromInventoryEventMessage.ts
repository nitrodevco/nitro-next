import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotRemovedFromInventoryEventMessageType = {
    itemId: number;
};

export class BotRemovedFromInventoryEventMessage implements IIncomingPacket<BotRemovedFromInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotRemovedFromInventoryEventMessageType {
        const packet: BotRemovedFromInventoryEventMessageType = {
            itemId: wrapper.readInt(),
        };

        return packet;
    }
}
