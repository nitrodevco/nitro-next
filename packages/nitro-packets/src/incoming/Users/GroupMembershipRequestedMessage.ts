// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMemberData, MemberDataParser } from '../Data/MemberDataParser';

export type GroupMembershipRequestedMessageType = {
    groupId: number;
    requester: IMemberData;
};

/** Someone asked to join an exclusive group - `GuildMembersWindowCtrl.onMembershipRequested` reloads the open page. */
export class GroupMembershipRequestedMessage implements IIncomingPacket<GroupMembershipRequestedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GroupMembershipRequestedMessageType {
        return {
            groupId: wrapper.readInt(),
            requester: MemberDataParser(wrapper),
        };
    }
}
