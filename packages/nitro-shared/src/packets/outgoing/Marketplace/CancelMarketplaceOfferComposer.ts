import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelMarketplaceOfferComposerType = object;

export class CancelMarketplaceOfferComposer implements IOutgoingPacket<CancelMarketplaceOfferComposerType> {
    public constructor(private params: CancelMarketplaceOfferComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
