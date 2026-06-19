import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemovePetFromFlatComposerType = object;

export class RemovePetFromFlatComposer implements IOutgoingPacket<RemovePetFromFlatComposerType> {
    public constructor(private params: RemovePetFromFlatComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
