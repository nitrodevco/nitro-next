// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuyHabbiconComposerType = {
    habbiconId: number;
};

/** Flash `BuyHabbiconMessageComposer`. */
export class BuyHabbiconComposer implements IOutgoingPacket<BuyHabbiconComposerType> {
    public constructor(private params: BuyHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
