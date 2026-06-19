import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CraftComposerType = object;

export class CraftComposer implements IOutgoingPacket<CraftComposerType> {
    public constructor(private params: CraftComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
