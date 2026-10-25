// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildIdentityComposerType = {
    groupId: number;
    groupName: string;
    groupDescription: string;
};

/** `GuildManagementWindowCtrl.saveView` for the identity step. */
export class UpdateGuildIdentityComposer implements IOutgoingPacket<UpdateGuildIdentityComposerType> {
    public constructor(private params: UpdateGuildIdentityComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.groupName,
            this.params.groupDescription,
        ];
    }
}
