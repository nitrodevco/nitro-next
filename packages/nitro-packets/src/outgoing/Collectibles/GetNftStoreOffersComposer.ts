// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetNftStoreOffersMessageComposer`: the collectibles shop's offers.
 */
export type GetNftStoreOffersComposerType = object;

export class GetNftStoreOffersComposer implements IOutgoingPacket<GetNftStoreOffersComposerType> {
    public constructor(private params: GetNftStoreOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
