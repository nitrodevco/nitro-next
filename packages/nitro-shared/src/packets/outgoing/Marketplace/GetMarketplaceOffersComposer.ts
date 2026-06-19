import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMarketplaceOffersComposerType = object;

export class GetMarketplaceOffersComposer implements IOutgoingPacket<GetMarketplaceOffersComposerType> {
    public constructor(private params: GetMarketplaceOffersComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
