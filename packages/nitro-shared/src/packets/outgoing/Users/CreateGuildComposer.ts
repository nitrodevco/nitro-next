import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreateGuildComposerType = object;

export class CreateGuildComposer implements IOutgoingPacket<CreateGuildComposerType> {
    public constructor(private params: CreateGuildComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
