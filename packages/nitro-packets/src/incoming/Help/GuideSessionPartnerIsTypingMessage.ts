import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionPartnerIsTypingMessageType = {
  // no fields

};

export class GuideSessionPartnerIsTypingMessage implements IIncomingPacket<GuideSessionPartnerIsTypingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionPartnerIsTypingMessageType
  {

    const packet: GuideSessionPartnerIsTypingMessageType = {
    };

    return packet;
  }
}
