import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { IRoomAvatar } from './Data/IRoomAvatar';
import { UserParser } from './Data/UserParser';

export type UsersMessageType = {
    avatars: IRoomAvatar[];
};

export class UsersMessage implements IIncomingPacket<UsersMessageType> {
    public parse(wrapper: IMessageDataWrapper): UsersMessageType {
        const packet: UsersMessageType = {
            avatars: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.avatars.push(UserParser(wrapper));

            count--;
        }

        return packet;
    }
}
