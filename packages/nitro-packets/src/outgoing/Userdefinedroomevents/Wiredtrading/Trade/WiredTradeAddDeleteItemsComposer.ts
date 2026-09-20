// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTradeAddDeleteItemsComposerType = {
    /** True takes the items out of the offer, false puts them in. */
    isDelete: boolean;
    /** Inventory item ids. Flash removes one at a time and adds a whole selection at once. */
    itemIds: number[];
};

/** Flash `WiredTradeAddDeleteItemsMessageComposer`, sent by `WiredTradingModel`; answered by `WiredTradeItemsUpdateMessage`. */
export class WiredTradeAddDeleteItemsComposer implements IOutgoingPacket<WiredTradeAddDeleteItemsComposerType> {
    public constructor(private params: WiredTradeAddDeleteItemsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.isDelete,
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
