import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideTicketResolutionMessageType = {
  // no fields

};

export class GuideTicketResolutionMessage implements IIncomingPacket<GuideTicketResolutionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideTicketResolutionMessageType
  {

    const packet: GuideTicketResolutionMessageType = {
    };

    return packet;
  }
}
