import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MountPetComposerType = object;

export class MountPetComposer implements IOutgoingPacket<MountPetComposerType> {
    public constructor(private params: MountPetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
