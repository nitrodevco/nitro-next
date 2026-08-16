import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TargetedOfferNotFoundEventMessageType = {
  // no fields

};

export class TargetedOfferNotFoundEventMessage implements IIncomingPacket<TargetedOfferNotFoundEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TargetedOfferNotFoundEventMessageType
  {

    const packet: TargetedOfferNotFoundEventMessageType = {
    };

    return packet;
  }
}
