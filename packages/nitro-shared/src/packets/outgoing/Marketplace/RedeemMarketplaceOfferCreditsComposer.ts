import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RedeemMarketplaceOfferCreditsComposerType = object;

export class RedeemMarketplaceOfferCreditsComposer implements IOutgoingPacket<RedeemMarketplaceOfferCreditsComposerType> {
    public constructor(private params: RedeemMarketplaceOfferCreditsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
