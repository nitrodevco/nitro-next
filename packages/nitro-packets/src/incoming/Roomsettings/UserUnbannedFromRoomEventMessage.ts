import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* UserUnbannedFromRoomParser (§_-94§/§_-Ym§) — roomId, userId */
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
