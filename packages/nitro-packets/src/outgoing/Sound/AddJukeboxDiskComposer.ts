import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddJukeboxDiskComposerType = object;

export class AddJukeboxDiskComposer implements IOutgoingPacket<AddJukeboxDiskComposerType> {
    public constructor(private params: AddJukeboxDiskComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
