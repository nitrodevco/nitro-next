// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetYoutubeDisplayPlaylistComposerType = {
    objectId: number;
    playlistId: string;
};

export class SetYoutubeDisplayPlaylistComposer implements IOutgoingPacket<SetYoutubeDisplayPlaylistComposerType> {
    public constructor(private params: SetYoutubeDisplayPlaylistComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.playlistId,
        ];
    }
}
