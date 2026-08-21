import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PollOfferEventMessageType = {
  id: number;
  type: string;
  headline: string;
  summary: string;
};

export class PollOfferEventMessage implements IIncomingPacket<PollOfferEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PollOfferEventMessageType
  {
    const packet: PollOfferEventMessageType = {
      id: wrapper.readInt(),
      type: wrapper.readString(),
      headline: wrapper.readString(),
      summary: wrapper.readString(),
    };

    return packet;
  }
}
