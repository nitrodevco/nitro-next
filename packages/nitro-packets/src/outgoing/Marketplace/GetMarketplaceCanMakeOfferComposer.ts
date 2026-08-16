import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMarketplaceCanMakeOfferComposerType = object;

export class GetMarketplaceCanMakeOfferComposer implements IOutgoingPacket<GetMarketplaceCanMakeOfferComposerType> {
    public constructor(private params: GetMarketplaceCanMakeOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
