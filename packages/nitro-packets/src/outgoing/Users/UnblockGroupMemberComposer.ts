// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnblockGroupMemberComposerType = {
    groupId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onActionLinkClick` on a blocked user. */
export class UnblockGroupMemberComposer implements IOutgoingPacket<UnblockGroupMemberComposerType> {
    public constructor(private params: UnblockGroupMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
