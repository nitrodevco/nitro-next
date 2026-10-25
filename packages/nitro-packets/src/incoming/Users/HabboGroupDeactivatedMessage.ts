// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupDeactivatedMessageType = {
    groupId: number;
};

/** The group was deleted - `HabboGroupsManager.onGroupDeactivated` closes every window showing it. */
export class HabboGroupDeactivatedMessage implements IIncomingPacket<HabboGroupDeactivatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupDeactivatedMessageType {
        return {
            groupId: wrapper.readInt(),
        };
    }
}
