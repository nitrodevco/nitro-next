// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClaimHabbiconComposerType = {
    habbiconId: number;
};

/** Flash `ClaimHabbiconMessageComposer`. */
export class ClaimHabbiconComposer implements IOutgoingPacket<ClaimHabbiconComposerType> {
    public constructor(private params: ClaimHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
