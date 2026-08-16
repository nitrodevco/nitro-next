import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UnseenItemsEventMessageType = {
  // no fields

};

export class UnseenItemsEventMessage implements IIncomingPacket<UnseenItemsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UnseenItemsEventMessageType
  {

    const packet: UnseenItemsEventMessageType = {
    };

    return packet;
  }
}
