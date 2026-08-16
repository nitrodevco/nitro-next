import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRentOrBuyoutOfferComposerType = object;

export class GetRentOrBuyoutOfferComposer implements IOutgoingPacket<GetRentOrBuyoutOfferComposerType> {
    public constructor(private params: GetRentOrBuyoutOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
