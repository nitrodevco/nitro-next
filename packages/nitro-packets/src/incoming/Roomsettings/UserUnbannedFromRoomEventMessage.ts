// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserUnbannedFromRoomEventMessageType = {
    roomId: number;
    userId: number;
};

export class UserUnbannedFromRoomEventMessage implements IIncomingPacket<UserUnbannedFromRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserUnbannedFromRoomEventMessageType {
        return {
            roomId: wrapper.readInt(),
            userId: wrapper.readInt(),
        };
    }
}
