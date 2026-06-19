import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMarketplaceOwnOffersComposerType = object;

export class GetMarketplaceOwnOffersComposer implements IOutgoingPacket<GetMarketplaceOwnOffersComposerType> {
    public constructor(private params: GetMarketplaceOwnOffersComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
