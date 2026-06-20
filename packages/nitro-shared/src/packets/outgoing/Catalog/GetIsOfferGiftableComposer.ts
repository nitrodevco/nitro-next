import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIsOfferGiftableComposerType = {
    offerId: number;
};

export class GetIsOfferGiftableComposer implements IOutgoingPacket<GetIsOfferGiftableComposerType> {
    public constructor(private params: GetIsOfferGiftableComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.offerId,
        ];
    }
}
