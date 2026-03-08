import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FriendCategories: List<FriendCategorySnapshot>): List<T> requires custom read loop (length + items).

export type MessengerInitMessageType = {
  userFriendLimit: number;
  normalFriendLimit: number;
  extendedFriendLimit: number;
  friendCategories: any[];
};

export class MessengerInitMessage implements IIncomingPacket<MessengerInitMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MessengerInitMessageType
  {

    const packet: MessengerInitMessageType = {
      userFriendLimit: wrapper.readInt(),
      normalFriendLimit: wrapper.readInt(),
      extendedFriendLimit: wrapper.readInt(),
      friendCategories: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
