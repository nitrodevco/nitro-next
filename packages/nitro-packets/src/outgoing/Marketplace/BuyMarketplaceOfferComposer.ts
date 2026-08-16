import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuyMarketplaceOfferComposerType = object;

export class BuyMarketplaceOfferComposer implements IOutgoingPacket<BuyMarketplaceOfferComposerType> {
    public constructor(private params: BuyMarketplaceOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
