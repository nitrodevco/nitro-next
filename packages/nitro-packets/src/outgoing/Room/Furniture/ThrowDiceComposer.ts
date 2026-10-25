// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ThrowDiceComposerType = {
    objectId: number;
};

/** Rolls a dice; the result comes back as a `DiceValueMessage`. */
export class ThrowDiceComposer implements IOutgoingPacket<ThrowDiceComposerType> {
    public constructor(private params: ThrowDiceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
