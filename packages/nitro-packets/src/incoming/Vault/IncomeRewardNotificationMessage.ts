// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `IncomeRewardNotificationMessageEventParser`: the category of the reward that just came in (a byte). */
export type IncomeRewardNotificationMessageType = {
    rewardCategory: number;
};

export class IncomeRewardNotificationMessage implements IIncomingPacket<IncomeRewardNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): IncomeRewardNotificationMessageType {
        const rewardCategory = wrapper.readByte();

        return { rewardCategory };
    }
}
