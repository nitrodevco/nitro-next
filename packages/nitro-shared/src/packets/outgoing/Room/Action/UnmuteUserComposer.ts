import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnmuteUserComposerType = object;

export class UnmuteUserComposer implements IOutgoingPacket<UnmuteUserComposerType> {
    public constructor(private params: UnmuteUserComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
