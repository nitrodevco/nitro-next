// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ControlYoutubeDisplayPlaybackComposerType = {
    objectId: number;
    /** 0 pause, 1 play, 2 the next video, 3 the one before it. */
    commandId: number;
};

export class ControlYoutubeDisplayPlaybackComposer implements IOutgoingPacket<ControlYoutubeDisplayPlaybackComposerType> {
    public constructor(private params: ControlYoutubeDisplayPlaybackComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.commandId,
        ];
    }
}
