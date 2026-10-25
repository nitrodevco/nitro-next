// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BotDataParser, IBotData } from '../../Data/BotDataParser';

export type BotInventoryEventMessageType = {
    /** The whole bot list by bot id - the packet is not fragmented. */
    items: Map<number, IBotData>;
};

export class BotInventoryEventMessage implements IIncomingPacket<BotInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotInventoryEventMessageType {
        const packet: BotInventoryEventMessageType = { items: new Map<number, IBotData>() };

        let count = wrapper.readInt();

        while (count > 0) {
            const bot = BotDataParser(wrapper);

            packet.items.set(bot.id, bot);

            count--;
        }

        return packet;
    }
}
