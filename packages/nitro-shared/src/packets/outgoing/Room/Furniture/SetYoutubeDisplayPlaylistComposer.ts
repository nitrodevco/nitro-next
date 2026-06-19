import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetYoutubeDisplayPlaylistComposerType = object;

export class SetYoutubeDisplayPlaylistComposer implements IOutgoingPacket<SetYoutubeDisplayPlaylistComposerType> {
    public constructor(private params: SetYoutubeDisplayPlaylistComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
