import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Failures: List<AcceptFriendFailureSnapshot>): List<T> requires custom read loop (length + items).

export type AcceptFriendResultMessageType = {
  failures: any[];
};

export class AcceptFriendResultMessage implements IIncomingPacket<AcceptFriendResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AcceptFriendResultMessageType
  {

    const packet: AcceptFriendResultMessageType = {
      failures: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
