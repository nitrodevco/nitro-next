// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetMarketplaceOwnOffersMessageComposer`: the own offers of one category (1 open, 2 sold, 3 expired). */
export type GetMarketplaceOwnOffersComposerType = {
    category: number;
};

export class GetMarketplaceOwnOffersComposer implements IOutgoingPacket<GetMarketplaceOwnOffersComposerType> {
    public constructor(private params: GetMarketplaceOwnOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.category,
        ];
    }
}
