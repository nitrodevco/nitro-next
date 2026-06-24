import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuyMarketplaceTokensComposerType = object;

export class BuyMarketplaceTokensComposer implements IOutgoingPacket<BuyMarketplaceTokensComposerType> {
    public constructor(private params: BuyMarketplaceTokensComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
