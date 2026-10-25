// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IHabbiconShopItem, parseHabbiconShopItem } from './Data/HabbiconShopItemParser';

export type HabbiconInfoMessageType = {
    habbicon: IHabbiconShopItem;
};

/** Flash `HabbiconInfoMessageParser`: one shop habbicon, the answer to `GetHabbiconInfo`. */
export class HabbiconInfoMessage implements IIncomingPacket<HabbiconInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabbiconInfoMessageType {
        return { habbicon: parseHabbiconShopItem(wrapper) };
    }
}
