import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(EventCategories: List<object>?): List<T> requires custom read loop (length + items).

export type UserEventCatsMessageType = {
  eventCategories: any[];
};

export class UserEventCatsMessage implements IIncomingPacket<UserEventCatsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserEventCatsMessageType
  {

    const packet: UserEventCatsMessageType = {
      eventCategories: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
