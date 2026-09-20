// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type StartAddingToChestComposerType = {
    chestId: number;
};

export class StartAddingToChestComposer implements IOutgoingPacket<StartAddingToChestComposerType> {
    public constructor(private params: StartAddingToChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
        ];
    }
}
