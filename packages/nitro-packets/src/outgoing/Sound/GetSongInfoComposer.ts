import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSongInfoComposerType = object;

export class GetSongInfoComposer implements IOutgoingPacket<GetSongInfoComposerType> {
    public constructor(private params: GetSongInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
