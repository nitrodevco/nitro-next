import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ControlYoutubeDisplayPlaybackComposerType = object;

export class ControlYoutubeDisplayPlaybackComposer implements IOutgoingPacket<ControlYoutubeDisplayPlaybackComposerType> {
    public constructor(private params: ControlYoutubeDisplayPlaybackComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
