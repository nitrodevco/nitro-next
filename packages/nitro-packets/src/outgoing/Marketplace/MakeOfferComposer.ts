// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `MakeOfferMessageComposer`: the asking price, the furni type (1 floor, 2 wall) and the room item ids offered. */
export type MakeOfferComposerType = {
    price: number;
    furniType: number;
    itemRefs: number[];
};

export class MakeOfferComposer implements IOutgoingPacket<MakeOfferComposerType> {
    public constructor(private params: MakeOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];

        data.push(this.params.price);
        data.push(this.params.furniType);

        if (this.params.itemRefs === undefined) {
            data.push(0);

            return data;
        }

        data.push(this.params.itemRefs.length);

        for (const itemRef of this.params.itemRefs) data.push(itemRef);

        return data;
    }
}
