// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnfavoriteHabbiconComposerType = {
    habbiconId: number;
};

/** Flash `UnfavoriteHabbiconMessageComposer`. */
export class UnfavoriteHabbiconComposer implements IOutgoingPacket<UnfavoriteHabbiconComposerType> {
    public constructor(private params: UnfavoriteHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
