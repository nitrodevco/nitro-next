// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WithdrawCoinsFromChestComposerType = {
    chestId: number;
    amount: number;
};

export class WithdrawCoinsFromChestComposer implements IOutgoingPacket<WithdrawCoinsFromChestComposerType> {
    public constructor(private params: WithdrawCoinsFromChestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.amount,
        ];
    }
}
