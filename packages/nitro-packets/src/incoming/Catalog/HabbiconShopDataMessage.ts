// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IHabbiconShopCollection, parseHabbiconShopCollection } from './Data/HabbiconShopCollectionParser';

export type HabbiconShopDataMessageType = {
    collections: IHabbiconShopCollection[];
};

/** Flash `HabbiconShopDataMessageParser`: every habbicon set of the shop, with its habbicons. */
export class HabbiconShopDataMessage implements IIncomingPacket<HabbiconShopDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabbiconShopDataMessageType {
        return { collections: ParseArray(wrapper, parseHabbiconShopCollection) };
    }
}
