import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenPetPackageComposerType = object;

export class OpenPetPackageComposer implements IOutgoingPacket<OpenPetPackageComposerType> {
    public constructor(private params: OpenPetPackageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
