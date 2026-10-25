// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `ClearMarketplaceOwnHistoryMessageComposer`: mark the sold (2) or expired (3) own offers seen. */
export type ClearMarketplaceOwnHistoryComposerType = {
    category: number;
};

export class ClearMarketplaceOwnHistoryComposer implements IOutgoingPacket<ClearMarketplaceOwnHistoryComposerType> {
    public constructor(private params: ClearMarketplaceOwnHistoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.category,
        ];
    }
}
