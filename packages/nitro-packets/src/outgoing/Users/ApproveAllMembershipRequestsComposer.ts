// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveAllMembershipRequestsComposerType = {
    groupId: number;
};

/** `GuildMembersWindowCtrl.onAcceptAll`. */
export class ApproveAllMembershipRequestsComposer implements IOutgoingPacket<ApproveAllMembershipRequestsComposerType> {
    public constructor(private params: ApproveAllMembershipRequestsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
