// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildEditInfoComposerType = {
    groupId: number;
};

/** Opens the management window on an existing group - `GroupDetailsCtrl.onManageGuild`. */
export class GetGuildEditInfoComposer implements IOutgoingPacket<GetGuildEditInfoComposerType> {
    public constructor(private params: GetGuildEditInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
