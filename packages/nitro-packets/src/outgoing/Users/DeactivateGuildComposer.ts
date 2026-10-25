// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeactivateGuildComposerType = {
    groupId: number;
};

/** Deletes the group - `GroupDetailsCtrl.onDeleteGuildConfirmation`. */
export class DeactivateGuildComposer implements IOutgoingPacket<DeactivateGuildComposerType> {
    public constructor(private params: DeactivateGuildComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
