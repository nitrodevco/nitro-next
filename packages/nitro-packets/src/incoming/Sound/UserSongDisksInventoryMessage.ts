// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserSongDisksInventoryMessageType = {
    /** Every song disk you hold: the disk id against the song on it. */
    songDisks: Record<number, number>;
};

export class UserSongDisksInventoryMessage implements IIncomingPacket<UserSongDisksInventoryMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserSongDisksInventoryMessageType {
        const songDisks: Record<number, number> = {};

        let remaining = wrapper.readInt();

        while (remaining > 0) {
            const diskId = wrapper.readInt();

            songDisks[diskId] = wrapper.readInt();

            remaining--;
        }

        return { songDisks };
    }
}
