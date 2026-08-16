import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FindFriendsProcessResultMessageType = {
    success: boolean;
};

export class FindFriendsProcessResultMessage implements IIncomingPacket<FindFriendsProcessResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): FindFriendsProcessResultMessageType {
        const packet: FindFriendsProcessResultMessageType = {
            success: wrapper.readBoolean()
        };

        return packet;
    }
}
