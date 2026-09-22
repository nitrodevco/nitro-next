// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash's `GetOfficialSongIdMessageComposer`: the song id behind an official song's code. */
export type GetOfficialSongIdComposerType = {
    officialSongId: string;
};

export class GetOfficialSongIdComposer implements IOutgoingPacket<GetOfficialSongIdComposerType> {
    public constructor(private params: GetOfficialSongIdComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.officialSongId,
        ];
    }
}
