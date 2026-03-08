import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IgnoredUsersMessageType = {
    userIds: number[];
};

export class IgnoredUsersMessage implements IIncomingPacket<IgnoredUsersMessageType> {
    public parse(wrapper: IMessageDataWrapper): IgnoredUsersMessageType {
        const packet: IgnoredUsersMessageType = {
            userIds: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.userIds.push(wrapper.readInt());

            count--;
        }

        return packet;
    }
}
