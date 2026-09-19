// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SpinWheelOfFortuneComposerType = {
    objectId: number;
};

/** Spins a wheel of fortune. */
export class SpinWheelOfFortuneComposer implements IOutgoingPacket<SpinWheelOfFortuneComposerType> {
    public constructor(private params: SpinWheelOfFortuneComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
