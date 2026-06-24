import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetYoutubeDisplayStatusComposerType = object;

export class GetYoutubeDisplayStatusComposer implements IOutgoingPacket<GetYoutubeDisplayStatusComposerType> {
    public constructor(private params: GetYoutubeDisplayStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
