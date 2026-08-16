import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UnreadForumsCountMessageType = {
  // no fields

};

export class UnreadForumsCountMessage implements IIncomingPacket<UnreadForumsCountMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UnreadForumsCountMessageType
  {

    const packet: UnreadForumsCountMessageType = {
    };

    return packet;
  }
}
