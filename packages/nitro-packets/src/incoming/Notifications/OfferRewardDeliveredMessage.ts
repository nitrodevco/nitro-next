import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OfferRewardDeliveredMessageType = {
  // no fields

};

export class OfferRewardDeliveredMessage implements IIncomingPacket<OfferRewardDeliveredMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OfferRewardDeliveredMessageType
  {

    const packet: OfferRewardDeliveredMessageType = {
    };

    return packet;
  }
}
