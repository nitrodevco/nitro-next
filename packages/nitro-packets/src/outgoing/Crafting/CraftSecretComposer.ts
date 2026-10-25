// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CraftSecretComposerType = {
    objectId: number;
    /** The furni put into the mixer; what they make is the server to know. */
    itemIds: number[];
};

export class CraftSecretComposer implements IOutgoingPacket<CraftSecretComposerType> {
    public constructor(private params: CraftSecretComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
