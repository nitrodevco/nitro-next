import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DropCarryItemComposerType = object;

export class DropCarryItemComposer implements IOutgoingPacket<DropCarryItemComposerType> {
    public constructor(private params: DropCarryItemComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
