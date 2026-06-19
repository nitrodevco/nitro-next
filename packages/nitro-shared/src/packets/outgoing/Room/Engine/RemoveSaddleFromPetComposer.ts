import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveSaddleFromPetComposerType = object;

export class RemoveSaddleFromPetComposer implements IOutgoingPacket<RemoveSaddleFromPetComposerType> {
    public constructor(private params: RemoveSaddleFromPetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
