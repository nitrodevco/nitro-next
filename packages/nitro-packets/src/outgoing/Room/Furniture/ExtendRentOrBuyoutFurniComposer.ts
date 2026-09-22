// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `ExtendRentOrBuyoutFurniMessageComposer`: extend or buy out a rented furni in the room (`RentConfirmationWindow`, from the infostand). */
export type ExtendRentOrBuyoutFurniComposerType = {
    isWallItem: boolean;
    objectId: number;
    isBuyout: boolean;
};

export class ExtendRentOrBuyoutFurniComposer implements IOutgoingPacket<ExtendRentOrBuyoutFurniComposerType> {
    public constructor(private params: ExtendRentOrBuyoutFurniComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.isWallItem,
            this.params.objectId,
            this.params.isBuyout,
        ];
    }
}
