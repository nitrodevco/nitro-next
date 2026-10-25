// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CloseChestComposerType = {
    chestId: number;
};

export class CloseChestComposer implements IOutgoingPacket<CloseChestComposerType> {
    public constructor(private params: CloseChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
        ];
    }
}
