// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveMembershipRequestComposerType = {
    groupId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onActionLinkClick` on a pending request. */
export class ApproveMembershipRequestComposer implements IOutgoingPacket<ApproveMembershipRequestComposerType> {
    public constructor(private params: ApproveMembershipRequestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
