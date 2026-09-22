// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `CancelAllMarketplaceOffersMessageComposer`: take every open own offer back. */
export type CancelAllMarketplaceOffersComposerType = object;

export class CancelAllMarketplaceOffersComposer implements IOutgoingPacket<CancelAllMarketplaceOffersComposerType> {
    public constructor(private params: CancelAllMarketplaceOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
