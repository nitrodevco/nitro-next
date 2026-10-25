// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabbiconInfoComposerType = {
    habbiconId: number;
};

/** Flash `GetHabbiconInfoMessageComposer`. */
export class GetHabbiconInfoComposer implements IOutgoingPacket<GetHabbiconInfoComposerType> {
    public constructor(private params: GetHabbiconInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
