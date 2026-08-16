import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PetSelectedComposerType = object;

export class PetSelectedComposer implements IOutgoingPacket<PetSelectedComposerType> {
    public constructor(private params: PetSelectedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
