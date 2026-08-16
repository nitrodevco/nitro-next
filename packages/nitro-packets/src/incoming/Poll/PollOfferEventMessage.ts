import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PollOfferEventMessageType = {
  // no fields

};

export class PollOfferEventMessage implements IIncomingPacket<PollOfferEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PollOfferEventMessageType
  {

    const packet: PollOfferEventMessageType = {
    };

    return packet;
  }
}
