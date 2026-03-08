import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Requests: List<FriendRequestSnapshot>): List<T> requires custom read loop (length + items).

export type FriendRequestsMessageType = {
  requests: any[];
};

export class FriendRequestsMessage implements IIncomingPacket<FriendRequestsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendRequestsMessageType
  {

    const packet: FriendRequestsMessageType = {
      requests: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
