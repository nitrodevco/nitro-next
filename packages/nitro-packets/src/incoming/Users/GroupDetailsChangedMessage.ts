// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GroupDetailsChangedMessageType = {
    groupId: number;
};

/**
 * A group the client is showing changed on the server - `HabboGroupsManager.onGroupDetailsChanged`
 * answers it with `GetHabboGroupDetailsComposer(groupId, false)` when a window displays that group.
 */
export class GroupDetailsChangedMessage implements IIncomingPacket<GroupDetailsChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GroupDetailsChangedMessageType {
        return {
            groupId: wrapper.readInt(),
        };
    }
}
