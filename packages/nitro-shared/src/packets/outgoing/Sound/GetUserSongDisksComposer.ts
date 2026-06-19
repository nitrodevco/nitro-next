import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserSongDisksComposerType = object;

export class GetUserSongDisksComposer implements IOutgoingPacket<GetUserSongDisksComposerType> {
    public constructor(private params: GetUserSongDisksComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
