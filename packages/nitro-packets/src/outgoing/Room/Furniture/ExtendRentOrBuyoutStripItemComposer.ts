// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `ExtendRentOrBuyoutStripItemMessageComposer`: extend or buy out a rented furni in the inventory (`RentConfirmationWindow`, from the inventory). */
export type ExtendRentOrBuyoutStripItemComposerType = {
    itemId: number;
    isBuyout: boolean;
};

export class ExtendRentOrBuyoutStripItemComposer implements IOutgoingPacket<ExtendRentOrBuyoutStripItemComposerType> {
    public constructor(private params: ExtendRentOrBuyoutStripItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
            this.params.isBuyout,
        ];
    }
}
