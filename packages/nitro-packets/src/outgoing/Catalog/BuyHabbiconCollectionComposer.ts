// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuyHabbiconCollectionComposerType = {
    collectionId: number;
};

/** Flash `BuyHabbiconCollectionMessageComposer`. */
export class BuyHabbiconCollectionComposer implements IOutgoingPacket<BuyHabbiconCollectionComposerType> {
    public constructor(private params: BuyHabbiconCollectionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.collectionId,
        ];
    }
}
