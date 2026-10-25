// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetMarketplaceOffersMessageComposer`: a search - price range (-1 for none), text, sort type, and whether limited items are combined. */
export type GetMarketplaceOffersComposerType = {
    minPrice: number;
    maxPrice: number;
    searchString: string;
    sortType: number;
    combineUniques: boolean;
};

export class GetMarketplaceOffersComposer implements IOutgoingPacket<GetMarketplaceOffersComposerType> {
    public constructor(private params: GetMarketplaceOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.minPrice,
            this.params.maxPrice,
            this.params.searchString,
            this.params.sortType,
            this.params.combineUniques,
        ];
    }
}
