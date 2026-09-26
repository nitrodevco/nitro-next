// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Sends the user id selected by Flash's `BlockedUsersManager.unblockUser`. */
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnblockUserComposerType = {
    userId: number;
};

/** `BlockedUsersManager.unblockUser` sends the selected user id as its only value. */
export class UnblockUserComposer implements IOutgoingPacket<UnblockUserComposerType> {
    public constructor(private params: UnblockUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.userId ];
    }
}
