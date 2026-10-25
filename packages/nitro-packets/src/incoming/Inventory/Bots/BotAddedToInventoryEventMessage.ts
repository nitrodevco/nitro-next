// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BotDataParser, IBotData } from '../../Data/BotDataParser';

export type BotAddedToInventoryEventMessageType = {
    item: IBotData;
    /** Flash reads the flag and does nothing with it; kept so the parser stays the right length. */
    openInventory: boolean;
};

export class BotAddedToInventoryEventMessage implements IIncomingPacket<BotAddedToInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotAddedToInventoryEventMessageType {
        return {
            item: BotDataParser(wrapper),
            openInventory: wrapper.readBoolean(),
        };
    }
}
