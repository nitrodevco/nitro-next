import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { FollowFriendErrorCodeType } from './Data/FollowFriendErrorCodeType';

export type FollowFriendFailedMessageType = {
    errorCode: FollowFriendErrorCodeType;
};

export class FollowFriendFailedMessage implements IIncomingPacket<FollowFriendFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): FollowFriendFailedMessageType {
        const packet: FollowFriendFailedMessageType = {
            errorCode: wrapper.readInt()
        };

        return packet;
    }
}
