import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetCommandsComposerType = object;

export class GetPetCommandsComposer implements IOutgoingPacket<GetPetCommandsComposerType> {
    public constructor(private params: GetPetCommandsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
