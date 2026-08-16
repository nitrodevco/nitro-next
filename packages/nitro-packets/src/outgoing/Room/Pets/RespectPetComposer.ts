import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RespectPetComposerType = object;

export class RespectPetComposer implements IOutgoingPacket<RespectPetComposerType> {
    public constructor(private params: RespectPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
