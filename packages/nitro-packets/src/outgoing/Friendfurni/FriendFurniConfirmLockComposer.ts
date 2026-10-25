// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FriendFurniConfirmLockComposerType = {
    itemId: number;
    /** Whether the other half agreed; a refusal is sent just as plainly. */
    confirmed: boolean;
};

export class FriendFurniConfirmLockComposer implements IOutgoingPacket<FriendFurniConfirmLockComposerType> {
    public constructor(private params: FriendFurniConfirmLockComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
            this.params.confirmed,
        ];
    }
}
