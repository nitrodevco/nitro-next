// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniCancelLockMessageType = {
    /** The lock that will not be sealed after all. */
    stuffId: number;
};

export class FriendFurniCancelLockMessage implements IIncomingPacket<FriendFurniCancelLockMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendFurniCancelLockMessageType {
        const packet: FriendFurniCancelLockMessageType = {
            stuffId: wrapper.readInt(),
        };

        return packet;
    }
}
