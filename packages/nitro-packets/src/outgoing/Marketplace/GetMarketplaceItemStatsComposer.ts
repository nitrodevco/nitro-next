// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetMarketplaceItemStatsComposer`: the stats category (1 floor, 2 wall, 3 limited), the furni type and, for a poster, its poster id - sent only when there is one. */
export type GetMarketplaceItemStatsComposerType = {
    category: number;
    furniTypeId: number;
    extraData: string | undefined;
};

export class GetMarketplaceItemStatsComposer implements IOutgoingPacket<GetMarketplaceItemStatsComposerType> {
    public constructor(private params: GetMarketplaceItemStatsComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];

        data.push(this.params.category);
        data.push(this.params.furniTypeId);

        if ((this.params.extraData !== undefined) && (this.params.extraData.length > 0)) data.push(this.params.extraData);

        return data;
    }
}
