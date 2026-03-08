import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorCode: FollowFriendErrorCodeType): Unknown type 'FollowFriendErrorCodeType'. Add override mapping.

export type FollowFriendFailedMessageType = {
  errorCode: any;
};

export class FollowFriendFailedMessage implements IIncomingPacket<FollowFriendFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FollowFriendFailedMessageType
  {

    const packet: FollowFriendFailedMessageType = {
      errorCode: undefined as any, // Unknown type 'FollowFriendErrorCodeType'. Add override mapping.
    };

    return packet;
  }
}
