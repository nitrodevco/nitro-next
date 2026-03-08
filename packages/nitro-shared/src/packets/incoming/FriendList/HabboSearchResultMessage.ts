import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Friends: List<MessengerSearchResultSnapshot>): List<T> requires custom read loop (length + items).
// TODO(Others: List<MessengerSearchResultSnapshot>): List<T> requires custom read loop (length + items).

export type HabboSearchResultMessageType = {
  friends: any[];
  others: any[];
};

export class HabboSearchResultMessage implements IIncomingPacket<HabboSearchResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboSearchResultMessageType
  {

    const packet: HabboSearchResultMessageType = {
      friends: undefined as any, // List<T> requires custom read loop (length + items).
      others: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
