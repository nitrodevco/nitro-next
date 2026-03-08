import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Fragment: List<MessengerFriendSnapshot>): List<T> requires custom read loop (length + items).

export type FriendListFragmentMessageType = {
  totalFragments: number;
  fragmentIndex: number;
  fragment: any[];
};

export class FriendListFragmentMessage implements IIncomingPacket<FriendListFragmentMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FriendListFragmentMessageType
  {

    const packet: FriendListFragmentMessageType = {
      totalFragments: wrapper.readInt(),
      fragmentIndex: wrapper.readInt(),
      fragment: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
