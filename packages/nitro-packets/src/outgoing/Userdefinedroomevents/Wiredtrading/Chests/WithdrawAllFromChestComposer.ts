// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WithdrawAllFromChestComposerType = {
    chestId: number;
};

export class WithdrawAllFromChestComposer implements IOutgoingPacket<WithdrawAllFromChestComposerType> {
    public constructor(private params: WithdrawAllFromChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
        ];
    }
}
