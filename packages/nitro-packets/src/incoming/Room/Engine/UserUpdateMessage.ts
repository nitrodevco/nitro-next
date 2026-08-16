import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { IRoomAvatarUpdate } from './Data/IRoomAvatarUpdate';
import { UserUpdateParser } from './Data/UserUpdateParser';

export type UserUpdateMessageType = {
    updates: IRoomAvatarUpdate[];
};

export class UserUpdateMessage implements IIncomingPacket<UserUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserUpdateMessageType {
        const packet: UserUpdateMessageType = {
            updates: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.updates.push(UserUpdateParser(wrapper));

            count--;
        }

        return packet;
    }
}
