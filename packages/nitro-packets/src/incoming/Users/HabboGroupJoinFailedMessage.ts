// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupJoinFailedMessageType = {
    /** `group.joinfail.<reason>`; 4 is "club membership required" and opens the HC window instead. */
    reason: number;
};

/** `HabboGroupsManager.onJoinFailed`. */
export class HabboGroupJoinFailedMessage implements IIncomingPacket<HabboGroupJoinFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupJoinFailedMessageType {
        return {
            reason: wrapper.readInt(),
        };
    }
}
