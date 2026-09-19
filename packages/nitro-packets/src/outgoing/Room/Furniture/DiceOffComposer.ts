// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DiceOffComposerType = {
    objectId: number;
};

/** Turns a rolled dice back to its idle face. */
export class DiceOffComposer implements IOutgoingPacket<DiceOffComposerType> {
    public constructor(private params: DiceOffComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
