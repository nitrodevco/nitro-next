// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Sends the user id selected by Flash's `BlockedUsersManager.blockUser`. */
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BlockUserComposerType = {
    userId: number;
};

/** `BlockedUsersManager.blockUser` sends the selected user id as its only value. */
export class BlockUserComposer implements IOutgoingPacket<BlockUserComposerType> {
    public constructor(private params: BlockUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.userId ];
    }
}
