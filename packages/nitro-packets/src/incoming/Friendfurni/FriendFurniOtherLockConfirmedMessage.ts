// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniOtherLockConfirmedMessageType = {
    /** The lock whose other half has now agreed. */
    stuffId: number;
};

export class FriendFurniOtherLockConfirmedMessage implements IIncomingPacket<FriendFurniOtherLockConfirmedMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendFurniOtherLockConfirmedMessageType {
        const packet: FriendFurniOtherLockConfirmedMessageType = {
            stuffId: wrapper.readInt(),
        };

        return packet;
    }
}
