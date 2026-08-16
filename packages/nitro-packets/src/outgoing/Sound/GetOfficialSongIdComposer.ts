import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetOfficialSongIdComposerType = object;

export class GetOfficialSongIdComposer implements IOutgoingPacket<GetOfficialSongIdComposerType> {
    public constructor(private params: GetOfficialSongIdComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
