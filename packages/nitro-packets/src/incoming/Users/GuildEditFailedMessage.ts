// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildEditFailedMessageType = {
    /** `group.edit.fail.<reason>`; 2 is "club membership required" and opens the HC window instead. */
    reason: number;
};

/** `HabboGroupsManager.onGuildEditFailed`. */
export class GuildEditFailedMessage implements IIncomingPacket<GuildEditFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildEditFailedMessageType {
        return {
            reason: wrapper.readInt(),
        };
    }
}
