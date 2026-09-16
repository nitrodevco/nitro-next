// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveItemComposerType = {
    itemId: number;
};

export class RemoveItemComposer implements IOutgoingPacket<RemoveItemComposerType> {
    public constructor(private params: RemoveItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
        ];
    }
}
