import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNowPlayingComposerType = object;

export class GetNowPlayingComposer implements IOutgoingPacket<GetNowPlayingComposerType> {
    public constructor(private params: GetNowPlayingComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
