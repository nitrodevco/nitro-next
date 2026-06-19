import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetRidingPermissionComposerType = object;

export class TogglePetRidingPermissionComposer implements IOutgoingPacket<TogglePetRidingPermissionComposerType> {
    public constructor(private params: TogglePetRidingPermissionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
