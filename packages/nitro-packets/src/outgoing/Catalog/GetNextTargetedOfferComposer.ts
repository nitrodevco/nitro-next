import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNextTargetedOfferComposerType = {
    offerId: number;
};

export class GetNextTargetedOfferComposer implements IOutgoingPacket<GetNextTargetedOfferComposerType> {
    public constructor(private params: GetNextTargetedOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}
