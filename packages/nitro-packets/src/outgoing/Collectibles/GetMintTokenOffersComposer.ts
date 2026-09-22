// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetMintTokenOffersMessageComposer`: the mint token packs on sale.
 */
export type GetMintTokenOffersComposerType = object;

export class GetMintTokenOffersComposer implements IOutgoingPacket<GetMintTokenOffersComposerType> {
    public constructor(private params: GetMintTokenOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
