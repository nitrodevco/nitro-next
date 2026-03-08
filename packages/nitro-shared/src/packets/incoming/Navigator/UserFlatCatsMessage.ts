import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Nodes: List<object>?): List<T> requires custom read loop (length + items).

export type UserFlatCatsMessageType = {
  nodes: any[];
};

export class UserFlatCatsMessage implements IIncomingPacket<UserFlatCatsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserFlatCatsMessageType
  {

    const packet: UserFlatCatsMessageType = {
      nodes: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
