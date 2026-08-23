import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BannedUsersFromRoomEventMessageType = object;

export class BannedUsersFromRoomEventMessage implements IIncomingPacket<BannedUsersFromRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BannedUsersFromRoomEventMessageType {
        const packet: BannedUsersFromRoomEventMessageType = {
        };

        return packet;
    }
}
