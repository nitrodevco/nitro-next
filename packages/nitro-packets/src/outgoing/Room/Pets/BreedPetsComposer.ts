import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BreedPetsComposerType = object;

export class BreedPetsComposer implements IOutgoingPacket<BreedPetsComposerType> {
    public constructor(private params: BreedPetsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
