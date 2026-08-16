import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelPetBreedingComposerType = object;

export class CancelPetBreedingComposer implements IOutgoingPacket<CancelPetBreedingComposerType> {
    public constructor(private params: CancelPetBreedingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
