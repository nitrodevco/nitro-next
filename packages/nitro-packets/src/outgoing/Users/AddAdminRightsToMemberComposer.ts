// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddAdminRightsToMemberComposerType = {
    groupId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onActionLinkClick` on a plain member. */
export class AddAdminRightsToMemberComposer implements IOutgoingPacket<AddAdminRightsToMemberComposerType> {
    public constructor(private params: AddAdminRightsToMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
