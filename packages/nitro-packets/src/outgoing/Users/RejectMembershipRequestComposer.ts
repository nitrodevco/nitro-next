// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RejectMembershipRequestComposerType = {
    groupId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onRemoveMouseClick` on a pending request - a member is kicked instead. */
export class RejectMembershipRequestComposer implements IOutgoingPacket<RejectMembershipRequestComposerType> {
    public constructor(private params: RejectMembershipRequestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
