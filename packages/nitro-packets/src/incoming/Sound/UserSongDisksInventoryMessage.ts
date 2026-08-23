import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserSongDisksInventoryMessageType = object;

export class UserSongDisksInventoryMessage implements IIncomingPacket<UserSongDisksInventoryMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserSongDisksInventoryMessageType {
        const packet: UserSongDisksInventoryMessageType = {
        };

        return packet;
    }
}
