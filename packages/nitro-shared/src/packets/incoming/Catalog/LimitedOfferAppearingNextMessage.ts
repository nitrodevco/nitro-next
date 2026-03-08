import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LimitedOfferAppearingNextMessageType = {
  // no fields

};

export class LimitedOfferAppearingNextMessage implements IIncomingPacket<LimitedOfferAppearingNextMessageType>
{
  public parse(wrapper: IMessageDataWrapper): LimitedOfferAppearingNextMessageType
  {

    const packet: LimitedOfferAppearingNextMessageType = {
    };

    return packet;
  }
}
