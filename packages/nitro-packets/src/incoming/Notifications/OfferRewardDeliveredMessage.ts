import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OfferRewardDeliveredMessageType = {
  contentType: string;
  classId: number;
  name: string;
  description: string;
};

export class OfferRewardDeliveredMessage implements IIncomingPacket<OfferRewardDeliveredMessageType>
{
  public parse(wrapper: IMessageDataWrapper): OfferRewardDeliveredMessageType
  {
    const packet: OfferRewardDeliveredMessageType = {
      contentType: wrapper.readString(),
      classId: wrapper.readInt(),
      name: wrapper.readString(),
      description: wrapper.readString(),
    };

    return packet;
  }
}
