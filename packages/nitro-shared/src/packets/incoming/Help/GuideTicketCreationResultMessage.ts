import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideTicketCreationResultMessageType = {
  // no fields

};

export class GuideTicketCreationResultMessage implements IIncomingPacket<GuideTicketCreationResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideTicketCreationResultMessageType
  {

    const packet: GuideTicketCreationResultMessageType = {
    };

    return packet;
  }
}
