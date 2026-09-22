// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FavoriteHabbiconComposerType = {
    habbiconId: number;
};

/** Flash `FavoriteHabbiconMessageComposer`. */
export class FavoriteHabbiconComposer implements IOutgoingPacket<FavoriteHabbiconComposerType> {
    public constructor(private params: FavoriteHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
