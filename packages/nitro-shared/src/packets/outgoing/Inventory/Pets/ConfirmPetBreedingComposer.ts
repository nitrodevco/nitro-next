import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ConfirmPetBreedingComposerType = object;

export class ConfirmPetBreedingComposer implements IOutgoingPacket<ConfirmPetBreedingComposerType> {
    public constructor(private params: ConfirmPetBreedingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
