import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveJukeboxDiskComposerType = object;

export class RemoveJukeboxDiskComposer implements IOutgoingPacket<RemoveJukeboxDiskComposerType> {
    public constructor(private params: RemoveJukeboxDiskComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
