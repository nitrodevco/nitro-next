import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionEndedMessageType = {
  // no fields

};

export class GuideSessionEndedMessage implements IIncomingPacket<GuideSessionEndedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionEndedMessageType
  {

    const packet: GuideSessionEndedMessageType = {
    };

    return packet;
  }
}
