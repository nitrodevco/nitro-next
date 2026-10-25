// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConcurrentUsersGoalProgressMessageType = {
    /** `ConcurrentUsersInfoElementHandler`'s `STATE_DISABLED` 0, `STATE_ACTIVE` 1, `STATE_REDEEM` 2, `STATE_REWARDED` 3. */
    state: number;
    userCount: number;
    userCountGoal: number;
};

/** Flash `ConcurrentUsersGoalProgressMessageParser`: three integers. */
export class ConcurrentUsersGoalProgressMessage implements IIncomingPacket<ConcurrentUsersGoalProgressMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConcurrentUsersGoalProgressMessageType {
        const state = wrapper.readInt();
        const userCount = wrapper.readInt();
        const userCountGoal = wrapper.readInt();

        return { state, userCount, userCountGoal };
    }
}
