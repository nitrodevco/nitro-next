// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { Byte, IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `IncomeRewardClaimMessageComposer(category)`: the reward category to claim, as a byte - `-1` claims every category. */
export type IncomeRewardClaimComposerType = {
    rewardCategory: number;
};

export class IncomeRewardClaimComposer implements IOutgoingPacket<IncomeRewardClaimComposerType> {
    public constructor(private params: IncomeRewardClaimComposerType) { }

    public compose(): (number | string | boolean | Byte)[] {
        return [
            new Byte(this.params.rewardCategory),
        ];
    }
}
