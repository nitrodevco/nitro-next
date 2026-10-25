// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSongInfoComposerType = {
    /** The songs whose names are wanted; they are asked for in one go. */
    songIds: number[];
};

export class GetSongInfoComposer implements IOutgoingPacket<GetSongInfoComposerType> {
    public constructor(private params: GetSongInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.songIds.length,
            ...this.params.songIds,
        ];
    }
}
