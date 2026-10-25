// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetYoutubeDisplayStatusComposerType = {
    objectId: number;
};

export class GetYoutubeDisplayStatusComposer implements IOutgoingPacket<GetYoutubeDisplayStatusComposerType> {
    public constructor(private params: GetYoutubeDisplayStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
