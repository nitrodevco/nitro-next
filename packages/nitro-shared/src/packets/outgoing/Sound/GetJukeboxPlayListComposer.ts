import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetJukeboxPlayListComposerType = object;

export class GetJukeboxPlayListComposer implements IOutgoingPacket<GetJukeboxPlayListComposerType> {
    public constructor(private params: GetJukeboxPlayListComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
