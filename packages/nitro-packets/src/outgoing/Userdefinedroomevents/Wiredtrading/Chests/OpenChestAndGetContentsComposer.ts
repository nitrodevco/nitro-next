// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenChestAndGetContentsComposerType = {
    chestId: number;
};

export class OpenChestAndGetContentsComposer implements IOutgoingPacket<OpenChestAndGetContentsComposerType> {
    public constructor(private params: OpenChestAndGetContentsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
        ];
    }
}
