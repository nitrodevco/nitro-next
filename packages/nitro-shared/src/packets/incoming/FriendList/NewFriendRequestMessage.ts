import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Request: FriendRequestSnapshot): Unknown type 'FriendRequestSnapshot'. Add override mapping.

export type NewFriendRequestMessageType = {
  request: any;
};

export class NewFriendRequestMessage implements IIncomingPacket<NewFriendRequestMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NewFriendRequestMessageType
  {

    const packet: NewFriendRequestMessageType = {
      request: undefined as any, // Unknown type 'FriendRequestSnapshot'. Add override mapping.
    };

    return packet;
  }
}
