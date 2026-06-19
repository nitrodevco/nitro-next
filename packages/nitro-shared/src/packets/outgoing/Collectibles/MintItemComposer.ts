import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MintItemComposerType = object;

export class MintItemComposer implements IOutgoingPacket<MintItemComposerType> {
    public constructor(private params: MintItemComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
