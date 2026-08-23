import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserUnbannedFromRoomEventMessageType = object;

export class UserUnbannedFromRoomEventMessage implements IIncomingPacket<UserUnbannedFromRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserUnbannedFromRoomEventMessageType {
        const packet: UserUnbannedFromRoomEventMessageType = {
        };

        return packet;
    }
}
