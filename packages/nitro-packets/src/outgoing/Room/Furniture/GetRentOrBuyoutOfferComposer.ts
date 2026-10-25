// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `GetRentOrBuyoutOfferMessageComposer`: what renting a furni type again, or buying it out, costs (`RentConfirmationWindow.show`). */
export type GetRentOrBuyoutOfferComposerType = {
    isWallItem: boolean;
    /** The furni type's `fullName`, which `FurniRentOrBuyoutOfferMessage` answers with. */
    furniTypeName: string;
    isBuyout: boolean;
};

export class GetRentOrBuyoutOfferComposer implements IOutgoingPacket<GetRentOrBuyoutOfferComposerType> {
    public constructor(private params: GetRentOrBuyoutOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.isWallItem,
            this.params.furniTypeName,
            this.params.isBuyout,
        ];
    }
}
