// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FriendFurniStartConfirmationMessageType = {
    /** The lock asking to be sealed. */
    stuffId: number;
    /** Whether you are the one who placed it, which decides what the dialog says. */
    isOwner: boolean;
};

export class FriendFurniStartConfirmationMessage implements IIncomingPacket<FriendFurniStartConfirmationMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendFurniStartConfirmationMessageType {
        const packet: FriendFurniStartConfirmationMessageType = {
            stuffId: wrapper.readInt(),
            isOwner: wrapper.readBoolean(),
        };

        return packet;
    }
}
