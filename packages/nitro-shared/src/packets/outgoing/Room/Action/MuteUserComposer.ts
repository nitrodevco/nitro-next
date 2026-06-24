import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MuteUserComposerType = object;

export class MuteUserComposer implements IOutgoingPacket<MuteUserComposerType> {
    public constructor(private params: MuteUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
