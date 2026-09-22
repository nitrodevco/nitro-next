// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSnowWarGameTokensOfferComposerType = object;

/** `GetSnowWarGameTokensOfferComposer`: `HabboCatalog.buySnowWarTokensOffer` before the offers are known. */
export class GetSnowWarGameTokensOfferComposer implements IOutgoingPacket<GetSnowWarGameTokensOfferComposerType> {
    public constructor(private params: GetSnowWarGameTokensOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
