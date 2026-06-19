import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetInfoComposerType = object;

export class GetPetInfoComposer implements IOutgoingPacket<GetPetInfoComposerType> {
    public constructor(private params: GetPetInfoComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
