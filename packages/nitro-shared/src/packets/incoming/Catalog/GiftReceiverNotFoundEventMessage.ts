import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GiftReceiverNotFoundEventMessageType = {
  // no fields

};

export class GiftReceiverNotFoundEventMessage implements IIncomingPacket<GiftReceiverNotFoundEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GiftReceiverNotFoundEventMessageType
  {

    const packet: GiftReceiverNotFoundEventMessageType = {
    };

    return packet;
  }
}
