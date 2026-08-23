import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BotDataParser, IBotData } from '../../Data/BotDataParser';

export type BotAddedToInventoryEventMessageType = {
    item: IBotData;
};

export class BotAddedToInventoryEventMessage implements IIncomingPacket<BotAddedToInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotAddedToInventoryEventMessageType {
        const packet: BotAddedToInventoryEventMessageType = {
            item: {} as any,
        };

        packet.item = BotDataParser(wrapper);
        wrapper.readBoolean(); // unnamed in SWF

        return packet;
    }
}
