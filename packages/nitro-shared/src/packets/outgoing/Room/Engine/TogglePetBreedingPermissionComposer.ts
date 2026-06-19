import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetBreedingPermissionComposerType = object;

export class TogglePetBreedingPermissionComposer implements IOutgoingPacket<TogglePetBreedingPermissionComposerType> {
    public constructor(private params: TogglePetBreedingPermissionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
