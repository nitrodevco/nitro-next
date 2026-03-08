import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionStartedMessageType = {
  // no fields

};

export class GuideSessionStartedMessage implements IIncomingPacket<GuideSessionStartedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionStartedMessageType
  {

    const packet: GuideSessionStartedMessageType = {
    };

    return packet;
  }
}
