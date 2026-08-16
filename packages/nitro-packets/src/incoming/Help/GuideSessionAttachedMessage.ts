import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionAttachedMessageType = {
  // no fields

};

export class GuideSessionAttachedMessage implements IIncomingPacket<GuideSessionAttachedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionAttachedMessageType
  {

    const packet: GuideSessionAttachedMessageType = {
    };

    return packet;
  }
}
