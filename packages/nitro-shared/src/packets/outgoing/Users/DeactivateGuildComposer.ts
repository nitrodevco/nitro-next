import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeactivateGuildComposerType = object;

export class DeactivateGuildComposer implements IOutgoingPacket<DeactivateGuildComposerType> {
    public constructor(private params: DeactivateGuildComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
