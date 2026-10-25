// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveAdminRightsFromMemberComposerType = {
    groupId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onActionLinkClick` on an admin. */
export class RemoveAdminRightsFromMemberComposer implements IOutgoingPacket<RemoveAdminRightsFromMemberComposerType> {
    public constructor(private params: RemoveAdminRightsFromMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
