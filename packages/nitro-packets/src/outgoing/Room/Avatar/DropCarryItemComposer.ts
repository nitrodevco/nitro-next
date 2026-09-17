// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DropCarryItemComposerType = object;

export class DropCarryItemComposer implements IOutgoingPacket<DropCarryItemComposerType> {
    public constructor(private params: DropCarryItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [

        ];
    }
}
