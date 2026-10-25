// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BlockListInitComposerType = object;

export class BlockListInitComposer implements IOutgoingPacket<BlockListInitComposerType> {
    public constructor(private params: BlockListInitComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [

        ];
    }
}
